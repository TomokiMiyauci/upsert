// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { EmplaceableMap, EmplaceableWeakMap } from "./class.ts";
import { assertEquals, describe, it } from "./_dev_deps.ts";

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
