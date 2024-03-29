import { createIterator } from '../helpers/helpers';
import { STRICT_THIS } from '../helpers/constants';

QUnit.test('AsyncIterator#filter', assert => {
  assert.expect(18);
  const async = assert.async();
  const { filter } = AsyncIterator.prototype;

  assert.isFunction(filter);
  assert.arity(filter, 1);
  assert.name(filter, 'filter');
  assert.looksNative(filter);
  assert.nonEnumerable(AsyncIterator.prototype, 'filter');

  filter.call(createIterator([1, 2, 3]), it => it % 2).toArray().then(it => {
    assert.arrayEqual(it, [1, 3], 'basic functionality');
    return filter.call(createIterator([1]), function (arg, counter) {
      assert.same(this, STRICT_THIS, 'this');
      assert.same(arguments.length, 2, 'arguments length');
      assert.same(arg, 1, 'argument');
      assert.same(counter, 0, 'counter');
    }).toArray();
  }).then(() => {
    return filter.call(createIterator([1]), () => { throw 42; }).toArray();
  }).catch(error => {
    assert.same(error, 42, 'rejection on a callback error');
  }).then(() => async());

  assert.throws(() => filter.call(undefined, () => { /* empty */ }), TypeError);
  assert.throws(() => filter.call(null, () => { /* empty */ }), TypeError);
  assert.throws(() => filter.call({}, () => { /* empty */ }), TypeError);
  assert.throws(() => filter.call([], () => { /* empty */ }), TypeError);
  assert.throws(() => filter.call(createIterator([1]), undefined), TypeError);
  assert.throws(() => filter.call(createIterator([1]), null), TypeError);
  assert.throws(() => filter.call(createIterator([1]), {}), TypeError);
});
