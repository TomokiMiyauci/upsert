// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import {
  emplace as _emplace,
  type EmplaceHandler,
  type MapLike,
} from "./emplace.ts";

export function emplace<K, V>(
  this: MapLike<K, V>,
  key: K,
  handler: EmplaceHandler<K, V>,
): V {
  return _emplace(this, key, handler);
}

/** Mixin for {@link emplace}.
 *
 * @example
 * ```ts
 * import { Emplaceable } from "https://deno.land/x/upsert@$VERSION/mixin.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * class MyMap extends Emplaceable(Map) {}
 *
 * assert(new MyMap().emplace);
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
  emplace: (key: K, handler: EmplaceHandler<K, V>) => V;
}
