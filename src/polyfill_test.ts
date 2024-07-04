// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import "../src/polyfill.ts";
import { emplace } from "./mixin.ts";
import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert";

describe("prototype", () => {
  it("should has emplace", () => {
    assert(Map.prototype.emplace === emplace);
    assert(WeakMap.prototype.emplace === emplace);
  });
});
