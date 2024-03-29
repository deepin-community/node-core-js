import Symbol from 'core-js-pure/es/symbol';
import cooked from 'core-js-pure/full/string/cooked';

QUnit.test('String.cooked', assert => {
  assert.isFunction(cooked);
  assert.arity(cooked, 1);
  assert.name(cooked, 'cooked');
  assert.same(cooked(['Hi\\n', '!'], 'Bob'), 'Hi\\nBob!', 'template is an array');
  assert.same(cooked('test', 0, 1, 2), 't0e1s2t', 'template is a string');
  assert.same(cooked('test', 0), 't0est', 'lacks substituting');

  if (typeof Symbol == 'function' && !Symbol.sham) {
    assert.throws(() => cooked([Symbol()]), TypeError, 'throws on symbol #1');
    assert.throws(() => cooked('test', Symbol()), TypeError, 'throws on symbol #2');
  }

  assert.throws(() => cooked([undefined]), TypeError);
  assert.throws(() => cooked(null), TypeError);
});
