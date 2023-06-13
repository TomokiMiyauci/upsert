// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import {
  emplace,
  Emplaceable,
  EmplaceableMap,
  EmplaceableWeakMap,
} from "./mixin.ts";
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

describe("EmplaceableMap", () => {
  it("should implement emplace", () => {
    const map = new EmplaceableMap<string, number>();

    assertEquals(
      map.emplace("", {
        insert: () => 0,
        update: () => 1,
      }),
      0,
    );
  });
});

describe("EmplaceableWeakMap", () => {
  it("should implement emplace", () => {
    const key = {};
    // deno-lint-ignore ban-types
    const map = new EmplaceableWeakMap<object, number>([[key, 0]]);

    assertEquals(
      map.emplace(key, {
        insert: () => 0,
        update: (exist) => exist + 1,
      }),
      1,
    );
  });
});
