// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { emplace, Emplaceable } from "./mixin.ts";
import { assert, assertEquals, describe, it } from "./_dev_deps.ts";

describe("emplace", () => {
  it("should bind map and do emplace", () => {
    const map = new Map();

    assertEquals(
      emplace.bind(map)("a", { insert: () => "a", update: () => "b" }),
      "a",
    );

    assert(map.has("a"));
  });
});

describe("Emplaceable", () => {
  it("should", () => {
    assert(Reflect.construct(Emplaceable(Map), []).emplace === emplace);
  });
});
