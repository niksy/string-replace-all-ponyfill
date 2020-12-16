import escapeStringRegexp from 'escape-string-regexp';

const emptyStringRegex = /(?:)/g;

/**
 * @param  {string} stringToReplace
 * @param  {string|RegExp} searchValue
 * @param  {string|Function} replaceValue
 *
 * @returns {string}
 * @throws {TypeError}
 */
export default function (stringToReplace, searchValue, replaceValue) {
	if (typeof stringToReplace !== 'string') {
		throw new TypeError('Expected a string');
	}

	if (searchValue instanceof RegExp) {
		const { flags } = searchValue;
		if (flags.indexOf('g') === -1) {
			throw new TypeError(
				'`String.prototype.replaceAll` ponyfill called with a non-global RegExp argument'
			);
		}
		return stringToReplace.replace(searchValue, replaceValue);
	}

	if (searchValue === '') {
		const value = stringToReplace.replace(emptyStringRegex, replaceValue);
		emptyStringRegex.lastIndex = 0;
		return value;
	}

	const stringToFind =
		typeof searchValue !== 'string' ? String(searchValue) : searchValue;

	return stringToReplace.replace(
		new RegExp(escapeStringRegexp(stringToFind), 'g'),
		replaceValue
	);
}
