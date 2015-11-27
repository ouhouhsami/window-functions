"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trivialCaseDescorator = trivialCaseDescorator;
exports.windowWrapperDecorator = windowWrapperDecorator;
exports.range = range;
exports.linspace = linspace;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/** @private */
function trivialCaseDescorator(f) {
  return function (M) {
    var sym = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    if (M <= 0) return [];
    if (M == 1) return [1];
    return f(M, sym);
  };
}

/** @private */
function windowWrapperDecorator(f) {
  return function (M) {
    var sym = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var odd = M % 2;
    if (!sym && !odd) M = M + 1;
    var w = f(M, sym);
    if (!sym && !odd) w.pop();
    return w;
  };
}

/**
 * range
 * @param {number} start - Starting number of the sequence.
 * @param {number} [stop=undefined] - Generate numbers up to, but not including this number.
 * @param {number} [step=1] - Difference between each number in the sequence.
 * @return {array} Array of evenly spaced values.
 */
function range() {
  var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var stop = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
  var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

  var result = [];
  if (stop == undefined) stop = start;
  if (step > 0 && start >= stop || step < 0 && start <= stop) {
    return result;
  }
  var i = undefined;
  for (i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * linspace
 * @param {number} start - Starting number of the sequence.
 * @param {number} [stop=undefined] - Generate numbers up to, but not including this number.
 * @param {number} [num=undefined] - Number of samples to generate
 * @return {array} Array of num equally spaced samples in the closed interval [start, stop] 
 */
function linspace(start, stop) {
  var num = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

  if ((typeof num === "undefined" ? "undefined" : _typeof(num)) == undefined) num = Math.max(Math.round(stop - start) + 1, 1);
  if (num < 2) {
    return num === 1 ? [start] : [];
  }
  var i = undefined,
      ret = Array(num);
  num--;
  for (i = num; i >= 0; i--) {
    ret[i] = (i * stop + (num - i) * start) / num;
  }
  return ret;
}