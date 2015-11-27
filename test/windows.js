import test from 'tape';

import {boxcar, triang, parzen, bohman, blackman, nuttall, blackmanharris, flattop, bartlett, hann as hanning, barthann, hamming, cosine} from '../src/windows.js';


test('boxcar', (t) => {
  t.deepEqual(boxcar(10), [1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
  t.end()
});

test('triang', (t) => {
  t.deepEqual(triang(4), [ 0.25, 0.75, 0.75, 0.25 ])
  t.deepEqual(triang(4, false), [ 1/3, 2/3, 1, 2/3 ])
  t.deepEqual(triang(3), [ 0.5, 1, 0.5 ])
  t.deepEqual(triang(3, false), [ 0.5, 1, 0.5 ])
  t.end()
});

test('parzen', (t) => {
  t.deepEqual(parzen(4), [ 0.03125, 0.71875, 0.71875, 0.03125 ])
  t.deepEqual(parzen(4, false), [ 0.01599999999999999, 0.42399999999999993, 1, 0.42399999999999993 ])
  t.deepEqual(parzen(3), [ 0.0740740740740741, 1, 0.0740740740740741 ])
  t.deepEqual(parzen(3, false), [ 0.0740740740740741, 1, 0.0740740740740741 ])
  t.end()
})

test('bohman', (t) => {
  t.deepEqual(bohman(4), [  0, 0.6089977810442295, 0.6089977810442295, 0])
  t.deepEqual(bohman(4, false), [ 0, 0.31830988618379075, 1, 0.31830988618379075 ])
  t.deepEqual(bohman(3), [ 0, 1, 0  ])
  t.deepEqual(bohman(3, false), [ 0, 1, 0  ])
  t.end()
});

test('blackman', (t) => {
  t.deepEqual(blackman(4), [ -1.3877787807814457e-17, 0.6299999999999999, 0.6300000000000002, -1.3877787807814457e-17 ])
  t.deepEqual(blackman(4, false), [ -1.3877787807814457e-17, 0.3399999999999999, 0.9999999999999999, 0.3400000000000001 ])
  t.deepEqual(blackman(3), [ -1.3877787807814457e-17, 0.9999999999999999, -1.3877787807814457e-17 ])
  t.deepEqual(blackman(3, false), [  -1.3877787807814457e-17, 0.9999999999999999, -1.3877787807814457e-17 ])
  t.end()
});

test('nuttall', (t) => {
  t.deepEqual(nuttall(4), [ 0.0003628000000000381, 0.5292297999999999, 0.5292298000000004, 0.0003628000000000381 ])
  t.deepEqual(nuttall(4, false), [ 0.0003628000000000381, 0.22698239999999995, 1, 0.2269824000000001 ])
  t.deepEqual(nuttall(3), [0.0003628000000000381, 1, 0.0003628000000000381 ])
  t.deepEqual(nuttall(3, false), [ 0.0003628000000000381, 1, 0.0003628000000000381])
  t.end()
});

test('blackmanharris', (t) => {
  t.deepEqual(blackmanharris(4), [0.000060000000000001025, 0.5205749999999999, 0.5205750000000002, 0.000060000000000001025])
  t.deepEqual(blackmanharris(4, false), [ 0.000060000000000001025, 0.21746999999999997, 1, 0.21747000000000014])
  t.deepEqual(blackmanharris(3), [ 0.000060000000000001025, 1, 0.000060000000000001025 ])
  t.deepEqual(blackmanharris(3, false), [ 0.000060000000000001025, 1, 0.000060000000000001025 ])
  t.end()
});

test('flattop', (t) => {
  t.deepEqual(flattop(4), [0.001000000000000053, 0.1974999999999998, 0.1975000000000004, 0.001000000000000053 ])
  t.deepEqual(flattop(4, false), [0.001000000000000053, -0.05560000000000001, 1.0002, -0.05559999999999997 ])
  t.deepEqual(flattop(3), [ 0.001000000000000053, 1.0002, 0.001000000000000053 ])
  t.deepEqual(flattop(3, false), [ 0.001000000000000053, 1.0002, 0.001000000000000053 ])
  t.end()
});

test('bartlett', (t) => {
  t.deepEqual(bartlett(4), [ 0, 0.6666666666666666, 0.6666666666666667, 0  ])
  t.deepEqual(bartlett(4, false), [  0, 0.5, 1, 0.5])
  t.deepEqual(bartlett(3), [ 0, 1, 0 ])
  t.deepEqual(bartlett(3, false), [ 0, 1, 0 ])
  t.end()
});

test('hanning', (t) => {
  t.deepEqual(hanning(4), [ 0, 0.7499999999999999, 0.7500000000000002, 0 ])
  t.deepEqual(hanning(4, false), [ 0, 0.49999999999999994, 1, 0.5000000000000001 ])
  t.deepEqual(hanning(3), [ 0, 1, 0 ])
  t.deepEqual(hanning(3, false), [ 0, 1, 0 ])
  t.end()
});

test('barthann', (t) => {
  t.deepEqual(barthann(4), [ 0, 0.73, 0.7300000000000002, 0 ])
  t.deepEqual(barthann(4, false), [  0, 0.5, 1, 0.5 ])
  t.deepEqual(barthann(3), [  0, 1, 0 ])
  t.deepEqual(barthann(3, false), [ 0, 1, 0 ])
  t.end()
});

test('hamming', (t) => {
  t.deepEqual(hamming(4), [ 0.08000000000000002, 0.7699999999999999, 0.7700000000000002, 0.08000000000000002 ])
  t.deepEqual(hamming(4, false), [ 0.08000000000000002, 0.54, 1, 0.5400000000000001 ])
  t.deepEqual(hamming(3), [ 0.08000000000000002, 1, 0.08000000000000002 ])
  t.deepEqual(hamming(3, false), [ 0.08000000000000002, 1, 0.08000000000000002 ])
  t.end()
});

test('cosine', (t) => {
  t.deepEqual(cosine(4), [ 0.3826834323650898, 0.9238795325112867, 0.9238795325112867, 0.3826834323650899 ])
  t.deepEqual(cosine(4, false), [ 0.3090169943749474, 0.8090169943749475, 1, 0.8090169943749475])
  t.deepEqual(cosine(3), [  0.49999999999999994, 1, 0.5000000000000003 ])
  t.deepEqual(cosine(3, false), [ 0.49999999999999994, 1, 0.5000000000000003 ])
  t.end()
});
