// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { EmplaceableMap, EmplaceableWeakMap } from "../src/class.ts";
import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";

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
