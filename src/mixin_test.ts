// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { emplace, Emplaceable, emplaceable } from "./mixin.ts";
import { describe, it } from "@std/testing/bdd";
import { assert, assertEquals, assertFalse } from "@std/assert";

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

describe("emplaceable", () => {
  it("should mixin emplace member", () => {
    assert(Reflect.construct(emplaceable(Map), []).emplace === emplace);
  });

  it("should same ref", () => {
    assert(emplaceable === Emplaceable);
  });
});
