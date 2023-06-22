// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

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
