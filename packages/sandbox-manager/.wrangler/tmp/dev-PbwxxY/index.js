var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .wrangler/tmp/bundle-EBHB28/checked-fetch.js
function checkURL(request2, init2) {
  const url = request2 instanceof URL ? request2 : new URL(
    (typeof request2 === "string" ? new Request(request2, init2) : request2).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-EBHB28/checked-fetch.js"() {
    "use strict";
    urls = /* @__PURE__ */ new Set();
    __name(checkURL, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request2, init2] = argArray;
        checkURL(request2, init2);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// .wrangler/tmp/bundle-EBHB28/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init2) {
  const request2 = new Request(input, init2);
  request2.headers.delete("CF-Connecting-IP");
  return request2;
}
var init_strip_cf_connecting_ip_header = __esm({
  ".wrangler/tmp/bundle-EBHB28/strip-cf-connecting-ip-header.js"() {
    "use strict";
    __name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        return Reflect.apply(target, thisArg, [
          stripCfConnectingIPHeader.apply(null, argArray)
        ]);
      }
    });
  }
});

// ../../node_modules/.pnpm/@esbuild-plugins+node-globals-polyfill@0.2.3_esbuild@0.17.19/node_modules/@esbuild-plugins/node-globals-polyfill/process.js
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(fun, 0);
  }
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e2) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e3) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    return clearTimeout(marker);
  }
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e2) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e3) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      args[i2 - 1] = arguments[i2];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
function noop() {
}
function binding(name) {
  throw new Error("process.binding is not supported");
}
function cwd() {
  return "/";
}
function chdir(dir) {
  throw new Error("process.chdir is not supported");
}
function umask() {
  return 0;
}
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance2) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}
function uptime() {
  var currentTime = /* @__PURE__ */ new Date();
  var dif = currentTime - startTime;
  return dif / 1e3;
}
var cachedSetTimeout, cachedClearTimeout, queue, draining, currentQueue, queueIndex, title, platform, browser, env, argv, version, versions, release, config, on, addListener, once, off, removeListener, removeAllListeners, emit, performance2, performanceNow, startTime, process, defines;
var init_process = __esm({
  "../../node_modules/.pnpm/@esbuild-plugins+node-globals-polyfill@0.2.3_esbuild@0.17.19/node_modules/@esbuild-plugins/node-globals-polyfill/process.js"() {
    __name(defaultSetTimout, "defaultSetTimout");
    __name(defaultClearTimeout, "defaultClearTimeout");
    cachedSetTimeout = defaultSetTimout;
    cachedClearTimeout = defaultClearTimeout;
    if (typeof globalThis.setTimeout === "function") {
      cachedSetTimeout = setTimeout;
    }
    if (typeof globalThis.clearTimeout === "function") {
      cachedClearTimeout = clearTimeout;
    }
    __name(runTimeout, "runTimeout");
    __name(runClearTimeout, "runClearTimeout");
    queue = [];
    draining = false;
    queueIndex = -1;
    __name(cleanUpNextTick, "cleanUpNextTick");
    __name(drainQueue, "drainQueue");
    __name(nextTick, "nextTick");
    __name(Item, "Item");
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    title = "browser";
    platform = "browser";
    browser = true;
    env = {};
    argv = [];
    version = "";
    versions = {};
    release = {};
    config = {};
    __name(noop, "noop");
    on = noop;
    addListener = noop;
    once = noop;
    off = noop;
    removeListener = noop;
    removeAllListeners = noop;
    emit = noop;
    __name(binding, "binding");
    __name(cwd, "cwd");
    __name(chdir, "chdir");
    __name(umask, "umask");
    performance2 = globalThis.performance || {};
    performanceNow = performance2.now || performance2.mozNow || performance2.msNow || performance2.oNow || performance2.webkitNow || function() {
      return (/* @__PURE__ */ new Date()).getTime();
    };
    __name(hrtime, "hrtime");
    startTime = /* @__PURE__ */ new Date();
    __name(uptime, "uptime");
    process = {
      nextTick,
      title,
      browser,
      env,
      argv,
      version,
      versions,
      on,
      addListener,
      once,
      off,
      removeListener,
      removeAllListeners,
      emit,
      binding,
      cwd,
      chdir,
      umask,
      hrtime,
      platform,
      release,
      config,
      uptime
    };
    defines = {};
    Object.keys(defines).forEach((key) => {
      const segs = key.split(".");
      let target = process;
      for (let i2 = 0; i2 < segs.length; i2++) {
        const seg = segs[i2];
        if (i2 === segs.length - 1) {
          target[seg] = defines[key];
        } else {
          target = target[seg] || (target[seg] = {});
        }
      }
    });
  }
});

// ../../node_modules/.pnpm/@esbuild-plugins+node-globals-polyfill@0.2.3_esbuild@0.17.19/node_modules/@esbuild-plugins/node-globals-polyfill/Buffer.js
function init() {
  inited = true;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i2 = 0, len = code.length; i2 < len; ++i2) {
    lookup[i2] = code[i2];
    revLookup[code.charCodeAt(i2)] = i2;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
}
function base64toByteArray(b64) {
  if (!inited) {
    init();
  }
  var i2, j, l, tmp, placeHolders, arr;
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
  arr = new Arr(len * 3 / 4 - placeHolders);
  l = placeHolders > 0 ? len - 4 : len;
  var L = 0;
  for (i2 = 0, j = 0; i2 < l; i2 += 4, j += 3) {
    tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
    arr[L++] = tmp >> 16 & 255;
    arr[L++] = tmp >> 8 & 255;
    arr[L++] = tmp & 255;
  }
  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
    arr[L++] = tmp & 255;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
    arr[L++] = tmp >> 8 & 255;
    arr[L++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i2 = start; i2 < end; i2 += 3) {
    tmp = (uint8[i2] << 16) + (uint8[i2 + 1] << 8) + uint8[i2 + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function base64fromByteArray(uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var output = "";
  var parts = [];
  var maxChunkLength = 16383;
  for (var i2 = 0, len2 = len - extraBytes; i2 < len2; i2 += maxChunkLength) {
    parts.push(
      encodeChunk(
        uint8,
        i2,
        i2 + maxChunkLength > len2 ? len2 : i2 + maxChunkLength
      )
    );
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 63];
    output += "==";
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 63];
    output += lookup[tmp << 2 & 63];
    output += "=";
  }
  parts.push(output);
  return parts.join("");
}
function kMaxLength() {
  return Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError("Invalid typed array length");
  }
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    that = new Uint8Array(length);
    that.__proto__ = Buffer2.prototype;
  } else {
    if (that === null) {
      that = new Buffer2(length);
    }
    that.length = length;
  }
  return that;
}
function Buffer2(arg, encodingOrOffset, length) {
  if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2)) {
    return new Buffer2(arg, encodingOrOffset, length);
  }
  if (typeof arg === "number") {
    if (typeof encodingOrOffset === "string") {
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}
function from(that, value, encodingOrOffset, length) {
  if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }
  if (typeof value === "string") {
    return fromString(that, value, encodingOrOffset);
  }
  return fromObject(that, value);
}
function assertSize(size) {
  if (typeof size !== "number") {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}
function alloc(that, size, fill2, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill2 !== void 0) {
    return typeof encoding === "string" ? createBuffer(that, size).fill(fill2, encoding) : createBuffer(that, size).fill(fill2);
  }
  return createBuffer(that, size);
}
function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer2.TYPED_ARRAY_SUPPORT) {
    for (var i2 = 0; i2 < size; ++i2) {
      that[i2] = 0;
    }
  }
  return that;
}
function fromString(that, string, encoding) {
  if (typeof encoding !== "string" || encoding === "") {
    encoding = "utf8";
  }
  if (!Buffer2.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }
  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);
  if (actual !== length) {
    that = that.slice(0, actual);
  }
  return that;
}
function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i2 = 0; i2 < length; i2 += 1) {
    that[i2] = array[i2] & 255;
  }
  return that;
}
function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength;
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError("'offset' is out of bounds");
  }
  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError("'length' is out of bounds");
  }
  if (byteOffset === void 0 && length === void 0) {
    array = new Uint8Array(array);
  } else if (length === void 0) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    that = array;
    that.__proto__ = Buffer2.prototype;
  } else {
    that = fromArrayLike(that, array);
  }
  return that;
}
function fromObject(that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);
    if (that.length === 0) {
      return that;
    }
    obj.copy(that, 0, 0, len);
    return that;
  }
  if (obj) {
    if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
      if (typeof obj.length !== "number" || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }
  throw new TypeError(
    "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
  );
}
function checked(length) {
  if (length >= kMaxLength()) {
    throw new RangeError(
      "Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes"
    );
  }
  return length | 0;
}
function internalIsBuffer(b) {
  return !!(b != null && b._isBuffer);
}
function byteLength(string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== "string") {
    string = "" + string;
  }
  var len = string.length;
  if (len === 0)
    return 0;
  var loweredCase = false;
  for (; ; ) {
    switch (encoding) {
      case "ascii":
      case "latin1":
      case "binary":
        return len;
      case "utf8":
      case "utf-8":
      case void 0:
        return utf8ToBytes(string).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return len * 2;
      case "hex":
        return len >>> 1;
      case "base64":
        return base64ToBytes(string).length;
      default:
        if (loweredCase)
          return utf8ToBytes(string).length;
        encoding = ("" + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
function slowToString(encoding, start, end) {
  var loweredCase = false;
  if (start === void 0 || start < 0) {
    start = 0;
  }
  if (start > this.length) {
    return "";
  }
  if (end === void 0 || end > this.length) {
    end = this.length;
  }
  if (end <= 0) {
    return "";
  }
  end >>>= 0;
  start >>>= 0;
  if (end <= start) {
    return "";
  }
  if (!encoding)
    encoding = "utf8";
  while (true) {
    switch (encoding) {
      case "hex":
        return hexSlice(this, start, end);
      case "utf8":
      case "utf-8":
        return utf8Slice(this, start, end);
      case "ascii":
        return asciiSlice(this, start, end);
      case "latin1":
      case "binary":
        return latin1Slice(this, start, end);
      case "base64":
        return base64Slice(this, start, end);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return utf16leSlice(this, start, end);
      default:
        if (loweredCase)
          throw new TypeError("Unknown encoding: " + encoding);
        encoding = (encoding + "").toLowerCase();
        loweredCase = true;
    }
  }
}
function swap(b, n2, m) {
  var i2 = b[n2];
  b[n2] = b[m];
  b[m] = i2;
}
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  if (buffer.length === 0)
    return -1;
  if (typeof byteOffset === "string") {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 2147483647) {
    byteOffset = 2147483647;
  } else if (byteOffset < -2147483648) {
    byteOffset = -2147483648;
  }
  byteOffset = +byteOffset;
  if (isNaN(byteOffset)) {
    byteOffset = dir ? 0 : buffer.length - 1;
  }
  if (byteOffset < 0)
    byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir)
      return -1;
    else
      byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir)
      byteOffset = 0;
    else
      return -1;
  }
  if (typeof val === "string") {
    val = Buffer2.from(val, encoding);
  }
  if (internalIsBuffer(val)) {
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === "number") {
    val = val & 255;
    if (Buffer2.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(
          buffer,
          val,
          byteOffset
        );
      } else {
        return Uint8Array.prototype.lastIndexOf.call(
          buffer,
          val,
          byteOffset
        );
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }
  throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;
  if (encoding !== void 0) {
    encoding = String(encoding).toLowerCase();
    if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }
  function read(buf, i3) {
    if (indexSize === 1) {
      return buf[i3];
    } else {
      return buf.readUInt16BE(i3 * indexSize);
    }
  }
  __name(read, "read");
  var i2;
  if (dir) {
    var foundIndex = -1;
    for (i2 = byteOffset; i2 < arrLength; i2++) {
      if (read(arr, i2) === read(val, foundIndex === -1 ? 0 : i2 - foundIndex)) {
        if (foundIndex === -1)
          foundIndex = i2;
        if (i2 - foundIndex + 1 === valLength)
          return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1)
          i2 -= i2 - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength)
      byteOffset = arrLength - valLength;
    for (i2 = byteOffset; i2 >= 0; i2--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i2 + j) !== read(val, j)) {
          found = false;
          break;
        }
      }
      if (found)
        return i2;
    }
  }
  return -1;
}
function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }
  var strLen = string.length;
  if (strLen % 2 !== 0)
    throw new TypeError("Invalid hex string");
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i2 = 0; i2 < length; ++i2) {
    var parsed = parseInt(string.substr(i2 * 2, 2), 16);
    if (isNaN(parsed))
      return i2;
    buf[offset + i2] = parsed;
  }
  return i2;
}
function utf8Write(buf, string, offset, length) {
  return blitBuffer(
    utf8ToBytes(string, buf.length - offset),
    buf,
    offset,
    length
  );
}
function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}
function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
  return blitBuffer(
    utf16leToBytes(string, buf.length - offset),
    buf,
    offset,
    length
  );
}
function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64fromByteArray(buf);
  } else {
    return base64fromByteArray(buf.slice(start, end));
  }
}
function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i2 = start;
  while (i2 < end) {
    var firstByte = buf[i2];
    var codePoint = null;
    var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (i2 + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i2 + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i2 + 1];
          thirdByte = buf[i2 + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i2 + 1];
          thirdByte = buf[i2 + 2];
          fourthByte = buf[i2 + 3];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    res.push(codePoint);
    i2 += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  var res = "";
  var i2 = 0;
  while (i2 < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i2, i2 += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res;
}
function asciiSlice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i2 = start; i2 < end; ++i2) {
    ret += String.fromCharCode(buf[i2] & 127);
  }
  return ret;
}
function latin1Slice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i2 = start; i2 < end; ++i2) {
    ret += String.fromCharCode(buf[i2]);
  }
  return ret;
}
function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0)
    start = 0;
  if (!end || end < 0 || end > len)
    end = len;
  var out = "";
  for (var i2 = start; i2 < end; ++i2) {
    out += toHex(buf[i2]);
  }
  return out;
}
function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = "";
  for (var i2 = 0; i2 < bytes.length; i2 += 2) {
    res += String.fromCharCode(bytes[i2] + bytes[i2 + 1] * 256);
  }
  return res;
}
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0)
    throw new RangeError("offset is not uint");
  if (offset + ext > length)
    throw new RangeError("Trying to access beyond buffer length");
}
function checkInt(buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf))
    throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min)
    throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length)
    throw new RangeError("Index out of range");
}
function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0)
    value = 65535 + value + 1;
  for (var i2 = 0, j = Math.min(buf.length - offset, 2); i2 < j; ++i2) {
    buf[offset + i2] = (value & 255 << 8 * (littleEndian ? i2 : 1 - i2)) >>> (littleEndian ? i2 : 1 - i2) * 8;
  }
}
function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0)
    value = 4294967295 + value + 1;
  for (var i2 = 0, j = Math.min(buf.length - offset, 4); i2 < j; ++i2) {
    buf[offset + i2] = value >>> (littleEndian ? i2 : 3 - i2) * 8 & 255;
  }
}
function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length)
    throw new RangeError("Index out of range");
  if (offset < 0)
    throw new RangeError("Index out of range");
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(
      buf,
      value,
      offset,
      4,
      34028234663852886e22,
      -34028234663852886e22
    );
  }
  ieee754write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}
function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(
      buf,
      value,
      offset,
      8,
      17976931348623157e292,
      -17976931348623157e292
    );
  }
  ieee754write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}
function base64clean(str) {
  str = stringtrim(str).replace(INVALID_BASE64_RE, "");
  if (str.length < 2)
    return "";
  while (str.length % 4 !== 0) {
    str = str + "=";
  }
  return str;
}
function stringtrim(str) {
  if (str.trim)
    return str.trim();
  return str.replace(/^\s+|\s+$/g, "");
}
function toHex(n2) {
  if (n2 < 16)
    return "0" + n2.toString(16);
  return n2.toString(16);
}
function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];
  for (var i2 = 0; i2 < length; ++i2) {
    codePoint = string.charCodeAt(i2);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        } else if (i2 + 1 === length) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
        leadSurrogate = codePoint;
        continue;
      }
      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1)
        bytes.push(239, 191, 189);
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0)
        break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0)
        break;
      bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0)
        break;
      bytes.push(
        codePoint >> 12 | 224,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0)
        break;
      bytes.push(
        codePoint >> 18 | 240,
        codePoint >> 12 & 63 | 128,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else {
      throw new Error("Invalid code point");
    }
  }
  return bytes;
}
function asciiToBytes(str) {
  var byteArray = [];
  for (var i2 = 0; i2 < str.length; ++i2) {
    byteArray.push(str.charCodeAt(i2) & 255);
  }
  return byteArray;
}
function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i2 = 0; i2 < str.length; ++i2) {
    if ((units -= 2) < 0)
      break;
    c = str.charCodeAt(i2);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }
  return byteArray;
}
function base64ToBytes(str) {
  return base64toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
  for (var i2 = 0; i2 < length; ++i2) {
    if (i2 + offset >= dst.length || i2 >= src.length)
      break;
    dst[i2 + offset] = src[i2];
  }
  return i2;
}
function isnan(val) {
  return val !== val;
}
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
}
function isFastBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
}
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer(obj.slice(0, 0));
}
function ieee754read(buffer, offset, isLE, mLen, nBytes) {
  var e2, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i2 = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i2];
  i2 += d;
  e2 = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e2 = e2 * 256 + buffer[offset + i2], i2 += d, nBits -= 8) {
  }
  m = e2 & (1 << -nBits) - 1;
  e2 >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i2], i2 += d, nBits -= 8) {
  }
  if (e2 === 0) {
    e2 = 1 - eBias;
  } else if (e2 === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e2 = e2 - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e2 - mLen);
}
function ieee754write(buffer, value, offset, isLE, mLen, nBytes) {
  var e2, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i2 = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e2 = eMax;
  } else {
    e2 = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e2)) < 1) {
      e2--;
      c *= 2;
    }
    if (e2 + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e2++;
      c /= 2;
    }
    if (e2 + eBias >= eMax) {
      m = 0;
      e2 = eMax;
    } else if (e2 + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e2 = e2 + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e2 = 0;
    }
  }
  for (; mLen >= 8; buffer[offset + i2] = m & 255, i2 += d, m /= 256, mLen -= 8) {
  }
  e2 = e2 << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i2] = e2 & 255, i2 += d, e2 /= 256, eLen -= 8) {
  }
  buffer[offset + i2 - d] |= s * 128;
}
var lookup, revLookup, Arr, inited, MAX_ARGUMENTS_LENGTH, INVALID_BASE64_RE;
var init_Buffer = __esm({
  "../../node_modules/.pnpm/@esbuild-plugins+node-globals-polyfill@0.2.3_esbuild@0.17.19/node_modules/@esbuild-plugins/node-globals-polyfill/Buffer.js"() {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    lookup = [];
    revLookup = [];
    Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    inited = false;
    __name(init, "init");
    __name(base64toByteArray, "base64toByteArray");
    __name(tripletToBase64, "tripletToBase64");
    __name(encodeChunk, "encodeChunk");
    __name(base64fromByteArray, "base64fromByteArray");
    Buffer2.TYPED_ARRAY_SUPPORT = globalThis.TYPED_ARRAY_SUPPORT !== void 0 ? globalThis.TYPED_ARRAY_SUPPORT : true;
    __name(kMaxLength, "kMaxLength");
    __name(createBuffer, "createBuffer");
    __name(Buffer2, "Buffer");
    Buffer2.poolSize = 8192;
    Buffer2._augment = function(arr) {
      arr.__proto__ = Buffer2.prototype;
      return arr;
    };
    __name(from, "from");
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(null, value, encodingOrOffset, length);
    };
    Buffer2.kMaxLength = kMaxLength();
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      Buffer2.prototype.__proto__ = Uint8Array.prototype;
      Buffer2.__proto__ = Uint8Array;
      if (typeof Symbol !== "undefined" && Symbol.species && Buffer2[Symbol.species] === Buffer2) {
      }
    }
    __name(assertSize, "assertSize");
    __name(alloc, "alloc");
    Buffer2.alloc = function(size, fill2, encoding) {
      return alloc(null, size, fill2, encoding);
    };
    __name(allocUnsafe, "allocUnsafe");
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(null, size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(null, size);
    };
    __name(fromString, "fromString");
    __name(fromArrayLike, "fromArrayLike");
    __name(fromArrayBuffer, "fromArrayBuffer");
    __name(fromObject, "fromObject");
    __name(checked, "checked");
    Buffer2.isBuffer = isBuffer;
    __name(internalIsBuffer, "internalIsBuffer");
    Buffer2.compare = /* @__PURE__ */ __name(function compare(a2, b) {
      if (!internalIsBuffer(a2) || !internalIsBuffer(b)) {
        throw new TypeError("Arguments must be Buffers");
      }
      if (a2 === b)
        return 0;
      var x = a2.length;
      var y = b.length;
      for (var i2 = 0, len = Math.min(x, y); i2 < len; ++i2) {
        if (a2[i2] !== b[i2]) {
          x = a2[i2];
          y = b[i2];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    }, "compare");
    Buffer2.isEncoding = /* @__PURE__ */ __name(function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    }, "isEncoding");
    Buffer2.concat = /* @__PURE__ */ __name(function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      var i2;
      if (length === void 0) {
        length = 0;
        for (i2 = 0; i2 < list.length; ++i2) {
          length += list[i2].length;
        }
      }
      var buffer = Buffer2.allocUnsafe(length);
      var pos = 0;
      for (i2 = 0; i2 < list.length; ++i2) {
        var buf = list[i2];
        if (!internalIsBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        buf.copy(buffer, pos);
        pos += buf.length;
      }
      return buffer;
    }, "concat");
    __name(byteLength, "byteLength");
    Buffer2.byteLength = byteLength;
    __name(slowToString, "slowToString");
    Buffer2.prototype._isBuffer = true;
    __name(swap, "swap");
    Buffer2.prototype.swap16 = /* @__PURE__ */ __name(function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i2 = 0; i2 < len; i2 += 2) {
        swap(this, i2, i2 + 1);
      }
      return this;
    }, "swap16");
    Buffer2.prototype.swap32 = /* @__PURE__ */ __name(function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i2 = 0; i2 < len; i2 += 4) {
        swap(this, i2, i2 + 3);
        swap(this, i2 + 1, i2 + 2);
      }
      return this;
    }, "swap32");
    Buffer2.prototype.swap64 = /* @__PURE__ */ __name(function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i2 = 0; i2 < len; i2 += 8) {
        swap(this, i2, i2 + 7);
        swap(this, i2 + 1, i2 + 6);
        swap(this, i2 + 2, i2 + 5);
        swap(this, i2 + 3, i2 + 4);
      }
      return this;
    }, "swap64");
    Buffer2.prototype.toString = /* @__PURE__ */ __name(function toString() {
      var length = this.length | 0;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    }, "toString");
    Buffer2.prototype.equals = /* @__PURE__ */ __name(function equals(b) {
      if (!internalIsBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer2.compare(this, b) === 0;
    }, "equals");
    Buffer2.prototype.compare = /* @__PURE__ */ __name(function compare2(target, start, end, thisStart, thisEnd) {
      if (!internalIsBuffer(target)) {
        throw new TypeError("Argument must be a Buffer");
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i2 = 0; i2 < len; ++i2) {
        if (thisCopy[i2] !== targetCopy[i2]) {
          x = thisCopy[i2];
          y = targetCopy[i2];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    }, "compare");
    __name(bidirectionalIndexOf, "bidirectionalIndexOf");
    __name(arrayIndexOf, "arrayIndexOf");
    Buffer2.prototype.includes = /* @__PURE__ */ __name(function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    }, "includes");
    Buffer2.prototype.indexOf = /* @__PURE__ */ __name(function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    }, "indexOf");
    Buffer2.prototype.lastIndexOf = /* @__PURE__ */ __name(function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    }, "lastIndexOf");
    __name(hexWrite, "hexWrite");
    __name(utf8Write, "utf8Write");
    __name(asciiWrite, "asciiWrite");
    __name(latin1Write, "latin1Write");
    __name(base64Write, "base64Write");
    __name(ucs2Write, "ucs2Write");
    Buffer2.prototype.write = /* @__PURE__ */ __name(function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset | 0;
        if (isFinite(length)) {
          length = length | 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
            return asciiWrite(this, string, offset, length);
          case "latin1":
          case "binary":
            return latin1Write(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }, "write");
    Buffer2.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    }, "toJSON");
    __name(base64Slice, "base64Slice");
    __name(utf8Slice, "utf8Slice");
    MAX_ARGUMENTS_LENGTH = 4096;
    __name(decodeCodePointsArray, "decodeCodePointsArray");
    __name(asciiSlice, "asciiSlice");
    __name(latin1Slice, "latin1Slice");
    __name(hexSlice, "hexSlice");
    __name(utf16leSlice, "utf16leSlice");
    Buffer2.prototype.slice = /* @__PURE__ */ __name(function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      var newBuf;
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer2.prototype;
      } else {
        var sliceLen = end - start;
        newBuf = new Buffer2(sliceLen, void 0);
        for (var i2 = 0; i2 < sliceLen; ++i2) {
          newBuf[i2] = this[i2 + start];
        }
      }
      return newBuf;
    }, "slice");
    __name(checkOffset, "checkOffset");
    Buffer2.prototype.readUIntLE = /* @__PURE__ */ __name(function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i2 = 0;
      while (++i2 < byteLength2 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      return val;
    }, "readUIntLE");
    Buffer2.prototype.readUIntBE = /* @__PURE__ */ __name(function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      var val = this[offset + --byteLength2];
      var mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    }, "readUIntBE");
    Buffer2.prototype.readUInt8 = /* @__PURE__ */ __name(function readUInt8(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    }, "readUInt8");
    Buffer2.prototype.readUInt16LE = /* @__PURE__ */ __name(function readUInt16LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    }, "readUInt16LE");
    Buffer2.prototype.readUInt16BE = /* @__PURE__ */ __name(function readUInt16BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    }, "readUInt16BE");
    Buffer2.prototype.readUInt32LE = /* @__PURE__ */ __name(function readUInt32LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    }, "readUInt32LE");
    Buffer2.prototype.readUInt32BE = /* @__PURE__ */ __name(function readUInt32BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    }, "readUInt32BE");
    Buffer2.prototype.readIntLE = /* @__PURE__ */ __name(function readIntLE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i2 = 0;
      while (++i2 < byteLength2 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    }, "readIntLE");
    Buffer2.prototype.readIntBE = /* @__PURE__ */ __name(function readIntBE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var i2 = byteLength2;
      var mul = 1;
      var val = this[offset + --i2];
      while (i2 > 0 && (mul *= 256)) {
        val += this[offset + --i2] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    }, "readIntBE");
    Buffer2.prototype.readInt8 = /* @__PURE__ */ __name(function readInt8(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    }, "readInt8");
    Buffer2.prototype.readInt16LE = /* @__PURE__ */ __name(function readInt16LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    }, "readInt16LE");
    Buffer2.prototype.readInt16BE = /* @__PURE__ */ __name(function readInt16BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    }, "readInt16BE");
    Buffer2.prototype.readInt32LE = /* @__PURE__ */ __name(function readInt32LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    }, "readInt32LE");
    Buffer2.prototype.readInt32BE = /* @__PURE__ */ __name(function readInt32BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    }, "readInt32BE");
    Buffer2.prototype.readFloatLE = /* @__PURE__ */ __name(function readFloatLE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754read(this, offset, true, 23, 4);
    }, "readFloatLE");
    Buffer2.prototype.readFloatBE = /* @__PURE__ */ __name(function readFloatBE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754read(this, offset, false, 23, 4);
    }, "readFloatBE");
    Buffer2.prototype.readDoubleLE = /* @__PURE__ */ __name(function readDoubleLE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754read(this, offset, true, 52, 8);
    }, "readDoubleLE");
    Buffer2.prototype.readDoubleBE = /* @__PURE__ */ __name(function readDoubleBE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754read(this, offset, false, 52, 8);
    }, "readDoubleBE");
    __name(checkInt, "checkInt");
    Buffer2.prototype.writeUIntLE = /* @__PURE__ */ __name(function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1;
      var i2 = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength2 && (mul *= 256)) {
        this[offset + i2] = value / mul & 255;
      }
      return offset + byteLength2;
    }, "writeUIntLE");
    Buffer2.prototype.writeUIntBE = /* @__PURE__ */ __name(function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var i2 = byteLength2 - 1;
      var mul = 1;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        this[offset + i2] = value / mul & 255;
      }
      return offset + byteLength2;
    }, "writeUIntBE");
    Buffer2.prototype.writeUInt8 = /* @__PURE__ */ __name(function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      if (!Buffer2.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      this[offset] = value & 255;
      return offset + 1;
    }, "writeUInt8");
    __name(objectWriteUInt16, "objectWriteUInt16");
    Buffer2.prototype.writeUInt16LE = /* @__PURE__ */ __name(function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    }, "writeUInt16LE");
    Buffer2.prototype.writeUInt16BE = /* @__PURE__ */ __name(function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    }, "writeUInt16BE");
    __name(objectWriteUInt32, "objectWriteUInt32");
    Buffer2.prototype.writeUInt32LE = /* @__PURE__ */ __name(function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    }, "writeUInt32LE");
    Buffer2.prototype.writeUInt32BE = /* @__PURE__ */ __name(function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    }, "writeUInt32BE");
    Buffer2.prototype.writeIntLE = /* @__PURE__ */ __name(function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i2 = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 - 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    }, "writeIntLE");
    Buffer2.prototype.writeIntBE = /* @__PURE__ */ __name(function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i2 = byteLength2 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 + 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    }, "writeIntBE");
    Buffer2.prototype.writeInt8 = /* @__PURE__ */ __name(function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (!Buffer2.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    }, "writeInt8");
    Buffer2.prototype.writeInt16LE = /* @__PURE__ */ __name(function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    }, "writeInt16LE");
    Buffer2.prototype.writeInt16BE = /* @__PURE__ */ __name(function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    }, "writeInt16BE");
    Buffer2.prototype.writeInt32LE = /* @__PURE__ */ __name(function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    }, "writeInt32LE");
    Buffer2.prototype.writeInt32BE = /* @__PURE__ */ __name(function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    }, "writeInt32BE");
    __name(checkIEEE754, "checkIEEE754");
    __name(writeFloat, "writeFloat");
    Buffer2.prototype.writeFloatLE = /* @__PURE__ */ __name(function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    }, "writeFloatLE");
    Buffer2.prototype.writeFloatBE = /* @__PURE__ */ __name(function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    }, "writeFloatBE");
    __name(writeDouble, "writeDouble");
    Buffer2.prototype.writeDoubleLE = /* @__PURE__ */ __name(function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    }, "writeDoubleLE");
    Buffer2.prototype.writeDoubleBE = /* @__PURE__ */ __name(function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    }, "writeDoubleBE");
    Buffer2.prototype.copy = /* @__PURE__ */ __name(function copy(target, targetStart, start, end) {
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      var i2;
      if (this === target && start < targetStart && targetStart < end) {
        for (i2 = len - 1; i2 >= 0; --i2) {
          target[i2 + targetStart] = this[i2 + start];
        }
      } else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT) {
        for (i2 = 0; i2 < len; ++i2) {
          target[i2 + targetStart] = this[i2 + start];
        }
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, start + len),
          targetStart
        );
      }
      return len;
    }, "copy");
    Buffer2.prototype.fill = /* @__PURE__ */ __name(function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (code < 256) {
            val = code;
          }
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
      } else if (typeof val === "number") {
        val = val & 255;
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      var i2;
      if (typeof val === "number") {
        for (i2 = start; i2 < end; ++i2) {
          this[i2] = val;
        }
      } else {
        var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer2(val, encoding).toString());
        var len = bytes.length;
        for (i2 = 0; i2 < end - start; ++i2) {
          this[i2 + start] = bytes[i2 % len];
        }
      }
      return this;
    }, "fill");
    INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
    __name(base64clean, "base64clean");
    __name(stringtrim, "stringtrim");
    __name(toHex, "toHex");
    __name(utf8ToBytes, "utf8ToBytes");
    __name(asciiToBytes, "asciiToBytes");
    __name(utf16leToBytes, "utf16leToBytes");
    __name(base64ToBytes, "base64ToBytes");
    __name(blitBuffer, "blitBuffer");
    __name(isnan, "isnan");
    __name(isBuffer, "isBuffer");
    __name(isFastBuffer, "isFastBuffer");
    __name(isSlowBuffer, "isSlowBuffer");
    __name(ieee754read, "ieee754read");
    __name(ieee754write, "ieee754write");
  }
});

// ../../node_modules/.pnpm/@esbuild-plugins+node-globals-polyfill@0.2.3_esbuild@0.17.19/node_modules/@esbuild-plugins/node-globals-polyfill/_buffer.js
var init_buffer = __esm({
  "../../node_modules/.pnpm/@esbuild-plugins+node-globals-polyfill@0.2.3_esbuild@0.17.19/node_modules/@esbuild-plugins/node-globals-polyfill/_buffer.js"() {
    init_Buffer();
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
  }
});

// ../../node_modules/.pnpm/wrangler@3.114.17_@cloudflare+workers-types@4.20260116.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../node_modules/.pnpm/wrangler@3.114.17_@cloudflare+workers-types@4.20260116.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// ../../node_modules/.pnpm/universal-user-agent@6.0.1/node_modules/universal-user-agent/dist-node/index.js
var require_dist_node = __commonJS({
  "../../node_modules/.pnpm/universal-user-agent@6.0.1/node_modules/universal-user-agent/dist-node/index.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, "__esModule", { value: true });
    function getUserAgent6() {
      if (typeof navigator === "object" && "userAgent" in navigator) {
        return "Cloudflare-Workers";
      }
      if (typeof process === "object" && process.version !== void 0) {
        return `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`;
      }
      return "<environment undetectable>";
    }
    __name(getUserAgent6, "getUserAgent");
    exports.getUserAgent = getUserAgent6;
  }
});

// ../../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/lib/register.js
var require_register = __commonJS({
  "../../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/lib/register.js"(exports, module) {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    module.exports = register;
    function register(state, name, method, options) {
      if (typeof method !== "function") {
        throw new Error("method for before hook must be a function");
      }
      if (!options) {
        options = {};
      }
      if (Array.isArray(name)) {
        return name.reverse().reduce(function(callback, name2) {
          return register.bind(null, state, name2, callback, options);
        }, method)();
      }
      return Promise.resolve().then(function() {
        if (!state.registry[name]) {
          return method(options);
        }
        return state.registry[name].reduce(function(method2, registered) {
          return registered.hook.bind(null, method2, options);
        }, method)();
      });
    }
    __name(register, "register");
  }
});

// ../../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/lib/add.js
var require_add = __commonJS({
  "../../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/lib/add.js"(exports, module) {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    module.exports = addHook;
    function addHook(state, kind, name, hook5) {
      var orig = hook5;
      if (!state.registry[name]) {
        state.registry[name] = [];
      }
      if (kind === "before") {
        hook5 = /* @__PURE__ */ __name(function(method, options) {
          return Promise.resolve().then(orig.bind(null, options)).then(method.bind(null, options));
        }, "hook");
      }
      if (kind === "after") {
        hook5 = /* @__PURE__ */ __name(function(method, options) {
          var result;
          return Promise.resolve().then(method.bind(null, options)).then(function(result_) {
            result = result_;
            return orig(result, options);
          }).then(function() {
            return result;
          });
        }, "hook");
      }
      if (kind === "error") {
        hook5 = /* @__PURE__ */ __name(function(method, options) {
          return Promise.resolve().then(method.bind(null, options)).catch(function(error) {
            return orig(error, options);
          });
        }, "hook");
      }
      state.registry[name].push({
        hook: hook5,
        orig
      });
    }
    __name(addHook, "addHook");
  }
});

// ../../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/lib/remove.js
var require_remove = __commonJS({
  "../../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/lib/remove.js"(exports, module) {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    module.exports = removeHook;
    function removeHook(state, name, method) {
      if (!state.registry[name]) {
        return;
      }
      var index = state.registry[name].map(function(registered) {
        return registered.orig;
      }).indexOf(method);
      if (index === -1) {
        return;
      }
      state.registry[name].splice(index, 1);
    }
    __name(removeHook, "removeHook");
  }
});

// ../../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/index.js
var require_before_after_hook = __commonJS({
  "../../node_modules/.pnpm/before-after-hook@2.2.3/node_modules/before-after-hook/index.js"(exports, module) {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var register = require_register();
    var addHook = require_add();
    var removeHook = require_remove();
    var bind = Function.bind;
    var bindable = bind.bind(bind);
    function bindApi(hook5, state, name) {
      var removeHookRef = bindable(removeHook, null).apply(
        null,
        name ? [state, name] : [state]
      );
      hook5.api = { remove: removeHookRef };
      hook5.remove = removeHookRef;
      ["before", "error", "after", "wrap"].forEach(function(kind) {
        var args = name ? [state, kind, name] : [state, kind];
        hook5[kind] = hook5.api[kind] = bindable(addHook, null).apply(null, args);
      });
    }
    __name(bindApi, "bindApi");
    function HookSingular() {
      var singularHookName = "h";
      var singularHookState = {
        registry: {}
      };
      var singularHook = register.bind(null, singularHookState, singularHookName);
      bindApi(singularHook, singularHookState, singularHookName);
      return singularHook;
    }
    __name(HookSingular, "HookSingular");
    function HookCollection() {
      var state = {
        registry: {}
      };
      var hook5 = register.bind(null, state);
      bindApi(hook5, state);
      return hook5;
    }
    __name(HookCollection, "HookCollection");
    var collectionHookDeprecationMessageDisplayed = false;
    function Hook() {
      if (!collectionHookDeprecationMessageDisplayed) {
        console.warn(
          '[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4'
        );
        collectionHookDeprecationMessageDisplayed = true;
      }
      return HookCollection();
    }
    __name(Hook, "Hook");
    Hook.Singular = HookSingular.bind();
    Hook.Collection = HookCollection.bind();
    module.exports = Hook;
    module.exports.Hook = Hook;
    module.exports.Singular = Hook.Singular;
    module.exports.Collection = Hook.Collection;
  }
});

// ../../node_modules/.pnpm/@octokit+endpoint@9.0.6/node_modules/@octokit/endpoint/dist-web/index.js
function lowercaseKeys(object) {
  if (!object) {
    return {};
  }
  return Object.keys(object).reduce((newObj, key) => {
    newObj[key.toLowerCase()] = object[key];
    return newObj;
  }, {});
}
function isPlainObject(value) {
  if (typeof value !== "object" || value === null)
    return false;
  if (Object.prototype.toString.call(value) !== "[object Object]")
    return false;
  const proto = Object.getPrototypeOf(value);
  if (proto === null)
    return true;
  const Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && Ctor instanceof Ctor && Function.prototype.call(Ctor) === Function.prototype.call(value);
}
function mergeDeep(defaults, options) {
  const result = Object.assign({}, defaults);
  Object.keys(options).forEach((key) => {
    if (isPlainObject(options[key])) {
      if (!(key in defaults))
        Object.assign(result, { [key]: options[key] });
      else
        result[key] = mergeDeep(defaults[key], options[key]);
    } else {
      Object.assign(result, { [key]: options[key] });
    }
  });
  return result;
}
function removeUndefinedProperties(obj) {
  for (const key in obj) {
    if (obj[key] === void 0) {
      delete obj[key];
    }
  }
  return obj;
}
function merge(defaults, route, options) {
  if (typeof route === "string") {
    let [method, url] = route.split(" ");
    options = Object.assign(url ? { method, url } : { url: method }, options);
  } else {
    options = Object.assign({}, route);
  }
  options.headers = lowercaseKeys(options.headers);
  removeUndefinedProperties(options);
  removeUndefinedProperties(options.headers);
  const mergedOptions = mergeDeep(defaults || {}, options);
  if (options.url === "/graphql") {
    if (defaults && defaults.mediaType.previews?.length) {
      mergedOptions.mediaType.previews = defaults.mediaType.previews.filter(
        (preview) => !mergedOptions.mediaType.previews.includes(preview)
      ).concat(mergedOptions.mediaType.previews);
    }
    mergedOptions.mediaType.previews = (mergedOptions.mediaType.previews || []).map((preview) => preview.replace(/-preview/, ""));
  }
  return mergedOptions;
}
function addQueryParameters(url, parameters) {
  const separator = /\?/.test(url) ? "&" : "?";
  const names = Object.keys(parameters);
  if (names.length === 0) {
    return url;
  }
  return url + separator + names.map((name) => {
    if (name === "q") {
      return "q=" + parameters.q.split("+").map(encodeURIComponent).join("+");
    }
    return `${name}=${encodeURIComponent(parameters[name])}`;
  }).join("&");
}
function removeNonChars(variableName) {
  return variableName.replace(/(?:^\W+)|(?:(?<!\W)\W+$)/g, "").split(/,/);
}
function extractUrlVariableNames(url) {
  const matches = url.match(urlVariableRegex);
  if (!matches) {
    return [];
  }
  return matches.map(removeNonChars).reduce((a2, b) => a2.concat(b), []);
}
function omit(object, keysToOmit) {
  const result = { __proto__: null };
  for (const key of Object.keys(object)) {
    if (keysToOmit.indexOf(key) === -1) {
      result[key] = object[key];
    }
  }
  return result;
}
function encodeReserved(str) {
  return str.split(/(%[0-9A-Fa-f]{2})/g).map(function(part) {
    if (!/%[0-9A-Fa-f]/.test(part)) {
      part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
    }
    return part;
  }).join("");
}
function encodeUnreserved(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
function encodeValue(operator, value, key) {
  value = operator === "+" || operator === "#" ? encodeReserved(value) : encodeUnreserved(value);
  if (key) {
    return encodeUnreserved(key) + "=" + value;
  } else {
    return value;
  }
}
function isDefined(value) {
  return value !== void 0 && value !== null;
}
function isKeyOperator(operator) {
  return operator === ";" || operator === "&" || operator === "?";
}
function getValues(context, operator, key, modifier) {
  var value = context[key], result = [];
  if (isDefined(value) && value !== "") {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      value = value.toString();
      if (modifier && modifier !== "*") {
        value = value.substring(0, parseInt(modifier, 10));
      }
      result.push(
        encodeValue(operator, value, isKeyOperator(operator) ? key : "")
      );
    } else {
      if (modifier === "*") {
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function(value2) {
            result.push(
              encodeValue(operator, value2, isKeyOperator(operator) ? key : "")
            );
          });
        } else {
          Object.keys(value).forEach(function(k) {
            if (isDefined(value[k])) {
              result.push(encodeValue(operator, value[k], k));
            }
          });
        }
      } else {
        const tmp = [];
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function(value2) {
            tmp.push(encodeValue(operator, value2));
          });
        } else {
          Object.keys(value).forEach(function(k) {
            if (isDefined(value[k])) {
              tmp.push(encodeUnreserved(k));
              tmp.push(encodeValue(operator, value[k].toString()));
            }
          });
        }
        if (isKeyOperator(operator)) {
          result.push(encodeUnreserved(key) + "=" + tmp.join(","));
        } else if (tmp.length !== 0) {
          result.push(tmp.join(","));
        }
      }
    }
  } else {
    if (operator === ";") {
      if (isDefined(value)) {
        result.push(encodeUnreserved(key));
      }
    } else if (value === "" && (operator === "&" || operator === "?")) {
      result.push(encodeUnreserved(key) + "=");
    } else if (value === "") {
      result.push("");
    }
  }
  return result;
}
function parseUrl(template) {
  return {
    expand: expand.bind(null, template)
  };
}
function expand(template, context) {
  var operators = ["+", "#", ".", "/", ";", "?", "&"];
  template = template.replace(
    /\{([^\{\}]+)\}|([^\{\}]+)/g,
    function(_, expression, literal) {
      if (expression) {
        let operator = "";
        const values = [];
        if (operators.indexOf(expression.charAt(0)) !== -1) {
          operator = expression.charAt(0);
          expression = expression.substr(1);
        }
        expression.split(/,/g).forEach(function(variable) {
          var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
          values.push(getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
        });
        if (operator && operator !== "+") {
          var separator = ",";
          if (operator === "?") {
            separator = "&";
          } else if (operator !== "#") {
            separator = operator;
          }
          return (values.length !== 0 ? operator : "") + values.join(separator);
        } else {
          return values.join(",");
        }
      } else {
        return encodeReserved(literal);
      }
    }
  );
  if (template === "/") {
    return template;
  } else {
    return template.replace(/\/$/, "");
  }
}
function parse(options) {
  let method = options.method.toUpperCase();
  let url = (options.url || "/").replace(/:([a-z]\w+)/g, "{$1}");
  let headers = Object.assign({}, options.headers);
  let body;
  let parameters = omit(options, [
    "method",
    "baseUrl",
    "url",
    "headers",
    "request",
    "mediaType"
  ]);
  const urlVariableNames = extractUrlVariableNames(url);
  url = parseUrl(url).expand(parameters);
  if (!/^http/.test(url)) {
    url = options.baseUrl + url;
  }
  const omittedParameters = Object.keys(options).filter((option) => urlVariableNames.includes(option)).concat("baseUrl");
  const remainingParameters = omit(parameters, omittedParameters);
  const isBinaryRequest = /application\/octet-stream/i.test(headers.accept);
  if (!isBinaryRequest) {
    if (options.mediaType.format) {
      headers.accept = headers.accept.split(/,/).map(
        (format) => format.replace(
          /application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/,
          `application/vnd$1$2.${options.mediaType.format}`
        )
      ).join(",");
    }
    if (url.endsWith("/graphql")) {
      if (options.mediaType.previews?.length) {
        const previewsFromAcceptHeader = headers.accept.match(/(?<![\w-])[\w-]+(?=-preview)/g) || [];
        headers.accept = previewsFromAcceptHeader.concat(options.mediaType.previews).map((preview) => {
          const format = options.mediaType.format ? `.${options.mediaType.format}` : "+json";
          return `application/vnd.github.${preview}-preview${format}`;
        }).join(",");
      }
    }
  }
  if (["GET", "HEAD"].includes(method)) {
    url = addQueryParameters(url, remainingParameters);
  } else {
    if ("data" in remainingParameters) {
      body = remainingParameters.data;
    } else {
      if (Object.keys(remainingParameters).length) {
        body = remainingParameters;
      }
    }
  }
  if (!headers["content-type"] && typeof body !== "undefined") {
    headers["content-type"] = "application/json; charset=utf-8";
  }
  if (["PATCH", "PUT"].includes(method) && typeof body === "undefined") {
    body = "";
  }
  return Object.assign(
    { method, url, headers },
    typeof body !== "undefined" ? { body } : null,
    options.request ? { request: options.request } : null
  );
}
function endpointWithDefaults(defaults, route, options) {
  return parse(merge(defaults, route, options));
}
function withDefaults(oldDefaults, newDefaults) {
  const DEFAULTS2 = merge(oldDefaults, newDefaults);
  const endpoint2 = endpointWithDefaults.bind(null, DEFAULTS2);
  return Object.assign(endpoint2, {
    DEFAULTS: DEFAULTS2,
    defaults: withDefaults.bind(null, DEFAULTS2),
    merge: merge.bind(null, DEFAULTS2),
    parse
  });
}
var import_universal_user_agent, VERSION, userAgent, DEFAULTS, urlVariableRegex, endpoint;
var init_dist_web = __esm({
  "../../node_modules/.pnpm/@octokit+endpoint@9.0.6/node_modules/@octokit/endpoint/dist-web/index.js"() {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    import_universal_user_agent = __toESM(require_dist_node());
    VERSION = "9.0.6";
    userAgent = `octokit-endpoint.js/${VERSION} ${(0, import_universal_user_agent.getUserAgent)()}`;
    DEFAULTS = {
      method: "GET",
      baseUrl: "https://api.github.com",
      headers: {
        accept: "application/vnd.github.v3+json",
        "user-agent": userAgent
      },
      mediaType: {
        format: ""
      }
    };
    __name(lowercaseKeys, "lowercaseKeys");
    __name(isPlainObject, "isPlainObject");
    __name(mergeDeep, "mergeDeep");
    __name(removeUndefinedProperties, "removeUndefinedProperties");
    __name(merge, "merge");
    __name(addQueryParameters, "addQueryParameters");
    urlVariableRegex = /\{[^{}}]+\}/g;
    __name(removeNonChars, "removeNonChars");
    __name(extractUrlVariableNames, "extractUrlVariableNames");
    __name(omit, "omit");
    __name(encodeReserved, "encodeReserved");
    __name(encodeUnreserved, "encodeUnreserved");
    __name(encodeValue, "encodeValue");
    __name(isDefined, "isDefined");
    __name(isKeyOperator, "isKeyOperator");
    __name(getValues, "getValues");
    __name(parseUrl, "parseUrl");
    __name(expand, "expand");
    __name(parse, "parse");
    __name(endpointWithDefaults, "endpointWithDefaults");
    __name(withDefaults, "withDefaults");
    endpoint = withDefaults(null, DEFAULTS);
  }
});

// ../../node_modules/.pnpm/deprecation@2.3.1/node_modules/deprecation/dist-node/index.js
var require_dist_node2 = __commonJS({
  "../../node_modules/.pnpm/deprecation@2.3.1/node_modules/deprecation/dist-node/index.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Deprecation2 = class extends Error {
      constructor(message) {
        super(message);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
        this.name = "Deprecation";
      }
    };
    __name(Deprecation2, "Deprecation");
    exports.Deprecation = Deprecation2;
  }
});

// ../../node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "../../node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js"(exports, module) {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    module.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb)
        return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i2 = 0; i2 < args.length; i2++) {
          args[i2] = arguments[i2];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
      __name(wrapper, "wrapper");
    }
    __name(wrappy, "wrappy");
  }
});

// ../../node_modules/.pnpm/once@1.4.0/node_modules/once/once.js
var require_once = __commonJS({
  "../../node_modules/.pnpm/once@1.4.0/node_modules/once/once.js"(exports, module) {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var wrappy = require_wrappy();
    module.exports = wrappy(once3);
    module.exports.strict = wrappy(onceStrict);
    once3.proto = once3(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once3(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once3(fn) {
      var f = /* @__PURE__ */ __name(function() {
        if (f.called)
          return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
      }, "f");
      f.called = false;
      return f;
    }
    __name(once3, "once");
    function onceStrict(fn) {
      var f = /* @__PURE__ */ __name(function() {
        if (f.called)
          throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
      }, "f");
      var name = fn.name || "Function wrapped with `once`";
      f.onceError = name + " shouldn't be called more than once";
      f.called = false;
      return f;
    }
    __name(onceStrict, "onceStrict");
  }
});

// ../../node_modules/.pnpm/@octokit+request-error@5.1.1/node_modules/@octokit/request-error/dist-web/index.js
var dist_web_exports = {};
__export(dist_web_exports, {
  RequestError: () => RequestError
});
var import_deprecation, import_once, logOnceCode, logOnceHeaders, RequestError;
var init_dist_web2 = __esm({
  "../../node_modules/.pnpm/@octokit+request-error@5.1.1/node_modules/@octokit/request-error/dist-web/index.js"() {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    import_deprecation = __toESM(require_dist_node2());
    import_once = __toESM(require_once());
    logOnceCode = (0, import_once.default)((deprecation) => console.warn(deprecation));
    logOnceHeaders = (0, import_once.default)((deprecation) => console.warn(deprecation));
    RequestError = /* @__PURE__ */ __name(class extends Error {
      constructor(message, statusCode, options) {
        super(message);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
        this.name = "HttpError";
        this.status = statusCode;
        let headers;
        if ("headers" in options && typeof options.headers !== "undefined") {
          headers = options.headers;
        }
        if ("response" in options) {
          this.response = options.response;
          headers = options.response.headers;
        }
        const requestCopy = Object.assign({}, options.request);
        if (options.request.headers.authorization) {
          requestCopy.headers = Object.assign({}, options.request.headers, {
            authorization: options.request.headers.authorization.replace(
              /(?<! ) .*$/,
              " [REDACTED]"
            )
          });
        }
        requestCopy.url = requestCopy.url.replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]").replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
        this.request = requestCopy;
        Object.defineProperty(this, "code", {
          get() {
            logOnceCode(
              new import_deprecation.Deprecation(
                "[@octokit/request-error] `error.code` is deprecated, use `error.status`."
              )
            );
            return statusCode;
          }
        });
        Object.defineProperty(this, "headers", {
          get() {
            logOnceHeaders(
              new import_deprecation.Deprecation(
                "[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`."
              )
            );
            return headers || {};
          }
        });
      }
    }, "RequestError");
  }
});

// ../../node_modules/.pnpm/@octokit+request@8.4.1/node_modules/@octokit/request/dist-web/index.js
var dist_web_exports2 = {};
__export(dist_web_exports2, {
  request: () => request
});
function isPlainObject2(value) {
  if (typeof value !== "object" || value === null)
    return false;
  if (Object.prototype.toString.call(value) !== "[object Object]")
    return false;
  const proto = Object.getPrototypeOf(value);
  if (proto === null)
    return true;
  const Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && Ctor instanceof Ctor && Function.prototype.call(Ctor) === Function.prototype.call(value);
}
function getBufferResponse(response) {
  return response.arrayBuffer();
}
function fetchWrapper(requestOptions) {
  const log = requestOptions.request && requestOptions.request.log ? requestOptions.request.log : console;
  const parseSuccessResponseBody = requestOptions.request?.parseSuccessResponseBody !== false;
  if (isPlainObject2(requestOptions.body) || Array.isArray(requestOptions.body)) {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }
  let headers = {};
  let status;
  let url;
  let { fetch: fetch2 } = globalThis;
  if (requestOptions.request?.fetch) {
    fetch2 = requestOptions.request.fetch;
  }
  if (!fetch2) {
    throw new Error(
      "fetch is not set. Please pass a fetch implementation as new Octokit({ request: { fetch }}). Learn more at https://github.com/octokit/octokit.js/#fetch-missing"
    );
  }
  return fetch2(requestOptions.url, {
    method: requestOptions.method,
    body: requestOptions.body,
    redirect: requestOptions.request?.redirect,
    headers: requestOptions.headers,
    signal: requestOptions.request?.signal,
    // duplex must be set if request.body is ReadableStream or Async Iterables.
    // See https://fetch.spec.whatwg.org/#dom-requestinit-duplex.
    ...requestOptions.body && { duplex: "half" }
  }).then(async (response) => {
    url = response.url;
    status = response.status;
    for (const keyAndValue of response.headers) {
      headers[keyAndValue[0]] = keyAndValue[1];
    }
    if ("deprecation" in headers) {
      const matches = headers.link && headers.link.match(/<([^<>]+)>; rel="deprecation"/);
      const deprecationLink = matches && matches.pop();
      log.warn(
        `[@octokit/request] "${requestOptions.method} ${requestOptions.url}" is deprecated. It is scheduled to be removed on ${headers.sunset}${deprecationLink ? `. See ${deprecationLink}` : ""}`
      );
    }
    if (status === 204 || status === 205) {
      return;
    }
    if (requestOptions.method === "HEAD") {
      if (status < 400) {
        return;
      }
      throw new RequestError(response.statusText, status, {
        response: {
          url,
          status,
          headers,
          data: void 0
        },
        request: requestOptions
      });
    }
    if (status === 304) {
      throw new RequestError("Not modified", status, {
        response: {
          url,
          status,
          headers,
          data: await getResponseData(response)
        },
        request: requestOptions
      });
    }
    if (status >= 400) {
      const data = await getResponseData(response);
      const error = new RequestError(toErrorMessage(data), status, {
        response: {
          url,
          status,
          headers,
          data
        },
        request: requestOptions
      });
      throw error;
    }
    return parseSuccessResponseBody ? await getResponseData(response) : response.body;
  }).then((data) => {
    return {
      status,
      url,
      headers,
      data
    };
  }).catch((error) => {
    if (error instanceof RequestError)
      throw error;
    else if (error.name === "AbortError")
      throw error;
    let message = error.message;
    if (error.name === "TypeError" && "cause" in error) {
      if (error.cause instanceof Error) {
        message = error.cause.message;
      } else if (typeof error.cause === "string") {
        message = error.cause;
      }
    }
    throw new RequestError(message, 500, {
      request: requestOptions
    });
  });
}
async function getResponseData(response) {
  const contentType = response.headers.get("content-type");
  if (/application\/json/.test(contentType)) {
    return response.json().catch(() => response.text()).catch(() => "");
  }
  if (!contentType || /^text\/|charset=utf-8$/.test(contentType)) {
    return response.text();
  }
  return getBufferResponse(response);
}
function toErrorMessage(data) {
  if (typeof data === "string")
    return data;
  let suffix;
  if ("documentation_url" in data) {
    suffix = ` - ${data.documentation_url}`;
  } else {
    suffix = "";
  }
  if ("message" in data) {
    if (Array.isArray(data.errors)) {
      return `${data.message}: ${data.errors.map(JSON.stringify).join(", ")}${suffix}`;
    }
    return `${data.message}${suffix}`;
  }
  return `Unknown error: ${JSON.stringify(data)}`;
}
function withDefaults2(oldEndpoint, newDefaults) {
  const endpoint2 = oldEndpoint.defaults(newDefaults);
  const newApi = /* @__PURE__ */ __name(function(route, parameters) {
    const endpointOptions = endpoint2.merge(route, parameters);
    if (!endpointOptions.request || !endpointOptions.request.hook) {
      return fetchWrapper(endpoint2.parse(endpointOptions));
    }
    const request2 = /* @__PURE__ */ __name((route2, parameters2) => {
      return fetchWrapper(
        endpoint2.parse(endpoint2.merge(route2, parameters2))
      );
    }, "request2");
    Object.assign(request2, {
      endpoint: endpoint2,
      defaults: withDefaults2.bind(null, endpoint2)
    });
    return endpointOptions.request.hook(request2, endpointOptions);
  }, "newApi");
  return Object.assign(newApi, {
    endpoint: endpoint2,
    defaults: withDefaults2.bind(null, endpoint2)
  });
}
var import_universal_user_agent2, VERSION2, request;
var init_dist_web3 = __esm({
  "../../node_modules/.pnpm/@octokit+request@8.4.1/node_modules/@octokit/request/dist-web/index.js"() {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_dist_web();
    import_universal_user_agent2 = __toESM(require_dist_node());
    init_dist_web2();
    VERSION2 = "8.4.1";
    __name(isPlainObject2, "isPlainObject");
    __name(getBufferResponse, "getBufferResponse");
    __name(fetchWrapper, "fetchWrapper");
    __name(getResponseData, "getResponseData");
    __name(toErrorMessage, "toErrorMessage");
    __name(withDefaults2, "withDefaults");
    request = withDefaults2(endpoint, {
      headers: {
        "user-agent": `octokit-request.js/${VERSION2} ${(0, import_universal_user_agent2.getUserAgent)()}`
      }
    });
  }
});

// ../../node_modules/.pnpm/@octokit+graphql@7.1.1/node_modules/@octokit/graphql/dist-node/index.js
var require_dist_node3 = __commonJS({
  "../../node_modules/.pnpm/@octokit+graphql@7.1.1/node_modules/@octokit/graphql/dist-node/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var __defProp3 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp3 = Object.prototype.hasOwnProperty;
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp3(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp3.call(to, key) && key !== except)
            __defProp3(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp3({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var index_exports = {};
    __export2(index_exports, {
      GraphqlResponseError: () => GraphqlResponseError,
      graphql: () => graphql2,
      withCustomRequest: () => withCustomRequest
    });
    module.exports = __toCommonJS2(index_exports);
    var import_request32 = (init_dist_web3(), __toCommonJS(dist_web_exports2));
    var import_universal_user_agent6 = require_dist_node();
    var VERSION8 = "7.1.1";
    var import_request22 = (init_dist_web3(), __toCommonJS(dist_web_exports2));
    var import_request6 = (init_dist_web3(), __toCommonJS(dist_web_exports2));
    function _buildMessageForResponseErrors(data) {
      return `Request failed due to following response errors:
` + data.errors.map((e2) => ` - ${e2.message}`).join("\n");
    }
    __name(_buildMessageForResponseErrors, "_buildMessageForResponseErrors");
    var GraphqlResponseError = /* @__PURE__ */ __name(class extends Error {
      constructor(request2, headers, response) {
        super(_buildMessageForResponseErrors(response));
        this.request = request2;
        this.headers = headers;
        this.response = response;
        this.name = "GraphqlResponseError";
        this.errors = response.errors;
        this.data = response.data;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      }
    }, "GraphqlResponseError");
    var NON_VARIABLE_OPTIONS = [
      "method",
      "baseUrl",
      "url",
      "headers",
      "request",
      "query",
      "mediaType"
    ];
    var FORBIDDEN_VARIABLE_OPTIONS = ["query", "method", "url"];
    var GHES_V3_SUFFIX_REGEX = /\/api\/v3\/?$/;
    function graphql(request2, query, options) {
      if (options) {
        if (typeof query === "string" && "query" in options) {
          return Promise.reject(
            new Error(`[@octokit/graphql] "query" cannot be used as variable name`)
          );
        }
        for (const key in options) {
          if (!FORBIDDEN_VARIABLE_OPTIONS.includes(key))
            continue;
          return Promise.reject(
            new Error(
              `[@octokit/graphql] "${key}" cannot be used as variable name`
            )
          );
        }
      }
      const parsedOptions = typeof query === "string" ? Object.assign({ query }, options) : query;
      const requestOptions = Object.keys(
        parsedOptions
      ).reduce((result, key) => {
        if (NON_VARIABLE_OPTIONS.includes(key)) {
          result[key] = parsedOptions[key];
          return result;
        }
        if (!result.variables) {
          result.variables = {};
        }
        result.variables[key] = parsedOptions[key];
        return result;
      }, {});
      const baseUrl = parsedOptions.baseUrl || request2.endpoint.DEFAULTS.baseUrl;
      if (GHES_V3_SUFFIX_REGEX.test(baseUrl)) {
        requestOptions.url = baseUrl.replace(GHES_V3_SUFFIX_REGEX, "/api/graphql");
      }
      return request2(requestOptions).then((response) => {
        if (response.data.errors) {
          const headers = {};
          for (const key of Object.keys(response.headers)) {
            headers[key] = response.headers[key];
          }
          throw new GraphqlResponseError(
            requestOptions,
            headers,
            response.data
          );
        }
        return response.data.data;
      });
    }
    __name(graphql, "graphql");
    function withDefaults3(request2, newDefaults) {
      const newRequest = request2.defaults(newDefaults);
      const newApi = /* @__PURE__ */ __name((query, options) => {
        return graphql(newRequest, query, options);
      }, "newApi");
      return Object.assign(newApi, {
        defaults: withDefaults3.bind(null, newRequest),
        endpoint: newRequest.endpoint
      });
    }
    __name(withDefaults3, "withDefaults");
    var graphql2 = withDefaults3(import_request32.request, {
      headers: {
        "user-agent": `octokit-graphql.js/${VERSION8} ${(0, import_universal_user_agent6.getUserAgent)()}`
      },
      method: "POST",
      url: "/graphql"
    });
    function withCustomRequest(customRequest) {
      return withDefaults3(customRequest, {
        method: "POST",
        url: "/graphql"
      });
    }
    __name(withCustomRequest, "withCustomRequest");
  }
});

// ../../node_modules/.pnpm/@octokit+auth-token@4.0.0/node_modules/@octokit/auth-token/dist-web/index.js
var dist_web_exports3 = {};
__export(dist_web_exports3, {
  createTokenAuth: () => createTokenAuth
});
async function auth(token) {
  const isApp = token.split(/\./).length === 3;
  const isInstallation = REGEX_IS_INSTALLATION_LEGACY.test(token) || REGEX_IS_INSTALLATION.test(token);
  const isUserToServer = REGEX_IS_USER_TO_SERVER.test(token);
  const tokenType = isApp ? "app" : isInstallation ? "installation" : isUserToServer ? "user-to-server" : "oauth";
  return {
    type: "token",
    token,
    tokenType
  };
}
function withAuthorizationPrefix(token) {
  if (token.split(/\./).length === 3) {
    return `bearer ${token}`;
  }
  return `token ${token}`;
}
async function hook(token, request2, route, parameters) {
  const endpoint2 = request2.endpoint.merge(
    route,
    parameters
  );
  endpoint2.headers.authorization = withAuthorizationPrefix(token);
  return request2(endpoint2);
}
var REGEX_IS_INSTALLATION_LEGACY, REGEX_IS_INSTALLATION, REGEX_IS_USER_TO_SERVER, createTokenAuth;
var init_dist_web4 = __esm({
  "../../node_modules/.pnpm/@octokit+auth-token@4.0.0/node_modules/@octokit/auth-token/dist-web/index.js"() {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    REGEX_IS_INSTALLATION_LEGACY = /^v1\./;
    REGEX_IS_INSTALLATION = /^ghs_/;
    REGEX_IS_USER_TO_SERVER = /^ghu_/;
    __name(auth, "auth");
    __name(withAuthorizationPrefix, "withAuthorizationPrefix");
    __name(hook, "hook");
    createTokenAuth = /* @__PURE__ */ __name(function createTokenAuth2(token) {
      if (!token) {
        throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
      }
      if (typeof token !== "string") {
        throw new Error(
          "[@octokit/auth-token] Token passed to createTokenAuth is not a string"
        );
      }
      token = token.replace(/^(token|bearer) +/i, "");
      return Object.assign(auth.bind(null, token), {
        hook: hook.bind(null, token)
      });
    }, "createTokenAuth2");
  }
});

// ../../node_modules/.pnpm/@octokit+core@5.2.2/node_modules/@octokit/core/dist-node/index.js
var require_dist_node4 = __commonJS({
  "../../node_modules/.pnpm/@octokit+core@5.2.2/node_modules/@octokit/core/dist-node/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var __defProp3 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp3 = Object.prototype.hasOwnProperty;
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp3(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp3.call(to, key) && key !== except)
            __defProp3(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp3({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var index_exports = {};
    __export2(index_exports, {
      Octokit: () => Octokit
    });
    module.exports = __toCommonJS2(index_exports);
    var import_universal_user_agent6 = require_dist_node();
    var import_before_after_hook = require_before_after_hook();
    var import_request6 = (init_dist_web3(), __toCommonJS(dist_web_exports2));
    var import_graphql = require_dist_node3();
    var import_auth_token = (init_dist_web4(), __toCommonJS(dist_web_exports3));
    var VERSION8 = "5.2.2";
    var noop2 = /* @__PURE__ */ __name(() => {
    }, "noop");
    var consoleWarn = console.warn.bind(console);
    var consoleError = console.error.bind(console);
    function createLogger2(logger = {}) {
      if (typeof logger.debug !== "function") {
        logger.debug = noop2;
      }
      if (typeof logger.info !== "function") {
        logger.info = noop2;
      }
      if (typeof logger.warn !== "function") {
        logger.warn = consoleWarn;
      }
      if (typeof logger.error !== "function") {
        logger.error = consoleError;
      }
      return logger;
    }
    __name(createLogger2, "createLogger");
    var userAgentTrail = `octokit-core.js/${VERSION8} ${(0, import_universal_user_agent6.getUserAgent)()}`;
    var Octokit = /* @__PURE__ */ __name(class {
      static {
        this.VERSION = VERSION8;
      }
      static defaults(defaults) {
        const OctokitWithDefaults = /* @__PURE__ */ __name(class extends this {
          constructor(...args) {
            const options = args[0] || {};
            if (typeof defaults === "function") {
              super(defaults(options));
              return;
            }
            super(
              Object.assign(
                {},
                defaults,
                options,
                options.userAgent && defaults.userAgent ? {
                  userAgent: `${options.userAgent} ${defaults.userAgent}`
                } : null
              )
            );
          }
        }, "OctokitWithDefaults");
        return OctokitWithDefaults;
      }
      static {
        this.plugins = [];
      }
      /**
       * Attach a plugin (or many) to your Octokit instance.
       *
       * @example
       * const API = Octokit.plugin(plugin1, plugin2, plugin3, ...)
       */
      static plugin(...newPlugins) {
        const currentPlugins = this.plugins;
        const NewOctokit = /* @__PURE__ */ __name(class extends this {
          static {
            this.plugins = currentPlugins.concat(
              newPlugins.filter((plugin) => !currentPlugins.includes(plugin))
            );
          }
        }, "NewOctokit");
        return NewOctokit;
      }
      constructor(options = {}) {
        const hook5 = new import_before_after_hook.Collection();
        const requestDefaults = {
          baseUrl: import_request6.request.endpoint.DEFAULTS.baseUrl,
          headers: {},
          request: Object.assign({}, options.request, {
            // @ts-ignore internal usage only, no need to type
            hook: hook5.bind(null, "request")
          }),
          mediaType: {
            previews: [],
            format: ""
          }
        };
        requestDefaults.headers["user-agent"] = options.userAgent ? `${options.userAgent} ${userAgentTrail}` : userAgentTrail;
        if (options.baseUrl) {
          requestDefaults.baseUrl = options.baseUrl;
        }
        if (options.previews) {
          requestDefaults.mediaType.previews = options.previews;
        }
        if (options.timeZone) {
          requestDefaults.headers["time-zone"] = options.timeZone;
        }
        this.request = import_request6.request.defaults(requestDefaults);
        this.graphql = (0, import_graphql.withCustomRequest)(this.request).defaults(requestDefaults);
        this.log = createLogger2(options.log);
        this.hook = hook5;
        if (!options.authStrategy) {
          if (!options.auth) {
            this.auth = async () => ({
              type: "unauthenticated"
            });
          } else {
            const auth5 = (0, import_auth_token.createTokenAuth)(options.auth);
            hook5.wrap("request", auth5.hook);
            this.auth = auth5;
          }
        } else {
          const { authStrategy, ...otherOptions } = options;
          const auth5 = authStrategy(
            Object.assign(
              {
                request: this.request,
                log: this.log,
                // we pass the current octokit instance as well as its constructor options
                // to allow for authentication strategies that return a new octokit instance
                // that shares the same internal state as the current one. The original
                // requirement for this was the "event-octokit" authentication strategy
                // of https://github.com/probot/octokit-auth-probot.
                octokit: this,
                octokitOptions: otherOptions
              },
              options.auth
            )
          );
          hook5.wrap("request", auth5.hook);
          this.auth = auth5;
        }
        const classConstructor = this.constructor;
        for (let i2 = 0; i2 < classConstructor.plugins.length; ++i2) {
          Object.assign(this, classConstructor.plugins[i2](this, options));
        }
      }
    }, "Octokit");
  }
});

// ../../node_modules/.pnpm/btoa-lite@1.0.0/node_modules/btoa-lite/btoa-browser.js
var require_btoa_browser = __commonJS({
  "../../node_modules/.pnpm/btoa-lite@1.0.0/node_modules/btoa-lite/btoa-browser.js"(exports, module) {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    module.exports = /* @__PURE__ */ __name(function _btoa(str) {
      return btoa(str);
    }, "_btoa");
  }
});

// ../../node_modules/.pnpm/@octokit+oauth-authorization-url@6.0.2/node_modules/@octokit/oauth-authorization-url/dist-web/index.js
var dist_web_exports4 = {};
__export(dist_web_exports4, {
  oauthAuthorizationUrl: () => oauthAuthorizationUrl
});
function oauthAuthorizationUrl(options) {
  const clientType = options.clientType || "oauth-app";
  const baseUrl = options.baseUrl || "https://github.com";
  const result = {
    clientType,
    allowSignup: options.allowSignup === false ? false : true,
    clientId: options.clientId,
    login: options.login || null,
    redirectUrl: options.redirectUrl || null,
    state: options.state || Math.random().toString(36).substr(2),
    url: ""
  };
  if (clientType === "oauth-app") {
    const scopes = "scopes" in options ? options.scopes : [];
    result.scopes = typeof scopes === "string" ? scopes.split(/[,\s]+/).filter(Boolean) : scopes;
  }
  result.url = urlBuilderAuthorize(`${baseUrl}/login/oauth/authorize`, result);
  return result;
}
function urlBuilderAuthorize(base, options) {
  const map = {
    allowSignup: "allow_signup",
    clientId: "client_id",
    login: "login",
    redirectUrl: "redirect_uri",
    scopes: "scope",
    state: "state"
  };
  let url = base;
  Object.keys(map).filter((k) => options[k] !== null).filter((k) => {
    if (k !== "scopes")
      return true;
    if (options.clientType === "github-app")
      return false;
    return !Array.isArray(options[k]) || options[k].length > 0;
  }).map((key) => [map[key], `${options[key]}`]).forEach(([key, value], index) => {
    url += index === 0 ? `?` : "&";
    url += `${key}=${encodeURIComponent(value)}`;
  });
  return url;
}
var init_dist_web5 = __esm({
  "../../node_modules/.pnpm/@octokit+oauth-authorization-url@6.0.2/node_modules/@octokit/oauth-authorization-url/dist-web/index.js"() {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    __name(oauthAuthorizationUrl, "oauthAuthorizationUrl");
    __name(urlBuilderAuthorize, "urlBuilderAuthorize");
  }
});

// ../../node_modules/.pnpm/@octokit+oauth-methods@4.1.0/node_modules/@octokit/oauth-methods/dist-node/index.js
var require_dist_node5 = __commonJS({
  "../../node_modules/.pnpm/@octokit+oauth-methods@4.1.0/node_modules/@octokit/oauth-methods/dist-node/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var __create2 = Object.create;
    var __defProp3 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf3 = Object.getPrototypeOf;
    var __hasOwnProp3 = Object.prototype.hasOwnProperty;
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp3(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp3.call(to, key) && key !== except)
            __defProp3(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toESM2 = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf3(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp3(target, "default", { value: mod, enumerable: true }) : target,
      mod
    )), "__toESM");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp3({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var dist_src_exports = {};
    __export2(dist_src_exports, {
      VERSION: () => VERSION8,
      checkToken: () => checkToken2,
      createDeviceCode: () => createDeviceCode2,
      deleteAuthorization: () => deleteAuthorization2,
      deleteToken: () => deleteToken2,
      exchangeDeviceCode: () => exchangeDeviceCode2,
      exchangeWebFlowCode: () => exchangeWebFlowCode2,
      getWebFlowAuthorizationUrl: () => getWebFlowAuthorizationUrl,
      refreshToken: () => refreshToken2,
      resetToken: () => resetToken2,
      scopeToken: () => scopeToken
    });
    module.exports = __toCommonJS2(dist_src_exports);
    var VERSION8 = "4.1.0";
    var import_oauth_authorization_url = (init_dist_web5(), __toCommonJS(dist_web_exports4));
    var import_request6 = (init_dist_web3(), __toCommonJS(dist_web_exports2));
    var import_request_error2 = (init_dist_web2(), __toCommonJS(dist_web_exports));
    function requestToOAuthBaseUrl(request2) {
      const endpointDefaults = request2.endpoint.DEFAULTS;
      return /^https:\/\/(api\.)?github\.com$/.test(endpointDefaults.baseUrl) ? "https://github.com" : endpointDefaults.baseUrl.replace("/api/v3", "");
    }
    __name(requestToOAuthBaseUrl, "requestToOAuthBaseUrl");
    async function oauthRequest(request2, route, parameters) {
      const withOAuthParameters = {
        baseUrl: requestToOAuthBaseUrl(request2),
        headers: {
          accept: "application/json"
        },
        ...parameters
      };
      const response = await request2(route, withOAuthParameters);
      if ("error" in response.data) {
        const error = new import_request_error2.RequestError(
          `${response.data.error_description} (${response.data.error}, ${response.data.error_uri})`,
          400,
          {
            request: request2.endpoint.merge(
              route,
              withOAuthParameters
            ),
            headers: response.headers
          }
        );
        error.response = response;
        throw error;
      }
      return response;
    }
    __name(oauthRequest, "oauthRequest");
    function getWebFlowAuthorizationUrl({
      request: request2 = import_request6.request,
      ...options
    }) {
      const baseUrl = requestToOAuthBaseUrl(request2);
      return (0, import_oauth_authorization_url.oauthAuthorizationUrl)({
        ...options,
        baseUrl
      });
    }
    __name(getWebFlowAuthorizationUrl, "getWebFlowAuthorizationUrl");
    var import_request22 = (init_dist_web3(), __toCommonJS(dist_web_exports2));
    async function exchangeWebFlowCode2(options) {
      const request2 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
      import_request22.request;
      const response = await oauthRequest(
        request2,
        "POST /login/oauth/access_token",
        {
          client_id: options.clientId,
          client_secret: options.clientSecret,
          code: options.code,
          redirect_uri: options.redirectUrl
        }
      );
      const authentication = {
        clientType: options.clientType,
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        token: response.data.access_token,
        scopes: response.data.scope.split(/\s+/).filter(Boolean)
      };
      if (options.clientType === "github-app") {
        if ("refresh_token" in response.data) {
          const apiTimeInMs = new Date(response.headers.date).getTime();
          authentication.refreshToken = response.data.refresh_token, authentication.expiresAt = toTimestamp(
            apiTimeInMs,
            response.data.expires_in
          ), authentication.refreshTokenExpiresAt = toTimestamp(
            apiTimeInMs,
            response.data.refresh_token_expires_in
          );
        }
        delete authentication.scopes;
      }
      return { ...response, authentication };
    }
    __name(exchangeWebFlowCode2, "exchangeWebFlowCode");
    function toTimestamp(apiTimeInMs, expirationInSeconds) {
      return new Date(apiTimeInMs + expirationInSeconds * 1e3).toISOString();
    }
    __name(toTimestamp, "toTimestamp");
    var import_request32 = (init_dist_web3(), __toCommonJS(dist_web_exports2));
    async function createDeviceCode2(options) {
      const request2 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
      import_request32.request;
      const parameters = {
        client_id: options.clientId
      };
      if ("scopes" in options && Array.isArray(options.scopes)) {
        parameters.scope = options.scopes.join(" ");
      }
      return oauthRequest(request2, "POST /login/device/code", parameters);
    }
    __name(createDeviceCode2, "createDeviceCode");
    var import_request42 = (init_dist_web3(), __toCommonJS(dist_web_exports2));
    async function exchangeDeviceCode2(options) {
      const request2 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
      import_request42.request;
      const response = await oauthRequest(
        request2,
        "POST /login/oauth/access_token",
        {
          client_id: options.clientId,
          device_code: options.code,
          grant_type: "urn:ietf:params:oauth:grant-type:device_code"
        }
      );
      const authentication = {
        clientType: options.clientType,
        clientId: options.clientId,
        token: response.data.access_token,
        scopes: response.data.scope.split(/\s+/).filter(Boolean)
      };
      if ("clientSecret" in options) {
        authentication.clientSecret = options.clientSecret;
      }
      if (options.clientType === "github-app") {
        if ("refresh_token" in response.data) {
          const apiTimeInMs = new Date(response.headers.date).getTime();
          authentication.refreshToken = response.data.refresh_token, authentication.expiresAt = toTimestamp2(
            apiTimeInMs,
            response.data.expires_in
          ), authentication.refreshTokenExpiresAt = toTimestamp2(
            apiTimeInMs,
            response.data.refresh_token_expires_in
          );
        }
        delete authentication.scopes;
      }
      return { ...response, authentication };
    }
    __name(exchangeDeviceCode2, "exchangeDeviceCode");
    function toTimestamp2(apiTimeInMs, expirationInSeconds) {
      return new Date(apiTimeInMs + expirationInSeconds * 1e3).toISOString();
    }
    __name(toTimestamp2, "toTimestamp2");
    var import_request52 = (init_dist_web3(), __toCommonJS(dist_web_exports2));
    var import_btoa_lite4 = __toESM2(require_btoa_browser());
    async function checkToken2(options) {
      const request2 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
      import_request52.request;
      const response = await request2("POST /applications/{client_id}/token", {
        headers: {
          authorization: `basic ${(0, import_btoa_lite4.default)(
            `${options.clientId}:${options.clientSecret}`
          )}`
        },
        client_id: options.clientId,
        access_token: options.token
      });
      const authentication = {
        clientType: options.clientType,
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        token: options.token,
        scopes: response.data.scopes
      };
      if (response.data.expires_at)
        authentication.expiresAt = response.data.expires_at;
      if (options.clientType === "github-app") {
        delete authentication.scopes;
      }
      return { ...response, authentication };
    }
    __name(checkToken2, "checkToken");
    var import_request62 = (init_dist_web3(), __toCommonJS(dist_web_exports2));
    async function refreshToken2(options) {
      const request2 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
      import_request62.request;
      const response = await oauthRequest(
        request2,
        "POST /login/oauth/access_token",
        {
          client_id: options.clientId,
          client_secret: options.clientSecret,
          grant_type: "refresh_token",
          refresh_token: options.refreshToken
        }
      );
      const apiTimeInMs = new Date(response.headers.date).getTime();
      const authentication = {
        clientType: "github-app",
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        token: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresAt: toTimestamp3(apiTimeInMs, response.data.expires_in),
        refreshTokenExpiresAt: toTimestamp3(
          apiTimeInMs,
          response.data.refresh_token_expires_in
        )
      };
      return { ...response, authentication };
    }
    __name(refreshToken2, "refreshToken");
    function toTimestamp3(apiTimeInMs, expirationInSeconds) {
      return new Date(apiTimeInMs + expirationInSeconds * 1e3).toISOString();
    }
    __name(toTimestamp3, "toTimestamp3");
    var import_request7 = (init_dist_web3(), __toCommonJS(dist_web_exports2));
    var import_btoa_lite22 = __toESM2(require_btoa_browser());
    async function scopeToken(options) {
      const {
        request: optionsRequest,
        clientType,
        clientId,
        clientSecret,
        token,
        ...requestOptions
      } = options;
      const request2 = optionsRequest || /* istanbul ignore next: we always pass a custom request in tests */
      import_request7.request;
      const response = await request2(
        "POST /applications/{client_id}/token/scoped",
        {
          headers: {
            authorization: `basic ${(0, import_btoa_lite22.default)(`${clientId}:${clientSecret}`)}`
          },
          client_id: clientId,
          access_token: token,
          ...requestOptions
        }
      );
      const authentication = Object.assign(
        {
          clientType,
          clientId,
          clientSecret,
          token: response.data.token
        },
        response.data.expires_at ? { expiresAt: response.data.expires_at } : {}
      );
      return { ...response, authentication };
    }
    __name(scopeToken, "scopeToken");
    var import_request8 = (init_dist_web3(), __toCommonJS(dist_web_exports2));
    var import_btoa_lite32 = __toESM2(require_btoa_browser());
    async function resetToken2(options) {
      const request2 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
      import_request8.request;
      const auth5 = (0, import_btoa_lite32.default)(`${options.clientId}:${options.clientSecret}`);
      const response = await request2(
        "PATCH /applications/{client_id}/token",
        {
          headers: {
            authorization: `basic ${auth5}`
          },
          client_id: options.clientId,
          access_token: options.token
        }
      );
      const authentication = {
        clientType: options.clientType,
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        token: response.data.token,
        scopes: response.data.scopes
      };
      if (response.data.expires_at)
        authentication.expiresAt = response.data.expires_at;
      if (options.clientType === "github-app") {
        delete authentication.scopes;
      }
      return { ...response, authentication };
    }
    __name(resetToken2, "resetToken");
    var import_request9 = (init_dist_web3(), __toCommonJS(dist_web_exports2));
    var import_btoa_lite42 = __toESM2(require_btoa_browser());
    async function deleteToken2(options) {
      const request2 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
      import_request9.request;
      const auth5 = (0, import_btoa_lite42.default)(`${options.clientId}:${options.clientSecret}`);
      return request2(
        "DELETE /applications/{client_id}/token",
        {
          headers: {
            authorization: `basic ${auth5}`
          },
          client_id: options.clientId,
          access_token: options.token
        }
      );
    }
    __name(deleteToken2, "deleteToken");
    var import_request10 = (init_dist_web3(), __toCommonJS(dist_web_exports2));
    var import_btoa_lite5 = __toESM2(require_btoa_browser());
    async function deleteAuthorization2(options) {
      const request2 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
      import_request10.request;
      const auth5 = (0, import_btoa_lite5.default)(`${options.clientId}:${options.clientSecret}`);
      return request2(
        "DELETE /applications/{client_id}/grant",
        {
          headers: {
            authorization: `basic ${auth5}`
          },
          client_id: options.clientId,
          access_token: options.token
        }
      );
    }
    __name(deleteAuthorization2, "deleteAuthorization");
  }
});

// ../../node_modules/.pnpm/@octokit+auth-oauth-device@6.1.0/node_modules/@octokit/auth-oauth-device/dist-web/index.js
async function getOAuthAccessToken(state, options) {
  const cachedAuthentication = getCachedAuthentication(state, options.auth);
  if (cachedAuthentication)
    return cachedAuthentication;
  const { data: verification } = await (0, import_oauth_methods.createDeviceCode)({
    clientType: state.clientType,
    clientId: state.clientId,
    request: options.request || state.request,
    // @ts-expect-error the extra code to make TS happy is not worth it
    scopes: options.auth.scopes || state.scopes
  });
  await state.onVerification(verification);
  const authentication = await waitForAccessToken(
    options.request || state.request,
    state.clientId,
    state.clientType,
    verification
  );
  state.authentication = authentication;
  return authentication;
}
function getCachedAuthentication(state, auth22) {
  if (auth22.refresh === true)
    return false;
  if (!state.authentication)
    return false;
  if (state.clientType === "github-app") {
    return state.authentication;
  }
  const authentication = state.authentication;
  const newScope = ("scopes" in auth22 && auth22.scopes || state.scopes).join(
    " "
  );
  const currentScope = authentication.scopes.join(" ");
  return newScope === currentScope ? authentication : false;
}
async function wait(seconds) {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1e3));
}
async function waitForAccessToken(request2, clientId, clientType, verification) {
  try {
    const options = {
      clientId,
      request: request2,
      code: verification.device_code
    };
    const { authentication } = clientType === "oauth-app" ? await (0, import_oauth_methods.exchangeDeviceCode)({
      ...options,
      clientType: "oauth-app"
    }) : await (0, import_oauth_methods.exchangeDeviceCode)({
      ...options,
      clientType: "github-app"
    });
    return {
      type: "token",
      tokenType: "oauth",
      ...authentication
    };
  } catch (error) {
    if (!error.response)
      throw error;
    const errorType = error.response.data.error;
    if (errorType === "authorization_pending") {
      await wait(verification.interval);
      return waitForAccessToken(request2, clientId, clientType, verification);
    }
    if (errorType === "slow_down") {
      await wait(verification.interval + 5);
      return waitForAccessToken(request2, clientId, clientType, verification);
    }
    throw error;
  }
}
async function auth2(state, authOptions) {
  return getOAuthAccessToken(state, {
    auth: authOptions
  });
}
async function hook2(state, request2, route, parameters) {
  let endpoint2 = request2.endpoint.merge(
    route,
    parameters
  );
  if (/\/login\/(oauth\/access_token|device\/code)$/.test(endpoint2.url)) {
    return request2(endpoint2);
  }
  const { token } = await getOAuthAccessToken(state, {
    request: request2,
    auth: { type: "oauth" }
  });
  endpoint2.headers.authorization = `token ${token}`;
  return request2(endpoint2);
}
function createOAuthDeviceAuth(options) {
  const requestWithDefaults = options.request || request.defaults({
    headers: {
      "user-agent": `octokit-auth-oauth-device.js/${VERSION3} ${(0, import_universal_user_agent3.getUserAgent)()}`
    }
  });
  const { request: request2 = requestWithDefaults, ...otherOptions } = options;
  const state = options.clientType === "github-app" ? {
    ...otherOptions,
    clientType: "github-app",
    request: request2
  } : {
    ...otherOptions,
    clientType: "oauth-app",
    request: request2,
    scopes: options.scopes || []
  };
  if (!options.clientId) {
    throw new Error(
      '[@octokit/auth-oauth-device] "clientId" option must be set (https://github.com/octokit/auth-oauth-device.js#usage)'
    );
  }
  if (!options.onVerification) {
    throw new Error(
      '[@octokit/auth-oauth-device] "onVerification" option must be a function (https://github.com/octokit/auth-oauth-device.js#usage)'
    );
  }
  return Object.assign(auth2.bind(null, state), {
    hook: hook2.bind(null, state)
  });
}
var import_universal_user_agent3, import_oauth_methods, VERSION3;
var init_dist_web6 = __esm({
  "../../node_modules/.pnpm/@octokit+auth-oauth-device@6.1.0/node_modules/@octokit/auth-oauth-device/dist-web/index.js"() {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    import_universal_user_agent3 = __toESM(require_dist_node());
    init_dist_web3();
    import_oauth_methods = __toESM(require_dist_node5());
    __name(getOAuthAccessToken, "getOAuthAccessToken");
    __name(getCachedAuthentication, "getCachedAuthentication");
    __name(wait, "wait");
    __name(waitForAccessToken, "waitForAccessToken");
    __name(auth2, "auth");
    __name(hook2, "hook");
    VERSION3 = "6.1.0";
    __name(createOAuthDeviceAuth, "createOAuthDeviceAuth");
  }
});

// ../../node_modules/.pnpm/@octokit+auth-oauth-user@4.1.0/node_modules/@octokit/auth-oauth-user/dist-web/index.js
var dist_web_exports5 = {};
__export(dist_web_exports5, {
  createOAuthUserAuth: () => createOAuthUserAuth2,
  requiresBasicAuth: () => requiresBasicAuth
});
async function getAuthentication(state) {
  if ("code" in state.strategyOptions) {
    const { authentication } = await (0, import_oauth_methods2.exchangeWebFlowCode)({
      clientId: state.clientId,
      clientSecret: state.clientSecret,
      clientType: state.clientType,
      onTokenCreated: state.onTokenCreated,
      ...state.strategyOptions,
      request: state.request
    });
    return {
      type: "token",
      tokenType: "oauth",
      ...authentication
    };
  }
  if ("onVerification" in state.strategyOptions) {
    const deviceAuth = createOAuthDeviceAuth({
      clientType: state.clientType,
      clientId: state.clientId,
      onTokenCreated: state.onTokenCreated,
      ...state.strategyOptions,
      request: state.request
    });
    const authentication = await deviceAuth({
      type: "oauth"
    });
    return {
      clientSecret: state.clientSecret,
      ...authentication
    };
  }
  if ("token" in state.strategyOptions) {
    return {
      type: "token",
      tokenType: "oauth",
      clientId: state.clientId,
      clientSecret: state.clientSecret,
      clientType: state.clientType,
      onTokenCreated: state.onTokenCreated,
      ...state.strategyOptions
    };
  }
  throw new Error("[@octokit/auth-oauth-user] Invalid strategy options");
}
async function auth3(state, options = {}) {
  if (!state.authentication) {
    state.authentication = state.clientType === "oauth-app" ? await getAuthentication(state) : await getAuthentication(state);
  }
  if (state.authentication.invalid) {
    throw new Error("[@octokit/auth-oauth-user] Token is invalid");
  }
  const currentAuthentication = state.authentication;
  if ("expiresAt" in currentAuthentication) {
    if (options.type === "refresh" || new Date(currentAuthentication.expiresAt) < /* @__PURE__ */ new Date()) {
      const { authentication } = await (0, import_oauth_methods3.refreshToken)({
        clientType: "github-app",
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        refreshToken: currentAuthentication.refreshToken,
        request: state.request
      });
      state.authentication = {
        tokenType: "oauth",
        type: "token",
        ...authentication
      };
    }
  }
  if (options.type === "refresh") {
    if (state.clientType === "oauth-app") {
      throw new Error(
        "[@octokit/auth-oauth-user] OAuth Apps do not support expiring tokens"
      );
    }
    if (!currentAuthentication.hasOwnProperty("expiresAt")) {
      throw new Error("[@octokit/auth-oauth-user] Refresh token missing");
    }
    await state.onTokenCreated?.(state.authentication, {
      type: options.type
    });
  }
  if (options.type === "check" || options.type === "reset") {
    const method = options.type === "check" ? import_oauth_methods3.checkToken : import_oauth_methods3.resetToken;
    try {
      const { authentication } = await method({
        // @ts-expect-error making TS happy would require unnecessary code so no
        clientType: state.clientType,
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        token: state.authentication.token,
        request: state.request
      });
      state.authentication = {
        tokenType: "oauth",
        type: "token",
        // @ts-expect-error TBD
        ...authentication
      };
      if (options.type === "reset") {
        await state.onTokenCreated?.(state.authentication, {
          type: options.type
        });
      }
      return state.authentication;
    } catch (error) {
      if (error.status === 404) {
        error.message = "[@octokit/auth-oauth-user] Token is invalid";
        state.authentication.invalid = true;
      }
      throw error;
    }
  }
  if (options.type === "delete" || options.type === "deleteAuthorization") {
    const method = options.type === "delete" ? import_oauth_methods3.deleteToken : import_oauth_methods3.deleteAuthorization;
    try {
      await method({
        // @ts-expect-error making TS happy would require unnecessary code so no
        clientType: state.clientType,
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        token: state.authentication.token,
        request: state.request
      });
    } catch (error) {
      if (error.status !== 404)
        throw error;
    }
    state.authentication.invalid = true;
    return state.authentication;
  }
  return state.authentication;
}
function requiresBasicAuth(url) {
  return url && ROUTES_REQUIRING_BASIC_AUTH.test(url);
}
async function hook3(state, request2, route, parameters = {}) {
  const endpoint2 = request2.endpoint.merge(
    route,
    parameters
  );
  if (/\/login\/(oauth\/access_token|device\/code)$/.test(endpoint2.url)) {
    return request2(endpoint2);
  }
  if (requiresBasicAuth(endpoint2.url)) {
    const credentials = (0, import_btoa_lite.default)(`${state.clientId}:${state.clientSecret}`);
    endpoint2.headers.authorization = `basic ${credentials}`;
    return request2(endpoint2);
  }
  const { token } = state.clientType === "oauth-app" ? await auth3({ ...state, request: request2 }) : await auth3({ ...state, request: request2 });
  endpoint2.headers.authorization = "token " + token;
  return request2(endpoint2);
}
function createOAuthUserAuth2({
  clientId,
  clientSecret,
  clientType = "oauth-app",
  request: request2 = request.defaults({
    headers: {
      "user-agent": `octokit-auth-oauth-app.js/${VERSION4} ${(0, import_universal_user_agent4.getUserAgent)()}`
    }
  }),
  onTokenCreated,
  ...strategyOptions
}) {
  const state = Object.assign({
    clientType,
    clientId,
    clientSecret,
    onTokenCreated,
    strategyOptions,
    request: request2
  });
  return Object.assign(auth3.bind(null, state), {
    // @ts-expect-error not worth the extra code needed to appease TS
    hook: hook3.bind(null, state)
  });
}
var import_universal_user_agent4, import_oauth_methods2, import_oauth_methods3, import_btoa_lite, VERSION4, ROUTES_REQUIRING_BASIC_AUTH;
var init_dist_web7 = __esm({
  "../../node_modules/.pnpm/@octokit+auth-oauth-user@4.1.0/node_modules/@octokit/auth-oauth-user/dist-web/index.js"() {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    import_universal_user_agent4 = __toESM(require_dist_node());
    init_dist_web3();
    init_dist_web6();
    import_oauth_methods2 = __toESM(require_dist_node5());
    import_oauth_methods3 = __toESM(require_dist_node5());
    import_btoa_lite = __toESM(require_btoa_browser());
    VERSION4 = "4.1.0";
    __name(getAuthentication, "getAuthentication");
    __name(auth3, "auth");
    ROUTES_REQUIRING_BASIC_AUTH = /\/applications\/[^/]+\/(token|grant)s?/;
    __name(requiresBasicAuth, "requiresBasicAuth");
    __name(hook3, "hook");
    __name(createOAuthUserAuth2, "createOAuthUserAuth");
    createOAuthUserAuth2.VERSION = VERSION4;
  }
});

// ../../node_modules/.pnpm/@octokit+auth-oauth-app@7.1.0/node_modules/@octokit/auth-oauth-app/dist-web/index.js
var dist_web_exports6 = {};
__export(dist_web_exports6, {
  createOAuthAppAuth: () => createOAuthAppAuth,
  createOAuthUserAuth: () => createOAuthUserAuth2
});
async function auth4(state, authOptions) {
  if (authOptions.type === "oauth-app") {
    return {
      type: "oauth-app",
      clientId: state.clientId,
      clientSecret: state.clientSecret,
      clientType: state.clientType,
      headers: {
        authorization: `basic ${(0, import_btoa_lite2.default)(
          `${state.clientId}:${state.clientSecret}`
        )}`
      }
    };
  }
  if ("factory" in authOptions) {
    const { type: type2, ...options } = {
      ...authOptions,
      ...state
    };
    return authOptions.factory(options);
  }
  const common = {
    clientId: state.clientId,
    clientSecret: state.clientSecret,
    request: state.request,
    ...authOptions
  };
  const userAuth = state.clientType === "oauth-app" ? await createOAuthUserAuth2({
    ...common,
    clientType: state.clientType
  }) : await createOAuthUserAuth2({
    ...common,
    clientType: state.clientType
  });
  return userAuth();
}
async function hook4(state, request2, route, parameters) {
  let endpoint2 = request2.endpoint.merge(
    route,
    parameters
  );
  if (/\/login\/(oauth\/access_token|device\/code)$/.test(endpoint2.url)) {
    return request2(endpoint2);
  }
  if (state.clientType === "github-app" && !requiresBasicAuth(endpoint2.url)) {
    throw new Error(
      `[@octokit/auth-oauth-app] GitHub Apps cannot use their client ID/secret for basic authentication for endpoints other than "/applications/{client_id}/**". "${endpoint2.method} ${endpoint2.url}" is not supported.`
    );
  }
  const credentials = (0, import_btoa_lite3.default)(`${state.clientId}:${state.clientSecret}`);
  endpoint2.headers.authorization = `basic ${credentials}`;
  try {
    return await request2(endpoint2);
  } catch (error) {
    if (error.status !== 401)
      throw error;
    error.message = `[@octokit/auth-oauth-app] "${endpoint2.method} ${endpoint2.url}" does not support clientId/clientSecret basic authentication.`;
    throw error;
  }
}
function createOAuthAppAuth(options) {
  const state = Object.assign(
    {
      request: request.defaults({
        headers: {
          "user-agent": `octokit-auth-oauth-app.js/${VERSION5} ${(0, import_universal_user_agent5.getUserAgent)()}`
        }
      }),
      clientType: "oauth-app"
    },
    options
  );
  return Object.assign(auth4.bind(null, state), {
    hook: hook4.bind(null, state)
  });
}
var import_universal_user_agent5, import_btoa_lite2, import_btoa_lite3, VERSION5;
var init_dist_web8 = __esm({
  "../../node_modules/.pnpm/@octokit+auth-oauth-app@7.1.0/node_modules/@octokit/auth-oauth-app/dist-web/index.js"() {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    import_universal_user_agent5 = __toESM(require_dist_node());
    init_dist_web3();
    import_btoa_lite2 = __toESM(require_btoa_browser());
    init_dist_web7();
    import_btoa_lite3 = __toESM(require_btoa_browser());
    init_dist_web7();
    init_dist_web7();
    __name(auth4, "auth");
    __name(hook4, "hook");
    VERSION5 = "7.1.0";
    __name(createOAuthAppAuth, "createOAuthAppAuth");
  }
});

// ../../node_modules/.pnpm/universal-github-app-jwt@1.2.0/node_modules/universal-github-app-jwt/dist-web/index.bundled.js
var index_bundled_exports = {};
__export(index_bundled_exports, {
  githubAppJwt: () => o
});
function t(t2, n2, r2, e2, i2, a2, o2) {
  try {
    var u2 = t2[a2](o2), c = u2.value;
  } catch (t3) {
    return void r2(t3);
  }
  u2.done ? n2(c) : Promise.resolve(c).then(e2, i2);
}
function n(n2) {
  return function() {
    var r2 = this, e2 = arguments;
    return new Promise(function(i2, a2) {
      var o2 = n2.apply(r2, e2);
      function u2(n3) {
        t(o2, i2, a2, u2, c, "next", n3);
      }
      __name(u2, "u");
      function c(n3) {
        t(o2, i2, a2, u2, c, "throw", n3);
      }
      __name(c, "c");
      u2(void 0);
    });
  };
}
function r(t2) {
  for (var n2 = new ArrayBuffer(t2.length), r2 = new Uint8Array(n2), e2 = 0, i2 = t2.length; e2 < i2; e2++)
    r2[e2] = t2.charCodeAt(e2);
  return n2;
}
function e(t2) {
  return t2.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function i(t2) {
  return e(btoa(JSON.stringify(t2)));
}
function o(t2) {
  return u.apply(this, arguments);
}
function u() {
  return (u = n(function* (t2) {
    var { id: n2, privateKey: r2, now: e2 = Math.floor(Date.now() / 1e3) } = t2, i2 = e2 - 30, o2 = i2 + 600, u2 = { iat: i2, exp: o2, iss: n2 };
    return { appId: n2, expiration: o2, token: yield a({ privateKey: r2, payload: u2 }) };
  })).apply(this, arguments);
}
var a;
var init_index_bundled = __esm({
  "../../node_modules/.pnpm/universal-github-app-jwt@1.2.0/node_modules/universal-github-app-jwt/dist-web/index.bundled.js"() {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    __name(t, "t");
    __name(n, "n");
    __name(r, "r");
    __name(e, "e");
    __name(i, "i");
    a = function() {
      var t2 = n(function* (t3) {
        var { privateKey: n2, payload: a2 } = t3;
        if (/BEGIN RSA PRIVATE KEY/.test(n2))
          throw new Error("[universal-github-app-jwt] Private Key is in PKCS#1 format, but only PKCS#8 is supported. See https://github.com/gr2m/universal-github-app-jwt#readme");
        var o2, u2 = { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } }, c = (o2 = n2.trim().split("\n").slice(1, -1).join(""), r(atob(o2))), p = yield crypto.subtle.importKey("pkcs8", c, u2, false, ["sign"]), f = function(t4, n3) {
          return "".concat(i(t4), ".").concat(i(n3));
        }({ alg: "RS256", typ: "JWT" }, a2), l = r(f), s = function(t4) {
          for (var n3 = "", r2 = new Uint8Array(t4), i2 = r2.byteLength, a3 = 0; a3 < i2; a3++)
            n3 += String.fromCharCode(r2[a3]);
          return e(btoa(n3));
        }(yield crypto.subtle.sign(u2.name, p, l));
        return "".concat(f, ".").concat(s);
      });
      return function(n2) {
        return t2.apply(this, arguments);
      };
    }();
    __name(o, "o");
    __name(u, "u");
  }
});

// ../../node_modules/.pnpm/@wolfy1339+lru-cache@11.0.2-patch.1/node_modules/@wolfy1339/lru-cache/dist/commonjs/index.js
var require_commonjs = __commonJS({
  "../../node_modules/.pnpm/@wolfy1339+lru-cache@11.0.2-patch.1/node_modules/@wolfy1339/lru-cache/dist/commonjs/index.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LRUCache = void 0;
    var perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
    var warned = /* @__PURE__ */ new Set();
    var PROCESS = typeof process === "object" && !!process ? process : {};
    var emitWarning = /* @__PURE__ */ __name((msg, type2, code, fn) => {
      typeof PROCESS.emitWarning === "function" ? PROCESS.emitWarning(msg, type2, code, fn) : console.error(`[${code}] ${type2}: ${msg}`);
    }, "emitWarning");
    var AC = globalThis.AbortController;
    var AS = globalThis.AbortSignal;
    if (typeof AC === "undefined") {
      AS = /* @__PURE__ */ __name(class AbortSignal {
        onabort;
        _onabort = [];
        reason;
        aborted = false;
        addEventListener(_, fn) {
          this._onabort.push(fn);
        }
      }, "AbortSignal");
      AC = /* @__PURE__ */ __name(class AbortController {
        constructor() {
          warnACPolyfill();
        }
        signal = new AS();
        abort(reason) {
          if (this.signal.aborted)
            return;
          this.signal.reason = reason;
          this.signal.aborted = true;
          for (const fn of this.signal._onabort) {
            fn(reason);
          }
          this.signal.onabort?.(reason);
        }
      }, "AbortController");
      let printACPolyfillWarning = PROCESS.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1";
      const warnACPolyfill = /* @__PURE__ */ __name(() => {
        if (!printACPolyfillWarning)
          return;
        printACPolyfillWarning = false;
        emitWarning("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", warnACPolyfill);
      }, "warnACPolyfill");
    }
    var shouldWarn = /* @__PURE__ */ __name((code) => !warned.has(code), "shouldWarn");
    var TYPE = Symbol("type");
    var isPosInt = /* @__PURE__ */ __name((n2) => n2 && n2 === Math.floor(n2) && n2 > 0 && isFinite(n2), "isPosInt");
    var getUintArray = /* @__PURE__ */ __name((max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null, "getUintArray");
    var ZeroArray = class extends Array {
      constructor(size) {
        super(size);
        this.fill(0);
      }
    };
    __name(ZeroArray, "ZeroArray");
    var _constructing;
    var _Stack = class {
      heap;
      length;
      static create(max) {
        const HeapCls = getUintArray(max);
        if (!HeapCls)
          return [];
        __privateSet(_Stack, _constructing, true);
        const s = new _Stack(max, HeapCls);
        __privateSet(_Stack, _constructing, false);
        return s;
      }
      constructor(max, HeapCls) {
        if (!__privateGet(_Stack, _constructing)) {
          throw new TypeError("instantiate Stack using Stack.create(n)");
        }
        this.heap = new HeapCls(max);
        this.length = 0;
      }
      push(n2) {
        this.heap[this.length++] = n2;
      }
      pop() {
        return this.heap[--this.length];
      }
    };
    var Stack = _Stack;
    __name(Stack, "Stack");
    _constructing = new WeakMap();
    // private constructor
    __privateAdd(Stack, _constructing, false);
    var LRUCache = class {
      // options that cannot be changed without disaster
      #max;
      #maxSize;
      #dispose;
      #disposeAfter;
      #fetchMethod;
      #memoMethod;
      /**
       * {@link LRUCache.OptionsBase.ttl}
       */
      ttl;
      /**
       * {@link LRUCache.OptionsBase.ttlResolution}
       */
      ttlResolution;
      /**
       * {@link LRUCache.OptionsBase.ttlAutopurge}
       */
      ttlAutopurge;
      /**
       * {@link LRUCache.OptionsBase.updateAgeOnGet}
       */
      updateAgeOnGet;
      /**
       * {@link LRUCache.OptionsBase.updateAgeOnHas}
       */
      updateAgeOnHas;
      /**
       * {@link LRUCache.OptionsBase.allowStale}
       */
      allowStale;
      /**
       * {@link LRUCache.OptionsBase.noDisposeOnSet}
       */
      noDisposeOnSet;
      /**
       * {@link LRUCache.OptionsBase.noUpdateTTL}
       */
      noUpdateTTL;
      /**
       * {@link LRUCache.OptionsBase.maxEntrySize}
       */
      maxEntrySize;
      /**
       * {@link LRUCache.OptionsBase.sizeCalculation}
       */
      sizeCalculation;
      /**
       * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
       */
      noDeleteOnFetchRejection;
      /**
       * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
       */
      noDeleteOnStaleGet;
      /**
       * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
       */
      allowStaleOnFetchAbort;
      /**
       * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
       */
      allowStaleOnFetchRejection;
      /**
       * {@link LRUCache.OptionsBase.ignoreFetchAbort}
       */
      ignoreFetchAbort;
      // computed properties
      #size;
      #calculatedSize;
      #keyMap;
      #keyList;
      #valList;
      #next;
      #prev;
      #head;
      #tail;
      #free;
      #disposed;
      #sizes;
      #starts;
      #ttls;
      #hasDispose;
      #hasFetchMethod;
      #hasDisposeAfter;
      /**
       * Do not call this method unless you need to inspect the
       * inner workings of the cache.  If anything returned by this
       * object is modified in any way, strange breakage may occur.
       *
       * These fields are private for a reason!
       *
       * @internal
       */
      static unsafeExposeInternals(c) {
        return {
          // properties
          starts: c.#starts,
          ttls: c.#ttls,
          sizes: c.#sizes,
          keyMap: c.#keyMap,
          keyList: c.#keyList,
          valList: c.#valList,
          next: c.#next,
          prev: c.#prev,
          get head() {
            return c.#head;
          },
          get tail() {
            return c.#tail;
          },
          free: c.#free,
          // methods
          isBackgroundFetch: (p) => c.#isBackgroundFetch(p),
          backgroundFetch: (k, index, options, context) => c.#backgroundFetch(k, index, options, context),
          moveToTail: (index) => c.#moveToTail(index),
          indexes: (options) => c.#indexes(options),
          rindexes: (options) => c.#rindexes(options),
          isStale: (index) => c.#isStale(index)
        };
      }
      // Protected read-only members
      /**
       * {@link LRUCache.OptionsBase.max} (read-only)
       */
      get max() {
        return this.#max;
      }
      /**
       * {@link LRUCache.OptionsBase.maxSize} (read-only)
       */
      get maxSize() {
        return this.#maxSize;
      }
      /**
       * The total computed size of items in the cache (read-only)
       */
      get calculatedSize() {
        return this.#calculatedSize;
      }
      /**
       * The number of items stored in the cache (read-only)
       */
      get size() {
        return this.#size;
      }
      /**
       * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
       */
      get fetchMethod() {
        return this.#fetchMethod;
      }
      get memoMethod() {
        return this.#memoMethod;
      }
      /**
       * {@link LRUCache.OptionsBase.dispose} (read-only)
       */
      get dispose() {
        return this.#dispose;
      }
      /**
       * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
       */
      get disposeAfter() {
        return this.#disposeAfter;
      }
      constructor(options) {
        const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, memoMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort } = options;
        if (max !== 0 && !isPosInt(max)) {
          throw new TypeError("max option must be a nonnegative integer");
        }
        const UintArray = max ? getUintArray(max) : Array;
        if (!UintArray) {
          throw new Error("invalid max value: " + max);
        }
        this.#max = max;
        this.#maxSize = maxSize;
        this.maxEntrySize = maxEntrySize || this.#maxSize;
        this.sizeCalculation = sizeCalculation;
        if (this.sizeCalculation) {
          if (!this.#maxSize && !this.maxEntrySize) {
            throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
          }
          if (typeof this.sizeCalculation !== "function") {
            throw new TypeError("sizeCalculation set to non-function");
          }
        }
        if (memoMethod !== void 0 && typeof memoMethod !== "function") {
          throw new TypeError("memoMethod must be a function if defined");
        }
        this.#memoMethod = memoMethod;
        if (fetchMethod !== void 0 && typeof fetchMethod !== "function") {
          throw new TypeError("fetchMethod must be a function if specified");
        }
        this.#fetchMethod = fetchMethod;
        this.#hasFetchMethod = !!fetchMethod;
        this.#keyMap = /* @__PURE__ */ new Map();
        this.#keyList = new Array(max).fill(void 0);
        this.#valList = new Array(max).fill(void 0);
        this.#next = new UintArray(max);
        this.#prev = new UintArray(max);
        this.#head = 0;
        this.#tail = 0;
        this.#free = Stack.create(max);
        this.#size = 0;
        this.#calculatedSize = 0;
        if (typeof dispose === "function") {
          this.#dispose = dispose;
        }
        if (typeof disposeAfter === "function") {
          this.#disposeAfter = disposeAfter;
          this.#disposed = [];
        } else {
          this.#disposeAfter = void 0;
          this.#disposed = void 0;
        }
        this.#hasDispose = !!this.#dispose;
        this.#hasDisposeAfter = !!this.#disposeAfter;
        this.noDisposeOnSet = !!noDisposeOnSet;
        this.noUpdateTTL = !!noUpdateTTL;
        this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
        this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
        this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
        this.ignoreFetchAbort = !!ignoreFetchAbort;
        if (this.maxEntrySize !== 0) {
          if (this.#maxSize !== 0) {
            if (!isPosInt(this.#maxSize)) {
              throw new TypeError("maxSize must be a positive integer if specified");
            }
          }
          if (!isPosInt(this.maxEntrySize)) {
            throw new TypeError("maxEntrySize must be a positive integer if specified");
          }
          this.#initializeSizeTracking();
        }
        this.allowStale = !!allowStale;
        this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
        this.updateAgeOnGet = !!updateAgeOnGet;
        this.updateAgeOnHas = !!updateAgeOnHas;
        this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
        this.ttlAutopurge = !!ttlAutopurge;
        this.ttl = ttl || 0;
        if (this.ttl) {
          if (!isPosInt(this.ttl)) {
            throw new TypeError("ttl must be a positive integer if specified");
          }
          this.#initializeTTLTracking();
        }
        if (this.#max === 0 && this.ttl === 0 && this.#maxSize === 0) {
          throw new TypeError("At least one of max, maxSize, or ttl is required");
        }
        if (!this.ttlAutopurge && !this.#max && !this.#maxSize) {
          const code = "LRU_CACHE_UNBOUNDED";
          if (shouldWarn(code)) {
            warned.add(code);
            const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
            emitWarning(msg, "UnboundedCacheWarning", code, LRUCache);
          }
        }
      }
      /**
       * Return the number of ms left in the item's TTL. If item is not in cache,
       * returns `0`. Returns `Infinity` if item is in cache without a defined TTL.
       */
      getRemainingTTL(key) {
        return this.#keyMap.has(key) ? Infinity : 0;
      }
      #initializeTTLTracking() {
        const ttls = new ZeroArray(this.#max);
        const starts = new ZeroArray(this.#max);
        this.#ttls = ttls;
        this.#starts = starts;
        this.#setItemTTL = (index, ttl, start = perf.now()) => {
          starts[index] = ttl !== 0 ? start : 0;
          ttls[index] = ttl;
          if (ttl !== 0 && this.ttlAutopurge) {
            const t2 = setTimeout(() => {
              if (this.#isStale(index)) {
                this.#delete(this.#keyList[index], "expire");
              }
            }, ttl + 1);
            if (t2.unref) {
              t2.unref();
            }
          }
        };
        this.#updateItemAge = (index) => {
          starts[index] = ttls[index] !== 0 ? perf.now() : 0;
        };
        this.#statusTTL = (status, index) => {
          if (ttls[index]) {
            const ttl = ttls[index];
            const start = starts[index];
            if (!ttl || !start)
              return;
            status.ttl = ttl;
            status.start = start;
            status.now = cachedNow || getNow();
            const age = status.now - start;
            status.remainingTTL = ttl - age;
          }
        };
        let cachedNow = 0;
        const getNow = /* @__PURE__ */ __name(() => {
          const n2 = perf.now();
          if (this.ttlResolution > 0) {
            cachedNow = n2;
            const t2 = setTimeout(() => cachedNow = 0, this.ttlResolution);
            if (t2.unref) {
              t2.unref();
            }
          }
          return n2;
        }, "getNow");
        this.getRemainingTTL = (key) => {
          const index = this.#keyMap.get(key);
          if (index === void 0) {
            return 0;
          }
          const ttl = ttls[index];
          const start = starts[index];
          if (!ttl || !start) {
            return Infinity;
          }
          const age = (cachedNow || getNow()) - start;
          return ttl - age;
        };
        this.#isStale = (index) => {
          const s = starts[index];
          const t2 = ttls[index];
          return !!t2 && !!s && (cachedNow || getNow()) - s > t2;
        };
      }
      // conditionally set private methods related to TTL
      #updateItemAge = () => {
      };
      #statusTTL = () => {
      };
      #setItemTTL = () => {
      };
      /* c8 ignore stop */
      #isStale = () => false;
      #initializeSizeTracking() {
        const sizes = new ZeroArray(this.#max);
        this.#calculatedSize = 0;
        this.#sizes = sizes;
        this.#removeItemSize = (index) => {
          this.#calculatedSize -= sizes[index];
          sizes[index] = 0;
        };
        this.#requireSize = (k, v, size, sizeCalculation) => {
          if (this.#isBackgroundFetch(v)) {
            return 0;
          }
          if (!isPosInt(size)) {
            if (sizeCalculation) {
              if (typeof sizeCalculation !== "function") {
                throw new TypeError("sizeCalculation must be a function");
              }
              size = sizeCalculation(v, k);
              if (!isPosInt(size)) {
                throw new TypeError("sizeCalculation return invalid (expect positive integer)");
              }
            } else {
              throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
            }
          }
          return size;
        };
        this.#addItemSize = (index, size, status) => {
          sizes[index] = size;
          if (this.#maxSize) {
            const maxSize = this.#maxSize - sizes[index];
            while (this.#calculatedSize > maxSize) {
              this.#evict(true);
            }
          }
          this.#calculatedSize += sizes[index];
          if (status) {
            status.entrySize = size;
            status.totalCalculatedSize = this.#calculatedSize;
          }
        };
      }
      #removeItemSize = (_i) => {
      };
      #addItemSize = (_i, _s, _st) => {
      };
      #requireSize = (_k, _v, size, sizeCalculation) => {
        if (size || sizeCalculation) {
          throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
        }
        return 0;
      };
      *#indexes({ allowStale = this.allowStale } = {}) {
        if (this.#size) {
          for (let i2 = this.#tail; true; ) {
            if (!this.#isValidIndex(i2)) {
              break;
            }
            if (allowStale || !this.#isStale(i2)) {
              yield i2;
            }
            if (i2 === this.#head) {
              break;
            } else {
              i2 = this.#prev[i2];
            }
          }
        }
      }
      *#rindexes({ allowStale = this.allowStale } = {}) {
        if (this.#size) {
          for (let i2 = this.#head; true; ) {
            if (!this.#isValidIndex(i2)) {
              break;
            }
            if (allowStale || !this.#isStale(i2)) {
              yield i2;
            }
            if (i2 === this.#tail) {
              break;
            } else {
              i2 = this.#next[i2];
            }
          }
        }
      }
      #isValidIndex(index) {
        return index !== void 0 && this.#keyMap.get(this.#keyList[index]) === index;
      }
      /**
       * Return a generator yielding `[key, value]` pairs,
       * in order from most recently used to least recently used.
       */
      *entries() {
        for (const i2 of this.#indexes()) {
          if (this.#valList[i2] !== void 0 && this.#keyList[i2] !== void 0 && !this.#isBackgroundFetch(this.#valList[i2])) {
            yield [this.#keyList[i2], this.#valList[i2]];
          }
        }
      }
      /**
       * Inverse order version of {@link LRUCache.entries}
       *
       * Return a generator yielding `[key, value]` pairs,
       * in order from least recently used to most recently used.
       */
      *rentries() {
        for (const i2 of this.#rindexes()) {
          if (this.#valList[i2] !== void 0 && this.#keyList[i2] !== void 0 && !this.#isBackgroundFetch(this.#valList[i2])) {
            yield [this.#keyList[i2], this.#valList[i2]];
          }
        }
      }
      /**
       * Return a generator yielding the keys in the cache,
       * in order from most recently used to least recently used.
       */
      *keys() {
        for (const i2 of this.#indexes()) {
          const k = this.#keyList[i2];
          if (k !== void 0 && !this.#isBackgroundFetch(this.#valList[i2])) {
            yield k;
          }
        }
      }
      /**
       * Inverse order version of {@link LRUCache.keys}
       *
       * Return a generator yielding the keys in the cache,
       * in order from least recently used to most recently used.
       */
      *rkeys() {
        for (const i2 of this.#rindexes()) {
          const k = this.#keyList[i2];
          if (k !== void 0 && !this.#isBackgroundFetch(this.#valList[i2])) {
            yield k;
          }
        }
      }
      /**
       * Return a generator yielding the values in the cache,
       * in order from most recently used to least recently used.
       */
      *values() {
        for (const i2 of this.#indexes()) {
          const v = this.#valList[i2];
          if (v !== void 0 && !this.#isBackgroundFetch(this.#valList[i2])) {
            yield this.#valList[i2];
          }
        }
      }
      /**
       * Inverse order version of {@link LRUCache.values}
       *
       * Return a generator yielding the values in the cache,
       * in order from least recently used to most recently used.
       */
      *rvalues() {
        for (const i2 of this.#rindexes()) {
          const v = this.#valList[i2];
          if (v !== void 0 && !this.#isBackgroundFetch(this.#valList[i2])) {
            yield this.#valList[i2];
          }
        }
      }
      /**
       * Iterating over the cache itself yields the same results as
       * {@link LRUCache.entries}
       */
      [Symbol.iterator]() {
        return this.entries();
      }
      /**
       * A String value that is used in the creation of the default string
       * description of an object. Called by the built-in method
       * `Object.prototype.toString`.
       */
      [Symbol.toStringTag] = "LRUCache";
      /**
       * Find a value for which the supplied fn method returns a truthy value,
       * similar to `Array.find()`. fn is called as `fn(value, key, cache)`.
       */
      find(fn, getOptions = {}) {
        for (const i2 of this.#indexes()) {
          const v = this.#valList[i2];
          const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          if (value === void 0)
            continue;
          if (fn(value, this.#keyList[i2], this)) {
            return this.get(this.#keyList[i2], getOptions);
          }
        }
      }
      /**
       * Call the supplied function on each item in the cache, in order from most
       * recently used to least recently used.
       *
       * `fn` is called as `fn(value, key, cache)`.
       *
       * If `thisp` is provided, function will be called in the `this`-context of
       * the provided object, or the cache if no `thisp` object is provided.
       *
       * Does not update age or recenty of use, or iterate over stale values.
       */
      forEach(fn, thisp = this) {
        for (const i2 of this.#indexes()) {
          const v = this.#valList[i2];
          const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          if (value === void 0)
            continue;
          fn.call(thisp, value, this.#keyList[i2], this);
        }
      }
      /**
       * The same as {@link LRUCache.forEach} but items are iterated over in
       * reverse order.  (ie, less recently used items are iterated over first.)
       */
      rforEach(fn, thisp = this) {
        for (const i2 of this.#rindexes()) {
          const v = this.#valList[i2];
          const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          if (value === void 0)
            continue;
          fn.call(thisp, value, this.#keyList[i2], this);
        }
      }
      /**
       * Delete any stale entries. Returns true if anything was removed,
       * false otherwise.
       */
      purgeStale() {
        let deleted = false;
        for (const i2 of this.#rindexes({ allowStale: true })) {
          if (this.#isStale(i2)) {
            this.#delete(this.#keyList[i2], "expire");
            deleted = true;
          }
        }
        return deleted;
      }
      /**
       * Get the extended info about a given entry, to get its value, size, and
       * TTL info simultaneously. Returns `undefined` if the key is not present.
       *
       * Unlike {@link LRUCache#dump}, which is designed to be portable and survive
       * serialization, the `start` value is always the current timestamp, and the
       * `ttl` is a calculated remaining time to live (negative if expired).
       *
       * Always returns stale values, if their info is found in the cache, so be
       * sure to check for expirations (ie, a negative {@link LRUCache.Entry#ttl})
       * if relevant.
       */
      info(key) {
        const i2 = this.#keyMap.get(key);
        if (i2 === void 0)
          return void 0;
        const v = this.#valList[i2];
        const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
        if (value === void 0)
          return void 0;
        const entry = { value };
        if (this.#ttls && this.#starts) {
          const ttl = this.#ttls[i2];
          const start = this.#starts[i2];
          if (ttl && start) {
            const remain = ttl - (perf.now() - start);
            entry.ttl = remain;
            entry.start = Date.now();
          }
        }
        if (this.#sizes) {
          entry.size = this.#sizes[i2];
        }
        return entry;
      }
      /**
       * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
       * passed to {@link LRUCache#load}.
       *
       * The `start` fields are calculated relative to a portable `Date.now()`
       * timestamp, even if `performance.now()` is available.
       *
       * Stale entries are always included in the `dump`, even if
       * {@link LRUCache.OptionsBase.allowStale} is false.
       *
       * Note: this returns an actual array, not a generator, so it can be more
       * easily passed around.
       */
      dump() {
        const arr = [];
        for (const i2 of this.#indexes({ allowStale: true })) {
          const key = this.#keyList[i2];
          const v = this.#valList[i2];
          const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          if (value === void 0 || key === void 0)
            continue;
          const entry = { value };
          if (this.#ttls && this.#starts) {
            entry.ttl = this.#ttls[i2];
            const age = perf.now() - this.#starts[i2];
            entry.start = Math.floor(Date.now() - age);
          }
          if (this.#sizes) {
            entry.size = this.#sizes[i2];
          }
          arr.unshift([key, entry]);
        }
        return arr;
      }
      /**
       * Reset the cache and load in the items in entries in the order listed.
       *
       * The shape of the resulting cache may be different if the same options are
       * not used in both caches.
       *
       * The `start` fields are assumed to be calculated relative to a portable
       * `Date.now()` timestamp, even if `performance.now()` is available.
       */
      load(arr) {
        this.clear();
        for (const [key, entry] of arr) {
          if (entry.start) {
            const age = Date.now() - entry.start;
            entry.start = perf.now() - age;
          }
          this.set(key, entry.value, entry);
        }
      }
      /**
       * Add a value to the cache.
       *
       * Note: if `undefined` is specified as a value, this is an alias for
       * {@link LRUCache#delete}
       *
       * Fields on the {@link LRUCache.SetOptions} options param will override
       * their corresponding values in the constructor options for the scope
       * of this single `set()` operation.
       *
       * If `start` is provided, then that will set the effective start
       * time for the TTL calculation. Note that this must be a previous
       * value of `performance.now()` if supported, or a previous value of
       * `Date.now()` if not.
       *
       * Options object may also include `size`, which will prevent
       * calling the `sizeCalculation` function and just use the specified
       * number if it is a positive integer, and `noDisposeOnSet` which
       * will prevent calling a `dispose` function in the case of
       * overwrites.
       *
       * If the `size` (or return value of `sizeCalculation`) for a given
       * entry is greater than `maxEntrySize`, then the item will not be
       * added to the cache.
       *
       * Will update the recency of the entry.
       *
       * If the value is `undefined`, then this is an alias for
       * `cache.delete(key)`. `undefined` is never stored in the cache.
       */
      set(k, v, setOptions = {}) {
        if (v === void 0) {
          this.delete(k);
          return this;
        }
        const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
        let { noUpdateTTL = this.noUpdateTTL } = setOptions;
        const size = this.#requireSize(k, v, setOptions.size || 0, sizeCalculation);
        if (this.maxEntrySize && size > this.maxEntrySize) {
          if (status) {
            status.set = "miss";
            status.maxEntrySizeExceeded = true;
          }
          this.#delete(k, "set");
          return this;
        }
        let index = this.#size === 0 ? void 0 : this.#keyMap.get(k);
        if (index === void 0) {
          index = this.#size === 0 ? this.#tail : this.#free.length !== 0 ? this.#free.pop() : this.#size === this.#max ? this.#evict(false) : this.#size;
          this.#keyList[index] = k;
          this.#valList[index] = v;
          this.#keyMap.set(k, index);
          this.#next[this.#tail] = index;
          this.#prev[index] = this.#tail;
          this.#tail = index;
          this.#size++;
          this.#addItemSize(index, size, status);
          if (status)
            status.set = "add";
          noUpdateTTL = false;
        } else {
          this.#moveToTail(index);
          const oldVal = this.#valList[index];
          if (v !== oldVal) {
            if (this.#hasFetchMethod && this.#isBackgroundFetch(oldVal)) {
              oldVal.__abortController.abort(new Error("replaced"));
              const { __staleWhileFetching: s } = oldVal;
              if (s !== void 0 && !noDisposeOnSet) {
                if (this.#hasDispose) {
                  this.#dispose?.(s, k, "set");
                }
                if (this.#hasDisposeAfter) {
                  this.#disposed?.push([s, k, "set"]);
                }
              }
            } else if (!noDisposeOnSet) {
              if (this.#hasDispose) {
                this.#dispose?.(oldVal, k, "set");
              }
              if (this.#hasDisposeAfter) {
                this.#disposed?.push([oldVal, k, "set"]);
              }
            }
            this.#removeItemSize(index);
            this.#addItemSize(index, size, status);
            this.#valList[index] = v;
            if (status) {
              status.set = "replace";
              const oldValue = oldVal && this.#isBackgroundFetch(oldVal) ? oldVal.__staleWhileFetching : oldVal;
              if (oldValue !== void 0)
                status.oldValue = oldValue;
            }
          } else if (status) {
            status.set = "update";
          }
        }
        if (ttl !== 0 && !this.#ttls) {
          this.#initializeTTLTracking();
        }
        if (this.#ttls) {
          if (!noUpdateTTL) {
            this.#setItemTTL(index, ttl, start);
          }
          if (status)
            this.#statusTTL(status, index);
        }
        if (!noDisposeOnSet && this.#hasDisposeAfter && this.#disposed) {
          const dt = this.#disposed;
          let task;
          while (task = dt?.shift()) {
            this.#disposeAfter?.(...task);
          }
        }
        return this;
      }
      /**
       * Evict the least recently used item, returning its value or
       * `undefined` if cache is empty.
       */
      pop() {
        try {
          while (this.#size) {
            const val = this.#valList[this.#head];
            this.#evict(true);
            if (this.#isBackgroundFetch(val)) {
              if (val.__staleWhileFetching) {
                return val.__staleWhileFetching;
              }
            } else if (val !== void 0) {
              return val;
            }
          }
        } finally {
          if (this.#hasDisposeAfter && this.#disposed) {
            const dt = this.#disposed;
            let task;
            while (task = dt?.shift()) {
              this.#disposeAfter?.(...task);
            }
          }
        }
      }
      #evict(free) {
        const head = this.#head;
        const k = this.#keyList[head];
        const v = this.#valList[head];
        if (this.#hasFetchMethod && this.#isBackgroundFetch(v)) {
          v.__abortController.abort(new Error("evicted"));
        } else if (this.#hasDispose || this.#hasDisposeAfter) {
          if (this.#hasDispose) {
            this.#dispose?.(v, k, "evict");
          }
          if (this.#hasDisposeAfter) {
            this.#disposed?.push([v, k, "evict"]);
          }
        }
        this.#removeItemSize(head);
        if (free) {
          this.#keyList[head] = void 0;
          this.#valList[head] = void 0;
          this.#free.push(head);
        }
        if (this.#size === 1) {
          this.#head = this.#tail = 0;
          this.#free.length = 0;
        } else {
          this.#head = this.#next[head];
        }
        this.#keyMap.delete(k);
        this.#size--;
        return head;
      }
      /**
       * Check if a key is in the cache, without updating the recency of use.
       * Will return false if the item is stale, even though it is technically
       * in the cache.
       *
       * Check if a key is in the cache, without updating the recency of
       * use. Age is updated if {@link LRUCache.OptionsBase.updateAgeOnHas} is set
       * to `true` in either the options or the constructor.
       *
       * Will return `false` if the item is stale, even though it is technically in
       * the cache. The difference can be determined (if it matters) by using a
       * `status` argument, and inspecting the `has` field.
       *
       * Will not update item age unless
       * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
       */
      has(k, hasOptions = {}) {
        const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
        const index = this.#keyMap.get(k);
        if (index !== void 0) {
          const v = this.#valList[index];
          if (this.#isBackgroundFetch(v) && v.__staleWhileFetching === void 0) {
            return false;
          }
          if (!this.#isStale(index)) {
            if (updateAgeOnHas) {
              this.#updateItemAge(index);
            }
            if (status) {
              status.has = "hit";
              this.#statusTTL(status, index);
            }
            return true;
          } else if (status) {
            status.has = "stale";
            this.#statusTTL(status, index);
          }
        } else if (status) {
          status.has = "miss";
        }
        return false;
      }
      /**
       * Like {@link LRUCache#get} but doesn't update recency or delete stale
       * items.
       *
       * Returns `undefined` if the item is stale, unless
       * {@link LRUCache.OptionsBase.allowStale} is set.
       */
      peek(k, peekOptions = {}) {
        const { allowStale = this.allowStale } = peekOptions;
        const index = this.#keyMap.get(k);
        if (index === void 0 || !allowStale && this.#isStale(index)) {
          return;
        }
        const v = this.#valList[index];
        return this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      }
      #backgroundFetch(k, index, options, context) {
        const v = index === void 0 ? void 0 : this.#valList[index];
        if (this.#isBackgroundFetch(v)) {
          return v;
        }
        const ac = new AC();
        const { signal } = options;
        signal?.addEventListener("abort", () => ac.abort(signal.reason), {
          signal: ac.signal
        });
        const fetchOpts = {
          signal: ac.signal,
          options,
          context
        };
        const cb = /* @__PURE__ */ __name((v2, updateCache = false) => {
          const { aborted } = ac.signal;
          const ignoreAbort = options.ignoreFetchAbort && v2 !== void 0;
          if (options.status) {
            if (aborted && !updateCache) {
              options.status.fetchAborted = true;
              options.status.fetchError = ac.signal.reason;
              if (ignoreAbort)
                options.status.fetchAbortIgnored = true;
            } else {
              options.status.fetchResolved = true;
            }
          }
          if (aborted && !ignoreAbort && !updateCache) {
            return fetchFail(ac.signal.reason);
          }
          const bf2 = p;
          if (this.#valList[index] === p) {
            if (v2 === void 0) {
              if (bf2.__staleWhileFetching) {
                this.#valList[index] = bf2.__staleWhileFetching;
              } else {
                this.#delete(k, "fetch");
              }
            } else {
              if (options.status)
                options.status.fetchUpdated = true;
              this.set(k, v2, fetchOpts.options);
            }
          }
          return v2;
        }, "cb");
        const eb = /* @__PURE__ */ __name((er) => {
          if (options.status) {
            options.status.fetchRejected = true;
            options.status.fetchError = er;
          }
          return fetchFail(er);
        }, "eb");
        const fetchFail = /* @__PURE__ */ __name((er) => {
          const { aborted } = ac.signal;
          const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
          const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
          const noDelete = allowStale || options.noDeleteOnFetchRejection;
          const bf2 = p;
          if (this.#valList[index] === p) {
            const del = !noDelete || bf2.__staleWhileFetching === void 0;
            if (del) {
              this.#delete(k, "fetch");
            } else if (!allowStaleAborted) {
              this.#valList[index] = bf2.__staleWhileFetching;
            }
          }
          if (allowStale) {
            if (options.status && bf2.__staleWhileFetching !== void 0) {
              options.status.returnedStale = true;
            }
            return bf2.__staleWhileFetching;
          } else if (bf2.__returned === bf2) {
            throw er;
          }
        }, "fetchFail");
        const pcall = /* @__PURE__ */ __name((res, rej) => {
          const fmp = this.#fetchMethod?.(k, v, fetchOpts);
          if (fmp && fmp instanceof Promise) {
            fmp.then((v2) => res(v2 === void 0 ? void 0 : v2), rej);
          }
          ac.signal.addEventListener("abort", () => {
            if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
              res(void 0);
              if (options.allowStaleOnFetchAbort) {
                res = /* @__PURE__ */ __name((v2) => cb(v2, true), "res");
              }
            }
          });
        }, "pcall");
        if (options.status)
          options.status.fetchDispatched = true;
        const p = new Promise(pcall).then(cb, eb);
        const bf = Object.assign(p, {
          __abortController: ac,
          __staleWhileFetching: v,
          __returned: void 0
        });
        if (index === void 0) {
          this.set(k, bf, { ...fetchOpts.options, status: void 0 });
          index = this.#keyMap.get(k);
        } else {
          this.#valList[index] = bf;
        }
        return bf;
      }
      #isBackgroundFetch(p) {
        if (!this.#hasFetchMethod)
          return false;
        const b = p;
        return !!b && b instanceof Promise && b.hasOwnProperty("__staleWhileFetching") && b.__abortController instanceof AC;
      }
      async fetch(k, fetchOptions = {}) {
        const {
          // get options
          allowStale = this.allowStale,
          updateAgeOnGet = this.updateAgeOnGet,
          noDeleteOnStaleGet = this.noDeleteOnStaleGet,
          // set options
          ttl = this.ttl,
          noDisposeOnSet = this.noDisposeOnSet,
          size = 0,
          sizeCalculation = this.sizeCalculation,
          noUpdateTTL = this.noUpdateTTL,
          // fetch exclusive options
          noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
          allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
          ignoreFetchAbort = this.ignoreFetchAbort,
          allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
          context,
          forceRefresh = false,
          status,
          signal
        } = fetchOptions;
        if (!this.#hasFetchMethod) {
          if (status)
            status.fetch = "get";
          return this.get(k, {
            allowStale,
            updateAgeOnGet,
            noDeleteOnStaleGet,
            status
          });
        }
        const options = {
          allowStale,
          updateAgeOnGet,
          noDeleteOnStaleGet,
          ttl,
          noDisposeOnSet,
          size,
          sizeCalculation,
          noUpdateTTL,
          noDeleteOnFetchRejection,
          allowStaleOnFetchRejection,
          allowStaleOnFetchAbort,
          ignoreFetchAbort,
          status,
          signal
        };
        let index = this.#keyMap.get(k);
        if (index === void 0) {
          if (status)
            status.fetch = "miss";
          const p = this.#backgroundFetch(k, index, options, context);
          return p.__returned = p;
        } else {
          const v = this.#valList[index];
          if (this.#isBackgroundFetch(v)) {
            const stale = allowStale && v.__staleWhileFetching !== void 0;
            if (status) {
              status.fetch = "inflight";
              if (stale)
                status.returnedStale = true;
            }
            return stale ? v.__staleWhileFetching : v.__returned = v;
          }
          const isStale = this.#isStale(index);
          if (!forceRefresh && !isStale) {
            if (status)
              status.fetch = "hit";
            this.#moveToTail(index);
            if (updateAgeOnGet) {
              this.#updateItemAge(index);
            }
            if (status)
              this.#statusTTL(status, index);
            return v;
          }
          const p = this.#backgroundFetch(k, index, options, context);
          const hasStale = p.__staleWhileFetching !== void 0;
          const staleVal = hasStale && allowStale;
          if (status) {
            status.fetch = isStale ? "stale" : "refresh";
            if (staleVal && isStale)
              status.returnedStale = true;
          }
          return staleVal ? p.__staleWhileFetching : p.__returned = p;
        }
      }
      async forceFetch(k, fetchOptions = {}) {
        const v = await this.fetch(k, fetchOptions);
        if (v === void 0)
          throw new Error("fetch() returned undefined");
        return v;
      }
      memo(k, memoOptions = {}) {
        const memoMethod = this.#memoMethod;
        if (!memoMethod) {
          throw new Error("no memoMethod provided to constructor");
        }
        const { context, forceRefresh, ...options } = memoOptions;
        const v = this.get(k, options);
        if (!forceRefresh && v !== void 0)
          return v;
        const vv = memoMethod(k, v, {
          options,
          context
        });
        this.set(k, vv, options);
        return vv;
      }
      /**
       * Return a value from the cache. Will update the recency of the cache
       * entry found.
       *
       * If the key is not found, get() will return `undefined`.
       */
      get(k, getOptions = {}) {
        const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
        const index = this.#keyMap.get(k);
        if (index !== void 0) {
          const value = this.#valList[index];
          const fetching = this.#isBackgroundFetch(value);
          if (status)
            this.#statusTTL(status, index);
          if (this.#isStale(index)) {
            if (status)
              status.get = "stale";
            if (!fetching) {
              if (!noDeleteOnStaleGet) {
                this.#delete(k, "expire");
              }
              if (status && allowStale)
                status.returnedStale = true;
              return allowStale ? value : void 0;
            } else {
              if (status && allowStale && value.__staleWhileFetching !== void 0) {
                status.returnedStale = true;
              }
              return allowStale ? value.__staleWhileFetching : void 0;
            }
          } else {
            if (status)
              status.get = "hit";
            if (fetching) {
              return value.__staleWhileFetching;
            }
            this.#moveToTail(index);
            if (updateAgeOnGet) {
              this.#updateItemAge(index);
            }
            return value;
          }
        } else if (status) {
          status.get = "miss";
        }
      }
      #connect(p, n2) {
        this.#prev[n2] = p;
        this.#next[p] = n2;
      }
      #moveToTail(index) {
        if (index !== this.#tail) {
          if (index === this.#head) {
            this.#head = this.#next[index];
          } else {
            this.#connect(this.#prev[index], this.#next[index]);
          }
          this.#connect(this.#tail, index);
          this.#tail = index;
        }
      }
      /**
       * Deletes a key out of the cache.
       *
       * Returns true if the key was deleted, false otherwise.
       */
      delete(k) {
        return this.#delete(k, "delete");
      }
      #delete(k, reason) {
        let deleted = false;
        if (this.#size !== 0) {
          const index = this.#keyMap.get(k);
          if (index !== void 0) {
            deleted = true;
            if (this.#size === 1) {
              this.#clear(reason);
            } else {
              this.#removeItemSize(index);
              const v = this.#valList[index];
              if (this.#isBackgroundFetch(v)) {
                v.__abortController.abort(new Error("deleted"));
              } else if (this.#hasDispose || this.#hasDisposeAfter) {
                if (this.#hasDispose) {
                  this.#dispose?.(v, k, reason);
                }
                if (this.#hasDisposeAfter) {
                  this.#disposed?.push([v, k, reason]);
                }
              }
              this.#keyMap.delete(k);
              this.#keyList[index] = void 0;
              this.#valList[index] = void 0;
              if (index === this.#tail) {
                this.#tail = this.#prev[index];
              } else if (index === this.#head) {
                this.#head = this.#next[index];
              } else {
                const pi = this.#prev[index];
                this.#next[pi] = this.#next[index];
                const ni = this.#next[index];
                this.#prev[ni] = this.#prev[index];
              }
              this.#size--;
              this.#free.push(index);
            }
          }
        }
        if (this.#hasDisposeAfter && this.#disposed?.length) {
          const dt = this.#disposed;
          let task;
          while (task = dt?.shift()) {
            this.#disposeAfter?.(...task);
          }
        }
        return deleted;
      }
      /**
       * Clear the cache entirely, throwing away all values.
       */
      clear() {
        return this.#clear("delete");
      }
      #clear(reason) {
        for (const index of this.#rindexes({ allowStale: true })) {
          const v = this.#valList[index];
          if (this.#isBackgroundFetch(v)) {
            v.__abortController.abort(new Error("deleted"));
          } else {
            const k = this.#keyList[index];
            if (this.#hasDispose) {
              this.#dispose?.(v, k, reason);
            }
            if (this.#hasDisposeAfter) {
              this.#disposed?.push([v, k, reason]);
            }
          }
        }
        this.#keyMap.clear();
        this.#valList.fill(void 0);
        this.#keyList.fill(void 0);
        if (this.#ttls && this.#starts) {
          this.#ttls.fill(0);
          this.#starts.fill(0);
        }
        if (this.#sizes) {
          this.#sizes.fill(0);
        }
        this.#head = 0;
        this.#tail = 0;
        this.#free.length = 0;
        this.#calculatedSize = 0;
        this.#size = 0;
        if (this.#hasDisposeAfter && this.#disposed) {
          const dt = this.#disposed;
          let task;
          while (task = dt?.shift()) {
            this.#disposeAfter?.(...task);
          }
        }
      }
    };
    __name(LRUCache, "LRUCache");
    exports.LRUCache = LRUCache;
  }
});

// ../../node_modules/.pnpm/@octokit+auth-app@6.1.4/node_modules/@octokit/auth-app/dist-node/index.js
var require_dist_node6 = __commonJS({
  "../../node_modules/.pnpm/@octokit+auth-app@6.1.4/node_modules/@octokit/auth-app/dist-node/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var __create2 = Object.create;
    var __defProp3 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf3 = Object.getPrototypeOf;
    var __hasOwnProp3 = Object.prototype.hasOwnProperty;
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp3(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp3.call(to, key) && key !== except)
            __defProp3(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toESM2 = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf3(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp3(target, "default", { value: mod, enumerable: true }) : target,
      mod
    )), "__toESM");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp3({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var dist_src_exports = {};
    __export2(dist_src_exports, {
      createAppAuth: () => createAppAuth4,
      createOAuthUserAuth: () => import_auth_oauth_user22.createOAuthUserAuth
    });
    module.exports = __toCommonJS2(dist_src_exports);
    var import_universal_user_agent6 = require_dist_node();
    var import_request6 = (init_dist_web3(), __toCommonJS(dist_web_exports2));
    var import_auth_oauth_app = (init_dist_web8(), __toCommonJS(dist_web_exports6));
    var import_deprecation2 = require_dist_node2();
    var OAuthAppAuth = __toESM2((init_dist_web8(), __toCommonJS(dist_web_exports6)));
    var import_universal_github_app_jwt = (init_index_bundled(), __toCommonJS(index_bundled_exports));
    async function getAppAuthentication({
      appId,
      privateKey,
      timeDifference
    }) {
      try {
        const appAuthentication = await (0, import_universal_github_app_jwt.githubAppJwt)({
          id: +appId,
          privateKey,
          now: timeDifference && Math.floor(Date.now() / 1e3) + timeDifference
        });
        return {
          type: "app",
          token: appAuthentication.token,
          appId: appAuthentication.appId,
          expiresAt: new Date(appAuthentication.expiration * 1e3).toISOString()
        };
      } catch (error) {
        if (privateKey === "-----BEGIN RSA PRIVATE KEY-----") {
          throw new Error(
            "The 'privateKey` option contains only the first line '-----BEGIN RSA PRIVATE KEY-----'. If you are setting it using a `.env` file, make sure it is set on a single line with newlines replaced by '\n'"
          );
        } else {
          throw error;
        }
      }
    }
    __name(getAppAuthentication, "getAppAuthentication");
    var import_lru_cache = require_commonjs();
    function getCache() {
      return new import_lru_cache.LRUCache({
        // cache max. 15000 tokens, that will use less than 10mb memory
        max: 15e3,
        // Cache for 1 minute less than GitHub expiry
        ttl: 1e3 * 60 * 59
      });
    }
    __name(getCache, "getCache");
    async function get(cache, options) {
      const cacheKey = optionsToCacheKey(options);
      const result = await cache.get(cacheKey);
      if (!result) {
        return;
      }
      const [
        token,
        createdAt,
        expiresAt,
        repositorySelection,
        permissionsString,
        singleFileName
      ] = result.split("|");
      const permissions = options.permissions || permissionsString.split(/,/).reduce((permissions2, string) => {
        if (/!$/.test(string)) {
          permissions2[string.slice(0, -1)] = "write";
        } else {
          permissions2[string] = "read";
        }
        return permissions2;
      }, {});
      return {
        token,
        createdAt,
        expiresAt,
        permissions,
        repositoryIds: options.repositoryIds,
        repositoryNames: options.repositoryNames,
        singleFileName,
        repositorySelection
      };
    }
    __name(get, "get");
    async function set(cache, options, data) {
      const key = optionsToCacheKey(options);
      const permissionsString = options.permissions ? "" : Object.keys(data.permissions).map(
        (name) => `${name}${data.permissions[name] === "write" ? "!" : ""}`
      ).join(",");
      const value = [
        data.token,
        data.createdAt,
        data.expiresAt,
        data.repositorySelection,
        permissionsString,
        data.singleFileName
      ].join("|");
      await cache.set(key, value);
    }
    __name(set, "set");
    function optionsToCacheKey({
      installationId,
      permissions = {},
      repositoryIds = [],
      repositoryNames = []
    }) {
      const permissionsString = Object.keys(permissions).sort().map((name) => permissions[name] === "read" ? name : `${name}!`).join(",");
      const repositoryIdsString = repositoryIds.sort().join(",");
      const repositoryNamesString = repositoryNames.join(",");
      return [
        installationId,
        repositoryIdsString,
        repositoryNamesString,
        permissionsString
      ].filter(Boolean).join("|");
    }
    __name(optionsToCacheKey, "optionsToCacheKey");
    function toTokenAuthentication({
      installationId,
      token,
      createdAt,
      expiresAt,
      repositorySelection,
      permissions,
      repositoryIds,
      repositoryNames,
      singleFileName
    }) {
      return Object.assign(
        {
          type: "token",
          tokenType: "installation",
          token,
          installationId,
          permissions,
          createdAt,
          expiresAt,
          repositorySelection
        },
        repositoryIds ? { repositoryIds } : null,
        repositoryNames ? { repositoryNames } : null,
        singleFileName ? { singleFileName } : null
      );
    }
    __name(toTokenAuthentication, "toTokenAuthentication");
    async function getInstallationAuthentication(state, options, customRequest) {
      const installationId = Number(options.installationId || state.installationId);
      if (!installationId) {
        throw new Error(
          "[@octokit/auth-app] installationId option is required for installation authentication."
        );
      }
      if (options.factory) {
        const { type: type2, factory, oauthApp, ...factoryAuthOptions } = {
          ...state,
          ...options
        };
        return factory(factoryAuthOptions);
      }
      const optionsWithInstallationTokenFromState = Object.assign(
        { installationId },
        options
      );
      if (!options.refresh) {
        const result = await get(
          state.cache,
          optionsWithInstallationTokenFromState
        );
        if (result) {
          const {
            token: token2,
            createdAt: createdAt2,
            expiresAt: expiresAt2,
            permissions: permissions2,
            repositoryIds: repositoryIds2,
            repositoryNames: repositoryNames2,
            singleFileName: singleFileName2,
            repositorySelection: repositorySelection2
          } = result;
          return toTokenAuthentication({
            installationId,
            token: token2,
            createdAt: createdAt2,
            expiresAt: expiresAt2,
            permissions: permissions2,
            repositorySelection: repositorySelection2,
            repositoryIds: repositoryIds2,
            repositoryNames: repositoryNames2,
            singleFileName: singleFileName2
          });
        }
      }
      const appAuthentication = await getAppAuthentication(state);
      const request2 = customRequest || state.request;
      const {
        data: {
          token,
          expires_at: expiresAt,
          repositories,
          permissions: permissionsOptional,
          repository_selection: repositorySelectionOptional,
          single_file: singleFileName
        }
      } = await request2("POST /app/installations/{installation_id}/access_tokens", {
        installation_id: installationId,
        repository_ids: options.repositoryIds,
        repositories: options.repositoryNames,
        permissions: options.permissions,
        mediaType: {
          previews: ["machine-man"]
        },
        headers: {
          authorization: `bearer ${appAuthentication.token}`
        }
      });
      const permissions = permissionsOptional || {};
      const repositorySelection = repositorySelectionOptional || "all";
      const repositoryIds = repositories ? repositories.map((r2) => r2.id) : void 0;
      const repositoryNames = repositories ? repositories.map((repo) => repo.name) : void 0;
      const createdAt = (/* @__PURE__ */ new Date()).toISOString();
      await set(state.cache, optionsWithInstallationTokenFromState, {
        token,
        createdAt,
        expiresAt,
        repositorySelection,
        permissions,
        repositoryIds,
        repositoryNames,
        singleFileName
      });
      return toTokenAuthentication({
        installationId,
        token,
        createdAt,
        expiresAt,
        repositorySelection,
        permissions,
        repositoryIds,
        repositoryNames,
        singleFileName
      });
    }
    __name(getInstallationAuthentication, "getInstallationAuthentication");
    async function auth5(state, authOptions) {
      switch (authOptions.type) {
        case "app":
          return getAppAuthentication(state);
        case "oauth":
          state.log.warn(
            // @ts-expect-error `log.warn()` expects string
            new import_deprecation2.Deprecation(
              `[@octokit/auth-app] {type: "oauth"} is deprecated. Use {type: "oauth-app"} instead`
            )
          );
        case "oauth-app":
          return state.oauthApp({ type: "oauth-app" });
        case "installation":
          authOptions;
          return getInstallationAuthentication(state, {
            ...authOptions,
            type: "installation"
          });
        case "oauth-user":
          return state.oauthApp(authOptions);
        default:
          throw new Error(`Invalid auth type: ${authOptions.type}`);
      }
    }
    __name(auth5, "auth");
    var import_auth_oauth_user4 = (init_dist_web7(), __toCommonJS(dist_web_exports5));
    var import_request_error2 = (init_dist_web2(), __toCommonJS(dist_web_exports));
    var PATHS = [
      "/app",
      "/app/hook/config",
      "/app/hook/deliveries",
      "/app/hook/deliveries/{delivery_id}",
      "/app/hook/deliveries/{delivery_id}/attempts",
      "/app/installations",
      "/app/installations/{installation_id}",
      "/app/installations/{installation_id}/access_tokens",
      "/app/installations/{installation_id}/suspended",
      "/app/installation-requests",
      "/marketplace_listing/accounts/{account_id}",
      "/marketplace_listing/plan",
      "/marketplace_listing/plans",
      "/marketplace_listing/plans/{plan_id}/accounts",
      "/marketplace_listing/stubbed/accounts/{account_id}",
      "/marketplace_listing/stubbed/plan",
      "/marketplace_listing/stubbed/plans",
      "/marketplace_listing/stubbed/plans/{plan_id}/accounts",
      "/orgs/{org}/installation",
      "/repos/{owner}/{repo}/installation",
      "/users/{username}/installation"
    ];
    function routeMatcher(paths) {
      const regexes = paths.map(
        (p) => p.split("/").map((c) => c.startsWith("{") ? "(?:.+?)" : c).join("/")
      );
      const regex = `^(?:${regexes.map((r2) => `(?:${r2})`).join("|")})$`;
      return new RegExp(regex, "i");
    }
    __name(routeMatcher, "routeMatcher");
    var REGEX = routeMatcher(PATHS);
    function requiresAppAuth(url) {
      return !!url && REGEX.test(url.split("?")[0]);
    }
    __name(requiresAppAuth, "requiresAppAuth");
    var FIVE_SECONDS_IN_MS = 5 * 1e3;
    function isNotTimeSkewError(error) {
      return !(error.message.match(
        /'Expiration time' claim \('exp'\) must be a numeric value representing the future time at which the assertion expires/
      ) || error.message.match(
        /'Issued at' claim \('iat'\) must be an Integer representing the time that the assertion was issued/
      ));
    }
    __name(isNotTimeSkewError, "isNotTimeSkewError");
    async function hook5(state, request2, route, parameters) {
      const endpoint2 = request2.endpoint.merge(route, parameters);
      const url = endpoint2.url;
      if (/\/login\/oauth\/access_token$/.test(url)) {
        return request2(endpoint2);
      }
      if (requiresAppAuth(url.replace(request2.endpoint.DEFAULTS.baseUrl, ""))) {
        const { token: token2 } = await getAppAuthentication(state);
        endpoint2.headers.authorization = `bearer ${token2}`;
        let response;
        try {
          response = await request2(endpoint2);
        } catch (error) {
          if (isNotTimeSkewError(error)) {
            throw error;
          }
          if (typeof error.response.headers.date === "undefined") {
            throw error;
          }
          const diff = Math.floor(
            (Date.parse(error.response.headers.date) - Date.parse((/* @__PURE__ */ new Date()).toString())) / 1e3
          );
          state.log.warn(error.message);
          state.log.warn(
            `[@octokit/auth-app] GitHub API time and system time are different by ${diff} seconds. Retrying request with the difference accounted for.`
          );
          const { token: token3 } = await getAppAuthentication({
            ...state,
            timeDifference: diff
          });
          endpoint2.headers.authorization = `bearer ${token3}`;
          return request2(endpoint2);
        }
        return response;
      }
      if ((0, import_auth_oauth_user4.requiresBasicAuth)(url)) {
        const authentication = await state.oauthApp({ type: "oauth-app" });
        endpoint2.headers.authorization = authentication.headers.authorization;
        return request2(endpoint2);
      }
      const { token, createdAt } = await getInstallationAuthentication(
        state,
        // @ts-expect-error TBD
        {},
        request2.defaults({ baseUrl: endpoint2.baseUrl })
      );
      endpoint2.headers.authorization = `token ${token}`;
      return sendRequestWithRetries(
        state,
        request2,
        endpoint2,
        createdAt
      );
    }
    __name(hook5, "hook");
    async function sendRequestWithRetries(state, request2, options, createdAt, retries = 0) {
      const timeSinceTokenCreationInMs = +/* @__PURE__ */ new Date() - +new Date(createdAt);
      try {
        return await request2(options);
      } catch (error) {
        if (error.status !== 401) {
          throw error;
        }
        if (timeSinceTokenCreationInMs >= FIVE_SECONDS_IN_MS) {
          if (retries > 0) {
            error.message = `After ${retries} retries within ${timeSinceTokenCreationInMs / 1e3}s of creating the installation access token, the response remains 401. At this point, the cause may be an authentication problem or a system outage. Please check https://www.githubstatus.com for status information`;
          }
          throw error;
        }
        ++retries;
        const awaitTime = retries * 1e3;
        state.log.warn(
          `[@octokit/auth-app] Retrying after 401 response to account for token replication delay (retry: ${retries}, wait: ${awaitTime / 1e3}s)`
        );
        await new Promise((resolve) => setTimeout(resolve, awaitTime));
        return sendRequestWithRetries(state, request2, options, createdAt, retries);
      }
    }
    __name(sendRequestWithRetries, "sendRequestWithRetries");
    var VERSION8 = "6.1.4";
    var import_auth_oauth_user22 = (init_dist_web7(), __toCommonJS(dist_web_exports5));
    function createAppAuth4(options) {
      if (!options.appId) {
        throw new Error("[@octokit/auth-app] appId option is required");
      }
      if (!Number.isFinite(+options.appId)) {
        throw new Error(
          "[@octokit/auth-app] appId option must be a number or numeric string"
        );
      }
      if (!options.privateKey) {
        throw new Error("[@octokit/auth-app] privateKey option is required");
      }
      if ("installationId" in options && !options.installationId) {
        throw new Error(
          "[@octokit/auth-app] installationId is set to a falsy value"
        );
      }
      const log = options.log || {};
      if (typeof log.warn !== "function") {
        log.warn = console.warn.bind(console);
      }
      const request2 = options.request || import_request6.request.defaults({
        headers: {
          "user-agent": `octokit-auth-app.js/${VERSION8} ${(0, import_universal_user_agent6.getUserAgent)()}`
        }
      });
      const state = Object.assign(
        {
          request: request2,
          cache: getCache()
        },
        options,
        options.installationId ? { installationId: Number(options.installationId) } : {},
        {
          log,
          oauthApp: (0, import_auth_oauth_app.createOAuthAppAuth)({
            clientType: "github-app",
            clientId: options.clientId || "",
            clientSecret: options.clientSecret || "",
            request: request2
          })
        }
      );
      return Object.assign(auth5.bind(null, state), {
        hook: hook5.bind(null, state)
      });
    }
    __name(createAppAuth4, "createAppAuth");
  }
});

// ../../node_modules/.pnpm/@octokit+auth-unauthenticated@5.0.1/node_modules/@octokit/auth-unauthenticated/dist-node/index.js
var require_dist_node7 = __commonJS({
  "../../node_modules/.pnpm/@octokit+auth-unauthenticated@5.0.1/node_modules/@octokit/auth-unauthenticated/dist-node/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var __defProp3 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp3 = Object.prototype.hasOwnProperty;
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp3(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp3.call(to, key) && key !== except)
            __defProp3(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp3({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var dist_src_exports = {};
    __export2(dist_src_exports, {
      createUnauthenticatedAuth: () => createUnauthenticatedAuth2
    });
    module.exports = __toCommonJS2(dist_src_exports);
    async function auth5(reason) {
      return {
        type: "unauthenticated",
        reason
      };
    }
    __name(auth5, "auth");
    var import_request_error2 = (init_dist_web2(), __toCommonJS(dist_web_exports));
    function isRateLimitError(error) {
      if (error.status !== 403) {
        return false;
      }
      if (!error.response) {
        return false;
      }
      return error.response.headers["x-ratelimit-remaining"] === "0";
    }
    __name(isRateLimitError, "isRateLimitError");
    var import_request_error22 = (init_dist_web2(), __toCommonJS(dist_web_exports));
    var REGEX_ABUSE_LIMIT_MESSAGE = /\babuse\b/i;
    function isAbuseLimitError(error) {
      if (error.status !== 403) {
        return false;
      }
      return REGEX_ABUSE_LIMIT_MESSAGE.test(error.message);
    }
    __name(isAbuseLimitError, "isAbuseLimitError");
    async function hook5(reason, request2, route, parameters) {
      const endpoint2 = request2.endpoint.merge(
        route,
        parameters
      );
      return request2(endpoint2).catch((error) => {
        if (error.status === 404) {
          error.message = `Not found. May be due to lack of authentication. Reason: ${reason}`;
          throw error;
        }
        if (isRateLimitError(error)) {
          error.message = `API rate limit exceeded. This maybe caused by the lack of authentication. Reason: ${reason}`;
          throw error;
        }
        if (isAbuseLimitError(error)) {
          error.message = `You have triggered an abuse detection mechanism. This maybe caused by the lack of authentication. Reason: ${reason}`;
          throw error;
        }
        if (error.status === 401) {
          error.message = `Unauthorized. "${endpoint2.method} ${endpoint2.url}" failed most likely due to lack of authentication. Reason: ${reason}`;
          throw error;
        }
        if (error.status >= 400 && error.status < 500) {
          error.message = error.message.replace(
            /\.?$/,
            `. May be caused by lack of authentication (${reason}).`
          );
        }
        throw error;
      });
    }
    __name(hook5, "hook");
    var createUnauthenticatedAuth2 = /* @__PURE__ */ __name(function createUnauthenticatedAuth22(options) {
      if (!options || !options.reason) {
        throw new Error(
          "[@octokit/auth-unauthenticated] No reason passed to createUnauthenticatedAuth"
        );
      }
      return Object.assign(auth5.bind(null, options.reason), {
        hook: hook5.bind(null, options.reason)
      });
    }, "createUnauthenticatedAuth2");
  }
});

// ../../node_modules/.pnpm/@octokit+oauth-app@6.1.0/node_modules/@octokit/oauth-app/dist-node/index.js
var require_dist_node8 = __commonJS({
  "../../node_modules/.pnpm/@octokit+oauth-app@6.1.0/node_modules/@octokit/oauth-app/dist-node/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var __create2 = Object.create;
    var __defProp3 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf3 = Object.getPrototypeOf;
    var __hasOwnProp3 = Object.prototype.hasOwnProperty;
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp3(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp3.call(to, key) && key !== except)
            __defProp3(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toESM2 = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf3(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp3(target, "default", { value: mod, enumerable: true }) : target,
      mod
    )), "__toESM");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp3({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var dist_src_exports = {};
    __export2(dist_src_exports, {
      OAuthApp: () => OAuthApp2,
      createAWSLambdaAPIGatewayV2Handler: () => createAWSLambdaAPIGatewayV2Handler,
      createNodeMiddleware: () => createNodeMiddleware,
      createWebWorkerHandler: () => createWebWorkerHandler,
      handleRequest: () => handleRequest,
      sendNodeResponse: () => sendResponse,
      unknownRouteResponse: () => unknownRouteResponse
    });
    module.exports = __toCommonJS2(dist_src_exports);
    var import_auth_oauth_app = (init_dist_web8(), __toCommonJS(dist_web_exports6));
    var VERSION8 = "6.1.0";
    function addEventHandler(state, eventName, eventHandler) {
      if (Array.isArray(eventName)) {
        for (const singleEventName of eventName) {
          addEventHandler(state, singleEventName, eventHandler);
        }
        return;
      }
      if (!state.eventHandlers[eventName]) {
        state.eventHandlers[eventName] = [];
      }
      state.eventHandlers[eventName].push(eventHandler);
    }
    __name(addEventHandler, "addEventHandler");
    var import_core2 = require_dist_node4();
    var import_universal_user_agent6 = require_dist_node();
    var OAuthAppOctokit = import_core2.Octokit.defaults({
      userAgent: `octokit-oauth-app.js/${VERSION8} ${(0, import_universal_user_agent6.getUserAgent)()}`
    });
    var import_auth_oauth_user4 = (init_dist_web7(), __toCommonJS(dist_web_exports5));
    async function emitEvent(state, context) {
      const { name, action } = context;
      if (state.eventHandlers[`${name}.${action}`]) {
        for (const eventHandler of state.eventHandlers[`${name}.${action}`]) {
          await eventHandler(context);
        }
      }
      if (state.eventHandlers[name]) {
        for (const eventHandler of state.eventHandlers[name]) {
          await eventHandler(context);
        }
      }
    }
    __name(emitEvent, "emitEvent");
    async function getUserOctokitWithState(state, options) {
      return state.octokit.auth({
        type: "oauth-user",
        ...options,
        async factory(options2) {
          const octokit = new state.Octokit({
            authStrategy: import_auth_oauth_user4.createOAuthUserAuth,
            auth: options2
          });
          const authentication = await octokit.auth({
            type: "get"
          });
          await emitEvent(state, {
            name: "token",
            action: "created",
            token: authentication.token,
            scopes: authentication.scopes,
            authentication,
            octokit
          });
          return octokit;
        }
      });
    }
    __name(getUserOctokitWithState, "getUserOctokitWithState");
    var OAuthMethods = __toESM2(require_dist_node5());
    function getWebFlowAuthorizationUrlWithState(state, options) {
      const optionsWithDefaults = {
        clientId: state.clientId,
        request: state.octokit.request,
        ...options,
        allowSignup: state.allowSignup ?? options.allowSignup,
        redirectUrl: options.redirectUrl ?? state.redirectUrl,
        scopes: options.scopes ?? state.defaultScopes
      };
      return OAuthMethods.getWebFlowAuthorizationUrl({
        clientType: state.clientType,
        ...optionsWithDefaults
      });
    }
    __name(getWebFlowAuthorizationUrlWithState, "getWebFlowAuthorizationUrlWithState");
    var OAuthAppAuth = __toESM2((init_dist_web8(), __toCommonJS(dist_web_exports6)));
    async function createTokenWithState(state, options) {
      const authentication = await state.octokit.auth({
        type: "oauth-user",
        ...options
      });
      await emitEvent(state, {
        name: "token",
        action: "created",
        token: authentication.token,
        scopes: authentication.scopes,
        authentication,
        octokit: new state.Octokit({
          authStrategy: OAuthAppAuth.createOAuthUserAuth,
          auth: {
            clientType: state.clientType,
            clientId: state.clientId,
            clientSecret: state.clientSecret,
            token: authentication.token,
            scopes: authentication.scopes,
            refreshToken: authentication.refreshToken,
            expiresAt: authentication.expiresAt,
            refreshTokenExpiresAt: authentication.refreshTokenExpiresAt
          }
        })
      });
      return { authentication };
    }
    __name(createTokenWithState, "createTokenWithState");
    var OAuthMethods2 = __toESM2(require_dist_node5());
    async function checkTokenWithState(state, options) {
      const result = await OAuthMethods2.checkToken({
        // @ts-expect-error not worth the extra code to appease TS
        clientType: state.clientType,
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        request: state.octokit.request,
        ...options
      });
      Object.assign(result.authentication, { type: "token", tokenType: "oauth" });
      return result;
    }
    __name(checkTokenWithState, "checkTokenWithState");
    var OAuthMethods3 = __toESM2(require_dist_node5());
    var import_auth_oauth_user22 = (init_dist_web7(), __toCommonJS(dist_web_exports5));
    async function resetTokenWithState(state, options) {
      const optionsWithDefaults = {
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        request: state.octokit.request,
        ...options
      };
      if (state.clientType === "oauth-app") {
        const response2 = await OAuthMethods3.resetToken({
          clientType: "oauth-app",
          ...optionsWithDefaults
        });
        const authentication2 = Object.assign(response2.authentication, {
          type: "token",
          tokenType: "oauth"
        });
        await emitEvent(state, {
          name: "token",
          action: "reset",
          token: response2.authentication.token,
          scopes: response2.authentication.scopes || void 0,
          authentication: authentication2,
          octokit: new state.Octokit({
            authStrategy: import_auth_oauth_user22.createOAuthUserAuth,
            auth: {
              clientType: state.clientType,
              clientId: state.clientId,
              clientSecret: state.clientSecret,
              token: response2.authentication.token,
              scopes: response2.authentication.scopes
            }
          })
        });
        return { ...response2, authentication: authentication2 };
      }
      const response = await OAuthMethods3.resetToken({
        clientType: "github-app",
        ...optionsWithDefaults
      });
      const authentication = Object.assign(response.authentication, {
        type: "token",
        tokenType: "oauth"
      });
      await emitEvent(state, {
        name: "token",
        action: "reset",
        token: response.authentication.token,
        authentication,
        octokit: new state.Octokit({
          authStrategy: import_auth_oauth_user22.createOAuthUserAuth,
          auth: {
            clientType: state.clientType,
            clientId: state.clientId,
            clientSecret: state.clientSecret,
            token: response.authentication.token
          }
        })
      });
      return { ...response, authentication };
    }
    __name(resetTokenWithState, "resetTokenWithState");
    var OAuthMethods4 = __toESM2(require_dist_node5());
    var import_auth_oauth_user32 = (init_dist_web7(), __toCommonJS(dist_web_exports5));
    async function refreshTokenWithState(state, options) {
      if (state.clientType === "oauth-app") {
        throw new Error(
          "[@octokit/oauth-app] app.refreshToken() is not supported for OAuth Apps"
        );
      }
      const response = await OAuthMethods4.refreshToken({
        clientType: "github-app",
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        request: state.octokit.request,
        refreshToken: options.refreshToken
      });
      const authentication = Object.assign(response.authentication, {
        type: "token",
        tokenType: "oauth"
      });
      await emitEvent(state, {
        name: "token",
        action: "refreshed",
        token: response.authentication.token,
        authentication,
        octokit: new state.Octokit({
          authStrategy: import_auth_oauth_user32.createOAuthUserAuth,
          auth: {
            clientType: state.clientType,
            clientId: state.clientId,
            clientSecret: state.clientSecret,
            token: response.authentication.token
          }
        })
      });
      return { ...response, authentication };
    }
    __name(refreshTokenWithState, "refreshTokenWithState");
    var OAuthMethods5 = __toESM2(require_dist_node5());
    var import_auth_oauth_user42 = (init_dist_web7(), __toCommonJS(dist_web_exports5));
    async function scopeTokenWithState(state, options) {
      if (state.clientType === "oauth-app") {
        throw new Error(
          "[@octokit/oauth-app] app.scopeToken() is not supported for OAuth Apps"
        );
      }
      const response = await OAuthMethods5.scopeToken({
        clientType: "github-app",
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        request: state.octokit.request,
        ...options
      });
      const authentication = Object.assign(response.authentication, {
        type: "token",
        tokenType: "oauth"
      });
      await emitEvent(state, {
        name: "token",
        action: "scoped",
        token: response.authentication.token,
        authentication,
        octokit: new state.Octokit({
          authStrategy: import_auth_oauth_user42.createOAuthUserAuth,
          auth: {
            clientType: state.clientType,
            clientId: state.clientId,
            clientSecret: state.clientSecret,
            token: response.authentication.token
          }
        })
      });
      return { ...response, authentication };
    }
    __name(scopeTokenWithState, "scopeTokenWithState");
    var OAuthMethods6 = __toESM2(require_dist_node5());
    var import_auth_unauthenticated2 = require_dist_node7();
    async function deleteTokenWithState(state, options) {
      const optionsWithDefaults = {
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        request: state.octokit.request,
        ...options
      };
      const response = state.clientType === "oauth-app" ? await OAuthMethods6.deleteToken({
        clientType: "oauth-app",
        ...optionsWithDefaults
      }) : (
        // istanbul ignore next
        await OAuthMethods6.deleteToken({
          clientType: "github-app",
          ...optionsWithDefaults
        })
      );
      await emitEvent(state, {
        name: "token",
        action: "deleted",
        token: options.token,
        octokit: new state.Octokit({
          authStrategy: import_auth_unauthenticated2.createUnauthenticatedAuth,
          auth: {
            reason: `Handling "token.deleted" event. The access for the token has been revoked.`
          }
        })
      });
      return response;
    }
    __name(deleteTokenWithState, "deleteTokenWithState");
    var OAuthMethods7 = __toESM2(require_dist_node5());
    var import_auth_unauthenticated22 = require_dist_node7();
    async function deleteAuthorizationWithState(state, options) {
      const optionsWithDefaults = {
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        request: state.octokit.request,
        ...options
      };
      const response = state.clientType === "oauth-app" ? await OAuthMethods7.deleteAuthorization({
        clientType: "oauth-app",
        ...optionsWithDefaults
      }) : (
        // istanbul ignore next
        await OAuthMethods7.deleteAuthorization({
          clientType: "github-app",
          ...optionsWithDefaults
        })
      );
      await emitEvent(state, {
        name: "token",
        action: "deleted",
        token: options.token,
        octokit: new state.Octokit({
          authStrategy: import_auth_unauthenticated22.createUnauthenticatedAuth,
          auth: {
            reason: `Handling "token.deleted" event. The access for the token has been revoked.`
          }
        })
      });
      await emitEvent(state, {
        name: "authorization",
        action: "deleted",
        token: options.token,
        octokit: new state.Octokit({
          authStrategy: import_auth_unauthenticated22.createUnauthenticatedAuth,
          auth: {
            reason: `Handling "authorization.deleted" event. The access for the app has been revoked.`
          }
        })
      });
      return response;
    }
    __name(deleteAuthorizationWithState, "deleteAuthorizationWithState");
    function unknownRouteResponse(request2) {
      return {
        status: 404,
        headers: { "content-type": "application/json" },
        text: JSON.stringify({
          error: `Unknown route: ${request2.method} ${request2.url}`
        })
      };
    }
    __name(unknownRouteResponse, "unknownRouteResponse");
    async function handleRequest(app2, { pathPrefix = "/api/github/oauth" }, request2) {
      if (request2.method === "OPTIONS") {
        return {
          status: 200,
          headers: {
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "*",
            "access-control-allow-headers": "Content-Type, User-Agent, Authorization"
          }
        };
      }
      let { pathname } = new URL(request2.url, "http://localhost");
      if (!pathname.startsWith(`${pathPrefix}/`)) {
        return void 0;
      }
      pathname = pathname.slice(pathPrefix.length + 1);
      const route = [request2.method, pathname].join(" ");
      const routes = {
        getLogin: `GET login`,
        getCallback: `GET callback`,
        createToken: `POST token`,
        getToken: `GET token`,
        patchToken: `PATCH token`,
        patchRefreshToken: `PATCH refresh-token`,
        scopeToken: `POST token/scoped`,
        deleteToken: `DELETE token`,
        deleteGrant: `DELETE grant`
      };
      if (!Object.values(routes).includes(route)) {
        return unknownRouteResponse(request2);
      }
      let json;
      try {
        const text = await request2.text();
        json = text ? JSON.parse(text) : {};
      } catch (error) {
        return {
          status: 400,
          headers: {
            "content-type": "application/json",
            "access-control-allow-origin": "*"
          },
          text: JSON.stringify({
            error: "[@octokit/oauth-app] request error"
          })
        };
      }
      const { searchParams } = new URL(request2.url, "http://localhost");
      const query = Object.fromEntries(searchParams);
      const headers = request2.headers;
      try {
        if (route === routes.getLogin) {
          const { url } = app2.getWebFlowAuthorizationUrl({
            state: query.state,
            scopes: query.scopes ? query.scopes.split(",") : void 0,
            allowSignup: query.allowSignup ? query.allowSignup === "true" : void 0,
            redirectUrl: query.redirectUrl
          });
          return { status: 302, headers: { location: url } };
        }
        if (route === routes.getCallback) {
          if (query.error) {
            throw new Error(
              `[@octokit/oauth-app] ${query.error} ${query.error_description}`
            );
          }
          if (!query.code) {
            throw new Error('[@octokit/oauth-app] "code" parameter is required');
          }
          const {
            authentication: { token: token2 }
          } = await app2.createToken({
            code: query.code
          });
          return {
            status: 200,
            headers: {
              "content-type": "text/html"
            },
            text: `<h1>Token created successfully</h1>

<p>Your token is: <strong>${token2}</strong>. Copy it now as it cannot be shown again.</p>`
          };
        }
        if (route === routes.createToken) {
          const { code, redirectUrl } = json;
          if (!code) {
            throw new Error('[@octokit/oauth-app] "code" parameter is required');
          }
          const result = await app2.createToken({
            code,
            redirectUrl
          });
          delete result.authentication.clientSecret;
          return {
            status: 201,
            headers: {
              "content-type": "application/json",
              "access-control-allow-origin": "*"
            },
            text: JSON.stringify(result)
          };
        }
        if (route === routes.getToken) {
          const token2 = headers.authorization?.substr("token ".length);
          if (!token2) {
            throw new Error(
              '[@octokit/oauth-app] "Authorization" header is required'
            );
          }
          const result = await app2.checkToken({
            token: token2
          });
          delete result.authentication.clientSecret;
          return {
            status: 200,
            headers: {
              "content-type": "application/json",
              "access-control-allow-origin": "*"
            },
            text: JSON.stringify(result)
          };
        }
        if (route === routes.patchToken) {
          const token2 = headers.authorization?.substr("token ".length);
          if (!token2) {
            throw new Error(
              '[@octokit/oauth-app] "Authorization" header is required'
            );
          }
          const result = await app2.resetToken({ token: token2 });
          delete result.authentication.clientSecret;
          return {
            status: 200,
            headers: {
              "content-type": "application/json",
              "access-control-allow-origin": "*"
            },
            text: JSON.stringify(result)
          };
        }
        if (route === routes.patchRefreshToken) {
          const token2 = headers.authorization?.substr("token ".length);
          if (!token2) {
            throw new Error(
              '[@octokit/oauth-app] "Authorization" header is required'
            );
          }
          const { refreshToken: refreshToken2 } = json;
          if (!refreshToken2) {
            throw new Error(
              "[@octokit/oauth-app] refreshToken must be sent in request body"
            );
          }
          const result = await app2.refreshToken({ refreshToken: refreshToken2 });
          delete result.authentication.clientSecret;
          return {
            status: 200,
            headers: {
              "content-type": "application/json",
              "access-control-allow-origin": "*"
            },
            text: JSON.stringify(result)
          };
        }
        if (route === routes.scopeToken) {
          const token2 = headers.authorization?.substr("token ".length);
          if (!token2) {
            throw new Error(
              '[@octokit/oauth-app] "Authorization" header is required'
            );
          }
          const result = await app2.scopeToken({
            token: token2,
            ...json
          });
          delete result.authentication.clientSecret;
          return {
            status: 200,
            headers: {
              "content-type": "application/json",
              "access-control-allow-origin": "*"
            },
            text: JSON.stringify(result)
          };
        }
        if (route === routes.deleteToken) {
          const token2 = headers.authorization?.substr("token ".length);
          if (!token2) {
            throw new Error(
              '[@octokit/oauth-app] "Authorization" header is required'
            );
          }
          await app2.deleteToken({
            token: token2
          });
          return {
            status: 204,
            headers: { "access-control-allow-origin": "*" }
          };
        }
        const token = headers.authorization?.substr("token ".length);
        if (!token) {
          throw new Error(
            '[@octokit/oauth-app] "Authorization" header is required'
          );
        }
        await app2.deleteAuthorization({
          token
        });
        return {
          status: 204,
          headers: { "access-control-allow-origin": "*" }
        };
      } catch (error) {
        return {
          status: 400,
          headers: {
            "content-type": "application/json",
            "access-control-allow-origin": "*"
          },
          text: JSON.stringify({ error: error.message })
        };
      }
    }
    __name(handleRequest, "handleRequest");
    function parseRequest(request2) {
      const { method, url, headers } = request2;
      async function text() {
        const text2 = await new Promise((resolve, reject) => {
          let bodyChunks = [];
          request2.on("error", reject).on("data", (chunk) => bodyChunks.push(chunk)).on("end", () => resolve(Buffer2.concat(bodyChunks).toString()));
        });
        return text2;
      }
      __name(text, "text");
      return { method, url, headers, text };
    }
    __name(parseRequest, "parseRequest");
    function sendResponse(octokitResponse, response) {
      response.writeHead(octokitResponse.status, octokitResponse.headers);
      response.end(octokitResponse.text);
    }
    __name(sendResponse, "sendResponse");
    function createNodeMiddleware(app2, options = {}) {
      return async function(request2, response, next) {
        const octokitRequest = await parseRequest(request2);
        const octokitResponse = await handleRequest(app2, options, octokitRequest);
        if (octokitResponse) {
          sendResponse(octokitResponse, response);
          return true;
        } else {
          next?.();
          return false;
        }
      };
    }
    __name(createNodeMiddleware, "createNodeMiddleware");
    function parseRequest2(request2) {
      const headers = Object.fromEntries(request2.headers.entries());
      return {
        method: request2.method,
        url: request2.url,
        headers,
        text: () => request2.text()
      };
    }
    __name(parseRequest2, "parseRequest2");
    function sendResponse2(octokitResponse) {
      return new Response(octokitResponse.text, {
        status: octokitResponse.status,
        headers: octokitResponse.headers
      });
    }
    __name(sendResponse2, "sendResponse2");
    function createWebWorkerHandler(app2, options = {}) {
      return async function(request2) {
        const octokitRequest = await parseRequest2(request2);
        const octokitResponse = await handleRequest(app2, options, octokitRequest);
        return octokitResponse ? sendResponse2(octokitResponse) : void 0;
      };
    }
    __name(createWebWorkerHandler, "createWebWorkerHandler");
    function parseRequest3(request2) {
      const { method } = request2.requestContext.http;
      let url = request2.rawPath;
      const { stage } = request2.requestContext;
      if (url.startsWith("/" + stage))
        url = url.substring(stage.length + 1);
      if (request2.rawQueryString)
        url += "?" + request2.rawQueryString;
      const headers = request2.headers;
      const text = /* @__PURE__ */ __name(async () => request2.body || "", "text");
      return { method, url, headers, text };
    }
    __name(parseRequest3, "parseRequest3");
    function sendResponse3(octokitResponse) {
      return {
        statusCode: octokitResponse.status,
        headers: octokitResponse.headers,
        body: octokitResponse.text
      };
    }
    __name(sendResponse3, "sendResponse3");
    function createAWSLambdaAPIGatewayV2Handler(app2, options = {}) {
      return async function(event) {
        const request2 = parseRequest3(event);
        const response = await handleRequest(app2, options, request2);
        return response ? sendResponse3(response) : void 0;
      };
    }
    __name(createAWSLambdaAPIGatewayV2Handler, "createAWSLambdaAPIGatewayV2Handler");
    var OAuthApp2 = /* @__PURE__ */ __name(class {
      static {
        this.VERSION = VERSION8;
      }
      static defaults(defaults) {
        const OAuthAppWithDefaults = /* @__PURE__ */ __name(class extends this {
          constructor(...args) {
            super({
              ...defaults,
              ...args[0]
            });
          }
        }, "OAuthAppWithDefaults");
        return OAuthAppWithDefaults;
      }
      constructor(options) {
        const Octokit2 = options.Octokit || OAuthAppOctokit;
        this.type = options.clientType || "oauth-app";
        const octokit = new Octokit2({
          authStrategy: import_auth_oauth_app.createOAuthAppAuth,
          auth: {
            clientType: this.type,
            clientId: options.clientId,
            clientSecret: options.clientSecret
          }
        });
        const state = {
          clientType: this.type,
          clientId: options.clientId,
          clientSecret: options.clientSecret,
          // @ts-expect-error defaultScopes not permitted for GitHub Apps
          defaultScopes: options.defaultScopes || [],
          allowSignup: options.allowSignup,
          baseUrl: options.baseUrl,
          redirectUrl: options.redirectUrl,
          log: options.log,
          Octokit: Octokit2,
          octokit,
          eventHandlers: {}
        };
        this.on = addEventHandler.bind(null, state);
        this.octokit = octokit;
        this.getUserOctokit = getUserOctokitWithState.bind(null, state);
        this.getWebFlowAuthorizationUrl = getWebFlowAuthorizationUrlWithState.bind(
          null,
          state
        );
        this.createToken = createTokenWithState.bind(
          null,
          state
        );
        this.checkToken = checkTokenWithState.bind(
          null,
          state
        );
        this.resetToken = resetTokenWithState.bind(
          null,
          state
        );
        this.refreshToken = refreshTokenWithState.bind(
          null,
          state
        );
        this.scopeToken = scopeTokenWithState.bind(
          null,
          state
        );
        this.deleteToken = deleteTokenWithState.bind(null, state);
        this.deleteAuthorization = deleteAuthorizationWithState.bind(null, state);
      }
    }, "OAuthApp");
  }
});

// ../../node_modules/.pnpm/indent-string@4.0.0/node_modules/indent-string/index.js
var require_indent_string = __commonJS({
  "../../node_modules/.pnpm/indent-string@4.0.0/node_modules/indent-string/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    module.exports = (string, count = 1, options) => {
      options = {
        indent: " ",
        includeEmptyLines: false,
        ...options
      };
      if (typeof string !== "string") {
        throw new TypeError(
          `Expected \`input\` to be a \`string\`, got \`${typeof string}\``
        );
      }
      if (typeof count !== "number") {
        throw new TypeError(
          `Expected \`count\` to be a \`number\`, got \`${typeof count}\``
        );
      }
      if (typeof options.indent !== "string") {
        throw new TypeError(
          `Expected \`options.indent\` to be a \`string\`, got \`${typeof options.indent}\``
        );
      }
      if (count === 0) {
        return string;
      }
      const regex = options.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
      return string.replace(regex, options.indent.repeat(count));
    };
  }
});

// node-modules-polyfills:os
var os_exports = {};
__export(os_exports, {
  EOL: () => EOL,
  arch: () => arch,
  cpus: () => cpus,
  default: () => os_default,
  endianness: () => endianness,
  freemem: () => freemem,
  getNetworkInterfaces: () => getNetworkInterfaces,
  hostname: () => hostname,
  loadavg: () => loadavg,
  networkInterfaces: () => networkInterfaces,
  platform: () => platform2,
  release: () => release2,
  tmpDir: () => tmpDir,
  tmpdir: () => tmpdir,
  totalmem: () => totalmem,
  type: () => type,
  uptime: () => uptime2
});
function endianness() {
  if (typeof _endianness === "undefined") {
    var a2 = new ArrayBuffer(2);
    var b = new Uint8Array(a2);
    var c = new Uint16Array(a2);
    b[0] = 1;
    b[1] = 2;
    if (c[0] === 258) {
      _endianness = "BE";
    } else if (c[0] === 513) {
      _endianness = "LE";
    } else {
      throw new Error("unable to figure out endianess");
    }
  }
  return _endianness;
}
function hostname() {
  if (typeof globalThis.location !== "undefined") {
    return globalThis.location.hostname;
  } else
    return "";
}
function loadavg() {
  return [];
}
function uptime2() {
  return 0;
}
function freemem() {
  return Number.MAX_VALUE;
}
function totalmem() {
  return Number.MAX_VALUE;
}
function cpus() {
  return [];
}
function type() {
  return "Browser";
}
function release2() {
  if (typeof globalThis.navigator !== "undefined") {
    return globalThis.navigator.appVersion;
  }
  return "";
}
function networkInterfaces() {
}
function getNetworkInterfaces() {
}
function arch() {
  return "javascript";
}
function platform2() {
  return "browser";
}
function tmpDir() {
  return "/tmp";
}
var _endianness, tmpdir, EOL, os_default;
var init_os = __esm({
  "node-modules-polyfills:os"() {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    __name(endianness, "endianness");
    __name(hostname, "hostname");
    __name(loadavg, "loadavg");
    __name(uptime2, "uptime");
    __name(freemem, "freemem");
    __name(totalmem, "totalmem");
    __name(cpus, "cpus");
    __name(type, "type");
    __name(release2, "release");
    __name(networkInterfaces, "networkInterfaces");
    __name(getNetworkInterfaces, "getNetworkInterfaces");
    __name(arch, "arch");
    __name(platform2, "platform");
    __name(tmpDir, "tmpDir");
    tmpdir = tmpDir;
    EOL = "\n";
    os_default = {
      EOL,
      tmpdir,
      tmpDir,
      networkInterfaces,
      getNetworkInterfaces,
      release: release2,
      type,
      cpus,
      totalmem,
      freemem,
      uptime: uptime2,
      loadavg,
      hostname,
      endianness
    };
  }
});

// node-modules-polyfills-commonjs:os
var require_os = __commonJS({
  "node-modules-polyfills-commonjs:os"(exports, module) {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var polyfill = (init_os(), __toCommonJS(os_exports));
    if (polyfill && polyfill.default) {
      module.exports = polyfill.default;
      for (let k in polyfill) {
        module.exports[k] = polyfill[k];
      }
    } else if (polyfill) {
      module.exports = polyfill;
    }
  }
});

// ../../node_modules/.pnpm/clean-stack@2.2.0/node_modules/clean-stack/index.js
var require_clean_stack = __commonJS({
  "../../node_modules/.pnpm/clean-stack@2.2.0/node_modules/clean-stack/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var os = require_os();
    var extractPathRegex = /\s+at.*(?:\(|\s)(.*)\)?/;
    var pathRegex = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)\.js:\d+:\d+)|native)/;
    var homeDir = typeof os.homedir === "undefined" ? "" : os.homedir();
    module.exports = (stack, options) => {
      options = Object.assign({ pretty: false }, options);
      return stack.replace(/\\/g, "/").split("\n").filter((line) => {
        const pathMatches = line.match(extractPathRegex);
        if (pathMatches === null || !pathMatches[1]) {
          return true;
        }
        const match2 = pathMatches[1];
        if (match2.includes(".app/Contents/Resources/electron.asar") || match2.includes(".app/Contents/Resources/default_app.asar")) {
          return false;
        }
        return !pathRegex.test(match2);
      }).filter((line) => line.trim() !== "").map((line) => {
        if (options.pretty) {
          return line.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDir, "~")));
        }
        return line;
      }).join("\n");
    };
  }
});

// ../../node_modules/.pnpm/aggregate-error@3.1.0/node_modules/aggregate-error/index.js
var require_aggregate_error = __commonJS({
  "../../node_modules/.pnpm/aggregate-error@3.1.0/node_modules/aggregate-error/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var indentString = require_indent_string();
    var cleanStack = require_clean_stack();
    var cleanInternalStack = /* @__PURE__ */ __name((stack) => stack.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, ""), "cleanInternalStack");
    var AggregateError4 = class extends Error {
      constructor(errors) {
        if (!Array.isArray(errors)) {
          throw new TypeError(`Expected input to be an Array, got ${typeof errors}`);
        }
        errors = [...errors].map((error) => {
          if (error instanceof Error) {
            return error;
          }
          if (error !== null && typeof error === "object") {
            return Object.assign(new Error(error.message), error);
          }
          return new Error(error);
        });
        let message = errors.map((error) => {
          return typeof error.stack === "string" ? cleanInternalStack(cleanStack(error.stack)) : String(error);
        }).join("\n");
        message = "\n" + indentString(message, 4);
        super(message);
        this.name = "AggregateError";
        Object.defineProperty(this, "_errors", { value: errors });
      }
      *[Symbol.iterator]() {
        for (const error of this._errors) {
          yield error;
        }
      }
    };
    __name(AggregateError4, "AggregateError");
    module.exports = AggregateError4;
  }
});

// ../../node_modules/.pnpm/platform@1.3.6/node_modules/platform/platform.js
var require_platform = __commonJS({
  "../../node_modules/.pnpm/platform@1.3.6/node_modules/platform/platform.js"(exports, module) {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    (function() {
      "use strict";
      var objectTypes = {
        "function": true,
        "object": true
      };
      var root = objectTypes[typeof window] && window || this;
      var oldRoot = root;
      var freeExports = objectTypes[typeof exports] && exports;
      var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
      var freeGlobal = freeExports && freeModule && typeof globalThis == "object" && globalThis;
      if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
        root = freeGlobal;
      }
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var reOpera = /\bOpera/;
      var thisBinding = this;
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var toString2 = objectProto.toString;
      function capitalize(string) {
        string = String(string);
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      __name(capitalize, "capitalize");
      function cleanupOS(os, pattern, label) {
        var data = {
          "10.0": "10",
          "6.4": "10 Technical Preview",
          "6.3": "8.1",
          "6.2": "8",
          "6.1": "Server 2008 R2 / 7",
          "6.0": "Server 2008 / Vista",
          "5.2": "Server 2003 / XP 64-bit",
          "5.1": "XP",
          "5.01": "2000 SP1",
          "5.0": "2000",
          "4.0": "NT",
          "4.90": "ME"
        };
        if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) && (data = data[/[\d.]+$/.exec(os)])) {
          os = "Windows " + data;
        }
        os = String(os);
        if (pattern && label) {
          os = os.replace(RegExp(pattern, "i"), label);
        }
        os = format(
          os.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        );
        return os;
      }
      __name(cleanupOS, "cleanupOS");
      function each(object, callback) {
        var index = -1, length = object ? object.length : 0;
        if (typeof length == "number" && length > -1 && length <= maxSafeInteger) {
          while (++index < length) {
            callback(object[index], index, object);
          }
        } else {
          forOwn(object, callback);
        }
      }
      __name(each, "each");
      function format(string) {
        string = trim(string);
        return /^(?:webOS|i(?:OS|P))/.test(string) ? string : capitalize(string);
      }
      __name(format, "format");
      function forOwn(object, callback) {
        for (var key in object) {
          if (hasOwnProperty.call(object, key)) {
            callback(object[key], key, object);
          }
        }
      }
      __name(forOwn, "forOwn");
      function getClassOf(value) {
        return value == null ? capitalize(value) : toString2.call(value).slice(8, -1);
      }
      __name(getClassOf, "getClassOf");
      function isHostType(object, property) {
        var type2 = object != null ? typeof object[property] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(type2) && (type2 == "object" ? !!object[property] : true);
      }
      __name(isHostType, "isHostType");
      function qualify(string) {
        return String(string).replace(/([ -])(?!$)/g, "$1?");
      }
      __name(qualify, "qualify");
      function reduce(array, callback) {
        var accumulator = null;
        each(array, function(value, index) {
          accumulator = callback(accumulator, value, index, array);
        });
        return accumulator;
      }
      __name(reduce, "reduce");
      function trim(string) {
        return String(string).replace(/^ +| +$/g, "");
      }
      __name(trim, "trim");
      function parse2(ua) {
        var context = root;
        var isCustomContext = ua && typeof ua == "object" && getClassOf(ua) != "String";
        if (isCustomContext) {
          context = ua;
          ua = null;
        }
        var nav = context.navigator || {};
        var userAgent2 = nav.userAgent || "";
        ua || (ua = userAgent2);
        var isModuleScope = isCustomContext || thisBinding == oldRoot;
        var likeChrome = isCustomContext ? !!nav.likeChrome : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString2.toString());
        var objectClass = "Object", airRuntimeClass = isCustomContext ? objectClass : "ScriptBridgingProxyObject", enviroClass = isCustomContext ? objectClass : "Environment", javaClass = isCustomContext && context.java ? "JavaPackage" : getClassOf(context.java), phantomClass = isCustomContext ? objectClass : "RuntimeObject";
        var java = /\bJava/.test(javaClass) && context.java;
        var rhino = java && getClassOf(context.environment) == enviroClass;
        var alpha = java ? "a" : "\u03B1";
        var beta = java ? "b" : "\u03B2";
        var doc = context.document || {};
        var opera = context.operamini || context.opera;
        var operaClass = reOpera.test(operaClass = isCustomContext && opera ? opera["[[Class]]"] : getClassOf(opera)) ? operaClass : opera = null;
        var data;
        var arch2 = ua;
        var description = [];
        var prerelease = null;
        var useFeatures = ua == userAgent2;
        var version3 = useFeatures && opera && typeof opera.version == "function" && opera.version();
        var isSpecialCasedOS;
        var layout = getLayout([
          { "label": "EdgeHTML", "pattern": "Edge" },
          "Trident",
          { "label": "WebKit", "pattern": "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]);
        var name = getName([
          "Adobe AIR",
          "Arora",
          "Avant Browser",
          "Breach",
          "Camino",
          "Electron",
          "Epiphany",
          "Fennec",
          "Flock",
          "Galeon",
          "GreenBrowser",
          "iCab",
          "Iceweasel",
          "K-Meleon",
          "Konqueror",
          "Lunascape",
          "Maxthon",
          { "label": "Microsoft Edge", "pattern": "(?:Edge|Edg|EdgA|EdgiOS)" },
          "Midori",
          "Nook Browser",
          "PaleMoon",
          "PhantomJS",
          "Raven",
          "Rekonq",
          "RockMelt",
          { "label": "Samsung Internet", "pattern": "SamsungBrowser" },
          "SeaMonkey",
          { "label": "Silk", "pattern": "(?:Cloud9|Silk-Accelerated)" },
          "Sleipnir",
          "SlimBrowser",
          { "label": "SRWare Iron", "pattern": "Iron" },
          "Sunrise",
          "Swiftfox",
          "Vivaldi",
          "Waterfox",
          "WebPositive",
          { "label": "Yandex Browser", "pattern": "YaBrowser" },
          { "label": "UC Browser", "pattern": "UCBrowser" },
          "Opera Mini",
          { "label": "Opera Mini", "pattern": "OPiOS" },
          "Opera",
          { "label": "Opera", "pattern": "OPR" },
          "Chromium",
          "Chrome",
          { "label": "Chrome", "pattern": "(?:HeadlessChrome)" },
          { "label": "Chrome Mobile", "pattern": "(?:CriOS|CrMo)" },
          { "label": "Firefox", "pattern": "(?:Firefox|Minefield)" },
          { "label": "Firefox for iOS", "pattern": "FxiOS" },
          { "label": "IE", "pattern": "IEMobile" },
          { "label": "IE", "pattern": "MSIE" },
          "Safari"
        ]);
        var product = getProduct([
          { "label": "BlackBerry", "pattern": "BB10" },
          "BlackBerry",
          { "label": "Galaxy S", "pattern": "GT-I9000" },
          { "label": "Galaxy S2", "pattern": "GT-I9100" },
          { "label": "Galaxy S3", "pattern": "GT-I9300" },
          { "label": "Galaxy S4", "pattern": "GT-I9500" },
          { "label": "Galaxy S5", "pattern": "SM-G900" },
          { "label": "Galaxy S6", "pattern": "SM-G920" },
          { "label": "Galaxy S6 Edge", "pattern": "SM-G925" },
          { "label": "Galaxy S7", "pattern": "SM-G930" },
          { "label": "Galaxy S7 Edge", "pattern": "SM-G935" },
          "Google TV",
          "Lumia",
          "iPad",
          "iPod",
          "iPhone",
          "Kindle",
          { "label": "Kindle Fire", "pattern": "(?:Cloud9|Silk-Accelerated)" },
          "Nexus",
          "Nook",
          "PlayBook",
          "PlayStation Vita",
          "PlayStation",
          "TouchPad",
          "Transformer",
          { "label": "Wii U", "pattern": "WiiU" },
          "Wii",
          "Xbox One",
          { "label": "Xbox 360", "pattern": "Xbox" },
          "Xoom"
        ]);
        var manufacturer = getManufacturer({
          "Apple": { "iPad": 1, "iPhone": 1, "iPod": 1 },
          "Alcatel": {},
          "Archos": {},
          "Amazon": { "Kindle": 1, "Kindle Fire": 1 },
          "Asus": { "Transformer": 1 },
          "Barnes & Noble": { "Nook": 1 },
          "BlackBerry": { "PlayBook": 1 },
          "Google": { "Google TV": 1, "Nexus": 1 },
          "HP": { "TouchPad": 1 },
          "HTC": {},
          "Huawei": {},
          "Lenovo": {},
          "LG": {},
          "Microsoft": { "Xbox": 1, "Xbox One": 1 },
          "Motorola": { "Xoom": 1 },
          "Nintendo": { "Wii U": 1, "Wii": 1 },
          "Nokia": { "Lumia": 1 },
          "Oppo": {},
          "Samsung": { "Galaxy S": 1, "Galaxy S2": 1, "Galaxy S3": 1, "Galaxy S4": 1 },
          "Sony": { "PlayStation": 1, "PlayStation Vita": 1 },
          "Xiaomi": { "Mi": 1, "Redmi": 1 }
        });
        var os = getOS([
          "Windows Phone",
          "KaiOS",
          "Android",
          "CentOS",
          { "label": "Chrome OS", "pattern": "CrOS" },
          "Debian",
          { "label": "DragonFly BSD", "pattern": "DragonFly" },
          "Fedora",
          "FreeBSD",
          "Gentoo",
          "Haiku",
          "Kubuntu",
          "Linux Mint",
          "OpenBSD",
          "Red Hat",
          "SuSE",
          "Ubuntu",
          "Xubuntu",
          "Cygwin",
          "Symbian OS",
          "hpwOS",
          "webOS ",
          "webOS",
          "Tablet OS",
          "Tizen",
          "Linux",
          "Mac OS X",
          "Macintosh",
          "Mac",
          "Windows 98;",
          "Windows "
        ]);
        function getLayout(guesses) {
          return reduce(guesses, function(result, guess) {
            return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
          });
        }
        __name(getLayout, "getLayout");
        function getManufacturer(guesses) {
          return reduce(guesses, function(result, value, key) {
            return result || (value[product] || value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] || RegExp("\\b" + qualify(key) + "(?:\\b|\\w*\\d)", "i").exec(ua)) && key;
          });
        }
        __name(getManufacturer, "getManufacturer");
        function getName(guesses) {
          return reduce(guesses, function(result, guess) {
            return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
          });
        }
        __name(getName, "getName");
        function getOS(guesses) {
          return reduce(guesses, function(result, guess) {
            var pattern = guess.pattern || qualify(guess);
            if (!result && (result = RegExp("\\b" + pattern + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(ua))) {
              result = cleanupOS(result, pattern, guess.label || guess);
            }
            return result;
          });
        }
        __name(getOS, "getOS");
        function getProduct(guesses) {
          return reduce(guesses, function(result, guess) {
            var pattern = guess.pattern || qualify(guess);
            if (!result && (result = RegExp("\\b" + pattern + " *\\d+[.\\w_]*", "i").exec(ua) || RegExp("\\b" + pattern + " *\\w+-[\\w]*", "i").exec(ua) || RegExp("\\b" + pattern + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(ua))) {
              if ((result = String(guess.label && !RegExp(pattern, "i").test(guess.label) ? guess.label : result).split("/"))[1] && !/[\d.]+/.test(result[0])) {
                result[0] += " " + result[1];
              }
              guess = guess.label || guess;
              result = format(result[0].replace(RegExp(pattern, "i"), guess).replace(RegExp("; *(?:" + guess + "[_-])?", "i"), " ").replace(RegExp("(" + guess + ")[-_.]?(\\w)", "i"), "$1 $2"));
            }
            return result;
          });
        }
        __name(getProduct, "getProduct");
        function getVersion(patterns) {
          return reduce(patterns, function(result, pattern) {
            return result || (RegExp(pattern + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(ua) || 0)[1] || null;
          });
        }
        __name(getVersion, "getVersion");
        function toStringPlatform() {
          return this.description || "";
        }
        __name(toStringPlatform, "toStringPlatform");
        layout && (layout = [layout]);
        if (/\bAndroid\b/.test(os) && !product && (data = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(ua))) {
          product = trim(data[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null;
        }
        if (manufacturer && !product) {
          product = getProduct([manufacturer]);
        } else if (manufacturer && product) {
          product = product.replace(RegExp("^(" + qualify(manufacturer) + ")[-_.\\s]", "i"), manufacturer + " ").replace(RegExp("^(" + qualify(manufacturer) + ")[-_.]?(\\w)", "i"), manufacturer + " $2");
        }
        if (data = /\bGoogle TV\b/.exec(product)) {
          product = data[0];
        }
        if (/\bSimulator\b/i.test(ua)) {
          product = (product ? product + " " : "") + "Simulator";
        }
        if (name == "Opera Mini" && /\bOPiOS\b/.test(ua)) {
          description.push("running in Turbo/Uncompressed mode");
        }
        if (name == "IE" && /\blike iPhone OS\b/.test(ua)) {
          data = parse2(ua.replace(/like iPhone OS/, ""));
          manufacturer = data.manufacturer;
          product = data.product;
        } else if (/^iP/.test(product)) {
          name || (name = "Safari");
          os = "iOS" + ((data = / OS ([\d_]+)/i.exec(ua)) ? " " + data[1].replace(/_/g, ".") : "");
        } else if (name == "Konqueror" && /^Linux\b/i.test(os)) {
          os = "Kubuntu";
        } else if (manufacturer && manufacturer != "Google" && (/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua) || /\bVita\b/.test(product)) || /\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua)) {
          name = "Android Browser";
          os = /\bAndroid\b/.test(os) ? os : "Android";
        } else if (name == "Silk") {
          if (!/\bMobi/i.test(ua)) {
            os = "Android";
            description.unshift("desktop mode");
          }
          if (/Accelerated *= *true/i.test(ua)) {
            description.unshift("accelerated");
          }
        } else if (name == "UC Browser" && /\bUCWEB\b/.test(ua)) {
          description.push("speed mode");
        } else if (name == "PaleMoon" && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
          description.push("identifying as Firefox " + data[1]);
        } else if (name == "Firefox" && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
          os || (os = "Firefox OS");
          product || (product = data[1]);
        } else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
          if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + "/") + 8))) {
            name = null;
          }
          if ((data = product || manufacturer || os) && (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
            name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + " Browser";
          }
        } else if (name == "Electron" && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
          description.push("Chromium " + data);
        }
        if (!version3) {
          version3 = getVersion([
            "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
            "Version",
            qualify(name),
            "(?:Firefox|Minefield|NetFront)"
          ]);
        }
        if (data = layout == "iCab" && parseFloat(version3) > 3 && "WebKit" || /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && "WebKit" || !layout && /\bMSIE\b/i.test(ua) && (os == "Mac OS" ? "Tasman" : "Trident") || layout == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(name) && "NetFront") {
          layout = [data];
        }
        if (name == "IE" && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
          name += " Mobile";
          os = "Windows Phone " + (/\+$/.test(data) ? data : data + ".x");
          description.unshift("desktop mode");
        } else if (/\bWPDesktop\b/i.test(ua)) {
          name = "IE Mobile";
          os = "Windows Phone 8.x";
          description.unshift("desktop mode");
          version3 || (version3 = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
        } else if (name != "IE" && layout == "Trident" && (data = /\brv:([\d.]+)/.exec(ua))) {
          if (name) {
            description.push("identifying as " + name + (version3 ? " " + version3 : ""));
          }
          name = "IE";
          version3 = data[1];
        }
        if (useFeatures) {
          if (isHostType(context, "global")) {
            if (java) {
              data = java.lang.System;
              arch2 = data.getProperty("os.arch");
              os = os || data.getProperty("os.name") + " " + data.getProperty("os.version");
            }
            if (rhino) {
              try {
                version3 = context.require("ringo/engine").version.join(".");
                name = "RingoJS";
              } catch (e2) {
                if ((data = context.system) && data.global.system == context.system) {
                  name = "Narwhal";
                  os || (os = data[0].os || null);
                }
              }
              if (!name) {
                name = "Rhino";
              }
            } else if (typeof context.process == "object" && !context.process.browser && (data = context.process)) {
              if (typeof data.versions == "object") {
                if (typeof data.versions.electron == "string") {
                  description.push("Node " + data.versions.node);
                  name = "Electron";
                  version3 = data.versions.electron;
                } else if (typeof data.versions.nw == "string") {
                  description.push("Chromium " + version3, "Node " + data.versions.node);
                  name = "NW.js";
                  version3 = data.versions.nw;
                }
              }
              if (!name) {
                name = "Node.js";
                arch2 = data.arch;
                os = data.platform;
                version3 = /[\d.]+/.exec(data.version);
                version3 = version3 ? version3[0] : null;
              }
            }
          } else if (getClassOf(data = context.runtime) == airRuntimeClass) {
            name = "Adobe AIR";
            os = data.flash.system.Capabilities.os;
          } else if (getClassOf(data = context.phantom) == phantomClass) {
            name = "PhantomJS";
            version3 = (data = data.version || null) && data.major + "." + data.minor + "." + data.patch;
          } else if (typeof doc.documentMode == "number" && (data = /\bTrident\/(\d+)/i.exec(ua))) {
            version3 = [version3, doc.documentMode];
            if ((data = +data[1] + 4) != version3[1]) {
              description.push("IE " + version3[1] + " mode");
              layout && (layout[1] = "");
              version3[1] = data;
            }
            version3 = name == "IE" ? String(version3[1].toFixed(1)) : version3[0];
          } else if (typeof doc.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(name)) {
            description.push("masking as " + name + " " + version3);
            name = "IE";
            version3 = "11.0";
            layout = ["Trident"];
            os = "Windows";
          }
          os = os && format(os);
        }
        if (version3 && (data = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version3) || /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ";" + (useFeatures && nav.appMinorVersion)) || /\bMinefield\b/i.test(ua) && "a")) {
          prerelease = /b/i.test(data) ? "beta" : "alpha";
          version3 = version3.replace(RegExp(data + "\\+?$"), "") + (prerelease == "beta" ? beta : alpha) + (/\d+\+?/.exec(data) || "");
        }
        if (name == "Fennec" || name == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(os)) {
          name = "Firefox Mobile";
        } else if (name == "Maxthon" && version3) {
          version3 = version3.replace(/\.[\d.]+/, ".x");
        } else if (/\bXbox\b/i.test(product)) {
          if (product == "Xbox 360") {
            os = null;
          }
          if (product == "Xbox 360" && /\bIEMobile\b/.test(ua)) {
            description.unshift("mobile mode");
          }
        } else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) && (os == "Windows CE" || /Mobi/i.test(ua))) {
          name += " Mobile";
        } else if (name == "IE" && useFeatures) {
          try {
            if (context.external === null) {
              description.unshift("platform preview");
            }
          } catch (e2) {
            description.unshift("embedded");
          }
        } else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data = (RegExp(product.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(ua) || 0)[1] || version3)) {
          data = [data, /BB10/.test(ua)];
          os = (data[1] ? (product = null, manufacturer = "BlackBerry") : "Device Software") + " " + data[0];
          version3 = null;
        } else if (this != forOwn && product != "Wii" && (useFeatures && opera || /Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua) || name == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(os) || name == "IE" && (os && !/^Win/.test(os) && version3 > 5.5 || /\bWindows XP\b/.test(os) && version3 > 8 || version3 == 8 && !/\bTrident\b/.test(ua))) && !reOpera.test(data = parse2.call(forOwn, ua.replace(reOpera, "") + ";")) && data.name) {
          data = "ing as " + data.name + ((data = data.version) ? " " + data : "");
          if (reOpera.test(name)) {
            if (/\bIE\b/.test(data) && os == "Mac OS") {
              os = null;
            }
            data = "identify" + data;
          } else {
            data = "mask" + data;
            if (operaClass) {
              name = format(operaClass.replace(/([a-z])([A-Z])/g, "$1 $2"));
            } else {
              name = "Opera";
            }
            if (/\bIE\b/.test(data)) {
              os = null;
            }
            if (!useFeatures) {
              version3 = null;
            }
          }
          layout = ["Presto"];
          description.push(data);
        }
        if (data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1]) {
          data = [parseFloat(data.replace(/\.(\d)$/, ".0$1")), data];
          if (name == "Safari" && data[1].slice(-1) == "+") {
            name = "WebKit Nightly";
            prerelease = "alpha";
            version3 = data[1].slice(0, -1);
          } else if (version3 == data[1] || version3 == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
            version3 = null;
          }
          data[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(ua) || 0)[1];
          if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == "WebKit") {
            layout = ["Blink"];
          }
          if (!useFeatures || !likeChrome && !data[1]) {
            layout && (layout[1] = "like Safari");
            data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? "4+" : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : data < 602 ? 9 : data < 604 ? 10 : data < 606 ? 11 : data < 608 ? 12 : "12");
          } else {
            layout && (layout[1] = "like Chrome");
            data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.1 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.3 ? 11 : data < 535.01 ? 12 : data < 535.02 ? "13+" : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.1 ? 19 : data < 537.01 ? 20 : data < 537.11 ? "21+" : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != "Blink" ? "27" : "28");
          }
          layout && (layout[1] += " " + (data += typeof data == "number" ? ".x" : /[.+]/.test(data) ? "" : "+"));
          if (name == "Safari" && (!version3 || parseInt(version3) > 45)) {
            version3 = data;
          } else if (name == "Chrome" && /\bHeadlessChrome/i.test(ua)) {
            description.unshift("headless");
          }
        }
        if (name == "Opera" && (data = /\bzbov|zvav$/.exec(os))) {
          name += " ";
          description.unshift("desktop mode");
          if (data == "zvav") {
            name += "Mini";
            version3 = null;
          } else {
            name += "Mobile";
          }
          os = os.replace(RegExp(" *" + data + "$"), "");
        } else if (name == "Safari" && /\bChrome\b/.exec(layout && layout[1])) {
          description.unshift("desktop mode");
          name = "Chrome Mobile";
          version3 = null;
          if (/\bOS X\b/.test(os)) {
            manufacturer = "Apple";
            os = "iOS 4.3+";
          } else {
            os = null;
          }
        } else if (/\bSRWare Iron\b/.test(name) && !version3) {
          version3 = getVersion("Chrome");
        }
        if (version3 && version3.indexOf(data = /[\d.]+$/.exec(os)) == 0 && ua.indexOf("/" + data + "-") > -1) {
          os = trim(os.replace(data, ""));
        }
        if (os && os.indexOf(name) != -1 && !RegExp(name + " OS").test(os)) {
          os = os.replace(RegExp(" *" + qualify(name) + " *"), "");
        }
        if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (/Browser|Lunascape|Maxthon/.test(name) || name != "Safari" && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(name) && layout[1])) {
          (data = layout[layout.length - 1]) && description.push(data);
        }
        if (description.length) {
          description = ["(" + description.join("; ") + ")"];
        }
        if (manufacturer && product && product.indexOf(manufacturer) < 0) {
          description.push("on " + manufacturer);
        }
        if (product) {
          description.push((/^on /.test(description[description.length - 1]) ? "" : "on ") + product);
        }
        if (os) {
          data = / ([\d.+]+)$/.exec(os);
          isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == "/";
          os = {
            "architecture": 32,
            "family": data && !isSpecialCasedOS ? os.replace(data[0], "") : os,
            "version": data ? data[1] : null,
            "toString": function() {
              var version4 = this.version;
              return this.family + (version4 && !isSpecialCasedOS ? " " + version4 : "") + (this.architecture == 64 ? " 64-bit" : "");
            }
          };
        }
        if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch2)) && !/\bi686\b/i.test(arch2)) {
          if (os) {
            os.architecture = 64;
            os.family = os.family.replace(RegExp(" *" + data), "");
          }
          if (name && (/\bWOW64\b/i.test(ua) || useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua))) {
            description.unshift("32-bit");
          }
        } else if (os && /^OS X/.test(os.family) && name == "Chrome" && parseFloat(version3) >= 39) {
          os.architecture = 64;
        }
        ua || (ua = null);
        var platform5 = {};
        platform5.description = ua;
        platform5.layout = layout && layout[0];
        platform5.manufacturer = manufacturer;
        platform5.name = name;
        platform5.prerelease = prerelease;
        platform5.product = product;
        platform5.ua = ua;
        platform5.version = name && version3;
        platform5.os = os || {
          /**
           * The CPU architecture the OS is built for.
           *
           * @memberOf platform.os
           * @type number|null
           */
          "architecture": null,
          /**
           * The family of the OS.
           *
           * Common values include:
           * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
           * "Windows XP", "OS X", "Linux", "Ubuntu", "Debian", "Fedora", "Red Hat",
           * "SuSE", "Android", "iOS" and "Windows Phone"
           *
           * @memberOf platform.os
           * @type string|null
           */
          "family": null,
          /**
           * The version of the OS.
           *
           * @memberOf platform.os
           * @type string|null
           */
          "version": null,
          /**
           * Returns the OS string.
           *
           * @memberOf platform.os
           * @returns {string} The OS string.
           */
          "toString": function() {
            return "null";
          }
        };
        platform5.parse = parse2;
        platform5.toString = toStringPlatform;
        if (platform5.version) {
          description.unshift(version3);
        }
        if (platform5.name) {
          description.unshift(name);
        }
        if (os && name && !(os == String(os).split(" ")[0] && (os == name.split(" ")[0] || product))) {
          description.push(product ? "(" + os + ")" : "on " + os);
        }
        if (description.length) {
          platform5.description = description.join(" ");
        }
        return platform5;
      }
      __name(parse2, "parse");
      var platform4 = parse2();
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root.platform = platform4;
        define(function() {
          return platform4;
        });
      } else if (freeExports && freeModule) {
        forOwn(platform4, function(value, key) {
          freeExports[key] = value;
        });
      } else {
        root.platform = platform4;
      }
    }).call(exports);
  }
});

// ../../node_modules/.pnpm/normalize-path@3.0.0/node_modules/normalize-path/index.js
var require_normalize_path = __commonJS({
  "../../node_modules/.pnpm/normalize-path@3.0.0/node_modules/normalize-path/index.js"(exports, module) {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    module.exports = function(path2, stripTrailing) {
      if (typeof path2 !== "string") {
        throw new TypeError("expected path to be a string");
      }
      if (path2 === "\\" || path2 === "/")
        return "/";
      var len = path2.length;
      if (len <= 1)
        return path2;
      var prefix = "";
      if (len > 4 && path2[3] === "\\") {
        var ch = path2[2];
        if ((ch === "?" || ch === ".") && path2.slice(0, 2) === "\\\\") {
          path2 = path2.slice(2);
          prefix = "//";
        }
      }
      var segs = path2.split(/[/\\]+/);
      if (stripTrailing !== false && segs[segs.length - 1] === "") {
        segs.pop();
      }
      return prefix + segs.join("/");
    };
  }
});

// ../../node_modules/.pnpm/path-browserify@1.0.1/node_modules/path-browserify/index.js
var require_path_browserify = __commonJS({
  "../../node_modules/.pnpm/path-browserify@1.0.1/node_modules/path-browserify/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    function assertPath(path2) {
      if (typeof path2 !== "string") {
        throw new TypeError("Path must be a string. Received " + JSON.stringify(path2));
      }
    }
    __name(assertPath, "assertPath");
    function normalizeStringPosix(path2, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i2 = 0; i2 <= path2.length; ++i2) {
        if (i2 < path2.length)
          code = path2.charCodeAt(i2);
        else if (code === 47)
          break;
        else
          code = 47;
        if (code === 47) {
          if (lastSlash === i2 - 1 || dots === 1) {
          } else if (lastSlash !== i2 - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i2;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i2;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0)
                res += "/..";
              else
                res = "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0)
              res += "/" + path2.slice(lastSlash + 1, i2);
            else
              res = path2.slice(lastSlash + 1, i2);
            lastSegmentLength = i2 - lastSlash - 1;
          }
          lastSlash = i2;
          dots = 0;
        } else if (code === 46 && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    __name(normalizeStringPosix, "normalizeStringPosix");
    function _format(sep, pathObject) {
      var dir = pathObject.dir || pathObject.root;
      var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep + base;
    }
    __name(_format, "_format");
    var posix = {
      // path.resolve([from ...], to)
      resolve: /* @__PURE__ */ __name(function resolve() {
        var resolvedPath = "";
        var resolvedAbsolute = false;
        var cwd2;
        for (var i2 = arguments.length - 1; i2 >= -1 && !resolvedAbsolute; i2--) {
          var path2;
          if (i2 >= 0)
            path2 = arguments[i2];
          else {
            if (cwd2 === void 0)
              cwd2 = process.cwd();
            path2 = cwd2;
          }
          assertPath(path2);
          if (path2.length === 0) {
            continue;
          }
          resolvedPath = path2 + "/" + resolvedPath;
          resolvedAbsolute = path2.charCodeAt(0) === 47;
        }
        resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
        if (resolvedAbsolute) {
          if (resolvedPath.length > 0)
            return "/" + resolvedPath;
          else
            return "/";
        } else if (resolvedPath.length > 0) {
          return resolvedPath;
        } else {
          return ".";
        }
      }, "resolve"),
      normalize: /* @__PURE__ */ __name(function normalize(path2) {
        assertPath(path2);
        if (path2.length === 0)
          return ".";
        var isAbsolute = path2.charCodeAt(0) === 47;
        var trailingSeparator = path2.charCodeAt(path2.length - 1) === 47;
        path2 = normalizeStringPosix(path2, !isAbsolute);
        if (path2.length === 0 && !isAbsolute)
          path2 = ".";
        if (path2.length > 0 && trailingSeparator)
          path2 += "/";
        if (isAbsolute)
          return "/" + path2;
        return path2;
      }, "normalize"),
      isAbsolute: /* @__PURE__ */ __name(function isAbsolute(path2) {
        assertPath(path2);
        return path2.length > 0 && path2.charCodeAt(0) === 47;
      }, "isAbsolute"),
      join: /* @__PURE__ */ __name(function join() {
        if (arguments.length === 0)
          return ".";
        var joined;
        for (var i2 = 0; i2 < arguments.length; ++i2) {
          var arg = arguments[i2];
          assertPath(arg);
          if (arg.length > 0) {
            if (joined === void 0)
              joined = arg;
            else
              joined += "/" + arg;
          }
        }
        if (joined === void 0)
          return ".";
        return posix.normalize(joined);
      }, "join"),
      relative: /* @__PURE__ */ __name(function relative(from2, to) {
        assertPath(from2);
        assertPath(to);
        if (from2 === to)
          return "";
        from2 = posix.resolve(from2);
        to = posix.resolve(to);
        if (from2 === to)
          return "";
        var fromStart = 1;
        for (; fromStart < from2.length; ++fromStart) {
          if (from2.charCodeAt(fromStart) !== 47)
            break;
        }
        var fromEnd = from2.length;
        var fromLen = fromEnd - fromStart;
        var toStart = 1;
        for (; toStart < to.length; ++toStart) {
          if (to.charCodeAt(toStart) !== 47)
            break;
        }
        var toEnd = to.length;
        var toLen = toEnd - toStart;
        var length = fromLen < toLen ? fromLen : toLen;
        var lastCommonSep = -1;
        var i2 = 0;
        for (; i2 <= length; ++i2) {
          if (i2 === length) {
            if (toLen > length) {
              if (to.charCodeAt(toStart + i2) === 47) {
                return to.slice(toStart + i2 + 1);
              } else if (i2 === 0) {
                return to.slice(toStart + i2);
              }
            } else if (fromLen > length) {
              if (from2.charCodeAt(fromStart + i2) === 47) {
                lastCommonSep = i2;
              } else if (i2 === 0) {
                lastCommonSep = 0;
              }
            }
            break;
          }
          var fromCode = from2.charCodeAt(fromStart + i2);
          var toCode = to.charCodeAt(toStart + i2);
          if (fromCode !== toCode)
            break;
          else if (fromCode === 47)
            lastCommonSep = i2;
        }
        var out = "";
        for (i2 = fromStart + lastCommonSep + 1; i2 <= fromEnd; ++i2) {
          if (i2 === fromEnd || from2.charCodeAt(i2) === 47) {
            if (out.length === 0)
              out += "..";
            else
              out += "/..";
          }
        }
        if (out.length > 0)
          return out + to.slice(toStart + lastCommonSep);
        else {
          toStart += lastCommonSep;
          if (to.charCodeAt(toStart) === 47)
            ++toStart;
          return to.slice(toStart);
        }
      }, "relative"),
      _makeLong: /* @__PURE__ */ __name(function _makeLong(path2) {
        return path2;
      }, "_makeLong"),
      dirname: /* @__PURE__ */ __name(function dirname(path2) {
        assertPath(path2);
        if (path2.length === 0)
          return ".";
        var code = path2.charCodeAt(0);
        var hasRoot = code === 47;
        var end = -1;
        var matchedSlash = true;
        for (var i2 = path2.length - 1; i2 >= 1; --i2) {
          code = path2.charCodeAt(i2);
          if (code === 47) {
            if (!matchedSlash) {
              end = i2;
              break;
            }
          } else {
            matchedSlash = false;
          }
        }
        if (end === -1)
          return hasRoot ? "/" : ".";
        if (hasRoot && end === 1)
          return "//";
        return path2.slice(0, end);
      }, "dirname"),
      basename: /* @__PURE__ */ __name(function basename(path2, ext) {
        if (ext !== void 0 && typeof ext !== "string")
          throw new TypeError('"ext" argument must be a string');
        assertPath(path2);
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i2;
        if (ext !== void 0 && ext.length > 0 && ext.length <= path2.length) {
          if (ext.length === path2.length && ext === path2)
            return "";
          var extIdx = ext.length - 1;
          var firstNonSlashEnd = -1;
          for (i2 = path2.length - 1; i2 >= 0; --i2) {
            var code = path2.charCodeAt(i2);
            if (code === 47) {
              if (!matchedSlash) {
                start = i2 + 1;
                break;
              }
            } else {
              if (firstNonSlashEnd === -1) {
                matchedSlash = false;
                firstNonSlashEnd = i2 + 1;
              }
              if (extIdx >= 0) {
                if (code === ext.charCodeAt(extIdx)) {
                  if (--extIdx === -1) {
                    end = i2;
                  }
                } else {
                  extIdx = -1;
                  end = firstNonSlashEnd;
                }
              }
            }
          }
          if (start === end)
            end = firstNonSlashEnd;
          else if (end === -1)
            end = path2.length;
          return path2.slice(start, end);
        } else {
          for (i2 = path2.length - 1; i2 >= 0; --i2) {
            if (path2.charCodeAt(i2) === 47) {
              if (!matchedSlash) {
                start = i2 + 1;
                break;
              }
            } else if (end === -1) {
              matchedSlash = false;
              end = i2 + 1;
            }
          }
          if (end === -1)
            return "";
          return path2.slice(start, end);
        }
      }, "basename"),
      extname: /* @__PURE__ */ __name(function extname(path2) {
        assertPath(path2);
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var preDotState = 0;
        for (var i2 = path2.length - 1; i2 >= 0; --i2) {
          var code = path2.charCodeAt(i2);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i2 + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i2 + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i2;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          return "";
        }
        return path2.slice(startDot, end);
      }, "extname"),
      format: /* @__PURE__ */ __name(function format(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") {
          throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
        }
        return _format("/", pathObject);
      }, "format"),
      parse: /* @__PURE__ */ __name(function parse2(path2) {
        assertPath(path2);
        var ret = { root: "", dir: "", base: "", ext: "", name: "" };
        if (path2.length === 0)
          return ret;
        var code = path2.charCodeAt(0);
        var isAbsolute = code === 47;
        var start;
        if (isAbsolute) {
          ret.root = "/";
          start = 1;
        } else {
          start = 0;
        }
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var i2 = path2.length - 1;
        var preDotState = 0;
        for (; i2 >= start; --i2) {
          code = path2.charCodeAt(i2);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i2 + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i2 + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i2;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          if (end !== -1) {
            if (startPart === 0 && isAbsolute)
              ret.base = ret.name = path2.slice(1, end);
            else
              ret.base = ret.name = path2.slice(startPart, end);
          }
        } else {
          if (startPart === 0 && isAbsolute) {
            ret.name = path2.slice(1, startDot);
            ret.base = path2.slice(1, end);
          } else {
            ret.name = path2.slice(startPart, startDot);
            ret.base = path2.slice(startPart, end);
          }
          ret.ext = path2.slice(startDot, end);
        }
        if (startPart > 0)
          ret.dir = path2.slice(0, startPart - 1);
        else if (isAbsolute)
          ret.dir = "/";
        return ret;
      }, "parse"),
      sep: "/",
      delimiter: ":",
      win32: null,
      posix: null
    };
    posix.posix = posix;
    module.exports = posix;
  }
});

// .wrangler/tmp/bundle-EBHB28/middleware-loader.entry.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// .wrangler/tmp/bundle-EBHB28/middleware-insertion-facade.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// src/index.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/hono.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/hono-base.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/compose.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i2) {
      if (i2 <= index) {
        throw new Error("next() called multiple times");
      }
      index = i2;
      let res;
      let isError = false;
      let handler;
      if (middleware[i2]) {
        handler = middleware[i2][0][0];
        context.req.routeIndex = i2;
      } else {
        handler = i2 === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i2 + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/context.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/request.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/http-exception.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/request/constants.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/utils/body.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var parseBody = /* @__PURE__ */ __name(async (request2, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request2 instanceof HonoRequest ? request2.raw.headers : request2.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request2, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request2, options) {
  const formData = await request2.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/utils/url.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var splitPath = /* @__PURE__ */ __name((path2) => {
  const paths = path2.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path: path2 } = extractGroupsFromPath(routePath);
  const paths = splitPath(path2);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path2) => {
  const groups = [];
  path2 = path2.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path: path2 };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i2 = groups.length - 1; i2 >= 0; i2--) {
    const [mark] = groups[i2];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i2][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request2) => {
  const url = request2.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i2 = start;
  for (; i2 < url.length; i2++) {
    const charCode = url.charCodeAt(i2);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i2);
      const path2 = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
      return tryDecodeURI(path2.includes("%25") ? path2.replace(/%25/g, "%2525") : path2);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i2);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request2) => {
  const result = getPath(request2);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path2) => {
  if (path2.charCodeAt(path2.length - 1) !== 63 || !path2.includes(":")) {
    return null;
  }
  const segments = path2.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i2, a2) => a2.indexOf(v) === i2);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = /* @__PURE__ */ __name(class {
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request2, path2 = "/", matchResult = [[]]) {
    this.raw = request2;
    this.path = path2;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
}, "HonoRequest");

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/utils/html.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var Context = /* @__PURE__ */ __name(class {
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= new Response(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = new Response(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = (layout) => this.#layout = layout;
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = () => this.#layout;
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = new Response(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return new Response(data, { status, headers: responseHeaders });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = () => {
    this.#notFoundHandler ??= () => new Response();
    return this.#notFoundHandler(this);
  };
}, "Context");

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/router.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = /* @__PURE__ */ __name(class extends Error {
}, "UnsupportedPathError");

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/utils/constants.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = /* @__PURE__ */ __name(class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path2, ...handlers) => {
      for (const p of [path2].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path2, app2) {
    const subApp = this.basePath(path2);
    app2.routes.map((r2) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r2.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r2.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r2.handler;
      }
      subApp.#addRoute(r2.method, r2.path, handler);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path2) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path2);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path2, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request2) => request2, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path2);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request2) => {
        const url = new URL(request2.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request2);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path2, "*"), handler);
    return this;
  }
  #addRoute(method, path2, handler) {
    method = method.toUpperCase();
    path2 = mergePath(this._basePath, path2);
    const r2 = { basePath: this._basePath, path: path2, method, handler };
    this.router.add(method, path2, [handler, r2]);
    this.routes.push(r2);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request2, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request2, executionCtx, env2, "GET")))();
    }
    const path2 = this.getPath(request2, { env: env2 });
    const matchResult = this.router.match(method, path2);
    const c = new Context(request2, {
      path: path2,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = (request2, ...rest) => {
    return this.#dispatch(request2, rest[1], rest[0], request2.method);
  };
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
}, "_Hono");

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/router/reg-exp-router/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/router/reg-exp-router/router.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/router/reg-exp-router/matcher.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var emptyParam = [];
function match(method, path2) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name((method2, path22) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path22];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path22.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }, "match2");
  this.match = match2;
  return match2(method, path2);
}
__name(match, "match");

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/router/reg-exp-router/node.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a2, b) {
  if (a2.length === 1) {
    return b.length === 1 ? a2 < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a2 === ONLY_WILDCARD_REG_EXP_STR || a2 === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a2 === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a2.length === b.length ? a2 < b ? -1 : 1 : b.length - a2.length;
}
__name(compareKey, "compareKey");
var Node = /* @__PURE__ */ __name(class _Node {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
}, "_Node");

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/router/reg-exp-router/trie.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var Trie = /* @__PURE__ */ __name(class {
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path2, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i2 = 0; ; ) {
      let replaced = false;
      path2 = path2.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i2}`;
        groups[i2] = [mark, m];
        i2++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path2.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i2 = groups.length - 1; i2 >= 0; i2--) {
      const [mark] = groups[i2];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i2][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
}, "Trie");

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path2) {
  return wildcardRegExpCache[path2] ??= new RegExp(
    path2 === "*" ? "" : `^${path2.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i2 = 0, j = -1, len = routesWithStaticPathFlag.length; i2 < len; i2++) {
    const [pathErrorCheckOnly, path2, handlers] = routesWithStaticPathFlag[i2];
    if (pathErrorCheckOnly) {
      staticMap[path2] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path2, j, pathErrorCheckOnly);
    } catch (e2) {
      throw e2 === PATH_ERROR ? new UnsupportedPathError(path2) : e2;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i2 = 0, len = handlerData.length; i2 < len; i2++) {
    for (let j = 0, len2 = handlerData[i2].length; j < len2; j++) {
      const map = handlerData[i2][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i2 in indexReplacementMap) {
    handlerMap[i2] = handlerData[indexReplacementMap[i2]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path2) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a2, b) => b.length - a2.length)) {
    if (buildWildcardRegExp(k).test(path2)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = /* @__PURE__ */ __name(class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path2, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path2 === "/*") {
      path2 = "*";
    }
    const paramCount = (path2.match(/\/:/g) || []).length;
    if (/\*$/.test(path2)) {
      const re = buildWildcardRegExp(path2);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path2] ||= findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || [];
        });
      } else {
        middleware[method][path2] ||= findMiddleware(middleware[method], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path2) || [path2];
    for (let i2 = 0, len = paths.length; i2 < len; i2++) {
      const path22 = paths[i2];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path22] ||= [
            ...findMiddleware(middleware[m], path22) || findMiddleware(middleware[METHOD_NAME_ALL], path22) || []
          ];
          routes[m][path22].push([handler, paramCount - len + i2 + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r2) => {
      const ownRoute = r2[method] ? Object.keys(r2[method]).map((path2) => [path2, r2[method][path2]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r2[METHOD_NAME_ALL]).map((path2) => [path2, r2[METHOD_NAME_ALL][path2]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
}, "RegExpRouter");

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/router/reg-exp-router/prepared-router.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/router/smart-router/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/router/smart-router/router.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var SmartRouter = /* @__PURE__ */ __name(class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init2) {
    this.#routers = init2.routers;
  }
  add(method, path2, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path2, handler]);
  }
  match(method, path2) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i2 = 0;
    let res;
    for (; i2 < len; i2++) {
      const router = routers[i2];
      try {
        for (let i22 = 0, len2 = routes.length; i22 < len2; i22++) {
          router.add(...routes[i22]);
        }
        res = router.match(method, path2);
      } catch (e2) {
        if (e2 instanceof UnsupportedPathError) {
          continue;
        }
        throw e2;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i2 === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
}, "SmartRouter");

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/router/trie-router/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/router/trie-router/router.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/router/trie-router/node.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node2 = /* @__PURE__ */ __name(class _Node2 {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path2, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path2);
    const possibleKeys = [];
    for (let i2 = 0, len = parts.length; i2 < len; i2++) {
      const p = parts[i2];
      const nextP = parts[i2 + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i2, a2) => a2.indexOf(v) === i2),
        score: this.#order
      }
    });
    return curNode;
  }
  #getHandlerSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i2 = 0, len = node.#methods.length; i2 < len; i2++) {
      const m = node.#methods[i2];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i22 = 0, len2 = handlerSet.possibleKeys.length; i22 < len2; i22++) {
            const key = handlerSet.possibleKeys[i22];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
    return handlerSets;
  }
  search(method, path2) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path2);
    const curNodesQueue = [];
    for (let i2 = 0, len = parts.length; i2 < len; i2++) {
      const part = parts[i2];
      const isLast = i2 === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              handlerSets.push(
                ...this.#getHandlerSets(nextNode.#children["*"], method, node.#params)
              );
            }
            handlerSets.push(...this.#getHandlerSets(nextNode, method, node.#params));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              handlerSets.push(...this.#getHandlerSets(astNode, method, node.#params));
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          const restPathString = parts.slice(i2).join("/");
          if (matcher instanceof RegExp) {
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              handlerSets.push(...this.#getHandlerSets(child, method, params, node.#params));
              if (child.#children["*"]) {
                handlerSets.push(
                  ...this.#getHandlerSets(child.#children["*"], method, params, node.#params)
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a2, b) => {
        return a2.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
}, "_Node");

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = /* @__PURE__ */ __name(class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path2, handler) {
    const results = checkOptionalParameter(path2);
    if (results) {
      for (let i2 = 0, len = results.length; i2 < len; i2++) {
        this.#node.insert(method, results[i2], handler);
      }
      return;
    }
    this.#node.insert(method, path2, handler);
  }
  match(method, path2) {
    return this.#node.search(method, path2);
  }
}, "TrieRouter");

// ../../node_modules/.pnpm/hono@4.11.4/node_modules/hono/dist/hono.js
var Hono2 = /* @__PURE__ */ __name(class extends Hono {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
}, "Hono");

// ../github-integration/src/index.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/@octokit+app@14.1.0/node_modules/@octokit/app/dist-web/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var import_core = __toESM(require_dist_node4());
var import_auth_app = __toESM(require_dist_node6());
var import_oauth_app = __toESM(require_dist_node8());
var import_auth_app2 = __toESM(require_dist_node6());
var import_auth_unauthenticated = __toESM(require_dist_node7());

// ../../node_modules/.pnpm/@octokit+webhooks@12.3.2/node_modules/@octokit/webhooks/dist-web/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var import_aggregate_error = __toESM(require_aggregate_error());

// ../../node_modules/.pnpm/@octokit+webhooks-methods@4.1.0/node_modules/@octokit/webhooks-methods/dist-web/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var Algorithm = /* @__PURE__ */ ((Algorithm2) => {
  Algorithm2["SHA1"] = "sha1";
  Algorithm2["SHA256"] = "sha256";
  return Algorithm2;
})(Algorithm || {});
var getAlgorithm = /* @__PURE__ */ __name((signature) => {
  return signature.startsWith("sha256=") ? "sha256" : "sha1";
}, "getAlgorithm");
var enc = new TextEncoder();
function hexToUInt8Array(string) {
  const pairs = string.match(/[\dA-F]{2}/gi);
  const integers = pairs.map(function(s) {
    return parseInt(s, 16);
  });
  return new Uint8Array(integers);
}
__name(hexToUInt8Array, "hexToUInt8Array");
function UInt8ArrayToHex(signature) {
  return Array.prototype.map.call(new Uint8Array(signature), (x) => x.toString(16).padStart(2, "0")).join("");
}
__name(UInt8ArrayToHex, "UInt8ArrayToHex");
function getHMACHashName(algorithm) {
  return {
    [Algorithm.SHA1]: "SHA-1",
    [Algorithm.SHA256]: "SHA-256"
  }[algorithm];
}
__name(getHMACHashName, "getHMACHashName");
async function importKey(secret, algorithm) {
  return crypto.subtle.importKey(
    "raw",
    // raw format of the key - should be Uint8Array
    enc.encode(secret),
    {
      // algorithm details
      name: "HMAC",
      hash: { name: getHMACHashName(algorithm) }
    },
    false,
    // export = false
    ["sign", "verify"]
    // what this key can do
  );
}
__name(importKey, "importKey");
async function sign(options, payload) {
  const { secret, algorithm } = typeof options === "object" ? {
    secret: options.secret,
    algorithm: options.algorithm || Algorithm.SHA256
  } : { secret: options, algorithm: Algorithm.SHA256 };
  if (!secret || !payload) {
    throw new TypeError(
      "[@octokit/webhooks-methods] secret & payload required for sign()"
    );
  }
  if (typeof payload !== "string") {
    throw new TypeError("[@octokit/webhooks-methods] payload must be a string");
  }
  if (!Object.values(Algorithm).includes(algorithm)) {
    throw new TypeError(
      `[@octokit/webhooks] Algorithm ${algorithm} is not supported. Must be  'sha1' or 'sha256'`
    );
  }
  const signature = await crypto.subtle.sign(
    "HMAC",
    await importKey(secret, algorithm),
    enc.encode(payload)
  );
  return `${algorithm}=${UInt8ArrayToHex(signature)}`;
}
__name(sign, "sign");
async function verify(secret, eventPayload, signature) {
  if (!secret || !eventPayload || !signature) {
    throw new TypeError(
      "[@octokit/webhooks-methods] secret, eventPayload & signature required"
    );
  }
  if (typeof eventPayload !== "string") {
    throw new TypeError(
      "[@octokit/webhooks-methods] eventPayload must be a string"
    );
  }
  const algorithm = getAlgorithm(signature);
  return await crypto.subtle.verify(
    "HMAC",
    await importKey(secret, algorithm),
    hexToUInt8Array(signature.replace(`${algorithm}=`, "")),
    enc.encode(eventPayload)
  );
}
__name(verify, "verify");

// ../../node_modules/.pnpm/@octokit+webhooks@12.3.2/node_modules/@octokit/webhooks/dist-web/index.js
var import_aggregate_error2 = __toESM(require_aggregate_error());
var import_aggregate_error3 = __toESM(require_aggregate_error());
var createLogger = /* @__PURE__ */ __name((logger = {}) => {
  if (typeof logger.debug !== "function") {
    logger.debug = () => {
    };
  }
  if (typeof logger.info !== "function") {
    logger.info = () => {
    };
  }
  if (typeof logger.warn !== "function") {
    logger.warn = console.warn.bind(console);
  }
  if (typeof logger.error !== "function") {
    logger.error = console.error.bind(console);
  }
  return logger;
}, "createLogger");
var emitterEventNames = [
  "branch_protection_configuration",
  "branch_protection_configuration.disabled",
  "branch_protection_configuration.enabled",
  "branch_protection_rule",
  "branch_protection_rule.created",
  "branch_protection_rule.deleted",
  "branch_protection_rule.edited",
  "check_run",
  "check_run.completed",
  "check_run.created",
  "check_run.requested_action",
  "check_run.rerequested",
  "check_suite",
  "check_suite.completed",
  "check_suite.requested",
  "check_suite.rerequested",
  "code_scanning_alert",
  "code_scanning_alert.appeared_in_branch",
  "code_scanning_alert.closed_by_user",
  "code_scanning_alert.created",
  "code_scanning_alert.fixed",
  "code_scanning_alert.reopened",
  "code_scanning_alert.reopened_by_user",
  "commit_comment",
  "commit_comment.created",
  "create",
  "custom_property",
  "custom_property.created",
  "custom_property.deleted",
  "custom_property_values",
  "custom_property_values.updated",
  "delete",
  "dependabot_alert",
  "dependabot_alert.created",
  "dependabot_alert.dismissed",
  "dependabot_alert.fixed",
  "dependabot_alert.reintroduced",
  "dependabot_alert.reopened",
  "deploy_key",
  "deploy_key.created",
  "deploy_key.deleted",
  "deployment",
  "deployment.created",
  "deployment_protection_rule",
  "deployment_protection_rule.requested",
  "deployment_review",
  "deployment_review.approved",
  "deployment_review.rejected",
  "deployment_review.requested",
  "deployment_status",
  "deployment_status.created",
  "discussion",
  "discussion.answered",
  "discussion.category_changed",
  "discussion.created",
  "discussion.deleted",
  "discussion.edited",
  "discussion.labeled",
  "discussion.locked",
  "discussion.pinned",
  "discussion.transferred",
  "discussion.unanswered",
  "discussion.unlabeled",
  "discussion.unlocked",
  "discussion.unpinned",
  "discussion_comment",
  "discussion_comment.created",
  "discussion_comment.deleted",
  "discussion_comment.edited",
  "fork",
  "github_app_authorization",
  "github_app_authorization.revoked",
  "gollum",
  "installation",
  "installation.created",
  "installation.deleted",
  "installation.new_permissions_accepted",
  "installation.suspend",
  "installation.unsuspend",
  "installation_repositories",
  "installation_repositories.added",
  "installation_repositories.removed",
  "installation_target",
  "installation_target.renamed",
  "issue_comment",
  "issue_comment.created",
  "issue_comment.deleted",
  "issue_comment.edited",
  "issues",
  "issues.assigned",
  "issues.closed",
  "issues.deleted",
  "issues.demilestoned",
  "issues.edited",
  "issues.labeled",
  "issues.locked",
  "issues.milestoned",
  "issues.opened",
  "issues.pinned",
  "issues.reopened",
  "issues.transferred",
  "issues.unassigned",
  "issues.unlabeled",
  "issues.unlocked",
  "issues.unpinned",
  "label",
  "label.created",
  "label.deleted",
  "label.edited",
  "marketplace_purchase",
  "marketplace_purchase.cancelled",
  "marketplace_purchase.changed",
  "marketplace_purchase.pending_change",
  "marketplace_purchase.pending_change_cancelled",
  "marketplace_purchase.purchased",
  "member",
  "member.added",
  "member.edited",
  "member.removed",
  "membership",
  "membership.added",
  "membership.removed",
  "merge_group",
  "merge_group.checks_requested",
  "merge_group.destroyed",
  "meta",
  "meta.deleted",
  "milestone",
  "milestone.closed",
  "milestone.created",
  "milestone.deleted",
  "milestone.edited",
  "milestone.opened",
  "org_block",
  "org_block.blocked",
  "org_block.unblocked",
  "organization",
  "organization.deleted",
  "organization.member_added",
  "organization.member_invited",
  "organization.member_removed",
  "organization.renamed",
  "package",
  "package.published",
  "package.updated",
  "page_build",
  "ping",
  "project",
  "project.closed",
  "project.created",
  "project.deleted",
  "project.edited",
  "project.reopened",
  "project_card",
  "project_card.converted",
  "project_card.created",
  "project_card.deleted",
  "project_card.edited",
  "project_card.moved",
  "project_column",
  "project_column.created",
  "project_column.deleted",
  "project_column.edited",
  "project_column.moved",
  "projects_v2_item",
  "projects_v2_item.archived",
  "projects_v2_item.converted",
  "projects_v2_item.created",
  "projects_v2_item.deleted",
  "projects_v2_item.edited",
  "projects_v2_item.reordered",
  "projects_v2_item.restored",
  "public",
  "pull_request",
  "pull_request.assigned",
  "pull_request.auto_merge_disabled",
  "pull_request.auto_merge_enabled",
  "pull_request.closed",
  "pull_request.converted_to_draft",
  "pull_request.demilestoned",
  "pull_request.dequeued",
  "pull_request.edited",
  "pull_request.enqueued",
  "pull_request.labeled",
  "pull_request.locked",
  "pull_request.milestoned",
  "pull_request.opened",
  "pull_request.ready_for_review",
  "pull_request.reopened",
  "pull_request.review_request_removed",
  "pull_request.review_requested",
  "pull_request.synchronize",
  "pull_request.unassigned",
  "pull_request.unlabeled",
  "pull_request.unlocked",
  "pull_request_review",
  "pull_request_review.dismissed",
  "pull_request_review.edited",
  "pull_request_review.submitted",
  "pull_request_review_comment",
  "pull_request_review_comment.created",
  "pull_request_review_comment.deleted",
  "pull_request_review_comment.edited",
  "pull_request_review_thread",
  "pull_request_review_thread.resolved",
  "pull_request_review_thread.unresolved",
  "push",
  "registry_package",
  "registry_package.published",
  "registry_package.updated",
  "release",
  "release.created",
  "release.deleted",
  "release.edited",
  "release.prereleased",
  "release.published",
  "release.released",
  "release.unpublished",
  "repository",
  "repository.archived",
  "repository.created",
  "repository.deleted",
  "repository.edited",
  "repository.privatized",
  "repository.publicized",
  "repository.renamed",
  "repository.transferred",
  "repository.unarchived",
  "repository_dispatch",
  "repository_import",
  "repository_vulnerability_alert",
  "repository_vulnerability_alert.create",
  "repository_vulnerability_alert.dismiss",
  "repository_vulnerability_alert.reopen",
  "repository_vulnerability_alert.resolve",
  "secret_scanning_alert",
  "secret_scanning_alert.created",
  "secret_scanning_alert.reopened",
  "secret_scanning_alert.resolved",
  "secret_scanning_alert.revoked",
  "secret_scanning_alert_location",
  "secret_scanning_alert_location.created",
  "security_advisory",
  "security_advisory.performed",
  "security_advisory.published",
  "security_advisory.updated",
  "security_advisory.withdrawn",
  "sponsorship",
  "sponsorship.cancelled",
  "sponsorship.created",
  "sponsorship.edited",
  "sponsorship.pending_cancellation",
  "sponsorship.pending_tier_change",
  "sponsorship.tier_changed",
  "star",
  "star.created",
  "star.deleted",
  "status",
  "team",
  "team.added_to_repository",
  "team.created",
  "team.deleted",
  "team.edited",
  "team.removed_from_repository",
  "team_add",
  "watch",
  "watch.started",
  "workflow_dispatch",
  "workflow_job",
  "workflow_job.completed",
  "workflow_job.in_progress",
  "workflow_job.queued",
  "workflow_job.waiting",
  "workflow_run",
  "workflow_run.completed",
  "workflow_run.in_progress",
  "workflow_run.requested"
];
function handleEventHandlers(state, webhookName, handler) {
  if (!state.hooks[webhookName]) {
    state.hooks[webhookName] = [];
  }
  state.hooks[webhookName].push(handler);
}
__name(handleEventHandlers, "handleEventHandlers");
function receiverOn(state, webhookNameOrNames, handler) {
  if (Array.isArray(webhookNameOrNames)) {
    webhookNameOrNames.forEach(
      (webhookName) => receiverOn(state, webhookName, handler)
    );
    return;
  }
  if (["*", "error"].includes(webhookNameOrNames)) {
    const webhookName = webhookNameOrNames === "*" ? "any" : webhookNameOrNames;
    const message = `Using the "${webhookNameOrNames}" event with the regular Webhooks.on() function is not supported. Please use the Webhooks.on${webhookName.charAt(0).toUpperCase() + webhookName.slice(1)}() method instead`;
    throw new Error(message);
  }
  if (!emitterEventNames.includes(webhookNameOrNames)) {
    state.log.warn(
      `"${webhookNameOrNames}" is not a known webhook name (https://developer.github.com/v3/activity/events/types/)`
    );
  }
  handleEventHandlers(state, webhookNameOrNames, handler);
}
__name(receiverOn, "receiverOn");
function receiverOnAny(state, handler) {
  handleEventHandlers(state, "*", handler);
}
__name(receiverOnAny, "receiverOnAny");
function receiverOnError(state, handler) {
  handleEventHandlers(state, "error", handler);
}
__name(receiverOnError, "receiverOnError");
function wrapErrorHandler(handler, error) {
  let returnValue;
  try {
    returnValue = handler(error);
  } catch (error2) {
    console.log('FATAL: Error occurred in "error" event handler');
    console.log(error2);
  }
  if (returnValue && returnValue.catch) {
    returnValue.catch((error2) => {
      console.log('FATAL: Error occurred in "error" event handler');
      console.log(error2);
    });
  }
}
__name(wrapErrorHandler, "wrapErrorHandler");
function getHooks(state, eventPayloadAction, eventName) {
  const hooks = [state.hooks[eventName], state.hooks["*"]];
  if (eventPayloadAction) {
    hooks.unshift(state.hooks[`${eventName}.${eventPayloadAction}`]);
  }
  return [].concat(...hooks.filter(Boolean));
}
__name(getHooks, "getHooks");
function receiverHandle(state, event) {
  const errorHandlers = state.hooks.error || [];
  if (event instanceof Error) {
    const error = Object.assign(new import_aggregate_error.default([event]), {
      event,
      errors: [event]
    });
    errorHandlers.forEach((handler) => wrapErrorHandler(handler, error));
    return Promise.reject(error);
  }
  if (!event || !event.name) {
    throw new import_aggregate_error.default(["Event name not passed"]);
  }
  if (!event.payload) {
    throw new import_aggregate_error.default(["Event payload not passed"]);
  }
  const hooks = getHooks(
    state,
    "action" in event.payload ? event.payload.action : null,
    event.name
  );
  if (hooks.length === 0) {
    return Promise.resolve();
  }
  const errors = [];
  const promises = hooks.map((handler) => {
    let promise = Promise.resolve(event);
    if (state.transform) {
      promise = promise.then(state.transform);
    }
    return promise.then((event2) => {
      return handler(event2);
    }).catch((error) => errors.push(Object.assign(error, { event })));
  });
  return Promise.all(promises).then(() => {
    if (errors.length === 0) {
      return;
    }
    const error = new import_aggregate_error.default(errors);
    Object.assign(error, {
      event,
      errors
    });
    errorHandlers.forEach((handler) => wrapErrorHandler(handler, error));
    throw error;
  });
}
__name(receiverHandle, "receiverHandle");
function removeListener2(state, webhookNameOrNames, handler) {
  if (Array.isArray(webhookNameOrNames)) {
    webhookNameOrNames.forEach(
      (webhookName) => removeListener2(state, webhookName, handler)
    );
    return;
  }
  if (!state.hooks[webhookNameOrNames]) {
    return;
  }
  for (let i2 = state.hooks[webhookNameOrNames].length - 1; i2 >= 0; i2--) {
    if (state.hooks[webhookNameOrNames][i2] === handler) {
      state.hooks[webhookNameOrNames].splice(i2, 1);
      return;
    }
  }
}
__name(removeListener2, "removeListener");
function createEventHandler(options) {
  const state = {
    hooks: {},
    log: createLogger(options && options.log)
  };
  if (options && options.transform) {
    state.transform = options.transform;
  }
  return {
    on: receiverOn.bind(null, state),
    onAny: receiverOnAny.bind(null, state),
    onError: receiverOnError.bind(null, state),
    removeListener: removeListener2.bind(null, state),
    receive: receiverHandle.bind(null, state)
  };
}
__name(createEventHandler, "createEventHandler");
async function verifyAndReceive(state, event) {
  const matchesSignature = await verify(
    state.secret,
    event.payload,
    event.signature
  ).catch(() => false);
  if (!matchesSignature) {
    const error = new Error(
      "[@octokit/webhooks] signature does not match event payload and secret"
    );
    return state.eventHandler.receive(
      Object.assign(error, { event, status: 400 })
    );
  }
  let payload;
  try {
    payload = JSON.parse(event.payload);
  } catch (error) {
    error.message = "Invalid JSON";
    error.status = 400;
    throw new import_aggregate_error2.default([error]);
  }
  return state.eventHandler.receive({
    id: event.id,
    name: event.name,
    payload
  });
}
__name(verifyAndReceive, "verifyAndReceive");
var Webhooks = /* @__PURE__ */ __name(class {
  constructor(options) {
    if (!options || !options.secret) {
      throw new Error("[@octokit/webhooks] options.secret required");
    }
    const state = {
      eventHandler: createEventHandler(options),
      secret: options.secret,
      hooks: {},
      log: createLogger(options.log)
    };
    this.sign = sign.bind(null, options.secret);
    this.verify = verify.bind(null, options.secret);
    this.on = state.eventHandler.on;
    this.onAny = state.eventHandler.onAny;
    this.onError = state.eventHandler.onError;
    this.removeListener = state.eventHandler.removeListener;
    this.receive = state.eventHandler.receive;
    this.verifyAndReceive = verifyAndReceive.bind(null, state);
  }
}, "Webhooks");

// ../../node_modules/.pnpm/@octokit+plugin-paginate-rest@9.2.2_@octokit+core@5.2.2/node_modules/@octokit/plugin-paginate-rest/dist-web/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var VERSION6 = "9.2.2";
function normalizePaginatedListResponse(response) {
  if (!response.data) {
    return {
      ...response,
      data: []
    };
  }
  const responseNeedsNormalization = "total_count" in response.data && !("url" in response.data);
  if (!responseNeedsNormalization)
    return response;
  const incompleteResults = response.data.incomplete_results;
  const repositorySelection = response.data.repository_selection;
  const totalCount = response.data.total_count;
  delete response.data.incomplete_results;
  delete response.data.repository_selection;
  delete response.data.total_count;
  const namespaceKey = Object.keys(response.data)[0];
  const data = response.data[namespaceKey];
  response.data = data;
  if (typeof incompleteResults !== "undefined") {
    response.data.incomplete_results = incompleteResults;
  }
  if (typeof repositorySelection !== "undefined") {
    response.data.repository_selection = repositorySelection;
  }
  response.data.total_count = totalCount;
  return response;
}
__name(normalizePaginatedListResponse, "normalizePaginatedListResponse");
function iterator(octokit, route, parameters) {
  const options = typeof route === "function" ? route.endpoint(parameters) : octokit.request.endpoint(route, parameters);
  const requestMethod = typeof route === "function" ? route : octokit.request;
  const method = options.method;
  const headers = options.headers;
  let url = options.url;
  return {
    [Symbol.asyncIterator]: () => ({
      async next() {
        if (!url)
          return { done: true };
        try {
          const response = await requestMethod({ method, url, headers });
          const normalizedResponse = normalizePaginatedListResponse(response);
          url = ((normalizedResponse.headers.link || "").match(
            /<([^<>]+)>;\s*rel="next"/
          ) || [])[1];
          return { value: normalizedResponse };
        } catch (error) {
          if (error.status !== 409)
            throw error;
          url = "";
          return {
            value: {
              status: 200,
              headers: {},
              data: []
            }
          };
        }
      }
    })
  };
}
__name(iterator, "iterator");
function paginate(octokit, route, parameters, mapFn) {
  if (typeof parameters === "function") {
    mapFn = parameters;
    parameters = void 0;
  }
  return gather(
    octokit,
    [],
    iterator(octokit, route, parameters)[Symbol.asyncIterator](),
    mapFn
  );
}
__name(paginate, "paginate");
function gather(octokit, results, iterator2, mapFn) {
  return iterator2.next().then((result) => {
    if (result.done) {
      return results;
    }
    let earlyExit = false;
    function done() {
      earlyExit = true;
    }
    __name(done, "done");
    results = results.concat(
      mapFn ? mapFn(result.value, done) : result.value.data
    );
    if (earlyExit) {
      return results;
    }
    return gather(octokit, results, iterator2, mapFn);
  });
}
__name(gather, "gather");
var composePaginateRest = Object.assign(paginate, {
  iterator
});
function paginateRest(octokit) {
  return {
    paginate: Object.assign(paginate.bind(null, octokit), {
      iterator: iterator.bind(null, octokit)
    })
  };
}
__name(paginateRest, "paginateRest");
paginateRest.VERSION = VERSION6;

// ../../node_modules/.pnpm/@octokit+app@14.1.0/node_modules/@octokit/app/dist-web/index.js
var import_auth_app3 = __toESM(require_dist_node6());
var VERSION7 = "14.1.0";
function webhooks(appOctokit, options) {
  return new Webhooks({
    secret: options.secret,
    transform: async (event) => {
      if (!("installation" in event.payload) || typeof event.payload.installation !== "object") {
        const octokit2 = new appOctokit.constructor({
          authStrategy: import_auth_unauthenticated.createUnauthenticatedAuth,
          auth: {
            reason: `"installation" key missing in webhook event payload`
          }
        });
        return {
          ...event,
          octokit: octokit2
        };
      }
      const installationId = event.payload.installation.id;
      const octokit = await appOctokit.auth({
        type: "installation",
        installationId,
        factory(auth5) {
          return new auth5.octokit.constructor({
            ...auth5.octokitOptions,
            authStrategy: import_auth_app2.createAppAuth,
            ...{
              auth: {
                ...auth5,
                installationId
              }
            }
          });
        }
      });
      octokit.hook.before("request", (options2) => {
        options2.headers["x-github-delivery"] = event.id;
      });
      return {
        ...event,
        octokit
      };
    }
  });
}
__name(webhooks, "webhooks");
async function getInstallationOctokit(app2, installationId) {
  return app2.octokit.auth({
    type: "installation",
    installationId,
    factory(auth5) {
      const options = {
        ...auth5.octokitOptions,
        authStrategy: import_auth_app3.createAppAuth,
        ...{ auth: { ...auth5, installationId } }
      };
      return new auth5.octokit.constructor(options);
    }
  });
}
__name(getInstallationOctokit, "getInstallationOctokit");
function eachInstallationFactory(app2) {
  return Object.assign(eachInstallation.bind(null, app2), {
    iterator: eachInstallationIterator.bind(null, app2)
  });
}
__name(eachInstallationFactory, "eachInstallationFactory");
async function eachInstallation(app2, callback) {
  const i2 = eachInstallationIterator(app2)[Symbol.asyncIterator]();
  let result = await i2.next();
  while (!result.done) {
    await callback(result.value);
    result = await i2.next();
  }
}
__name(eachInstallation, "eachInstallation");
function eachInstallationIterator(app2) {
  return {
    async *[Symbol.asyncIterator]() {
      const iterator2 = composePaginateRest.iterator(
        app2.octokit,
        "GET /app/installations"
      );
      for await (const { data: installations } of iterator2) {
        for (const installation of installations) {
          const installationOctokit = await getInstallationOctokit(
            app2,
            installation.id
          );
          yield { octokit: installationOctokit, installation };
        }
      }
    }
  };
}
__name(eachInstallationIterator, "eachInstallationIterator");
function eachRepositoryFactory(app2) {
  return Object.assign(eachRepository.bind(null, app2), {
    iterator: eachRepositoryIterator.bind(null, app2)
  });
}
__name(eachRepositoryFactory, "eachRepositoryFactory");
async function eachRepository(app2, queryOrCallback, callback) {
  const i2 = eachRepositoryIterator(
    app2,
    callback ? queryOrCallback : void 0
  )[Symbol.asyncIterator]();
  let result = await i2.next();
  while (!result.done) {
    if (callback) {
      await callback(result.value);
    } else {
      await queryOrCallback(result.value);
    }
    result = await i2.next();
  }
}
__name(eachRepository, "eachRepository");
function singleInstallationIterator(app2, installationId) {
  return {
    async *[Symbol.asyncIterator]() {
      yield {
        octokit: await app2.getInstallationOctokit(installationId)
      };
    }
  };
}
__name(singleInstallationIterator, "singleInstallationIterator");
function eachRepositoryIterator(app2, query) {
  return {
    async *[Symbol.asyncIterator]() {
      const iterator2 = query ? singleInstallationIterator(app2, query.installationId) : app2.eachInstallation.iterator();
      for await (const { octokit } of iterator2) {
        const repositoriesIterator = composePaginateRest.iterator(
          octokit,
          "GET /installation/repositories"
        );
        for await (const { data: repositories } of repositoriesIterator) {
          for (const repository of repositories) {
            yield { octokit, repository };
          }
        }
      }
    }
  };
}
__name(eachRepositoryIterator, "eachRepositoryIterator");
var App = /* @__PURE__ */ __name(class {
  static {
    this.VERSION = VERSION7;
  }
  static defaults(defaults) {
    const AppWithDefaults = /* @__PURE__ */ __name(class extends this {
      constructor(...args) {
        super({
          ...defaults,
          ...args[0]
        });
      }
    }, "AppWithDefaults");
    return AppWithDefaults;
  }
  constructor(options) {
    const Octokit = options.Octokit || import_core.Octokit;
    const authOptions = Object.assign(
      {
        appId: options.appId,
        privateKey: options.privateKey
      },
      options.oauth ? {
        clientId: options.oauth.clientId,
        clientSecret: options.oauth.clientSecret
      } : {}
    );
    this.octokit = new Octokit({
      authStrategy: import_auth_app.createAppAuth,
      auth: authOptions,
      log: options.log
    });
    this.log = Object.assign(
      {
        debug: () => {
        },
        info: () => {
        },
        warn: console.warn.bind(console),
        error: console.error.bind(console)
      },
      options.log
    );
    if (options.webhooks) {
      this.webhooks = webhooks(this.octokit, options.webhooks);
    } else {
      Object.defineProperty(this, "webhooks", {
        get() {
          throw new Error("[@octokit/app] webhooks option not set");
        }
      });
    }
    if (options.oauth) {
      this.oauth = new import_oauth_app.OAuthApp({
        ...options.oauth,
        clientType: "github-app",
        Octokit
      });
    } else {
      Object.defineProperty(this, "oauth", {
        get() {
          throw new Error(
            "[@octokit/app] oauth.clientId / oauth.clientSecret options are not set"
          );
        }
      });
    }
    this.getInstallationOctokit = getInstallationOctokit.bind(
      null,
      this
    );
    this.eachInstallation = eachInstallationFactory(
      this
    );
    this.eachRepository = eachRepositoryFactory(
      this
    );
  }
}, "App");

// ../github-integration/src/index.ts
var GitHubIntegration = class {
  app;
  constructor(config2) {
    this.app = new App({
      appId: config2.appId,
      privateKey: this.normalizePrivateKey(config2.privateKey)
    });
  }
  async getInstallationToken(installationId) {
    const { data } = await this.app.octokit.request(
      "POST /app/installations/{installation_id}/access_tokens",
      { installation_id: installationId }
    );
    return data.token;
  }
  async getInstallationOctokit(installationId) {
    return this.app.getInstallationOctokit(installationId);
  }
  async listRepositories(installationId) {
    const octokit = await this.getInstallationOctokit(installationId);
    const { data } = await octokit.apps.listReposAccessibleToInstallation();
    return data.repositories;
  }
  async getAuthenticatedCloneUrl(owner, repo, installationId) {
    const token = await this.getInstallationToken(installationId);
    const cloneUrl = `https://x-access-token:${token}@github.com/${owner}/${repo}.git`;
    return { cloneUrl, token };
  }
  normalizePrivateKey(key) {
    if (key.includes("\n")) {
      return key.replace(/\\n/g, "\n");
    }
    return key;
  }
};
__name(GitHubIntegration, "GitHubIntegration");

// ../shared/src/index.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../shared/src/types/session.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../shared/src/types/message.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../shared/src/types/user.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../shared/src/types/events.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../shared/src/utils/logger.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../shared/src/utils/validation.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var parseRepoUrl = /* @__PURE__ */ __name((url) => {
  const match2 = url.match(/github\.com[/:]([^/]+)\/([^/.]+)/i);
  if (!match2)
    return null;
  return { owner: match2[1], repo: match2[2].replace(".git", "") };
}, "parseRepoUrl");

// ../shared/src/utils/crypto.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// src/providers/e2b-provider.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/e2b@0.16.2/node_modules/e2b/dist/index.mjs
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/openapi-typescript-fetch@1.1.3/node_modules/openapi-typescript-fetch/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  ApiError: () => ApiError,
  Fetcher: () => Fetcher,
  arrayRequestBody: () => arrayRequestBody
});
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/openapi-typescript-fetch@1.1.3/node_modules/openapi-typescript-fetch/dist/esm/fetcher.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();

// ../../node_modules/.pnpm/openapi-typescript-fetch@1.1.3/node_modules/openapi-typescript-fetch/dist/esm/types.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var never = Symbol();
var ApiError = class extends Error {
  constructor(response) {
    super(response.statusText);
    Object.defineProperty(this, "headers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "url", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "status", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "statusText", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.setPrototypeOf(this, new.target.prototype);
    this.headers = response.headers;
    this.url = response.url;
    this.status = response.status;
    this.statusText = response.statusText;
    this.data = response.data;
  }
};
__name(ApiError, "ApiError");

// ../../node_modules/.pnpm/openapi-typescript-fetch@1.1.3/node_modules/openapi-typescript-fetch/dist/esm/fetcher.js
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  __name(adopt, "adopt");
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    __name(fulfilled, "fulfilled");
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    __name(rejected, "rejected");
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    __name(step, "step");
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var sendBody = /* @__PURE__ */ __name((method) => method === "post" || method === "put" || method === "patch" || method === "delete", "sendBody");
function queryString(params) {
  const qs = [];
  const encode = /* @__PURE__ */ __name((key, value) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`, "encode");
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value != null) {
      if (Array.isArray(value)) {
        value.forEach((value2) => qs.push(encode(key, value2)));
      } else {
        qs.push(encode(key, value));
      }
    }
  });
  if (qs.length > 0) {
    return `?${qs.join("&")}`;
  }
  return "";
}
__name(queryString, "queryString");
function getPath2(path2, payload) {
  return path2.replace(/\{([^}]+)\}/g, (_, key) => {
    const value = encodeURIComponent(payload[key]);
    delete payload[key];
    return value;
  });
}
__name(getPath2, "getPath");
function getQuery(method, payload, query) {
  let queryObj = {};
  if (sendBody(method)) {
    query.forEach((key) => {
      queryObj[key] = payload[key];
      delete payload[key];
    });
  } else {
    queryObj = Object.assign({}, payload);
  }
  return queryString(queryObj);
}
__name(getQuery, "getQuery");
function getHeaders(body, init2) {
  const headers = new Headers(init2);
  if (body !== void 0 && !headers.has("Content-Type")) {
    headers.append("Content-Type", "application/json");
  }
  if (!headers.has("Accept")) {
    headers.append("Accept", "application/json");
  }
  return headers;
}
__name(getHeaders, "getHeaders");
function getBody(method, payload) {
  const body = sendBody(method) ? JSON.stringify(payload) : void 0;
  return method === "delete" && body === "{}" ? void 0 : body;
}
__name(getBody, "getBody");
function mergeRequestInit(first, second) {
  const headers = new Headers(first === null || first === void 0 ? void 0 : first.headers);
  const other = new Headers(second === null || second === void 0 ? void 0 : second.headers);
  for (const key of other.keys()) {
    const value = other.get(key);
    if (value != null) {
      headers.set(key, value);
    }
  }
  return Object.assign(Object.assign(Object.assign({}, first), second), { headers });
}
__name(mergeRequestInit, "mergeRequestInit");
function getFetchParams(request2) {
  var _a5;
  const payload = Object.assign(Array.isArray(request2.payload) ? [] : {}, request2.payload);
  const path2 = getPath2(request2.path, payload);
  const query = getQuery(request2.method, payload, request2.queryParams);
  const body = getBody(request2.method, payload);
  const headers = getHeaders(body, (_a5 = request2.init) === null || _a5 === void 0 ? void 0 : _a5.headers);
  const url = request2.baseUrl + path2 + query;
  const init2 = Object.assign(Object.assign({}, request2.init), {
    method: request2.method.toUpperCase(),
    headers,
    body
  });
  return { url, init: init2 };
}
__name(getFetchParams, "getFetchParams");
function getResponseData2(response) {
  return __awaiter(this, void 0, void 0, function* () {
    const contentType = response.headers.get("content-type");
    if (response.status === 204) {
      return void 0;
    }
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return yield response.json();
    }
    const text = yield response.text();
    try {
      return JSON.parse(text);
    } catch (e2) {
      return text;
    }
  });
}
__name(getResponseData2, "getResponseData");
function fetchJson(url, init2) {
  return __awaiter(this, void 0, void 0, function* () {
    const response = yield fetch(url, init2);
    const data = yield getResponseData2(response);
    const result = {
      headers: response.headers,
      url: response.url,
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      data
    };
    if (result.ok) {
      return result;
    }
    throw new ApiError(result);
  });
}
__name(fetchJson, "fetchJson");
function wrapMiddlewares(middlewares, fetch2) {
  const handler = /* @__PURE__ */ __name((index, url, init2) => __awaiter(this, void 0, void 0, function* () {
    if (middlewares == null || index === middlewares.length) {
      return fetch2(url, init2);
    }
    const current = middlewares[index];
    return yield current(url, init2, (nextUrl, nextInit) => handler(index + 1, nextUrl, nextInit));
  }), "handler");
  return (url, init2) => handler(0, url, init2);
}
__name(wrapMiddlewares, "wrapMiddlewares");
function fetchUrl(request2) {
  return __awaiter(this, void 0, void 0, function* () {
    const { url, init: init2 } = getFetchParams(request2);
    const response = yield request2.fetch(url, init2);
    return response;
  });
}
__name(fetchUrl, "fetchUrl");
function createFetch(fetch2) {
  const fun = /* @__PURE__ */ __name((payload, init2) => __awaiter(this, void 0, void 0, function* () {
    try {
      return yield fetch2(payload, init2);
    } catch (err) {
      if (err instanceof ApiError) {
        throw new fun.Error(err);
      }
      throw err;
    }
  }), "fun");
  fun.Error = class extends ApiError {
    constructor(error) {
      super(error);
      Object.setPrototypeOf(this, new.target.prototype);
    }
    getActualType() {
      return {
        status: this.status,
        data: this.data
      };
    }
  };
  return fun;
}
__name(createFetch, "createFetch");
function fetcher() {
  let baseUrl = "";
  let defaultInit = {};
  const middlewares = [];
  const fetch2 = wrapMiddlewares(middlewares, fetchJson);
  return {
    configure: (config2) => {
      baseUrl = config2.baseUrl || "";
      defaultInit = config2.init || {};
      middlewares.splice(0);
      middlewares.push(...config2.use || []);
    },
    use: (mw) => middlewares.push(mw),
    path: (path2) => ({
      method: (method) => ({
        create: (queryParams) => createFetch((payload, init2) => fetchUrl({
          baseUrl: baseUrl || "",
          path: path2,
          method,
          queryParams: Object.keys(queryParams || {}),
          payload,
          init: mergeRequestInit(defaultInit, init2),
          fetch: fetch2
        }))
      })
    })
  };
}
__name(fetcher, "fetcher");
var Fetcher = {
  for: () => fetcher()
};

// ../../node_modules/.pnpm/openapi-typescript-fetch@1.1.3/node_modules/openapi-typescript-fetch/dist/esm/utils.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
function arrayRequestBody(array, params) {
  return Object.assign([...array], params);
}
__name(arrayRequestBody, "arrayRequestBody");

// ../../node_modules/.pnpm/e2b@0.16.2/node_modules/e2b/dist/index.mjs
var import_platform = __toESM(require_platform(), 1);
var import_normalize_path = __toESM(require_normalize_path(), 1);

// ../../node_modules/.pnpm/isomorphic-ws@5.0.0_ws@8.19.0_bufferutil@4.1.0_utf-8-validate@6.0.6_/node_modules/isomorphic-ws/browser.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var ws = null;
if (typeof WebSocket !== "undefined") {
  ws = WebSocket;
} else if (typeof MozWebSocket !== "undefined") {
  ws = MozWebSocket;
} else if (typeof globalThis !== "undefined") {
  ws = globalThis.WebSocket || globalThis.MozWebSocket;
} else if (typeof window !== "undefined") {
  ws = window.WebSocket || window.MozWebSocket;
} else if (typeof self !== "undefined") {
  ws = self.WebSocket || self.MozWebSocket;
}
var browser_default = ws;

// ../../node_modules/.pnpm/e2b@0.16.2/node_modules/e2b/dist/index.mjs
var import_path_browserify = __toESM(require_path_browserify(), 1);
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __reflectGet = Reflect.get;
var __defNormalProp = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp");
var __spreadValues = /* @__PURE__ */ __name((a2, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp(a2, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a2, prop, b[prop]);
    }
  return a2;
}, "__spreadValues");
var __spreadProps = /* @__PURE__ */ __name((a2, b) => __defProps(a2, __getOwnPropDescs(b)), "__spreadProps");
var __superGet = /* @__PURE__ */ __name((cls, obj, key) => __reflectGet(__getProtoOf2(cls), key, obj), "__superGet");
var __async = /* @__PURE__ */ __name((__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = /* @__PURE__ */ __name((value) => {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }, "fulfilled");
    var rejected = /* @__PURE__ */ __name((value) => {
      try {
        step(generator.throw(value));
      } catch (e2) {
        reject(e2);
      }
    }, "rejected");
    var step = /* @__PURE__ */ __name((x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected), "step");
    step((generator = generator.apply(__this, __arguments)).next());
  });
}, "__async");
var version2 = "0.16.2";
var _a;
var defaultHeaders = {
  browser: typeof window !== "undefined" && import_platform.default.name || "undefined",
  lang: "js",
  lang_version: import_platform.default.version || "unknown",
  package_version: version2,
  publisher: "e2b",
  sdk_runtime: typeof window === "undefined" ? "node" : "browser",
  system: ((_a = import_platform.default.os) == null ? void 0 : _a.family) || "unknown"
};
var SANDBOX_REFRESH_PERIOD = 5e3;
var WS_RECONNECT_INTERVAL = 150;
var TIMEOUT = 6e4;
var _a2;
var DEBUG = (_a2 = process == null ? void 0 : process.env) == null ? void 0 : _a2.E2B_DEBUG;
var _a3;
var DOMAIN = ((_a3 = process == null ? void 0 : process.env) == null ? void 0 : _a3.E2B_DOMAIN) || "e2b.dev";
var _a4;
var SECURE = (((_a4 = process == null ? void 0 : process.env) == null ? void 0 : _a4.E2B_SECURE) || "true").toLowerCase() === "true";
var API_DOMAIN = DEBUG ? "localhost:3000" : `api.${DOMAIN}`;
var API_HOST = `${SECURE && !DEBUG ? "https" : "http"}://${API_DOMAIN}`;
var ENVD_PORT = 49982;
var WS_ROUTE = "/ws";
var FILE_ROUTE = "/file";
var { Fetcher: Fetcher2 } = esm_exports;
var APIClient = /* @__PURE__ */ __name(class {
  constructor(opts) {
    this.opts = opts;
    this.client = Fetcher2.for();
    this.client.configure({
      baseUrl: this.apiHost,
      init: {
        headers: defaultHeaders
      }
    });
  }
  get secure() {
    var _a5, _b;
    return (_b = (_a5 = this.opts) == null ? void 0 : _a5.secure) != null ? _b : SECURE;
  }
  get domain() {
    var _a5, _b;
    return (_b = (_a5 = this.opts) == null ? void 0 : _a5.domain) != null ? _b : DOMAIN;
  }
  get debug() {
    var _a5, _b;
    return (_b = (_a5 = this.opts) == null ? void 0 : _a5.debug) != null ? _b : DEBUG;
  }
  get apiDomain() {
    return this.debug ? "localhost:3000" : `api.${this.domain}`;
  }
  get apiHost() {
    return `${this.secure && !this.debug ? "https" : "http"}://${this.apiDomain}`;
  }
  get api() {
    return this.client;
  }
}, "APIClient");
function withAPIKey(f) {
  const wrapped = /* @__PURE__ */ __name((apiKey, arg, init2) => {
    return f(arg, __spreadProps(__spreadValues({}, init2), {
      headers: __spreadValues({
        "X-API-KEY": apiKey
      }, init2 == null ? void 0 : init2.headers)
    }));
  }, "wrapped");
  wrapped.Error = f.Error;
  return wrapped;
}
__name(withAPIKey, "withAPIKey");
var terminalService = "terminal";
var TerminalOutput = /* @__PURE__ */ __name(class {
  constructor() {
    this._data = "";
  }
  get data() {
    return this._data;
  }
  addData(data) {
    this._data += data;
  }
}, "TerminalOutput");
var Terminal = /* @__PURE__ */ __name(class {
  constructor(terminalID, sandbox, triggerExit, finished, output) {
    this.terminalID = terminalID;
    this.sandbox = sandbox;
    this.triggerExit = triggerExit;
    this.output = output;
    this.finished = finished;
  }
  get data() {
    return this.output.data;
  }
  /**
   * Kills the terminal session.
   */
  kill() {
    return __async(this, null, function* () {
      try {
        yield this.sandbox._call(terminalService, "destroy", [this.terminalID]);
      } finally {
        this.triggerExit();
        yield this.finished;
      }
    });
  }
  /**
   * Waits for the terminal to finish.
   */
  wait() {
    return __async(this, null, function* () {
      return this.finished;
    });
  }
  /**
   * Sends data to the terminal standard input.
   *
   * @param data Data to send
   */
  sendData(data) {
    return __async(this, null, function* () {
      yield this.sandbox._call(terminalService, "data", [this.terminalID, data]);
    });
  }
  /**
   * Resizes the terminal tty.
   *
   * @param cols Number of columns
   * @param rows Number of rows
   */
  resize(_0) {
    return __async(this, arguments, function* ({ cols, rows }) {
      yield this.sandbox._call(terminalService, "resize", [
        this.terminalID,
        cols,
        rows
      ]);
    });
  }
}, "Terminal");
var TimeoutError = /* @__PURE__ */ __name(class extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
}, "TimeoutError");
var AbortError = /* @__PURE__ */ __name(class extends Error {
  constructor(message) {
    super();
    this.name = "AbortError";
    this.message = message;
  }
}, "AbortError");
var getDOMException = /* @__PURE__ */ __name((errorMessage) => globalThis.DOMException === void 0 ? new AbortError(errorMessage) : new DOMException(errorMessage), "getDOMException");
var getAbortedReason = /* @__PURE__ */ __name((signal) => {
  const reason = signal.reason === void 0 ? getDOMException("This operation was aborted.") : signal.reason;
  return reason instanceof Error ? reason : getDOMException(reason);
}, "getAbortedReason");
function pTimeout(promise, options) {
  const {
    milliseconds,
    fallback,
    message,
    customTimers = { setTimeout, clearTimeout }
  } = options;
  let timer;
  const wrappedPromise = new Promise((resolve, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (options.signal) {
      const { signal } = options;
      if (signal.aborted) {
        reject(getAbortedReason(signal));
      }
      signal.addEventListener("abort", () => {
        reject(getAbortedReason(signal));
      });
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      promise.then(resolve, reject);
      return;
    }
    const timeoutError = new TimeoutError();
    timer = customTimers.setTimeout.call(void 0, () => {
      if (fallback) {
        try {
          resolve(fallback());
        } catch (error) {
          reject(error);
        }
        return;
      }
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      if (message === false) {
        resolve();
      } else if (message instanceof Error) {
        reject(message);
      } else {
        timeoutError.message = message != null ? message : `Promise timed out after ${milliseconds} milliseconds`;
        reject(timeoutError);
      }
    }, milliseconds);
    (() => __async(this, null, function* () {
      try {
        resolve(yield promise);
      } catch (error) {
        reject(error);
      }
    }))();
  });
  const cancelablePromise = wrappedPromise.finally(() => {
    cancelablePromise.clear();
  });
  cancelablePromise.clear = () => {
    customTimers.clearTimeout.call(void 0, timer);
    timer = void 0;
  };
  return cancelablePromise;
}
__name(pTimeout, "pTimeout");
function assertFulfilled(item) {
  return item.status === "fulfilled";
}
__name(assertFulfilled, "assertFulfilled");
function formatSettledErrors(settled) {
  if (settled.every((s) => s.status === "fulfilled"))
    return;
  return settled.reduce((prev, curr, i2) => {
    if (curr.status === "rejected") {
      return prev + `
[${i2}]: ${JSON.stringify(curr)}`;
    }
    return prev;
  }, "errors:\n");
}
__name(formatSettledErrors, "formatSettledErrors");
function createDeferredPromise() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {
    promise,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    reject,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    resolve
  };
}
__name(createDeferredPromise, "createDeferredPromise");
function withTimeout(fn, timeout = TIMEOUT) {
  if (timeout === void 0 || timeout <= 0 || timeout === Number.POSITIVE_INFINITY) {
    return fn;
  }
  return (...args) => pTimeout(fn(...args), { milliseconds: timeout });
}
__name(withTimeout, "withTimeout");
var filesystemService = "filesystem";
var FilesystemWatcher = /* @__PURE__ */ __name(class {
  constructor(sessConn, path2) {
    this.sessConn = sessConn;
    this.path = path2;
    this.listeners = /* @__PURE__ */ new Set();
  }
  // Starts watching the path that was passed to the contructor
  start(opts) {
    return __async(this, null, function* () {
      const start = /* @__PURE__ */ __name(() => __async(this, null, function* () {
        if (this.rpcSubscriptionID)
          return;
        this.handleFilesystemEvents = this.handleFilesystemEvents.bind(this);
        this.rpcSubscriptionID = yield this.sessConn._subscribe(
          filesystemService,
          this.handleFilesystemEvents,
          "watchDir",
          this.path
        );
      }), "start");
      return yield withTimeout(start, opts == null ? void 0 : opts.timeout)();
    });
  }
  // Stops watching the path and removes all listeners.
  stop() {
    return __async(this, null, function* () {
      this.listeners.clear();
      if (this.rpcSubscriptionID) {
        yield this.sessConn._unsubscribe(this.rpcSubscriptionID);
      }
    });
  }
  addEventListener(l) {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }
  handleFilesystemEvents(fsChange) {
    this.listeners.forEach((l) => {
      l(fsChange);
    });
  }
}, "FilesystemWatcher");
var filesystemWatcher_default = FilesystemWatcher;
var AuthenticationError = /* @__PURE__ */ __name(class extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
  }
}, "AuthenticationError");
var CurrentWorkingDirectoryDoesntExistError = /* @__PURE__ */ __name(class extends Error {
  constructor(message) {
    super(message);
    this.name = "CurrentWorkingDirectoryDoesntExistError";
  }
}, "CurrentWorkingDirectoryDoesntExistError");
var processService = "process";
var ProcessMessage = /* @__PURE__ */ __name(class {
  constructor(line, timestamp, error) {
    this.line = line;
    this.timestamp = timestamp;
    this.error = error;
  }
  toString() {
    return this.line;
  }
}, "ProcessMessage");
var ProcessOutput = /* @__PURE__ */ __name(class {
  constructor() {
    this.delimiter = "\n";
    this.messages = [];
    this._finished = false;
    this._error = false;
  }
  /**
   * Whether the process has errored.
   */
  get error() {
    return this._error;
  }
  /**
   * The exit code of the process.
   */
  get exitCode() {
    if (!this._finished) {
      throw new Error("Process has not finished yet");
    }
    return this._exitCode;
  }
  /**
   * The stdout from the process.
   */
  get stdout() {
    return this.messages.filter((out) => !out.error).map((out) => out.line).join(this.delimiter);
  }
  /**
   * The stderr from the process.
   */
  get stderr() {
    return this.messages.filter((out) => out.error).map((out) => out.line).join(this.delimiter);
  }
  addStdout(message) {
    this.insertByTimestamp(message);
  }
  addStderr(message) {
    this._error = true;
    this.insertByTimestamp(message);
  }
  setExitCode(exitCode) {
    this._exitCode = exitCode;
    this._finished = true;
  }
  insertByTimestamp(message) {
    let i2 = this.messages.length - 1;
    while (i2 >= 0 && this.messages[i2].timestamp > message.timestamp) {
      i2 -= 1;
    }
    this.messages.splice(i2 + 1, 0, message);
  }
}, "ProcessOutput");
var Process = /* @__PURE__ */ __name(class {
  constructor(processID, sandbox, triggerExit, finished, output) {
    this.processID = processID;
    this.sandbox = sandbox;
    this.triggerExit = triggerExit;
    this.output = output;
    this.finished = finished;
  }
  /**
   * Kills the process.
   */
  kill() {
    return __async(this, null, function* () {
      try {
        yield this.sandbox._call(processService, "kill", [this.processID]);
      } finally {
        this.triggerExit();
        yield this.finished;
      }
    });
  }
  /**
   * Waits for the process to finish.
   *
   * @param timeout Timeout for the process to finish in milliseconds
   */
  wait(timeout) {
    return __async(this, null, function* () {
      return yield withTimeout(() => this.finished, timeout)();
    });
  }
  /**
   * Sends data to the process stdin.
   *
   * @param data Data to send
   * @param opts Call options
   * @param {timeout} [opts.timeout] Timeout for call in milliseconds (default is 60 seconds)
   */
  sendStdin(data, opts) {
    return __async(this, null, function* () {
      yield this.sandbox._call(
        processService,
        "stdin",
        [this.processID, data],
        opts
      );
    });
  }
}, "Process");
function id(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i2 = 0; i2 < length; i2++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
__name(id, "id");
var codeSnippetService = "codeSnippet";
var RpcWebSocketClient = /* @__PURE__ */ __name(class {
  // constructor
  /**
   * Does not start WebSocket connection!
   * You need to call connect() method first.
   * @memberof RpcWebSocketClient
   */
  constructor() {
    this.onOpenHandlers = [];
    this.onAnyMessageHandlers = [];
    this.onNotification = [];
    this.onRequest = [];
    this.onSuccessResponse = [];
    this.onErrorResponse = [];
    this.onErrorHandlers = [];
    this.onCloseHandlers = [];
    this.config = {
      responseTimeout: 1e4
    };
    this.idAwaiter = {};
    this.ws = void 0;
  }
  // public
  /**
   * Starts WebSocket connection. Returns Promise when connection is established.
   * @param {string} url
   * @param {(string | string[])} [protocols]
   * @memberof RpcWebSocketClient
   */
  connect(url, protocols) {
    this.ws = new browser_default(url, protocols);
    return this.listen();
  }
  // events
  onOpen(fn) {
    this.onOpenHandlers.push(fn);
  }
  /**
   * Native onMessage event. DO NOT USE THIS unless you really have to or for debugging purposes.
   * Proper RPC events are onRequest, onNotification, onSuccessResponse and onErrorResponse (or just awaiting response).
   * @param {RpcMessageEventFunction} fn
   * @memberof RpcWebSocketClient
   */
  onAnyMessage(fn) {
    this.onAnyMessageHandlers.push(fn);
  }
  onError(fn) {
    this.onErrorHandlers.push(fn);
  }
  onClose(fn) {
    this.onCloseHandlers.push(fn);
  }
  /**
   * Appends onmessage listener on native websocket with RPC handlers.
   * If onmessage function was already there, it will call it on beggining.
   * Useful if you want to use RPC WebSocket Client on already established WebSocket along with function changeSocket().
   * @memberof RpcWebSocketClient
   */
  listenMessages() {
    let previousOnMessage;
    if (this.ws.onmessage) {
      previousOnMessage = this.ws.onmessage.bind(this.ws);
    }
    this.ws.onmessage = (e2) => {
      if (previousOnMessage) {
        previousOnMessage(e2);
      }
      for (const handler of this.onAnyMessageHandlers) {
        handler(e2);
      }
      const data = JSON.parse(e2.data.toString());
      if (this.isNotification(data)) {
        for (const handler of this.onNotification) {
          handler(data);
        }
      } else if (this.isRequest(data)) {
        for (const handler of this.onRequest) {
          handler(data);
        }
      } else if (this.isSuccessResponse(data)) {
        for (const handler of this.onSuccessResponse) {
          handler(data);
        }
        this.idAwaiter[data.id](data.result);
      } else if (this.isErrorResponse(data)) {
        for (const handler of this.onErrorResponse) {
          handler(data);
        }
        this.idAwaiter[data.id](data.error);
      }
    };
  }
  // communication
  /**
   * Creates and sends RPC request. Resolves when appropirate response is returned from server or after config.responseTimeout.
   * @param {string} method
   * @param {*} [params]
   * @returns
   * @memberof RpcWebSocketClient
   */
  call(method, params) {
    return new Promise((resolve, reject) => {
      const data = this.buildRequest(method, params);
      let timeout;
      if (this.config.responseTimeout) {
        timeout = setTimeout(() => {
          delete this.idAwaiter[data.id];
          reject(
            new Error(`Awaiting response to "${method}" with id: ${data.id} timed out.`)
          );
        }, this.config.responseTimeout);
      }
      this.idAwaiter[data.id] = (responseData) => {
        clearInterval(timeout);
        delete this.idAwaiter[data.id];
        if (this.isRpcError(responseData)) {
          reject(new Error(`RPC Error (${responseData.code}): ${responseData.message}`));
          return;
        }
        resolve(responseData);
      };
      const json = JSON.stringify(data);
      this.ws.send(json);
    });
  }
  /**
   * Creates and sends RPC Notification.
   * @param {string} method
   * @param {*} [params]
   * @memberof RpcWebSocketClient
   */
  notify(method, params) {
    this.ws.send(JSON.stringify(this.buildNotification(method, params)));
  }
  // setup
  /**
   * You can provide custom id generation function to replace default uuid/v1.
   * @param {() => string} idFn
   * @memberof RpcWebSocketClient
   */
  customId(idFn) {
    this.idFn = idFn;
  }
  /**
   * Removed jsonrpc from sent messages. Good if you don't care about standards or need better performance.
   * @memberof RpcWebSocketClient
   */
  noRpc() {
    this.buildRequest = this.buildRequestBase;
    this.buildNotification = this.buildNotificationBase;
    this.buildRpcSuccessResponse = this.buildRpcSuccessResponseBase;
    this.buildRpcErrorResponse = this.buildRpcErrorResponseBase;
  }
  /**
   * Allows modifying configuration.
   * @param {IRpcWebSocketConfig} options
   * @memberof RpcWebSocketClient
   */
  configure(options) {
    Object.assign(this.config, options);
  }
  /**
   * Allows you to change used native WebSocket client to another one.
   * If you have already-connected WebSocket, use this with listenMessages().
   * @param {WebSocket} ws
   * @memberof RpcWebSocketClient
   */
  changeSocket(ws2) {
    this.ws = ws2;
  }
  // private
  // events
  listen() {
    return new Promise((resolve, reject) => {
      this.ws.onopen = (e2) => {
        for (const handler of this.onOpenHandlers) {
          handler(e2);
        }
        resolve(e2);
      };
      this.listenMessages();
      this.ws.onerror = (e2) => {
        for (const handler of this.onErrorHandlers) {
          handler(e2);
        }
      };
      this.ws.onclose = (e2) => {
        for (const handler of this.onCloseHandlers) {
          handler(e2);
        }
        reject(new Error(`WebSocket closed with code: ${e2.code} and reason: ${e2.reason}`));
      };
    });
  }
  // request
  buildRequest(method, params) {
    const data = this.buildRequestBase(method, params);
    data.jsonrpc = "2.0";
    return data;
  }
  buildRequestBase(method, params) {
    const data = {};
    data.id = this.idFn();
    data.method = method;
    if (params) {
      data.params = params;
    }
    return data;
  }
  // notification
  buildNotification(method, params) {
    const data = this.buildNotificationBase(method, params);
    data.jsonrpc = "2.0";
    return data;
  }
  buildNotificationBase(method, params) {
    const data = {};
    data.method = method;
    if (params) {
      data.params = params;
    }
    return data;
  }
  // success response
  buildRpcSuccessResponse(id2, result) {
    const data = this.buildRpcSuccessResponseBase(id2, result);
    data.jsonrpc = "2.0";
    return data;
  }
  buildRpcSuccessResponseBase(id2, result) {
    const data = {};
    data.id = id2;
    data.result = result;
    return data;
  }
  // error response
  buildRpcErrorResponse(id2, error) {
    const data = this.buildRpcErrorResponseBase(id2, error);
    data.jsonrpc = "2.0";
    return data;
  }
  buildRpcErrorResponseBase(id2, error) {
    const data = {};
    data.id = id2;
    data.error = error;
    return data;
  }
  idFn() {
    return id(12);
  }
  // tests
  isNotification(data) {
    return !data.id;
  }
  isRequest(data) {
    return data.method;
  }
  isSuccessResponse(data) {
    return data.hasOwnProperty("result");
  }
  isErrorResponse(data) {
    return data.hasOwnProperty("error");
  }
  isRpcError(data) {
    return typeof (data == null ? void 0 : data.code) !== "undefined";
  }
}, "RpcWebSocketClient");
function wait2(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
__name(wait2, "wait");
var wait_default = wait2;
function getApiKey(apiKey) {
  var _a5;
  apiKey = apiKey || ((_a5 = process == null ? void 0 : process.env) == null ? void 0 : _a5.E2B_API_KEY);
  if (!apiKey) {
    throw new AuthenticationError(
      "API key is required, please visit https://e2b.dev/docs to get your API key. You can either set the environment variable `E2B_API_KEY` or you can pass it directly to the sandbox like Sandbox.create({apiKey: 'e2b_...'})"
    );
  }
  return apiKey;
}
__name(getApiKey, "getApiKey");
var SandboxConnection = /* @__PURE__ */ __name(class {
  // let's keep opts readonly, but public - for convenience, mainly when debugging
  constructor(opts, createCalled) {
    this.opts = opts;
    this.createCalled = createCalled;
    this.isOpen = false;
    this.rpc = new RpcWebSocketClient();
    this.subscribers = [];
    var _a5, _b, _c;
    if (!createCalled) {
      throw new Error(
        "Sandbox can't be instantiated directly, use a `.create()` method instead of calling `new` to get a new sandbox.\n\nExample of correct usage:\n```\nimport { CodeInterpreter } from '@e2b/code-interpreter'\nconst myCodeInterpreter = await CodeInterpreter.create()\n``"
      );
    }
    this.sandbox = opts.__sandbox;
    this.apiKey = getApiKey(opts.apiKey);
    this.client = new APIClient({ domain: opts.domain });
    this.cwd = opts.cwd;
    if (this.cwd && this.cwd.startsWith("~")) {
      this.cwd = this.cwd.replace("~", "/home/user");
    }
    const defaultEnvVars = { PYTHONUNBUFFERED: "1" };
    this.envVars = __spreadValues(__spreadValues({}, defaultEnvVars), opts.envVars || {});
    this.logger = (_a5 = opts.logger) != null ? _a5 : {
      // by default, we log to the console
      // we don't log debug messages by default
      info: console.info,
      warn: console.warn,
      error: console.error
    };
    (_c = (_b = this.logger).debug) == null ? void 0 : _c.call(_b, `Sandbox "${this.templateID}" initialized`);
  }
  /**
   * ID of the sandbox.
   *
   * You can use this ID to reconnect to the sandbox later.
   */
  get id() {
    var _a5, _b;
    return `${(_a5 = this.sandbox) == null ? void 0 : _a5.sandboxID}-${(_b = this.sandbox) == null ? void 0 : _b.clientID}`;
  }
  get templateID() {
    return this.opts.template || this.opts.id || "base";
  }
  get refreshSandbox() {
    return withAPIKey(
      this.client.api.path("/sandboxes/{sandboxID}/refreshes").method("post").create()
    );
  }
  get createSandbox() {
    return withAPIKey(
      this.client.api.path("/sandboxes").method("post").create()
    );
  }
  /**
   * List all running sandboxes
   *
   * @param apiKey API key to use for authentication. If not provided, the `E2B_API_KEY` environment variable will be used.
   * @param domain Domain to use for the API requests. If not provided, the `E2B_DOMAIN` environment variable will be used.
   */
  static list(apiKey, domain) {
    return __async(this, null, function* () {
      apiKey = getApiKey(apiKey);
      const client = new APIClient({ domain });
      const listSandboxes = withAPIKey(
        client.api.path("/sandboxes").method("get").create()
      );
      try {
        const res = yield listSandboxes(apiKey, {});
        return res.data.map((sandbox) => __spreadProps(__spreadValues(__spreadValues({
          sandboxID: `${sandbox.sandboxID}-${sandbox.clientID}`,
          templateID: sandbox.templateID,
          cpuCount: sandbox.cpuCount,
          memoryMB: sandbox.memoryMB
        }, sandbox.alias && { alias: sandbox.alias }), sandbox.metadata && { metadata: sandbox.metadata }), {
          startedAt: new Date(sandbox.startedAt)
        }));
      } catch (e2) {
        if (e2 instanceof listSandboxes.Error) {
          const error = e2.getActualType();
          if (error.status === 401) {
            throw new Error(
              `Error listing sandboxes - (${error.status}) unauthenticated: ${error.data.message}`
            );
          }
          if (error.status === 500) {
            throw new Error(
              `Error listing sandboxes - (${error.status}) server error: ${error.data.message}`
            );
          }
        }
        throw e2;
      }
    });
  }
  /**
   * List all running sandboxes
   * @param sandboxID ID of the sandbox to kill
   * @param apiKey API key to use for authentication. If not provided, the `E2B_API_KEY` environment variable will be used.
   * @param domain Domain to use for the API requests. If not provided, the `E2B_DOMAIN` environment variable will be used.
   */
  static kill(sandboxID, apiKey, domain) {
    return __async(this, null, function* () {
      apiKey = getApiKey(apiKey);
      const shortID = sandboxID.split("-")[0];
      const client = new APIClient({ domain });
      const killSandbox = withAPIKey(
        client.api.path("/sandboxes/{sandboxID}").method("delete").create()
      );
      try {
        yield killSandbox(apiKey, { sandboxID: shortID });
      } catch (e2) {
        if (e2 instanceof killSandbox.Error) {
          const error = e2.getActualType();
          if (error.status === 401) {
            throw new Error(
              `Error killing sandbox (${sandboxID}) - (${error.status}) unauthenticated: ${error.data.message}`
            );
          }
          if (error.status === 500) {
            throw new Error(
              `Error killing sandbox (${sandboxID}) - (${error.status}) server error: ${error.data.message}`
            );
          }
        }
        throw e2;
      }
    });
  }
  /**
   * Keep the sandbox alive for the specified duration.
   *
   * `keepAlive` method requires `this` context - you may need to bind it.
   * @param duration Duration in milliseconds. Must be between 0 and 3600000 milliseconds
   * @returns Promise that resolves when the sandbox is kept alive
   */
  keepAlive(duration) {
    return __async(this, null, function* () {
      var _a5;
      duration = Math.round(duration / 1e3);
      if (duration < 0 || duration > 3600) {
        throw new Error("Duration must be between 0 and 3600 seconds");
      }
      if (!this.sandbox) {
        throw new Error("Cannot keep alive - sandbox is not initialized");
      }
      yield this.refreshSandbox(this.apiKey, {
        sandboxID: (_a5 = this.sandbox) == null ? void 0 : _a5.sandboxID,
        duration
      });
    });
  }
  /**
   * Get the hostname for the sandbox or for the specified sandbox's port.
   *
   * `getHostname` method requires `this` context - you may need to bind it.
   *
   * @param port Specify if you want to connect to a specific port of the sandbox
   * @returns Hostname of the sandbox or sandbox's port
   */
  getHostname(port) {
    if (this.opts.__debug_hostname) {
      if (port && this.opts.__debug_devEnv === "remote") {
        return `${port}-${this.opts.__debug_hostname}`;
      } else if (port) {
        return `${this.opts.__debug_hostname}:${port}`;
      } else {
        return this.opts.__debug_hostname;
      }
    }
    if (!this.sandbox) {
      throw new Error(
        "Cannot get sandbox's hostname - sandbox is not initialized"
      );
    }
    const hostname2 = `${this.id}.${this.client.domain}`;
    if (port) {
      return `${port}-${hostname2}`;
    } else {
      return hostname2;
    }
  }
  /**
   * The function decides whether to use the secure or insecure protocol.
   * @param baseProtocol Specify the specific protocol you want to use. Do not include the `s` in `https` or `wss`.
   * @param secure Specify if you want to use the secure protocol
   * @returns Protocol for the connection to the sandbox
   */
  getProtocol(baseProtocol = "http", secure = this.client.secure) {
    return secure ? `${baseProtocol}s` : baseProtocol;
  }
  /**
   * Close the connection to the sandbox
   *
   * `close` method requires `this` context - you may need to bind it.
   */
  close() {
    return __async(this, null, function* () {
      var _a5, _b, _c, _d, _e, _f, _g, _h;
      if (this.isOpen) {
        (_b = (_a5 = this.logger).debug) == null ? void 0 : _b.call(_a5, `Closing sandbox "${this.id}"`);
        this.isOpen = false;
        (_d = (_c = this.rpc.ws) == null ? void 0 : _c.terminate) == null ? void 0 : _d.call(_c);
        (_f = (_e = this.rpc.ws) == null ? void 0 : _e.close) == null ? void 0 : _f.call(_e);
        this.subscribers = [];
        (_h = (_g = this.logger).debug) == null ? void 0 : _h.call(_g, "Disconnected from the sandbox");
      }
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _call(service, method, params, opts) {
    return __async(this, null, function* () {
      var _a5, _b;
      (_b = (_a5 = this.logger).debug) == null ? void 0 : _b.call(_a5, `Calling "${service}_${method}" with params:`, params);
      const call = /* @__PURE__ */ __name((method2, params2) => __async(this, null, function* () {
        return yield this.rpc.call(method2, params2);
      }), "call");
      return yield withTimeout(call, opts == null ? void 0 : opts.timeout)(
        `${service}_${method}`,
        params
      );
    });
  }
  _handleSubscriptions(...subs) {
    return __async(this, null, function* () {
      const results = yield Promise.allSettled(subs);
      if (results.every((r2) => r2.status === "fulfilled")) {
        return results.map(
          (r2) => r2.status === "fulfilled" ? r2.value : void 0
        );
      }
      yield Promise.all(
        results.filter(assertFulfilled).map((r2) => r2.value ? this._unsubscribe(r2.value) : void 0)
      );
      throw new Error(formatSettledErrors(results));
    });
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  _unsubscribe(subID) {
    return __async(this, null, function* () {
      var _a5, _b;
      const subscription = this.subscribers.find((s) => s.subID === subID);
      if (!subscription)
        return;
      yield this._call(subscription.service, "unsubscribe", [subscription.subID]);
      this.subscribers = this.subscribers.filter((s) => s !== subscription);
      (_b = (_a5 = this.logger).debug) == null ? void 0 : _b.call(
        _a5,
        `Unsubscribed '${subID}' from '${subscription.service}'`
      );
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/member-ordering
  _subscribe(service, handler, method, ...params) {
    return __async(this, null, function* () {
      var _a5, _b;
      const subID = yield this._call(service, "subscribe", [method, ...params]);
      if (typeof subID !== "string") {
        throw new Error(
          `Cannot subscribe to ${service}_${method}${params.length > 0 ? " with params [" + params.join(", ") + "]" : ""}. Expected response should have been a subscription ID, instead we got ${JSON.stringify(
            subID
          )}`
        );
      }
      this.subscribers.push({
        handler,
        service,
        subID
      });
      (_b = (_a5 = this.logger).debug) == null ? void 0 : _b.call(
        _a5,
        `Subscribed to "${service}_${method}"${params.length > 0 ? " with params [" + params.join(", ") + "] and" : ""} with id "${subID}"`
      );
      return subID;
    });
  }
  /**
   * Open a connection to a new sandbox
   *
   * `open` method requires `this` context - you may need to bind it.
   * @param opts Call options
   * @param {timeout} [opts.timeout] Timeout for sandbox to open in milliseconds (default is 60 seconds)
   */
  _open(opts) {
    return __async(this, null, function* () {
      const open = /* @__PURE__ */ __name(() => __async(this, null, function* () {
        var _a5, _b, _c, _d;
        if (this.isOpen) {
          throw new Error("Sandbox connect was already called");
        } else {
          this.isOpen = true;
        }
        (_b = (_a5 = this.logger).debug) == null ? void 0 : _b.call(_a5, "Opening sandbox...");
        if (!this.sandbox && !this.opts.__debug_hostname) {
          try {
            const res = yield this.createSandbox(this.apiKey, {
              templateID: this.templateID,
              metadata: this.opts.metadata
            });
            this.sandbox = res.data;
            (_d = (_c = this.logger).debug) == null ? void 0 : _d.call(_c, `Acquired sandbox "${this.id}"`);
          } catch (e2) {
            if (e2 instanceof this.createSandbox.Error) {
              const error = e2.getActualType();
              if (error.status === 400) {
                throw new Error(
                  `Error creating sandbox - (${error.status}) bad request: ${error.data.message}`
                );
              }
              if (error.status === 401) {
                throw new Error(
                  `Error creating sandbox - (${error.status}) unauthenticated: ${error.data.message}`
                );
              }
              if (error.status === 500) {
                throw new Error(
                  `Error creating sandbox - (${error.status}) server error: ${error.data.message}`
                );
              }
            }
            throw e2;
          }
        }
        if (this.sandbox && !this.opts.__debug_hostname) {
          this.refresh(this.sandbox.sandboxID);
        }
        yield this.connectRpc();
        return this;
      }), "open");
      try {
        return yield withTimeout(open, opts == null ? void 0 : opts.timeout)();
      } catch (err) {
        yield this.close();
        throw err;
      }
    });
  }
  connectRpc() {
    return __async(this, null, function* () {
      const hostname2 = this.getHostname(this.opts.__debug_port || ENVD_PORT);
      const protocol = this.getProtocol(
        "ws",
        this.opts.__debug_devEnv !== "local"
      );
      const sandboxURL = `${protocol}://${hostname2}${WS_ROUTE}`;
      let isFinished = false;
      let resolveOpening;
      let rejectOpening;
      const openingPromise = new Promise((resolve, reject) => {
        resolveOpening = /* @__PURE__ */ __name(() => {
          if (isFinished)
            return;
          isFinished = true;
          resolve();
        }, "resolveOpening");
        rejectOpening = /* @__PURE__ */ __name(() => {
          if (isFinished)
            return;
          isFinished = true;
          reject();
        }, "rejectOpening");
      });
      this.rpc.onOpen(() => {
        var _a5, _b;
        (_b = (_a5 = this.logger).debug) == null ? void 0 : _b.call(_a5, `Connected to sandbox "${this.id}"`);
        resolveOpening == null ? void 0 : resolveOpening();
      });
      this.rpc.onError((err) => __async(this, null, function* () {
        var _a5, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
        (_d = (_c = this.logger).debug) == null ? void 0 : _d.call(
          _c,
          `Error in WebSocket of sandbox "${this.id}": ${(_b = (_a5 = err.message) != null ? _a5 : err.code) != null ? _b : err.toString()}. Trying to reconnect...`
        );
        if (this.isOpen) {
          yield wait_default(WS_RECONNECT_INTERVAL);
          (_f = (_e = this.logger).debug) == null ? void 0 : _f.call(_e, `Reconnecting to sandbox "${this.id}"`);
          try {
            this.subscribers = [];
            yield this.rpc.connect(sandboxURL);
            (_h = (_g = this.logger).debug) == null ? void 0 : _h.call(_g, `Reconnected to sandbox "${this.id}"`);
          } catch (err2) {
            (_l = (_k = this.logger).debug) == null ? void 0 : _l.call(
              _k,
              `Failed reconnecting to sandbox "${this.id}": ${(_j = (_i = err2.message) != null ? _i : err2.code) != null ? _j : err2.toString()}`
            );
          }
        } else {
          rejectOpening == null ? void 0 : rejectOpening();
        }
      }));
      this.rpc.onClose(() => __async(this, null, function* () {
        var _a5, _b;
        (_b = (_a5 = this.logger).debug) == null ? void 0 : _b.call(_a5, `WebSocket connection to sandbox "${this.id}" closed`);
      }));
      this.rpc.onNotification.push(this.handleNotification.bind(this));
      (() => __async(this, null, function* () {
        var _a5, _b, _c, _d, _e, _f;
        try {
          (_b = (_a5 = this.logger).debug) == null ? void 0 : _b.call(_a5, `Connecting to sandbox "${this.id}"`);
          yield this.rpc.connect(sandboxURL);
        } catch (err) {
          (_f = (_e = this.logger).debug) == null ? void 0 : _f.call(
            _e,
            `Error connecting to sandbox "${this.id}": ${(_d = (_c = err.message) != null ? _c : err.code) != null ? _d : err.toString()}`
          );
        }
      }))();
      yield openingPromise;
    });
  }
  handleNotification(data) {
    var _a5, _b;
    (_b = (_a5 = this.logger).debug) == null ? void 0 : _b.call(_a5, "Handling notification:", data);
    this.subscribers.filter((s) => {
      var _a6;
      return s.subID === ((_a6 = data.params) == null ? void 0 : _a6.subscription);
    }).forEach((s) => {
      var _a6;
      return s.handler((_a6 = data.params) == null ? void 0 : _a6.result);
    });
  }
  refresh(sandboxID) {
    return __async(this, null, function* () {
      var _a5, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      (_b = (_a5 = this.logger).debug) == null ? void 0 : _b.call(_a5, `Started refreshing sandbox "${sandboxID}"`);
      try {
        while (true) {
          if (!this.isOpen) {
            (_d = (_c = this.logger).debug) == null ? void 0 : _d.call(
              _c,
              `Cannot refresh sandbox ${this.id} - it was closed`
            );
            return;
          }
          yield wait_default(SANDBOX_REFRESH_PERIOD);
          try {
            yield this.refreshSandbox(this.apiKey, {
              sandboxID,
              duration: 0
            });
            (_f = (_e = this.logger).debug) == null ? void 0 : _f.call(_e, `Refreshed sandbox "${sandboxID}"`);
          } catch (e2) {
            if (e2 instanceof this.refreshSandbox.Error) {
              const error = e2.getActualType();
              if (error.status === 404) {
                (_h = (_g = this.logger).warn) == null ? void 0 : _h.call(
                  _g,
                  `Error refreshing sandbox - (${error.status}): ${error.data.message}`
                );
                return;
              }
              (_j = (_i = this.logger).warn) == null ? void 0 : _j.call(
                _i,
                `Refreshing sandbox "${sandboxID}" failed - (${error.status})`
              );
            }
          }
        }
      } finally {
        (_l = (_k = this.logger).debug) == null ? void 0 : _l.call(_k, `Stopped refreshing sandbox "${sandboxID}"`);
        yield this.close();
      }
    });
  }
}, "SandboxConnection");
var resolvePath = /* @__PURE__ */ __name((inputPath, cwd2, logger) => {
  var _a5, _b, _c;
  let result;
  if (inputPath.startsWith("./")) {
    result = import_path_browserify.default.posix.join(cwd2 || "/home/user", inputPath);
    if (!cwd2) {
      (_a5 = logger.warn) == null ? void 0 : _a5.call(
        logger,
        `Path starts with './' and cwd isn't set. The path '${inputPath}' will evaluate to '${result}', which may not be what you want.`
      );
    }
    return result;
  }
  if (inputPath.startsWith("../")) {
    result = import_path_browserify.default.posix.join(cwd2 || "/home/user", inputPath);
    if (!cwd2) {
      (_b = logger.warn) == null ? void 0 : _b.call(
        logger,
        `Path starts with '../' and cwd isn't set. The path '${inputPath}' will evaluate to '${result}', which may not be what you want.`
      );
    }
    return result;
  }
  if (inputPath.startsWith("~/")) {
    result = import_path_browserify.default.posix.join(cwd2 || "/home/user", inputPath.substring(2));
    if (!cwd2) {
      (_c = logger.warn) == null ? void 0 : _c.call(
        logger,
        `Path starts with '~/' and cwd isn't set. The path '${inputPath}' will evaluate to '${result}', which may not be what you want.`
      );
    }
    return result;
  }
  if (!inputPath.startsWith("/") && cwd2) {
    return import_path_browserify.default.posix.join(cwd2, inputPath);
  }
  return inputPath;
}, "resolvePath");
var Sandbox = /* @__PURE__ */ __name(class extends SandboxConnection {
  /**
   * Use `Sandbox.create()` instead.
   *
   * @hidden
   * @hide
   * @internal
   * @access protected
   */
  constructor(opts, createCalled = false) {
    opts = opts || {};
    super(opts, createCalled);
    this.createCalled = createCalled;
    this.onScanPorts = opts.onScanPorts;
    this.filesystem = {
      list: (path2, opts2) => __async(this, null, function* () {
        return yield this._call(
          filesystemService,
          "list",
          [_resolvePath(path2)],
          opts2
        );
      }),
      read: (path2, opts2) => __async(this, null, function* () {
        return yield this._call(
          filesystemService,
          "read",
          [_resolvePath(path2)],
          opts2
        );
      }),
      remove: (path2, opts2) => __async(this, null, function* () {
        yield this._call(
          filesystemService,
          "remove",
          [_resolvePath(path2)],
          opts2
        );
      }),
      write: (path2, content, opts2) => __async(this, null, function* () {
        yield this._call(
          filesystemService,
          "write",
          [_resolvePath(path2), content],
          opts2
        );
      }),
      writeBytes: (path2, content) => __async(this, null, function* () {
        const base64Content = Buffer2.from(content).toString("base64");
        yield this._call(filesystemService, "writeBase64", [
          _resolvePath(path2),
          base64Content
        ]);
      }),
      readBytes: (path2) => __async(this, null, function* () {
        const base64Content = yield this._call(
          filesystemService,
          "readBase64",
          [_resolvePath(path2)]
        );
        return Buffer2.from(base64Content, "base64");
      }),
      makeDir: (path2, opts2) => __async(this, null, function* () {
        yield this._call(
          filesystemService,
          "makeDir",
          [_resolvePath(path2)],
          opts2
        );
      }),
      watchDir: (path2) => {
        var _a5, _b;
        (_b = (_a5 = this.logger).debug) == null ? void 0 : _b.call(_a5, `Watching directory "${path2}"`);
        const npath = (0, import_normalize_path.default)(_resolvePath(path2));
        return new filesystemWatcher_default(this, npath);
      }
    };
    this.terminal = {
      start: (_0) => __async(this, [_0], function* ({
        onData,
        size,
        onExit,
        envVars,
        cmd,
        cwd: cwd2 = "",
        terminalID = id(12),
        timeout = void 0
      }) {
        const start = /* @__PURE__ */ __name((_02) => __async(this, [_02], function* ({
          onData: onData2,
          size: size2,
          onExit: onExit2,
          envVars: envVars2,
          cmd: cmd2,
          cwd: cwd22 = "",
          rootDir,
          terminalID: terminalID2 = id(12)
        }) {
          var _a5, _b, _c, _d;
          (_b = (_a5 = this.logger).debug) == null ? void 0 : _b.call(_a5, `Starting terminal "${terminalID2}"`);
          if (!cwd22 && rootDir) {
            (_d = (_c = this.logger).warn) == null ? void 0 : _d.call(
              _c,
              "The rootDir parameter is deprecated, use cwd instead."
            );
            cwd22 = rootDir;
          }
          if (!cwd22 && this.cwd) {
            cwd22 = this.cwd;
          }
          envVars2 = envVars2 || {};
          envVars2 = __spreadValues(__spreadValues({}, this.envVars), envVars2);
          const { promise: terminalExited, resolve: triggerExit } = createDeferredPromise();
          const output = new TerminalOutput();
          function handleData(data) {
            output.addData(data);
            onData2 == null ? void 0 : onData2(data);
          }
          __name(handleData, "handleData");
          const [onDataSubID, onExitSubID] = yield this._handleSubscriptions(
            this._subscribe(terminalService, handleData, "onData", terminalID2),
            this._subscribe(terminalService, triggerExit, "onExit", terminalID2)
          );
          const { promise: unsubscribing, resolve: handleFinishUnsubscribing } = createDeferredPromise();
          terminalExited.then(() => __async(this, null, function* () {
            var _a6, _b2;
            Promise.allSettled([
              this._unsubscribe(onExitSubID),
              this._unsubscribe(onDataSubID)
            ]).then((results) => {
              var _a7, _b3;
              const errMsg = formatSettledErrors(results);
              if (errMsg) {
                (_b3 = (_a7 = this.logger).debug) == null ? void 0 : _b3.call(_a7, errMsg);
              }
            });
            (_b2 = (_a6 = this.logger).debug) == null ? void 0 : _b2.call(_a6, `Terminal "${terminalID2}" exited`);
            onExit2 == null ? void 0 : onExit2();
            handleFinishUnsubscribing(output);
          }));
          try {
            yield this._call(terminalService, "start", [
              terminalID2,
              size2.cols,
              size2.rows,
              // Handle optional args for old devbookd compatibility
              ...cmd2 !== void 0 ? [envVars2, cmd2, cwd22] : []
            ]);
          } catch (err) {
            triggerExit();
            yield unsubscribing;
            throw err;
          }
          return new Terminal(
            terminalID2,
            this,
            triggerExit,
            unsubscribing,
            output
          );
        }), "start");
        return yield withTimeout(
          start,
          timeout
        )({
          onData,
          size,
          onExit,
          envVars,
          cmd,
          cwd: cwd2,
          terminalID
        });
      })
    };
    this.process = {
      start: (optsOrCmd) => __async(this, null, function* () {
        const opts2 = typeof optsOrCmd === "string" ? { cmd: optsOrCmd } : optsOrCmd;
        const start = /* @__PURE__ */ __name((_0) => __async(this, [_0], function* ({
          cmd,
          onStdout,
          onStderr,
          onExit,
          envVars = {},
          cwd: cwd2 = "",
          rootDir,
          processID = id(12)
        }) {
          var _a5, _b, _c, _d;
          if (!cwd2 && rootDir) {
            (_b = (_a5 = this.logger).warn) == null ? void 0 : _b.call(
              _a5,
              "The rootDir parameter is deprecated, use cwd instead."
            );
            cwd2 = rootDir;
          }
          if (!cwd2 && this.cwd) {
            cwd2 = this.cwd;
          }
          if (!cmd)
            throw new Error("cmd is required");
          envVars = envVars || {};
          envVars = __spreadValues(__spreadValues({}, this.envVars), envVars);
          (_d = (_c = this.logger).debug) == null ? void 0 : _d.call(_c, `Starting process "${processID}", cmd: "${cmd}"`);
          const { promise: processExited, resolve: triggerExit } = createDeferredPromise();
          const output = new ProcessOutput();
          const handleExit = /* @__PURE__ */ __name((exitCode) => {
            output.setExitCode(exitCode);
            triggerExit();
          }, "handleExit");
          const handleStdout = /* @__PURE__ */ __name((data) => {
            const message = new ProcessMessage(
              data.line,
              data.timestamp,
              false
            );
            output.addStdout(message);
            if (onStdout) {
              onStdout(message);
            } else if (this.opts.onStdout) {
              this.opts.onStdout(message);
            }
          }, "handleStdout");
          const handleStderr = /* @__PURE__ */ __name((data) => {
            const message = new ProcessMessage(data.line, data.timestamp, true);
            output.addStderr(message);
            if (onStderr) {
              onStderr(message);
            } else if (this.opts.onStderr) {
              this.opts.onStderr(message);
            }
          }, "handleStderr");
          const [onExitSubID, onStdoutSubID, onStderrSubID] = yield this._handleSubscriptions(
            this._subscribe(processService, handleExit, "onExit", processID),
            this._subscribe(
              processService,
              handleStdout,
              "onStdout",
              processID
            ),
            this._subscribe(
              processService,
              handleStderr,
              "onStderr",
              processID
            )
          );
          const { promise: unsubscribing, resolve: handleFinishUnsubscribing } = createDeferredPromise();
          processExited.then(() => __async(this, null, function* () {
            var _a6, _b2;
            Promise.allSettled([
              this._unsubscribe(onExitSubID),
              onStdoutSubID ? this._unsubscribe(onStdoutSubID) : void 0,
              onStderrSubID ? this._unsubscribe(onStderrSubID) : void 0
            ]).then((results) => {
              var _a7, _b3;
              const errMsg = formatSettledErrors(results);
              if (errMsg) {
                (_b3 = (_a7 = this.logger).debug) == null ? void 0 : _b3.call(_a7, errMsg);
              }
            });
            (_b2 = (_a6 = this.logger).debug) == null ? void 0 : _b2.call(_a6, `Process "${processID}" exited`);
            if (onExit) {
              onExit(output.exitCode || 0);
            } else if (this.opts.onExit) {
              this.opts.onExit();
            }
            handleFinishUnsubscribing(output);
          }));
          try {
            yield this._call(processService, "start", [
              processID,
              cmd,
              envVars,
              cwd2
            ]);
          } catch (err) {
            triggerExit();
            yield unsubscribing;
            if (/error starting process '\w+': fork\/exec \/bin\/bash: no such file or directory/.test(err == null ? void 0 : err.message)) {
              throw new CurrentWorkingDirectoryDoesntExistError(
                `Failed to start the process. You are trying set 'cwd' to a directory that does not exist.
${err == null ? void 0 : err.message}`
              );
            }
            throw err;
          }
          return new Process(
            processID,
            this,
            triggerExit,
            unsubscribing,
            output
          );
        }), "start");
        const timeout = opts2.timeout;
        return yield withTimeout(start, timeout)(opts2);
      }),
      startAndWait: (optsOrCmd) => __async(this, null, function* () {
        const opts2 = typeof optsOrCmd === "string" ? { cmd: optsOrCmd } : optsOrCmd;
        const process2 = yield this.process.start(opts2);
        const out = yield process2.wait();
        return out;
      })
    };
    const _resolvePath = /* @__PURE__ */ __name((path2) => resolvePath(path2, this.cwd, this.logger), "_resolvePath");
  }
  /**
   * URL that can be used to download or upload file to the sandbox via a multipart/form-data POST request.
   * This is useful if you're uploading files directly from the browser.
   * The file will be uploaded to the user's home directory with the same name.
   * If a file with the same name already exists, it will be overwritten.
   */
  get fileURL() {
    const protocol = this.getProtocol("http", this.opts.__debug_devEnv !== "local");
    const hostname2 = this.getHostname(this.opts.__debug_port || ENVD_PORT);
    return `${protocol}://${hostname2}${FILE_ROUTE}`;
  }
  static create(optsOrTemplate) {
    return __async(this, null, function* () {
      const opts = typeof optsOrTemplate === "string" ? { template: optsOrTemplate } : optsOrTemplate;
      const sandbox = new this(opts, true);
      yield sandbox._open({ timeout: opts == null ? void 0 : opts.timeout });
      return sandbox;
    });
  }
  static reconnect(sandboxIDorOpts) {
    return __async(this, null, function* () {
      let id2;
      let opts;
      if (typeof sandboxIDorOpts === "string") {
        id2 = sandboxIDorOpts;
        opts = {};
      } else {
        id2 = sandboxIDorOpts.sandboxID;
        opts = sandboxIDorOpts;
      }
      const sandboxIDAndClientID = id2.split("-");
      const sandboxID = sandboxIDAndClientID[0];
      const clientID = sandboxIDAndClientID[1];
      opts.__sandbox = { sandboxID, clientID, templateID: "unknown", envdVersion: "unknown" };
      const sandbox = new this(opts, true);
      yield sandbox._open({ timeout: opts == null ? void 0 : opts.timeout });
      return sandbox;
    });
  }
  /**
   * Uploads a file to the sandbox.
   * The file will be uploaded to the user's home directory with the same name.
   * If a file with the same name already exists, it will be overwritten.
   *
   * **You can use the {@link Sandbox.fileURL} property and upload file directly via POST multipart/form-data**
   *
   */
  uploadFile(file, filename) {
    return __async(this, null, function* () {
      const body = new FormData();
      const blob = file instanceof Blob ? file : new Blob([file], { type: "application/octet-stream" });
      body.append("file", blob, filename);
      const response = yield fetch(this.fileURL, {
        method: "POST",
        body
      });
      if (!response.ok) {
        const text = yield response.text();
        throw new Error(
          `Failed to upload file ${response.status} - ${response.statusText}: ${text}`
        );
      }
      return `/home/user/${filename}`;
    });
  }
  /**
   * Downloads a file from the sandbox.
   * @param remotePath Path to a file on the sandbox
   * @param format Format of the downloaded file
   * @returns File content
   *
   * @example
   * ```ts
   * const sandbox = await Sandbox.create()
   * const content = await sandbox.downloadFile('/home/user/file.txt')
   * ```
   */
  downloadFile(remotePath, format) {
    return __async(this, null, function* () {
      remotePath = encodeURIComponent(remotePath);
      const response = yield fetch(`${this.fileURL}?path=${remotePath}`);
      if (!response.ok) {
        const text = yield response.text();
        throw new Error(`Failed to download file '${remotePath}': ${text}`);
      }
      switch (format) {
        case "base64":
          return Buffer2.from(yield response.arrayBuffer()).toString("base64");
        case "blob":
          return yield response.blob();
        case "buffer":
          return Buffer2.from(yield response.arrayBuffer());
        case "arraybuffer":
          return yield response.arrayBuffer();
        case "text":
          return yield response.text();
        default:
          return yield response.arrayBuffer();
      }
    });
  }
  _open(opts) {
    return __async(this, null, function* () {
      var _a5, _b;
      yield __superGet(Sandbox.prototype, this, "_open").call(this, opts);
      const portsHandler = this.onScanPorts ? (ports) => {
        var _a6;
        return (_a6 = this.onScanPorts) == null ? void 0 : _a6.call(
          this,
          ports.map((p) => ({ ip: p.Ip, port: p.Port, state: p.State }))
        );
      } : void 0;
      yield this._handleSubscriptions(
        portsHandler ? this._subscribe(codeSnippetService, portsHandler, "scanOpenedPorts") : void 0
      );
      if (this.cwd) {
        (_b = (_a5 = this.logger).debug) == null ? void 0 : _b.call(_a5, `Custom cwd for Sandbox set: "${this.cwd}"`);
        yield this.filesystem.makeDir(this.cwd);
      }
      if (this.opts.onStdout || this.opts.onStderr) {
        this.handleStartCmdLogs();
      }
      return this;
    });
  }
  handleStartCmdLogs() {
    return __async(this, null, function* () {
      var _a5, _b;
      try {
        yield this.process.startAndWait({
          cmd: "sudo journalctl --follow --lines=all -o cat _SYSTEMD_UNIT=start_cmd.service",
          envVars: {},
          cwd: "/"
        });
      } catch (err) {
        (_b = (_a5 = this.logger).debug) == null ? void 0 : _b.call(_a5, "start command not started", err);
      }
    });
  }
}, "Sandbox");

// src/providers/e2b-provider.ts
var normalizeUrl = /* @__PURE__ */ __name((value) => value.startsWith("http") ? value : `https://${value}`, "normalizeUrl");
var E2BProvider = class {
  constructor(env2) {
    this.env = env2;
  }
  async createSandbox(options) {
    const sandbox = await Sandbox.create({
      apiKey: this.env.E2B_API_KEY,
      timeout: 60 * 60 * 1e3,
      envs: {
        ZAI_API_KEY: this.env.ZAI_API_KEY,
        OPENCODE_SERVER_PASSWORD: this.env.OPENCODE_SERVER_PASSWORD,
        GITHUB_TOKEN: options.githubToken
      }
    });
    await this.installOpenCode(sandbox);
    await this.cloneRepository(sandbox, options);
    await this.configureOpenCode(sandbox);
    await this.startOpenCodeServer(sandbox);
    await this.startVSCodeServer(sandbox);
    const sandboxUrl = normalizeUrl(sandbox.getHost(4096));
    const vscodeUrl = normalizeUrl(sandbox.getHost(8080));
    const opencodeSessionId = await this.createOpenCodeSession(sandboxUrl);
    return {
      sandboxId: options.sessionId,
      sandboxUrl,
      vscodeUrl,
      opencodeSessionId,
      sandbox
    };
  }
  async closeSandbox(instance) {
    await instance.sandbox.kill();
  }
  async installOpenCode(sandbox) {
    await sandbox.commands.exec({
      cmd: "bash",
      args: ["-c", "curl -fsSL https://opencode.ai/install | bash"],
      detached: false
    });
  }
  async cloneRepository(sandbox, options) {
    const authenticatedUrl = options.repoUrl.replace(
      "https://github.com/",
      `https://x-access-token:${options.githubToken}@github.com/`
    );
    await sandbox.commands.exec({
      cmd: "git",
      args: ["clone", "--branch", options.branch, authenticatedUrl, "/workspace"],
      detached: false
    });
    await sandbox.commands.exec({
      cmd: "git",
      args: ["config", "--global", "user.email", "bot@inspect.local"],
      cwd: "/workspace"
    });
    await sandbox.commands.exec({
      cmd: "git",
      args: ["config", "--global", "user.name", "Inspect Bot"],
      cwd: "/workspace"
    });
  }
  async configureOpenCode(sandbox) {
    const config2 = {
      $schema: "https://opencode.ai/config.json",
      model: "zai/glm-4.7",
      provider: {
        zai: {
          npm: "@ai-sdk/openai-compatible",
          name: "Z.AI",
          options: {
            baseURL: "https://api.z.ai/api/paas/v4",
            apiKey: this.env.ZAI_API_KEY
          },
          models: {
            "glm-4.7": {
              name: "GLM-4.7",
              thinking: { type: "enabled", clear_thinking: false }
            }
          }
        }
      }
    };
    await sandbox.files.write(
      "/root/.config/opencode/opencode.json",
      JSON.stringify(config2, null, 2)
    );
  }
  async startOpenCodeServer(sandbox) {
    await sandbox.commands.exec({
      cmd: "opencode",
      args: ["serve", "--port", "4096"],
      cwd: "/workspace",
      envs: {
        OPENCODE_SERVER_PASSWORD: this.env.OPENCODE_SERVER_PASSWORD
      },
      detached: true
    });
    await this.waitForServer(sandbox, 4096);
  }
  async startVSCodeServer(sandbox) {
    await sandbox.commands.exec({
      cmd: "bash",
      args: ["-c", "curl -fsSL https://code-server.dev/install.sh | sh"],
      detached: false
    });
    await sandbox.commands.exec({
      cmd: "code-server",
      args: ["--bind-addr", "0.0.0.0:8080", "--auth", "none", "/workspace"],
      detached: true
    });
  }
  async waitForServer(sandbox, port) {
    for (let attempt = 0; attempt < 30; attempt += 1) {
      const result = await sandbox.commands.exec({
        cmd: "bash",
        args: ["-c", `curl -s http://localhost:${port}/health || true`]
      });
      if (result.stdout.trim().length > 0) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1e3));
    }
    throw new Error(`OpenCode server failed to start on port ${port}`);
  }
  async createOpenCodeSession(sandboxUrl) {
    const auth5 = btoa(`opencode:${this.env.OPENCODE_SERVER_PASSWORD}`);
    const response = await fetch(`${sandboxUrl}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth5}`
      },
      body: JSON.stringify({})
    });
    if (!response.ok) {
      throw new Error(`Failed to create OpenCode session: ${response.status}`);
    }
    const data = await response.json();
    return data.id;
  }
};
__name(E2BProvider, "E2BProvider");

// src/index.ts
var app = new Hono2();
var activeSandboxes = /* @__PURE__ */ new Map();
app.post("/create", async (c) => {
  const { sessionId, repoUrl, branch = "main", installationId } = await c.req.json();
  const repoMeta = parseRepoUrl(repoUrl);
  if (!repoMeta) {
    return c.json({ error: "Invalid repoUrl" }, 400);
  }
  const github = new GitHubIntegration({
    appId: c.env.GITHUB_APP_ID,
    privateKey: c.env.GITHUB_PRIVATE_KEY
  });
  const token = await github.getInstallationToken(Number(installationId));
  const provider = new E2BProvider({
    E2B_API_KEY: c.env.E2B_API_KEY,
    ZAI_API_KEY: c.env.ZAI_API_KEY,
    OPENCODE_SERVER_PASSWORD: c.env.OPENCODE_SERVER_PASSWORD,
    GITHUB_APP_ID: c.env.GITHUB_APP_ID,
    GITHUB_PRIVATE_KEY: c.env.GITHUB_PRIVATE_KEY
  });
  const instance = await provider.createSandbox({
    sessionId,
    repoUrl,
    branch,
    githubToken: token
  });
  activeSandboxes.set(sessionId, instance);
  return c.json({
    sandboxId: instance.sandboxId,
    sandboxUrl: instance.sandboxUrl,
    vscodeUrl: instance.vscodeUrl,
    opencodeSessionId: instance.opencodeSessionId
  });
});
app.delete("/:sessionId", async (c) => {
  const sessionId = c.req.param("sessionId");
  const instance = activeSandboxes.get(sessionId);
  if (!instance) {
    return c.json({ status: "not-found" }, 404);
  }
  const provider = new E2BProvider({
    E2B_API_KEY: c.env.E2B_API_KEY,
    ZAI_API_KEY: c.env.ZAI_API_KEY,
    OPENCODE_SERVER_PASSWORD: c.env.OPENCODE_SERVER_PASSWORD,
    GITHUB_APP_ID: c.env.GITHUB_APP_ID,
    GITHUB_PRIVATE_KEY: c.env.GITHUB_PRIVATE_KEY
  });
  await provider.closeSandbox(instance);
  activeSandboxes.delete(sessionId);
  return c.json({ success: true });
});
var src_default = app;

// ../../node_modules/.pnpm/wrangler@3.114.17_@cloudflare+workers-types@4.20260116.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var drainBody = /* @__PURE__ */ __name(async (request2, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request2, env2);
  } finally {
    try {
      if (request2.body !== null && !request2.bodyUsed) {
        const reader = request2.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e2) {
      console.error("Failed to drain the unused request body.", e2);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../node_modules/.pnpm/wrangler@3.114.17_@cloudflare+workers-types@4.20260116.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
function reduceError(e2) {
  return {
    name: e2?.name,
    message: e2?.message ?? String(e2),
    stack: e2?.stack,
    cause: e2?.cause === void 0 ? void 0 : reduceError(e2.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request2, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request2, env2);
  } catch (e2) {
    const error = reduceError(e2);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-EBHB28/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../../node_modules/.pnpm/wrangler@3.114.17_@cloudflare+workers-types@4.20260116.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_process();
init_buffer();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request2, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request2, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request2, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request2, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-EBHB28/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request2, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request2, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request2, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type2, init2) {
        if (type2 === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request2, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request2, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request2);
    };
    #dispatcher = (type2, init2) => {
      if (type2 === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request2) {
      return __facade_invoke__(
        request2,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*! Bundled license information:

@esbuild-plugins/node-globals-polyfill/Buffer.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   *)

platform/platform.js:
  (*!
   * Platform.js v1.3.6
   * Copyright 2014-2020 Benjamin Tan
   * Copyright 2011-2013 John-David Dalton
   * Available under MIT license
   *)

normalize-path/index.js:
  (*!
   * normalize-path <https://github.com/jonschlinkert/normalize-path>
   *
   * Copyright (c) 2014-2018, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=index.js.map
