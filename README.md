# string-replace-all-ponyfill

[![Build Status][ci-img]][ci]
[![BrowserStack Status][browserstack-img]][browserstack]

[`String.prototype.replaceAll`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)
ponyfill.

> The `replaceAll()` method returns a new string with all matches of a pattern
> replaced by a replacement. The pattern can be a string or a `RegExp`, and the
> replacement can be a string or a function to be called for each match.

## Install

```sh
npm install string-replace-all-ponyfill --save
```

## Usage

```js
import replaceAll from 'string-replace-all-ponyfill';

replaceAll('abba', 'b', 'c'); // acca
```

## API

### replaceAll(stringToReplace, searchValue, replaceValue)

Returns: `string`

#### stringToReplace

Type: `string`

String to replace.

#### searchValue

Type: `string|RegExp`

If `string`, `stringToReplace` will be searched for this value.

If `RegExp`, the matches are replaced with `replaceValue` or the value returned
by the specified function. A `RegExp` without the global flag will throw a
`TypeError`.

##### replaceValue

Type: `string|Function`

If `string`, `searchValue` will be replaced with this value. A number of
[special replacement patterns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll#Specifying_a_string_as_a_parameter)
are supported.

If `Function`, it’s invoked to create the new substring which is used to replace
the matches of `searchValue` parameter. See
[arguments for the function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll#Specifying_a_function_as_a_parameter)).

## Browser support

Tested in IE11+ and all modern browsers.

## Acknowledgments

-   [StackOverflow discussion for legacy browser support](https://stackoverflow.com/a/1144788/178058)

## Test

Test suite is taken and modified from following packages:

-   [polyfill-library](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/String/prototype/replaceAll/tests.js)
-   [es-shims](https://github.com/es-shims/String.prototype.replaceAll/blob/main/test/tests.js)
-   [core-js](https://github.com/zloirock/core-js/blob/master/tests/pure/es.string.replace-all.js)

For automated tests, run `npm run test:automated` (append `:watch` for watcher
support).

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

<!-- prettier-ignore-start -->

[ci]: https://travis-ci.com/niksy/string-replace-all-ponyfill
[ci-img]: https://travis-ci.com/niksy/string-replace-all-ponyfill.svg?branch=master
[browserstack]: https://www.browserstack.com/
[browserstack-img]: https://www.browserstack.com/automate/badge.svg?badge_key=YWxRMDN6MGFhYWdJMzlRSTBOVXMxSFllQytwWGcyb3ROM3YrSFh2cUNpOD0tLTM0c2RvVEZvSjJ0THhTcjRYSFBqZ1E9PQ==--90d6150a6b3215895fe99e8441c93a87da12a8b5

<!-- prettier-ignore-end -->
