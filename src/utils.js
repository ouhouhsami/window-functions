/** @private */
export function trivialCaseDescorator(f) {
  return function(M, sym = true) {
    if (M <= 0) return []
    if (M == 1) return [1]
    return f(M, sym)
  }
}

/** @private */
export function windowWrapperDecorator(f) {
  return function(M, sym = true) {
    let odd = M % 2
    if (!sym && !odd) M = M + 1
    let w = f(M, sym)
    if (!sym && !odd) w.pop()
    return w
  }
}

/**
 * range
 * @param {number} start - Starting number of the sequence.
 * @param {number} [stop=undefined] - Generate numbers up to, but not including this number.
 * @param {number} [step=1] - Difference between each number in the sequence.
 * @return {array} Array of evenly spaced values.
 */
export function range(start = 0, stop = undefined, step = 1) {
  let result = []
  if (stop == undefined) stop = start
  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return result
  }
  let i
  for (i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i)
  }
  return result
}

/**
 * linspace
 * @param {number} start - Starting number of the sequence.
 * @param {number} [stop=undefined] - Generate numbers up to, but not including this number.
 * @param {number} [num=undefined] - Number of samples to generate
 * @return {array} Array of num equally spaced samples in the closed interval [start, stop] 
 */
export function linspace(start, stop, num = undefined) {
  if (typeof num == undefined) num = Math.max(Math.round(stop - start) + 1, 1)
  if (num < 2) {
    return num === 1 ? [start] : []
  }
  let i, ret = Array(num)
  num--
  for (i = num; i >= 0; i--) {
    ret[i] = (i * stop + (num - i) * start) / num
  }
  return ret
}