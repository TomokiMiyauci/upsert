// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import "./polyfill.ts";
import { emplace } from "./mixin.ts";
import { assert, describe, it } from "./_dev_deps.ts";

describe("prototype", () => {
  it("should has emplace", () => {
    assert(Map.prototype.emplace === emplace);
    assert(WeakMap.prototype.emplace === emplace);
  });
});
