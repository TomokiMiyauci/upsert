// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** Maps for emplace, TC39 [proposal-upsert](https://github.com/tc39/proposal-upsert) implementation.
 * @module
 */

export { Emplaceable, emplaceable } from "./mixin.ts";
export {
  emplace,
  type EmplaceHandler,
  insert,
  type Insertable,
  type MapLike,
  type Updatable,
  update,
} from "./emplace.ts";
export { EmplaceableMap, EmplaceableWeakMap } from "./class.ts";
