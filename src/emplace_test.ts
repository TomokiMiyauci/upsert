// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { emplace, insert, update } from "../src/emplace.ts";
import { describe, it } from "@std/testing/bdd";
import { assertSpyCallArgs, assertSpyCalls, spy } from "@std/testing/mock";
import { assert, assertEquals } from "@std/assert";

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

    assertSpyCallArgs(insert, 0, [KEY, map]);
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

    assertSpyCallArgs(update, 0, [EXISTED, KEY, map]);
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

  it("should work with binding insert", () => {
    class Handler {
      value = VALUE;
      insert() {
        return this.value;
      }
    }

    const VALUE = 0;
    const handler = new Handler();
    const map = new Map<string, number>();
    const KEY = "";

    assertEquals(emplace(map, KEY, handler), VALUE);
    assertEquals(map.get(KEY), VALUE);
  });

  it("should work with binding update", () => {
    class Handler {
      value = VALUE;
      update(v: number) {
        return v + this.value;
      }
    }

    const VALUE = 1;
    const handler = new Handler();
    const KEY = "";
    const map = new Map<string, number>([[KEY, 0]]);

    assert(map.has(KEY));
    assertEquals(emplace(map, KEY, handler), VALUE);
  });
});

describe("insert", () => {
  it("should call if the key does not exist", () => {
    const KEY = "";
    const VALUE = 1;
    const handler = spy(() => VALUE);
    const map = new Map();

    assertEquals(insert(map, KEY, handler), VALUE);
    assertEquals(map, new Map([[KEY, VALUE]]));

    assertSpyCalls(handler, 1);
    assertSpyCallArgs(handler, 0, [KEY, map]);
  });

  it("should not call if the key exists", () => {
    const KEY = "";
    const VALUE = 0;
    const handler = spy(() => 1);
    const map = new Map([[KEY, VALUE]]);

    assert(map.has(KEY));
    assertEquals(insert(map, KEY, handler), VALUE);
    assertEquals(map, new Map([[KEY, VALUE]]));

    assertSpyCalls(handler, 0);
  });
});

describe("update", () => {
  it("should call if the key exists", () => {
    const KEY = "";
    const VALUE = 0;
    const handler = spy((existing: number) => ++existing);
    const map = new Map([[KEY, VALUE]]);

    assert(map.has(KEY));
    assertEquals(update(map, KEY, handler), VALUE + 1);
    assertEquals(map, new Map([[KEY, VALUE + 1]]));

    assertSpyCalls(handler, 1);
    assertSpyCallArgs(handler, 0, [VALUE, KEY, map]);
  });

  it("should not call if the key does not exist", () => {
    const KEY = "";
    const VALUE = 1;
    const handler = spy(() => VALUE);
    const map = new Map();

    assertEquals(update(map, KEY, handler), undefined);
    assertEquals(map, new Map());

    assertSpyCalls(handler, 0);
  });
});
