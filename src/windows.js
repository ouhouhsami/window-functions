import { trivialCaseDescorator, windowWrapperDecorator, range, linspace } from './utils.js'

// code from scipy.signal.windows.py

/**
 * Boxcar or rectangular window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function boxcar(M, sym = true) {
    return new Array(M).fill(1)
}

/**
 * Triangular window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function triang(M, sym = true) {
    let n = range(1, Math.floor((M + 1) / 2) + 1)
    let w = []
    if (M % 2 == 0) {
        w = n.map((x) => (2 * x - 1.0) / M)
        let w2 = w.slice().reverse()
        w = w.concat(w2)
    } else {
        w = n.map((x) => (2 * x / (M + 1.0)))
        let w2 = w.slice().reverse()
        w2.shift()
        w = w.concat(w2)
    }
    return w
}

/**
 * Parzen window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function parzen(M, sym = true) {
    let n = range(-(M - 1) / 2.0, (M - 1) / 2.0 + 0.5, 1)
    let na = n.filter((x) => {
        return x < -(M - 1) / 4.0
    })
    let nb = n.filter((x) => {
        return Math.abs(x) <= (M - 1) / 4.0
    })
    let wa = na.map((x) => {
        return 2 * Math.pow((1 - Math.abs(x) / (M / 2.0)), 3.0)
    })
    let wb = nb.map((x) => {
        return (1 - 6 * Math.pow((Math.abs(x) / (M / 2.0)), 2.0) + 6 * Math.pow((Math.abs(x) / (M / 2.0)), 3.0))
    })
    return [].concat(wa, wb, wa.slice().reverse())
}

/**
 * Bohman window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function bohman(M, sym = true) {
    let n = linspace(-1, 1, M).slice(1, -1)
    n = n.map((x) => {
        return Math.abs(x)
    })
    let w = n.map((x) => {
        return (1 - x) * Math.cos(Math.PI * x) + 1 / Math.PI * Math.sin(Math.PI * x)
    })
    w = [].concat([0], w, [0])
    return w
}

/**
 * Blackman window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function blackman(M, sym = true) {
    let n = range(0, M)
    let w = n.map((x) => {
        return (0.42 - 0.5 * Math.cos(2.0 * Math.PI * x / (M - 1)) +
            0.08 * Math.cos(4.0 * Math.PI * x / (M - 1)))
    })
    return w
}

/**
 * Minimum 4-term Blackman-Harris window according to Nuttall
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function nuttall(M, sym = true) {
    let a = [0.3635819, 0.4891775, 0.1365995, 0.0106411]
    let n = range(0, M)
    let fac = n.map((x) => {
        return x * 2 * Math.PI / (M - 1.0)
    })
    let w = fac.map((x) => {
        return (a[0] - a[1] * Math.cos(x) +
            a[2] * Math.cos(2 * x) - a[3] * Math.cos(3 * x))
    })
    return w
}

/**
 * Minimum 4-term Blackman-Harris window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function blackmanharris(M, sym = true) {
    let a = [0.35875, 0.48829, 0.14128, 0.01168]
    let n = range(0, M)
    let fac = n.map((x) => {
        return x * 2 * Math.PI / (M - 1.0)
    })
    let w = fac.map((x) => {
        return (a[0] - a[1] * Math.cos(x) +
            a[2] * Math.cos(2 * x) - a[3] * Math.cos(3 * x))
    })
    return w
}

/**
 * flat top window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function flattop(M, sym = true) {
    let a = [0.2156, 0.4160, 0.2781, 0.0836, 0.0069]
    let n = range(0, M)
    let fac = n.map((x) => {
        return x * 2 * Math.PI / (M - 1.0)
    })
    let w = fac.map((x) => {
        return (a[0] - a[1] * Math.cos(x) +
            a[2] * Math.cos(2 * x) - a[3] * Math.cos(3 * x) +
            a[4] * Math.cos(4 * x))
    })
    return w
}

/**
 * Bartlett window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function bartlett(M, sym = true) {
    let n = range(0, M)
    let w = n.map((x) => {
        if (x <= (M - 1) / 2) {
            return 2.0 * x / (M - 1)
        } else {
            return 2.0 - 2.0 * x / (M - 1)
        }
    })
    return w
}

/**
 * Hann window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function hann(M, sym = true) {
    let n = range(0, M)
    let w = n.map((x) => {
        return 0.5 - 0.5 * Math.cos(2.0 * Math.PI * x / (M - 1))
    })
    return w
}

/**
 * Modified Bartlett-Hann window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function barthann(M, sym = true) {
    let n = range(0, M)
    let fac = n.map((x) => {
        return Math.abs(x / (M - 1.0) - 0.5)
    })
    let w = fac.map((x) => {
        return 0.62 - 0.48 * x + 0.38 * Math.cos(2 * Math.PI * x)
    })
    return w
}

/**
 * Hamming window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function hamming(M, sym = true) {
    let n = range(0, M)
    let w = n.map((x) => {
        return 0.54 - 0.46 * Math.cos(2.0 * Math.PI * x / (M - 1))
    })
    return w
}

// @TODO
// function kaiser(M, beta, sym=true){
// }

function gaussian(M, std, sym = true) {
    let n = range(0, M)
    n = n.map((x) => {
        return x - (M - 1.0) / 2.0
    })
    let sig2 = 2 * Math.pow(std, 2)
    let w = n.map((x) => {
        return Math.exp(-Math.pow(x, 2) / sig2)
    })
    return w
}

function general_gaussian(M, p, sig, sym = true) {
    let n = range(0, M)
    n = n.map((x) => {
        return x - (M - 1.0) / 2.0
    })
    let w = n.map((x) => {
        return Math.exp(-0.5 * Math.pow(Math.abs(x / sig), (2 * p)))
    })
    return w
}

// @TODO
// function chebwin(M, at, sym=true){
// }
// @TODO
// function slepian(M, width, sym=true){
// }

/**
 * Cosine shape window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function cosine(M, sym = true) {
    let n = range(0, M)
    let w = n.map((x) => {
        return Math.sin(Math.PI / M * (x + 0.5))
    })
    return w
}

boxcar = trivialCaseDescorator(boxcar)
triang = trivialCaseDescorator(windowWrapperDecorator(triang))
parzen = trivialCaseDescorator(windowWrapperDecorator(parzen))
bohman = trivialCaseDescorator(windowWrapperDecorator(bohman))
blackman = trivialCaseDescorator(windowWrapperDecorator(blackman))
nuttall = trivialCaseDescorator(windowWrapperDecorator(nuttall))
blackmanharris = trivialCaseDescorator(windowWrapperDecorator(blackmanharris))
flattop = trivialCaseDescorator(windowWrapperDecorator(flattop))
bartlett = trivialCaseDescorator(windowWrapperDecorator(bartlett))
hann = trivialCaseDescorator(windowWrapperDecorator(hann))
barthann = trivialCaseDescorator(windowWrapperDecorator(barthann))
hamming = trivialCaseDescorator(windowWrapperDecorator(hamming))
cosine = trivialCaseDescorator(windowWrapperDecorator(cosine))

export {
    boxcar, triang, parzen, bohman, blackman, nuttall, blackmanharris, flattop, bartlett, hann, hann as hanning, barthann, hamming, cosine
}