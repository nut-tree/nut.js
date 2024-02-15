# nut.js TypeScript sample

nut.js is written in TypeScript and thus fully supports TypeScript

- [Setup](#setup)

## Setup

Install TypeScript in your project.

```shell script
npm i typescript ts-node
```

Afterwards, initialize a new TypeScript project:

```shell script
npx tsc --init
```

## Write your test

Let's create a simple demo test:

```ts
import { Region, screen } from "@nut-tree/nut-js";

(async () => {
	await screen.highlight(new Region(100, 200, 300, 400));
})();
```

## Run

```shell script
npx ts-node index.ts
```