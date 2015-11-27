'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cosine = exports.hamming = exports.barthann = exports.hanning = exports.hann = exports.bartlett = exports.flattop = exports.blackmanharris = exports.nuttall = exports.blackman = exports.bohman = exports.parzen = exports.triang = exports.boxcar = undefined;

var _utils = require('./utils.js');

// code from scipy.signal.windows.py

/**
 * Boxcar or rectangular window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function boxcar(M) {
    var sym = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    return new Array(M).fill(1);
}

/**
 * Triangular window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function triang(M) {
    var sym = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var n = (0, _utils.range)(1, Math.floor((M + 1) / 2) + 1);
    var w = [];
    if (M % 2 == 0) {
        w = n.map(function (x) {
            return (2 * x - 1.0) / M;
        });
        var w2 = w.slice().reverse();
        w = w.concat(w2);
    } else {
        w = n.map(function (x) {
            return 2 * x / (M + 1.0);
        });
        var w2 = w.slice().reverse();
        w2.shift();
        w = w.concat(w2);
    }
    return w;
}

/**
 * Parzen window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function parzen(M) {
    var sym = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var n = (0, _utils.range)(-(M - 1) / 2.0, (M - 1) / 2.0 + 0.5, 1);
    var na = n.filter(function (x) {
        return x < -(M - 1) / 4.0;
    });
    var nb = n.filter(function (x) {
        return Math.abs(x) <= (M - 1) / 4.0;
    });
    var wa = na.map(function (x) {
        return 2 * Math.pow(1 - Math.abs(x) / (M / 2.0), 3.0);
    });
    var wb = nb.map(function (x) {
        return 1 - 6 * Math.pow(Math.abs(x) / (M / 2.0), 2.0) + 6 * Math.pow(Math.abs(x) / (M / 2.0), 3.0);
    });
    return [].concat(wa, wb, wa.slice().reverse());
}

/**
 * Bohman window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function bohman(M) {
    var sym = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var n = (0, _utils.linspace)(-1, 1, M).slice(1, -1);
    n = n.map(function (x) {
        return Math.abs(x);
    });
    var w = n.map(function (x) {
        return (1 - x) * Math.cos(Math.PI * x) + 1 / Math.PI * Math.sin(Math.PI * x);
    });
    w = [].concat([0], w, [0]);
    return w;
}

/**
 * Blackman window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function blackman(M) {
    var sym = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var n = (0, _utils.range)(0, M);
    var w = n.map(function (x) {
        return 0.42 - 0.5 * Math.cos(2.0 * Math.PI * x / (M - 1)) + 0.08 * Math.cos(4.0 * Math.PI * x / (M - 1));
    });
    return w;
}

/**
 * Minimum 4-term Blackman-Harris window according to Nuttall
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function nuttall(M) {
    var sym = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var a = [0.3635819, 0.4891775, 0.1365995, 0.0106411];
    var n = (0, _utils.range)(0, M);
    var fac = n.map(function (x) {
        return x * 2 * Math.PI / (M - 1.0);
    });
    var w = fac.map(function (x) {
        return a[0] - a[1] * Math.cos(x) + a[2] * Math.cos(2 * x) - a[3] * Math.cos(3 * x);
    });
    return w;
}

/**
 * Minimum 4-term Blackman-Harris window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function blackmanharris(M) {
    var sym = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var a = [0.35875, 0.48829, 0.14128, 0.01168];
    var n = (0, _utils.range)(0, M);
    var fac = n.map(function (x) {
        return x * 2 * Math.PI / (M - 1.0);
    });
    var w = fac.map(function (x) {
        return a[0] - a[1] * Math.cos(x) + a[2] * Math.cos(2 * x) - a[3] * Math.cos(3 * x);
    });
    return w;
}

/**
 * flat top window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function flattop(M) {
    var sym = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var a = [0.2156, 0.4160, 0.2781, 0.0836, 0.0069];
    var n = (0, _utils.range)(0, M);
    var fac = n.map(function (x) {
        return x * 2 * Math.PI / (M - 1.0);
    });
    var w = fac.map(function (x) {
        return a[0] - a[1] * Math.cos(x) + a[2] * Math.cos(2 * x) - a[3] * Math.cos(3 * x) + a[4] * Math.cos(4 * x);
    });
    return w;
}

/**
 * Bartlett window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function bartlett(M) {
    var sym = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var n = (0, _utils.range)(0, M);
    var w = n.map(function (x) {
        if (x <= (M - 1) / 2) {
            return 2.0 * x / (M - 1);
        } else {
            return 2.0 - 2.0 * x / (M - 1);
        }
    });
    return w;
}

/**
 * Hann window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function hann(M) {
    var sym = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var n = (0, _utils.range)(0, M);
    var w = n.map(function (x) {
        return 0.5 - 0.5 * Math.cos(2.0 * Math.PI * x / (M - 1));
    });
    return w;
}

/**
 * Modified Bartlett-Hann window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function barthann(M) {
    var sym = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var n = (0, _utils.range)(0, M);
    var fac = n.map(function (x) {
        return Math.abs(x / (M - 1.0) - 0.5);
    });
    var w = fac.map(function (x) {
        return 0.62 - 0.48 * x + 0.38 * Math.cos(2 * Math.PI * x);
    });
    return w;
}

/**
 * Hamming window
 * @param {number} M - Number of points in the output window
 * @param {boolean} [sym=true] - Whether the window is symmetric
 * @return {array} The window, with the maximum value normalized to 1 (though the value 1 does not appear if `M` is even and `sym` is True).
 */
function hamming(M) {
    var sym = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var n = (0, _utils.range)(0, M);
    var w = n.map(function (x) {
        return 0.54 - 0.46 * Math.cos(2.0 * Math.PI * x / (M - 1));
    });
    return w;
}

// @TODO
// function kaiser(M, beta, sym=true){
// }

function gaussian(M, std) {
    var sym = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

    var n = (0, _utils.range)(0, M);
    n = n.map(function (x) {
        return x - (M - 1.0) / 2.0;
    });
    var sig2 = 2 * Math.pow(std, 2);
    var w = n.map(function (x) {
        return Math.exp(-Math.pow(x, 2) / sig2);
    });
    return w;
}

function general_gaussian(M, p, sig) {
    var sym = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

    var n = (0, _utils.range)(0, M);
    n = n.map(function (x) {
        return x - (M - 1.0) / 2.0;
    });
    var w = n.map(function (x) {
        return Math.exp(-0.5 * Math.pow(Math.abs(x / sig), 2 * p));
    });
    return w;
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
function cosine(M) {
    var sym = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var n = (0, _utils.range)(0, M);
    var w = n.map(function (x) {
        return Math.sin(Math.PI / M * (x + 0.5));
    });
    return w;
}

exports.boxcar = boxcar = (0, _utils.trivialCaseDescorator)(boxcar);
exports.triang = triang = (0, _utils.trivialCaseDescorator)((0, _utils.windowWrapperDecorator)(triang));
exports.parzen = parzen = (0, _utils.trivialCaseDescorator)((0, _utils.windowWrapperDecorator)(parzen));
exports.bohman = bohman = (0, _utils.trivialCaseDescorator)((0, _utils.windowWrapperDecorator)(bohman));
exports.blackman = blackman = (0, _utils.trivialCaseDescorator)((0, _utils.windowWrapperDecorator)(blackman));
exports.nuttall = nuttall = (0, _utils.trivialCaseDescorator)((0, _utils.windowWrapperDecorator)(nuttall));
exports.blackmanharris = blackmanharris = (0, _utils.trivialCaseDescorator)((0, _utils.windowWrapperDecorator)(blackmanharris));
exports.flattop = flattop = (0, _utils.trivialCaseDescorator)((0, _utils.windowWrapperDecorator)(flattop));
exports.bartlett = bartlett = (0, _utils.trivialCaseDescorator)((0, _utils.windowWrapperDecorator)(bartlett));
exports.hanning = exports.hann = hann = (0, _utils.trivialCaseDescorator)((0, _utils.windowWrapperDecorator)(hann));
exports.barthann = barthann = (0, _utils.trivialCaseDescorator)((0, _utils.windowWrapperDecorator)(barthann));
exports.hamming = hamming = (0, _utils.trivialCaseDescorator)((0, _utils.windowWrapperDecorator)(hamming));
exports.cosine = cosine = (0, _utils.trivialCaseDescorator)((0, _utils.windowWrapperDecorator)(cosine));

exports.boxcar = boxcar;
exports.triang = triang;
exports.parzen = parzen;
exports.bohman = bohman;
exports.blackman = blackman;
exports.nuttall = nuttall;
exports.blackmanharris = blackmanharris;
exports.flattop = flattop;
exports.bartlett = bartlett;
exports.hann = hann;
exports.hanning = hann;
exports.barthann = barthann;
exports.hamming = hamming;
exports.cosine = cosine;