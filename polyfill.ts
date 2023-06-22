// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** Polyfill affects the global object. You must be very careful when using it.
 * @example
 * ```ts
 * import "https://deno.land/x/upsert/polyfill.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(Map.prototype.emplace);
 * assert(WeakMap.prototype.emplace);
 * ```
 */

// deno-lint-ignore-file no-empty-interface
import { emplace, type Emplaceable } from "./mixin.ts";

declare global {
  interface Map<K, V> extends Emplaceable<K, V> {}

  interface WeakMap<K, V> extends Emplaceable<K, V> {}
}

Map.prototype.emplace = emplace;
WeakMap.prototype.emplace = emplace;
