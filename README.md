# upsert

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/upsert)
[![deno doc](https://doc.deno.land/badge.svg)](https://deno.land/x/upsert/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/TomokiMiyauci/upsert)](https://github.com/TomokiMiyauci/upsert/releases)
[![codecov](https://codecov.io/github/TomokiMiyauci/upsert/branch/main/graph/badge.svg)](https://codecov.io/gh/TomokiMiyauci/upsert)
[![GitHub](https://img.shields.io/github/license/TomokiMiyauci/upsert)](https://github.com/TomokiMiyauci/upsert/blob/main/LICENSE)

[![test](https://github.com/TomokiMiyauci/upsert/actions/workflows/test.yaml/badge.svg)](https://github.com/TomokiMiyauci/upsert/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@miyauci/upsert.png?mini=true)](https://nodei.co/npm/@miyauci/upsert/)

Maps for emplace, TC39
[proposal-upsert](https://github.com/tc39/proposal-upsert) implementation.

## Entrypoint

This project provides ponyfill and polyfill.

Polyfill has a side effect, so its endpoints are isolated.

The entrypoint of each are as follows:

| Type     | Entrypoint    |
| -------- | ------------- |
| Ponyfill | `mod.ts`      |
| Polyfill | `polyfill.ts` |

## Emplace

Add a value to a map like if it does not already have something at `key`, and
will also update an existing value at `key`.

```ts
import { emplace } from "https://deno.land/x/upsert@$VERSION/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const map: Map<string, number>;
declare const key: string;

const result = emplace(map, key, {
  insert: () => 0,
  update: (existing) => existing + 1,
});
assert(map.has(key));
```

## Emplaceable

Mixin for [emplace](#emplace).

```ts
import { Emplaceable } from "https://deno.land/x/upsert@$VERSION/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

class MyMap extends Emplaceable(Map) {}

assert(new MyMap().emplace);
```

## EmplaceableMap

`Map` with [Emplaceable](#emplaceable) implementation.

```ts
import { EmplaceableMap } from "https://deno.land/x/upsert@$VERSION/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

const map = new EmplaceableMap<string, number>();
declare const key: string;

map.emplace(key, {
  insert: () => 0,
  update: (existing) => existing + 1,
});

assert(map.has(key));
```

## EmplaceableWeakMap

`WeakMap` with [Emplaceable](#emplaceable) implementation.

```ts
import { EmplaceableWeakMap } from "https://deno.land/x/upsert@$VERSION/mod.ts";

const weakMap = new EmplaceableWeakMap();
```

## Polyfill

Polyfill affects the global object. You must be very careful when using it.

```ts
import "https://deno.land/x/upsert@$VERSION/polyfill.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(Map.prototype.emplace);
assert(WeakMap.prototype.emplace);
```

## API

See [deno doc](https://deno.land/x/upsert/mod.ts) for all APIs.

## License

Copyright © 2023-present [Tomoki Miyauchi](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
