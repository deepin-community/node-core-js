import { deepEqual } from 'assert/strict';
import targetsParser from 'core-js-compat/targets-parser.js';

deepEqual(targetsParser('ie 11, chrome 56, ios 12.2'), new Map([
  ['chrome', '56'],
  ['ie', '11'],
  ['ios', '12.2-12.5'],
]), 'browserslist');

deepEqual(targetsParser({
  ie: 11,
  chrome: 56,
  ios: '12.2',
}), new Map([
  ['chrome', '56'],
  ['ie', '11'],
  ['ios', '12.2'],
]), 'targets object');

deepEqual(targetsParser({ browsers: 'ie 11, chrome 56, ios_saf 12.2' }), new Map([
  ['chrome', '56'],
  ['ie', '11'],
  ['ios', '12.2-12.5'],
]), 'targets.browsers');

deepEqual(targetsParser({ esmodules: true }), new Map([
  ['android', '61'],
  ['bun', '0.1.1'],
  ['chrome', '61'],
  ['deno', '1.0'],
  ['edge', '16'],
  ['firefox', '60'],
  ['ios', '10.3'],
  ['node', '13.2'],
  ['oculus', '4.0'],
  ['opera', '48'],
  ['opera_mobile', '45'],
  ['safari', '10.1'],
  ['samsung', '8.0'],
]), 'targets.esmodules');

deepEqual(targetsParser({ node: 'current' }), new Map([
  ['node', process.versions.node],
]), 'targets.node: current');

deepEqual(targetsParser({ node: '14.0' }), new Map([
  ['node', '14.0'],
]), 'targets.node: version');

deepEqual(targetsParser({
  ie_mob: 11,
  chromeandroid: 56,
  and_ff: 60,
  ios_saf: '12.2',
  op_mob: 40,
  op_mini: 1,
  random: 42,
}), new Map([
  ['chrome', '56'],
  ['firefox', '60'],
  ['ie', '11'],
  ['ios', '12.2'],
  ['opera_mobile', '40'],
]), 'normalization');

deepEqual(targetsParser({
  esmodules: true,
  node: '12.0',
  browsers: 'edge 13, safari 5.1, ios 13',
  android: '4.2',
  chrome: 77,
  electron: 1,
  ie: 8,
  samsung: 4,
  ie_mob: 11,
  chromeandroid: 56,
  and_ff: 65,
  ios_saf: '12.2',
  op_mob: 40,
  random: 42,
}), new Map([
  ['android', '4.2'],
  ['bun', '0.1.1'],
  ['chrome', '56'],
  ['deno', '1.0'],
  ['edge', '13'],
  ['electron', '1'],
  ['firefox', '60'],
  ['ie', '8'],
  ['ios', '10.3'],
  ['node', '12.0'],
  ['oculus', '4.0'],
  ['opera', '48'],
  ['opera_mobile', '40'],
  ['safari', '5.1'],
  ['samsung', '4'],
]), 'mixed');

echo(chalk.green('targets parser tested'));
