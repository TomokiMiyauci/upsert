// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** Polyfill affects the global object. You must be very careful when using it.
 * @example
 * ```ts
 * import "@miyauci/upsert/polyfill";
 * import { assert } from "@std/assert";
 *
 * assert(Map.prototype.emplace);
 * assert(WeakMap.prototype.emplace);
 * ```
 */

import { emplace } from "./mixin.ts";
import "./polyfill.d.ts";

Map.prototype.emplace = emplace;
WeakMap.prototype.emplace = emplace;
