// deno-lint-ignore-file no-explicit-any
// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { Emplaceable } from "./mixin.ts";

interface EmplaceableMapConstructor {
  new (): Map<any, any> & Emplaceable<any, any>;
  new <K, V>(
    entries?: readonly (readonly [K, V])[] | null,
  ): Map<K, V> & Emplaceable<K, V>;

  readonly prototype: Map<any, any> & Emplaceable<any, any>;
}

const _EmplaceableMap: EmplaceableMapConstructor = /* @__PURE__ */ Emplaceable(
  Map,
);

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
export class EmplaceableMap<K, V> extends _EmplaceableMap<K, V> {}

interface EmplaceableWeakMapConstructor {
  new <K extends WeakKey = WeakKey, V = any>(
    entries?: readonly (readonly [K, V])[] | null,
  ): WeakMap<K, V> & Emplaceable<K, V>;

  readonly prototype: WeakMap<WeakKey, any> & Emplaceable<any, any>;
}

const _EmplaceableWeakMap: EmplaceableWeakMapConstructor =
  /* @__PURE__ */ Emplaceable(WeakMap);

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
export class EmplaceableWeakMap<K extends WeakKey, V>
  extends _EmplaceableWeakMap<K, V> {}
