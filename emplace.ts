// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** {@link Map} like API. */
export interface MapLike<K, V> {
  /** Returns a specified element. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it. */
  get: (key: K) => V | undefined;

  /** Whether an element with the specified key exists or not. */
  has: (key: K) => boolean;

  /** Adds a new element with a specified key and value. */
  set: (key: K, value: V) => void;
}

/** Insertable API. */
export interface Insertable<K, V, T> {
  /** Add entry. */
  insert: InsertCallback<K, V, T>;
}

export interface InsertCallback<K, V, T = unknown> {
  (key: K, that: T): V;
}

/** Updatable API. */
export interface Updatable<K, V, T> {
  /** Update the value. */
  update: UpdateCallback<K, V, T>;
}

export interface UpdateCallback<K, V, T> {
  (existing: V, key: K, that: T): V;
}

/** Handler for emplace. */
export interface EmplaceHandler<K, V, T>
  extends Insertable<K, V, T>, Updatable<K, V, T> {}

/** Add a value to a {@link map} if it does not already have something at {@link key}, and will also update an existing value at {@link key}.
 *
 * @example
 * ```ts
 * import { emplace } from "https://deno.land/x/upsert/emplace.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const map: Map<string, number>;
 * declare const key: string;
 *
 * const result = emplace(map, key, {
 *  insert: () => 0,
 *  update: (existing) => ++existing,
 * });
 * assert(map.has(key));
 * ```
 *
 * ## Just insert if missing
 * You might omit an `update` if you're handling data that doesn't change, but can
 * still be appended.
 *
 * ```ts
 * import { emplace } from "https://deno.land/x/upsert/emplace.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 * import {
 *  assertType,
 *  type IsExact,
 * } from "https://deno.land/std/testing/types.ts";
 *
 * declare const map: Map<string, number>;
 * declare const key: string;
 * declare const value: number;
 *
 * const result = emplace(map, key, { insert: () => value });
 *
 * assert(map.has(key));
 * assertType<IsExact<typeof result, number>>(true);
 * ```
 *
 * ## Just update if present
 * You might want to omit an `insert` if you want to perform a function on all
 * existing values.
 *
 * ```ts
 * import { emplace } from "https://deno.land/x/upsert/emplace.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 * import {
 *  assertType,
 *  type IsExact,
 * } from "https://deno.land/std/testing/types.ts";
 *
 * declare const map: Map<string, number>;
 * declare const key: string;
 *
 * const result = emplace(map, key, { update: (existing) => ++existing });
 *
 * assertType<IsExact<typeof result, number | undefined>>(true);
 * ```
 */
export function emplace<K, V, M>(
  map: Readonly<MapLike<K, V>> & M,
  key: K,
  handler: Readonly<EmplaceHandler<K, V, M>>,
): V;
export function emplace<K, V, M>(
  map: Readonly<MapLike<K, V>> & M,
  key: K,
  handler: Readonly<Insertable<K, V, M>>,
): V;
export function emplace<K, V, M>(
  map: Readonly<MapLike<K, V>> & M,
  key: K,
  handler: Readonly<Updatable<K, V, M>>,
): V | undefined;
export function emplace<K, V, M>(
  map: Readonly<MapLike<K, V>> & M,
  key: K,
  handler: Readonly<Insertable<K, V, M> | Updatable<K, V, M>>,
): V | undefined {
  if (map.has(key)) {
    const value = map.get(key)!;

    return "update" in handler
      ? _update(value, key, map, handler.update.bind(handler))
      : value;
  }

  if ("insert" in handler) {
    return _insert(map, key, handler.insert.bind(handler));
  }

  return;
}

const _insert: typeof insert = (map, key, callback) => {
  const inserted = callback(key, map);

  map.set(key, inserted);

  return inserted;
};

export function insert<K, V, M = MapLike<K, V>>(
  map: Readonly<MapLike<K, V>> & M,
  key: K,
  callback: InsertCallback<K, V, M>,
): V {
  if (map.has(key)) return map.get(key)!;

  return _insert(map, key, callback);
}

function _update<K, V, M = MapLike<K, V>>(
  value: V,
  key: K,
  map: Readonly<MapLike<K, V>> & M,
  callback: UpdateCallback<K, V, M>,
): V {
  const updated = callback(value, key, map);

  map.set(key, updated);

  return updated;
}

export function update<K, V, M = MapLike<K, V>>(
  map: Readonly<MapLike<K, V>> & M,
  key: K,
  callback: UpdateCallback<K, V, M>,
): V | undefined {
  if (map.has(key)) return _update(map.get(key)!, key, map, callback);

  return;
}
