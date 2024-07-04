// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { Emplaceable } from "./mixin.ts";

/** {@link Map} with {@link Emplaceable} implementation.
 *
 * @example
 * ```ts
 * import { EmplaceableMap } from "@miyauci/upsert";
 * import {
 *   assert,
 *   assertInstanceOf,
 * } from "@std/assert";
 *
 * const map = new EmplaceableMap<string, number>();
 *
 * assertInstanceOf(map, Map);
 * assert(map.emplace);
 * ```
 */
export class EmplaceableMap<K, V>
  extends /* @__PURE__ */ Emplaceable(Map)<K, V> {}

/** {@link WeakMap} with {@link Emplaceable} implementation.
 *
 * @example
 * ```ts
 * import { EmplaceableWeakMap } from "@miyauci/upsert";
 * import {
 *  assert,
 *  assertInstanceOf,
 * } from "@std/assert";
 *
 * const weakMap = new EmplaceableWeakMap();
 *
 * assertInstanceOf(weakMap, WeakMap);
 * assert(weakMap.emplace);
 * ```
 */
export class EmplaceableWeakMap<K extends object, V>
  extends /* @__PURE__ */ Emplaceable(WeakMap)<K, V> {}
