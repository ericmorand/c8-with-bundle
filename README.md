# C8 With Bundle

A project to check how C8 behaves with bundles.

## Usage

### Build the test suite

```shell
npm run build:test
```

### Check the coverage using C8

```shell
npm run c8
```

### Check the coverage using Monocart Coverage Reports

```shell
npm run mcr
```

### Check the coverage from a sub-directory

```shell
cd src/test
npx mcr ts-node index.ts
```