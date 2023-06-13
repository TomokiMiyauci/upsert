// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { emplace } from "./emplace.ts";
import {
  assertEquals,
  assertSpyCallArgs,
  assertSpyCalls,
  describe,
  it,
  spy,
} from "./_dev_deps.ts";

describe("emplace", () => {
  it("should call insert if the key is not exist", () => {
    const has = spy(() => false);
    const get = spy(() => "");
    const set = spy(function (this: never) {
      return this;
    });

    const map = { has, get, set };

    const insert = spy(() => INSERTED);
    const update = spy(() => UPDATED);
    const KEY = "";
    const INSERTED = "a";
    const UPDATED = "b";

    assertEquals(emplace(map, KEY, { insert, update }), INSERTED);
    assertSpyCalls(insert, 1);
    assertSpyCalls(update, 0);
    assertSpyCalls(has, 1);
    assertSpyCalls(get, 0);
    assertSpyCalls(set, 1);

    assertSpyCallArgs(insert, 0, [KEY]);
    assertSpyCallArgs(has, 0, [KEY]);
    assertSpyCallArgs(set, 0, [KEY, INSERTED]);
  });

  it("should call update if the key is not exist", () => {
    const has = spy(() => true);
    const get = spy(() => EXISTED);
    const set = spy(function (this: never) {
      return this;
    });

    const map = { has, get, set };

    const insert = spy(() => INSERTED);
    const update = spy(() => UPDATED);
    const KEY = "";
    const INSERTED = "a";
    const UPDATED = "b";
    const EXISTED = "c";

    assertEquals(emplace(map, KEY, { insert, update }), UPDATED);
    assertSpyCalls(insert, 0);
    assertSpyCalls(update, 1);
    assertSpyCalls(has, 1);
    assertSpyCalls(get, 1);
    assertSpyCalls(set, 1);

    assertSpyCallArgs(update, 0, [EXISTED, KEY]);
    assertSpyCallArgs(has, 0, [KEY]);
    assertSpyCallArgs(set, 0, [KEY, UPDATED]);
  });

  it("should do nothing if the key is not exist and not provide insert", () => {
    const map = new Map<string, number>();
    const update = spy((existing: number) => existing + 1);

    assertEquals(emplace(map, "", { update }), undefined);
    assertEquals(map.size, 0);
    assertSpyCalls(update, 0);
  });

  it("should do nothing if the key is exist and not provide update", () => {
    const KEY = "";
    const VALUE = 0;
    const map = new Map<string, number>([[KEY, VALUE]]);
    const insert = spy(() => 1);

    assertEquals(emplace(map, KEY, { insert }), VALUE);
    assertEquals(map.get(KEY), VALUE);
    assertSpyCalls(insert, 0);
  });
});