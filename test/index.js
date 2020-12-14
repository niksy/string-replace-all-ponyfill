import assert from 'assert';
import replaceAll from '../index';

before(function () {
	window.fixture.load('/test/fixtures/index.html');
});

after(function () {
	window.fixture.cleanup();
});

it('replaces all occurences of string', function () {
	assert.equal(replaceAll('abcabc', 'a', 'z'), 'zbczbc');
	assert.equal(
		replaceAll('q=query+string+parameters', '+', ' '),
		'q=query string parameters'
	);
});

it('handles non-primitive replacer', function () {
	assert.equal(replaceAll('foo', 'o', {}), 'f[object Object][object Object]');
});

it('handles non-primitive search value', function () {
	assert.equal(replaceAll('[object Object]x[object Object]', {}, 'y'), 'yxy');
	const object = {};
	assert.equal(replaceAll('[object Object]', object, 'a'), 'a');
});

it('handles string replacement patterns', function () {
	assert.equal(replaceAll('origami', 'i', 'a$&b'), 'oraibgamaib');
});

it('works with a functional replacer', function () {
	const resultOne = replaceAll('origami', 'a', (search, index, string) => {
		assert.equal(search, 'a');
		assert.equal(index, 4);
		assert.equal(string, 'origami');
		return 'o';
	});
	assert.equal(resultOne, 'origomi');

	const resultTwo = replaceAll('abba', 'b', (search, index, string) => {
		assert.equal(search, 'b');
		assert.ok([1, 2].includes(index));
		assert.equal(string, 'abba');
		return 'c';
	});
	assert.equal(resultTwo, 'acca');
});

it('replaces with `undefined` if replacer is not given', function () {
	assert.equal(replaceAll('origami', 'a'), 'origundefinedmi');
	assert.equal(replaceAll('aba', 'b'), 'aundefineda');
});

it('replaces each code unit in a multi character string when an empty string is given as replacement', function () {
	assert.equal(replaceAll('origami', '', '_'), '_o_r_i_g_a_m_i_');
});

it('replaces each code unit in a single character string when an empty string is given as replacement', function () {
	assert.equal(replaceAll('x', '', '_'), '_x_');
});

it('replaces each code unit when an empty RegExp is given as replacement', function () {
	assert.equal(replaceAll('xxx', /(?:)/g, '_'), '_x_x_x_');
});

it('works if search value is a RegExp with a global flag', function () {
	assert.equal(
		replaceAll('origami.origami.origami', /\./g, 'fox'),
		'origamifoxorigamifoxorigami'
	);
	assert.equal(replaceAll('aa /./g /./g aa', /./g, 'z'), 'zzzzzzzzzzzzzzz');
	assert.equal(
		replaceAll('aa /./gi /./gi aa', /./gi, 'z'),
		'zzzzzzzzzzzzzzzzz'
	);
	assert.equal(replaceAll('b.b.b.b.b', /\./g, 'a'), 'babababab');
});

it('throws a TypeError if search value is a RegExp without a global flag', function () {
	/* eslint-disable no-undefined */
	assert.throws(function () {
		replaceAll('origami.origami.origami', /\./, 'fox');
	}, TypeError);
	assert.throws(() => replaceAll(null, 'a', 'b'), TypeError);
	assert.throws(() => replaceAll(undefined, 'a', 'b'), TypeError);
	assert.throws(() => replaceAll({}, 'bject', 'lolo'), TypeError);
});

it('matches `String.prototype.replace` with a global RegExp functionality when used with same arguments', function () {
	assert.equal(replaceAll('abcabc', /a/g, 'z'), 'abcabc'.replace(/a/g, 'z'));
});
