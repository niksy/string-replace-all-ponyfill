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
export default function ponyfill(stringToReplace, searchValue, replaceValue) {
	if (typeof stringToReplace !== 'string') {
		throw new TypeError('Expected a string');
	}

	if (searchValue instanceof RegExp) {
		const { global: globalFlag } = searchValue;
		if (!globalFlag) {
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

export const preferNative = (string, ...arguments_) => {
	if (typeof String.prototype.replaceAll !== 'undefined') {
		return string.replaceAll(...arguments_);
	}
	/* istanbul ignore next */
	return ponyfill(string, ...arguments_);
};
