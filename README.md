# upsert

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/upsert)
[![deno doc](https://doc.deno.land/badge.svg)](https://deno.land/x/upsert?doc)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/TomokiMiyauci/upsert)](https://github.com/TomokiMiyauci/upsert/releases)
[![codecov](https://codecov.io/github/TomokiMiyauci/upsert/branch/main/graph/badge.svg)](https://codecov.io/gh/TomokiMiyauci/upsert)
[![License](https://img.shields.io/github/license/TomokiMiyauci/upsert)](LICENSE)

[![test](https://github.com/TomokiMiyauci/upsert/actions/workflows/test.yaml/badge.svg)](https://github.com/TomokiMiyauci/upsert/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@miyauci/upsert.png?mini=true)](https://nodei.co/npm/@miyauci/upsert/)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Maps for emplace, TC39
[proposal-upsert](https://github.com/tc39/proposal-upsert) implementation.

## Table of Contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
  - [Insert](#insert)
    - [Just insert](#just-insert)
  - [Update](#update)
    - [Just update](#just-update)
  - [Emplaceable](#emplaceable)
  - [EmplaceableMap](#emplaceablemap)
  - [EmplaceableWeakMap](#emplaceableweakmap)
  - [Polyfill](#polyfill)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Install

deno.land:

```ts
import * as mod from "https://deno.land/x/upsert/mod.ts";
```

npm:

```bash
npm i @miyauci/upsert
```

## Usage

Add a value to a map like if it does not already have something at `key`, and
will also update an existing value at `key`.

```ts
import { emplace } from "https://deno.land/x/upsert/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const map: Map<string, number>;
declare const key: string;

const result = emplace(map, key, {
  insert: () => 0,
  update: (existing) => ++existing,
});
assert(map.has(key));
```

### Insert

Add the entry if the key does not exist.

```ts
import { emplace } from "https://deno.land/x/upsert/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";
import {
  assertType,
  type IsExact,
} from "https://deno.land/std/testing/types.ts";

declare const map: Map<string, number>;
declare const key: string;
declare const value: number;

const result = emplace(map, key, { insert: () => value });

assert(map.has(key));
assertType<IsExact<typeof result, number>>(true);
```

#### Just insert

If only inserting is required, `insert` is available.

```ts
import { insert } from "https://deno.land/x/upsert/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

declare const key: string;
declare const value: number;
const map = new Map<typeof key, typeof value>();

insert(map, key, () => value);

assertEquals(map, new Map([[key, value]]));
```

### Update

Update the entry if the key exists.

```ts
import { emplace } from "https://deno.land/x/upsert/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";
import {
  assertType,
  type IsExact,
} from "https://deno.land/std/testing/types.ts";

declare const map: Map<string, number>;
declare const key: string;

const result = emplace(map, key, { update: (existing) => ++existing });

assertType<IsExact<typeof result, number | undefined>>(true);
```

#### Just update

If only updating is required, `update` is available.

```ts
import { update } from "https://deno.land/x/upsert/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

declare const key: string;
const map = new Map([[key, 0]]);

update(map, key, (existing) => ++existing);

assertEquals(map, new Map([[key, 1]]));
```

### Emplaceable

Mixin for `emplace`.

```ts
import { Emplaceable } from "https://deno.land/x/upsert/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

class MyMap extends Emplaceable(Map) {}

assert(MyMap.prototype.emplace);
```

### EmplaceableMap

`Map` with [Emplaceable](#emplaceable) implementation.

```ts
import { EmplaceableMap } from "https://deno.land/x/upsert/mod.ts";
import {
  assert,
  assertInstanceOf,
} from "https://deno.land/std/testing/asserts.ts";

const map = new EmplaceableMap<string, number>();

assertInstanceOf(map, Map);
assert(map.emplace);
```

### EmplaceableWeakMap

`WeakMap` with [Emplaceable](#emplaceable) implementation.

```ts
import { EmplaceableWeakMap } from "https://deno.land/x/upsert/mod.ts";
import {
  assert,
  assertInstanceOf,
} from "https://deno.land/std/testing/asserts.ts";

const weakMap = new EmplaceableWeakMap();

assertInstanceOf(weakMap, WeakMap);
assert(weakMap.emplace);
```

### Polyfill

Polyfill affects the global object. You must be very careful when using it.

```ts
import "https://deno.land/x/upsert/polyfill.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(Map.prototype.emplace);
assert(WeakMap.prototype.emplace);
```

## API

See [deno doc](https://deno.land/x/upsert?doc) for all APIs.

## Contributing

See [contributing](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2023 Tomoki Miyauchi
