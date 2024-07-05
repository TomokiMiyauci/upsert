# upsert

[![JSR](https://jsr.io/badges/@miyauci/upsert)](https://jsr.io/@miyauci/upsert)
[![codecov](https://codecov.io/gh/TomokiMiyauci/upsert/graph/badge.svg?token=W5tklO7mHB)](https://codecov.io/gh/TomokiMiyauci/upsert)
[![GitHub](https://img.shields.io/github/license/TomokiMiyauci/upsert)](https://github.com/TomokiMiyauci/upsert/blob/main/LICENSE)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)

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

deno:

```bash
deno add @miyauci/upsert
```

node:

```bash
npx jsr add @miyauci/upsert
```

## Usage

Add a value to a map like if it does not already have something at `key`, and
will also update an existing value at `key`.

```ts
import { emplace } from "@miyauci/upsert";
import { assert } from "@std/assert";

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
import { emplace } from "@miyauci/upsert";
import { assert } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";

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
import { insert } from "@miyauci/upsert";
import { assertEquals } from "@std/assert";

declare const key: string;
declare const value: number;
const map = new Map<typeof key, typeof value>();

insert(map, key, () => value);

assertEquals(map, new Map([[key, value]]));
```

### Update

Update the entry if the key exists.

```ts
import { emplace } from "@miyauci/upsert";
import { assert } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";

declare const map: Map<string, number>;
declare const key: string;

const result = emplace(map, key, { update: (existing) => ++existing });

assertType<IsExact<typeof result, number | undefined>>(true);
```

#### Just update

If only updating is required, `update` is available.

```ts
import { update } from "@miyauci/upsert";
import { assertEquals } from "@std/assert";

declare const key: string;
const map = new Map([[key, 0]]);

update(map, key, (existing) => ++existing);

assertEquals(map, new Map([[key, 1]]));
```

### Emplaceable

Mixin for `emplace`.

```ts
import { emplaceable } from "@miyauci/upsert";
import { assert } from "@std/assert";

class MyMap extends emplaceable(Map) {}

assert(MyMap.prototype.emplace);
```

### EmplaceableMap

`Map` with [Emplaceable](#emplaceable) implementation.

```ts
import { EmplaceableMap } from "@miyauci/upsert";
import { assert, assertInstanceOf } from "@std/assert";

const map = new EmplaceableMap<string, number>();

assertInstanceOf(map, Map);
assert(map.emplace);
```

### EmplaceableWeakMap

`WeakMap` with [Emplaceable](#emplaceable) implementation.

```ts
import { EmplaceableWeakMap } from "@miyauci/upsert";
import { assert, assertInstanceOf } from "@std/assert";

const weakMap = new EmplaceableWeakMap();

assertInstanceOf(weakMap, WeakMap);
assert(weakMap.emplace);
```

### Polyfill

Polyfill affects the global object. You must be very careful when using it.

```ts
import "@miyauci/upsert/polyfill";
import { assert } from "@std/assert";

assert(Map.prototype.emplace);
assert(WeakMap.prototype.emplace);
```

## API

See [deno doc](https://deno.land/x/upsert?doc) for all APIs.

## Contributing

See [contributing](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2023 Tomoki Miyauchi
