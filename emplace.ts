// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
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

export interface EmplaceHandler<K, V> {
  /** Add entry. */
  insert: (key: K) => V;

  /** Update the value. */
  update: (existing: V, key: K) => V;
}

/** Add a value to a {@link map} if it does not already have something at {@link key}, and will also update an existing value at {@link key}.
 *
 * @example
 * ```ts
 * import { emplace } from "https://deno.land/x/upsert@$VERSION/emplace.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const map: Map<string, number>;
 * declare const key: string;
 *
 * const result = emplace(map, key, {
 *  insert: () => 0,
 *  update: (existing) => existing + 1,
 * });
 * assert(map.has(key));
 * ```
 */
export function emplace<K, V>(
  map: Readonly<MapLike<K, V>>,
  key: K,
  handler: Readonly<EmplaceHandler<K, V>>,
): V {
  const value = map.has(key)
    ? handler.update(map.get(key)!, key)
    : handler.insert(key);
  map.set(key, value);

  return value;
}
