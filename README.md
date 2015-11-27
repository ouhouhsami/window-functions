# Window functions in JavaScript

> boxcar, triang, parzen, bohman, blackman, nuttall, blackmanharris, flattop, bartlett, hanning, barthann, hamming and cosine windows (translate to JavaScript from Python scipy/signal/windows.py package)

## Install

```
npm install ouhouhsami/window-functions

```

## Use

es6

```
import {triang} from 'window-functions/src/windows'

const w = triang(3)
console.log(w)
// return [0, 1, 0]

```

es5 / commonjs
```
var triang = require('window-functions/src/windows').triang
var w = triang(3)
console.log(w)
// return [0, 1, 0]
```

browser version (load windows.min.js)
```
var triang = windows.triang
var w = triang(3)
console.log(w)
// return [0, 1, 0]

```

## Contribute

PR are welcome as long as they pass unit-tests or provide ones when adding features.