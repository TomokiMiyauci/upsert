// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { Emplaceable } from "./mixin.ts";

/** {@link Map} with {@link Emplaceable} implementation.
 *
 * @example
 * ```ts
 * import { EmplaceableMap } from "https://deno.land/x/upsert@$VERSION/class.ts";
 *
 * const map = new EmplaceableMap();
 * ```
 */
export class EmplaceableMap<K, V>
  extends /* @__PURE__ */ Emplaceable(Map)<K, V> {}

/** {@link WeakMap} with {@link Emplaceable} implementation.
 *
 * @example
 * ```ts
 * import { EmplaceableWeakMap } from "https://deno.land/x/upsert@$VERSION/class.ts";
 *
 * const weakMap = new EmplaceableWeakMap();
 * ```
 */
// deno-lint-ignore ban-types
export class EmplaceableWeakMap<K extends object, V>
  extends /* @__PURE__ */ Emplaceable(WeakMap)<K, V> {}