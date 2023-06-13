// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

// deno-lint-ignore-file no-empty-interface
import { emplace, type Emplaceable } from "./mixin.ts";

declare global {
  interface Map<K, V> extends Emplaceable<K, V> {}

  interface WeakMap<K, V> extends Emplaceable<K, V> {}
}

Map.prototype.emplace = emplace;
WeakMap.prototype.emplace = emplace;
