// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import {
  emplace as _emplace,
  type EmplaceHandler,
  type Insertable,
  type MapLike,
  type Updatable,
} from "./emplace.ts";

export function emplace<K, V, M>(
  this: Readonly<MapLike<K, V>> & M,
  key: K,
  handler: Readonly<EmplaceHandler<K, V, M>>,
): V;
export function emplace<K, V, M>(
  this: Readonly<MapLike<K, V>> & M,
  key: K,
  handler: Readonly<Insertable<K, V, M>>,
): V;
export function emplace<K, V, M>(
  this: Readonly<MapLike<K, V>> & M,
  key: K,
  handler: Readonly<Updatable<K, V, M>>,
): V | undefined;
export function emplace<K, V, M>(
  this: Readonly<MapLike<K, V>> & M,
  key: K,
  handler: Readonly<Insertable<K, V, M> | Updatable<K, V, M>>,
): V | undefined {
  return _emplace(this, key, handler as EmplaceHandler<K, V, M>);
}

/** Mixin for {@link emplace}.
 *
 * @example
 * ```ts
 * import { Emplaceable } from "https://deno.land/x/upsert/mixin.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * class MyMap extends Emplaceable(Map) {}
 *
 * assert(MyMap.prototype.emplace);
 * ```
 */
export function Emplaceable<
  // deno-lint-ignore no-explicit-any
  T extends { new (...args: any): MapLike<never, never> },
>(ctor: T) {
  return class extends ctor {
    emplace = emplace;
  };
}

/** Emplaceable API. */
export interface Emplaceable<K, V> {
  /** Add a value to a map if the map does not already have something at {@link key}, and will also update an existing value at {@link key}. */
  emplace(key: K, handler: EmplaceHandler<K, V, this>): V;
  emplace(key: K, handler: Insertable<K, V, this>): V;
  emplace(key: K, handler: Updatable<K, V, this>): V | undefined;
}
