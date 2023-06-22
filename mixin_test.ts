// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { emplace, Emplaceable } from "./mixin.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "./_dev_deps.ts";

describe("emplace", () => {
  it("should bind map and do emplace", () => {
    const map = new Map();

    assertEquals(
      emplace.bind(map)("a", { update: () => "b" }),
      undefined,
    );

    assertFalse(map.has("a"));
  });
});

describe("Emplaceable", () => {
  it("should", () => {
    assert(Reflect.construct(Emplaceable(Map), []).emplace === emplace);
  });
});
