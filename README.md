# `nodejs-tests-example` [![CI][ci-img]][ci] [![Lint][lint-img]][lint]

[ci]: https://github.com/paulo-ferraz-oliveira/nodejs-tests-example/actions/workflows/ci.yml
[ci-img]: https://github.com/paulo-ferraz-oliveira/nodejs-tests-example/actions/workflows/ci.yml/badge.svg
[lint]: https://github.com/paulo-ferraz-oliveira/nodejs-tests-example/actions/workflows/lint.yml
[lint-img]: https://github.com/paulo-ferraz-oliveira/nodejs-tests-example/actions/workflows/lint.yml/badge.svg

This repository serves as a showcase for <https://github.com/paulo-ferraz-oliveira/nodejs-tests>.

I wanted something simple, but also useful, to test it with, so I implemented a
basic PubSub object, with interface taking inspiration from Node.js' `EventEmitter`.

Check the [tests](tests/) folder for a peek at how to use `nodejs-tests`, or read its
[README](https://github.com/paulo-ferraz-oliveira/nodejs-tests) for more.

## The example

An example run on this repository, via `npm run tests` yields the following output

```text
✗ npm run test

> test
> node test/pubsub.test.js

===> Running suites...

%%% suite pubsub: ......

Failed 0 test(s). Passed 6 test(s).
```

## The project

### Changelog

There is no usable changelog.

### Code of Conduct

There is no explicit code of conduct. Be kind!

### Contributing

At this moment we're not accepting contributions.

### License

License information can be found inside [LICENSE](https://github.com/paulo-ferraz-oliveira/nodejs-tests-example/blob/main/LICENSE.md).

### Security

There's no security policy in place.
