var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// js/index.js
var js_exports = {};
__export(js_exports, {
  Accordion: () => Accordion,
  Hooks: () => Hooks,
  Menu: () => Menu
});
module.exports = __toCommonJS(js_exports);

// node_modules/@zag-js/anatomy/dist/index.mjs
var createAnatomy = (name, parts3 = []) => ({ parts: (...values) => {
  if (isEmpty(parts3)) {
    return createAnatomy(name, values);
  }
  throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
}, extendWith: (...values) => createAnatomy(name, [...parts3, ...values]), rename: (newName) => createAnatomy(newName, parts3), keys: () => parts3, build: () => [...new Set(parts3)].reduce((prev, part) => Object.assign(prev, { [part]: { selector: [`&[data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`, `& [data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`].join(", "), attrs: { "data-scope": toKebabCase(name), "data-part": toKebabCase(part) } } }), {}) });
var toKebabCase = (value) => value.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
var isEmpty = (v) => v.length === 0;

// node_modules/@zag-js/dom-query/dist/index.mjs
var dataAttr = (guard) => guard ? "" : void 0;
var isHTMLElement = (v) => typeof v === "object" && v?.nodeType === Node.ELEMENT_NODE && typeof v?.nodeName === "string";
var isDocument = (el) => el.nodeType === Node.DOCUMENT_NODE;
var isWindow = (el) => el != null && el === el.window;
var isNode = (el) => el.nodeType !== void 0;
var isShadowRoot = (el) => el && isNode(el) && el.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in el;
function contains(parent, child) {
  if (!parent || !child) return false;
  if (!isHTMLElement(parent) || !isHTMLElement(child)) return false;
  return parent === child || parent.contains(child);
}
function getDocument(el) {
  if (isDocument(el)) return el;
  if (isWindow(el)) return el.document;
  return el?.ownerDocument ?? document;
}
function getWindow(el) {
  if (isShadowRoot(el)) return getWindow(el.host);
  if (isDocument(el)) return el.defaultView ?? window;
  if (isHTMLElement(el)) return el.ownerDocument?.defaultView ?? window;
  return window;
}
var isDom = () => typeof document !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
var pt = (v) => isDom() && v.test(getPlatform());
var ua = (v) => isDom() && v.test(navigator.userAgent);
var vn = (v) => isDom() && v.test(navigator.vendor);
var isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
var isMac = () => pt(/^Mac/) && !isTouchDevice();
var isSafari = () => isApple() && vn(/apple/i);
var isFirefox = () => ua(/firefox\//i);
var isApple = () => pt(/mac|iphone|ipad|ipod/i);
function getEventTarget(event) {
  return event.composedPath?.()[0] ?? event.target;
}
var isSelfTarget = (event) => {
  return contains(event.currentTarget, getEventTarget(event));
};
function isOpeningInNewTab(event) {
  const element = event.currentTarget;
  if (!element) return false;
  const isAppleDevice = isApple();
  if (isAppleDevice && !event.metaKey) return false;
  if (!isAppleDevice && !event.ctrlKey) return false;
  const localName = element.localName;
  if (localName === "a") return true;
  if (localName === "button" && element.type === "submit") return true;
  if (localName === "input" && element.type === "submit") return true;
  return false;
}
function isDownloadingEvent(event) {
  const element = event.currentTarget;
  if (!element) return false;
  const localName = element.localName;
  if (!event.altKey) return false;
  if (localName === "a") return true;
  if (localName === "button" && element.type === "submit") return true;
  if (localName === "input" && element.type === "submit") return true;
  return false;
}
var defaultItemToId = (v) => v.id;
function itemById(v, id, itemToId = defaultItemToId) {
  return v.find((item) => itemToId(item) === id);
}
function indexOfId(v, id, itemToId = defaultItemToId) {
  const item = itemById(v, id, itemToId);
  return item ? v.indexOf(item) : -1;
}
function nextById(v, id, loop = true) {
  let idx = indexOfId(v, id);
  idx = loop ? (idx + 1) % v.length : Math.min(idx + 1, v.length - 1);
  return v[idx];
}
function prevById(v, id, loop = true) {
  let idx = indexOfId(v, id);
  if (idx === -1) return loop ? v[v.length - 1] : null;
  idx = loop ? (idx - 1 + v.length) % v.length : Math.max(0, idx - 1);
  return v[idx];
}
var sanitize = (str) => str.split("").map((char) => {
  const code = char.charCodeAt(0);
  if (code > 0 && code < 128) return char;
  if (code >= 128 && code <= 255) return `/x${code.toString(16)}`.replace("/", "\\");
  return "";
}).join("").trim();
var getValueText = (item) => sanitize(item.dataset.valuetext ?? item.textContent ?? "");
var match = (valueText, query2) => valueText.trim().toLowerCase().startsWith(query2.toLowerCase());
var wrap = (v, idx) => {
  return v.map((_, index) => v[(Math.max(idx, 0) + index) % v.length]);
};
function getByText(v, text, currentId, itemToId = defaultItemToId) {
  const index = currentId ? indexOfId(v, currentId, itemToId) : -1;
  let items = currentId ? wrap(v, index) : v;
  const isSingleKey = text.length === 1;
  if (isSingleKey) {
    items = items.filter((item) => itemToId(item) !== currentId);
  }
  return items.find((item) => match(getValueText(item), text));
}
function getByTypeaheadImpl(_items, options) {
  const { state, activeId, key, timeout = 350, itemToId } = options;
  const search = state.keysSoFar + key;
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const query2 = isRepeated ? search[0] : search;
  let items = _items.slice();
  const next = getByText(items, query2, activeId, itemToId);
  function cleanup() {
    clearTimeout(state.timer);
    state.timer = -1;
  }
  function update(value) {
    state.keysSoFar = value;
    cleanup();
    if (value !== "") {
      state.timer = +setTimeout(() => {
        update("");
        cleanup();
      }, timeout);
    }
  }
  update(search);
  return next;
}
var getByTypeahead = Object.assign(getByTypeaheadImpl, { defaultOptions: { keysSoFar: "", timer: -1 }, isValidEvent: isValidTypeaheadEvent });
function isValidTypeaheadEvent(event) {
  return event.key.length === 1 && !event.ctrlKey && !event.metaKey;
}
var isHTMLElement2 = (element) => typeof element === "object" && element !== null && element.nodeType === 1;
var isFrame = (element) => isHTMLElement2(element) && element.tagName === "IFRAME";
function isVisible(el) {
  if (!isHTMLElement2(el)) return false;
  return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
}
function hasNegativeTabIndex(element) {
  const tabIndex = parseInt(element.getAttribute("tabindex") || "0", 10);
  return tabIndex < 0;
}
var focusableSelector = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type";
function isFocusable(element) {
  if (!element || element.closest("[inert]")) return false;
  return element.matches(focusableSelector) && isVisible(element);
}
function getTabbables(container, includeContainer) {
  if (!container) return [];
  const elements = Array.from(container.querySelectorAll(focusableSelector));
  const tabbableElements = elements.filter(isTabbable);
  if (includeContainer && isTabbable(container)) {
    tabbableElements.unshift(container);
  }
  tabbableElements.forEach((element, i) => {
    if (isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      const allFrameTabbable = getTabbables(frameBody);
      tabbableElements.splice(i, 1, ...allFrameTabbable);
    }
  });
  if (!tabbableElements.length && includeContainer) {
    return elements;
  }
  return tabbableElements;
}
function isTabbable(el) {
  if (el != null && el.tabIndex > 0) return true;
  return isFocusable(el) && !hasNegativeTabIndex(el);
}
function getFirstTabbable(container, includeContainer) {
  const [first2] = getTabbables(container, includeContainer);
  return first2 || null;
}
function getTabbableEdges(container, includeContainer) {
  const elements = getTabbables(container, includeContainer);
  const first2 = elements[0] || null;
  const last2 = elements[elements.length - 1] || null;
  return [first2, last2];
}
function isValidTabEvent(event) {
  const container = event.currentTarget;
  if (!container) return false;
  const [firstTabbable, lastTabbable] = getTabbableEdges(container);
  const doc = container.ownerDocument || document;
  if (doc.activeElement === firstTabbable && event.shiftKey) return false;
  if (doc.activeElement === lastTabbable && !event.shiftKey) return false;
  if (!firstTabbable && !lastTabbable) return false;
  return true;
}
function isEditableElement(el) {
  if (el == null || !isHTMLElement(el)) {
    return false;
  }
  try {
    const win = getWindow(el);
    return el instanceof win.HTMLInputElement && el.selectionStart != null || /(textarea|select)/.test(el.localName) || el.isContentEditable;
  } catch {
    return false;
  }
}
var OVERFLOW_RE = /auto|scroll|overlay|hidden|clip/;
function isOverflowElement(el) {
  const win = getWindow(el);
  const { overflow, overflowX, overflowY, display } = win.getComputedStyle(el);
  return OVERFLOW_RE.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function raf(fn) {
  const id = globalThis.requestAnimationFrame(fn);
  return () => {
    globalThis.cancelAnimationFrame(id);
  };
}
function observeAttributesImpl(node, options) {
  if (!node) return;
  const { attributes, callback: fn } = options;
  const win = node.ownerDocument.defaultView || window;
  const obs = new win.MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type === "attributes" && change.attributeName && attributes.includes(change.attributeName)) {
        fn(change);
      }
    }
  });
  obs.observe(node, { attributes: true, attributeFilter: attributes });
  return () => obs.disconnect();
}
function observeAttributes(nodeOrFn, options) {
  const { defer } = options;
  const func = defer ? raf : (v) => v();
  const cleanups2 = [];
  cleanups2.push(func(() => {
    const node = typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn;
    cleanups2.push(observeAttributesImpl(node, options));
  }));
  return () => {
    cleanups2.forEach((fn) => fn?.());
  };
}
function queryAll(root, selector) {
  return Array.from(root?.querySelectorAll(selector) ?? []);
}
function createScope(methods) {
  const screen = { getRootNode: (ctx) => ctx.getRootNode?.() ?? document, getDoc: (ctx) => getDocument(screen.getRootNode(ctx)), getWin: (ctx) => screen.getDoc(ctx).defaultView ?? window, getActiveElement: (ctx) => screen.getDoc(ctx).activeElement, isActiveElement: (ctx, elem) => elem === screen.getActiveElement(ctx), getById: (ctx, id) => screen.getRootNode(ctx).getElementById(id), setValue: (elem, value) => {
    if (elem == null || value == null) return;
    const valueAsString = value.toString();
    if (elem.value === valueAsString) return;
    elem.value = value.toString();
  } };
  return { ...screen, ...methods };
}
function isScrollable(el) {
  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
}
function scrollIntoView(el, options) {
  const { rootEl, ...scrollOptions } = options || {};
  if (!el || !rootEl) {
    return;
  }
  if (!isOverflowElement(rootEl) || !isScrollable(rootEl)) {
    return;
  }
  el.scrollIntoView(scrollOptions);
}
var cleanups = /* @__PURE__ */ new WeakMap();
function set(element, key, setup) {
  if (!cleanups.has(element)) {
    cleanups.set(element, /* @__PURE__ */ new Map());
  }
  const elementCleanups = cleanups.get(element);
  const prevCleanup = elementCleanups.get(key);
  if (!prevCleanup) {
    elementCleanups.set(key, setup());
    return () => {
      elementCleanups.get(key)?.();
      elementCleanups.delete(key);
    };
  }
  const cleanup = setup();
  const nextCleanup = () => {
    cleanup();
    prevCleanup();
    elementCleanups.delete(key);
  };
  elementCleanups.set(key, nextCleanup);
  return () => {
    const isCurrent = elementCleanups.get(key) === nextCleanup;
    if (!isCurrent) return;
    cleanup();
    elementCleanups.set(key, prevCleanup);
  };
}
function setStyle(element, style) {
  if (!element) return () => {
  };
  const setup = () => {
    const prevStyle = element.style.cssText;
    Object.assign(element.style, style);
    return () => {
      element.style.cssText = prevStyle;
    };
  };
  return set(element, "style", setup);
}
var fps = 1e3 / 60;
function waitForElement(query2, cb) {
  const el = query2();
  if (isHTMLElement(el) && el.isConnected) {
    cb(el);
    return () => void 0;
  } else {
    const timerId = setInterval(() => {
      const el2 = query2();
      if (isHTMLElement(el2) && el2.isConnected) {
        cb(el2);
        clearInterval(timerId);
      }
    }, fps);
    return () => clearInterval(timerId);
  }
}
function waitForElements(queries, cb) {
  const cleanups2 = [];
  queries?.forEach((query2) => {
    const clean = waitForElement(query2, cb);
    cleanups2.push(clean);
  });
  return () => {
    cleanups2.forEach((fn) => fn());
  };
}

// node_modules/@zag-js/dom-event/dist/index.mjs
var addDomEvent = (target, eventName, handler, options) => {
  const node = typeof target === "function" ? target() : target;
  node?.addEventListener(eventName, handler, options);
  return () => {
    node?.removeEventListener(eventName, handler, options);
  };
};
function isPrintableKey(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
var isLeftClick = (e) => e.button === 0;
var isContextMenuEvent = (e) => {
  return e.button === 2 || isMac() && e.ctrlKey && e.button === 0;
};
var isModifierKey = (e) => e.ctrlKey || e.altKey || e.metaKey;
function queueBeforeEvent(element, type, cb) {
  const createTimer = (callback) => {
    const timerId = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(timerId);
  };
  const cancelTimer = createTimer(() => {
    element.removeEventListener(type, callSync, true);
    cb();
  });
  const callSync = () => {
    cancelTimer();
    cb();
  };
  element.addEventListener(type, callSync, { once: true, capture: true });
  return cancelTimer;
}
function isLinkElement(element) {
  return element?.matches("a[href]") ?? false;
}
function clickIfLink(element) {
  if (!isLinkElement(element)) return;
  const click = () => element.click();
  if (isFirefox()) {
    queueBeforeEvent(element, "keyup", click);
  } else {
    queueMicrotask(click);
  }
}
function fireCustomEvent(el, type, init) {
  if (!el) return;
  const win = el.ownerDocument.defaultView || window;
  const event = new win.CustomEvent(type, init);
  return el.dispatchEvent(event);
}
var keyMap = { Up: "ArrowUp", Down: "ArrowDown", Esc: "Escape", " ": "Space", ",": "Comma", Left: "ArrowLeft", Right: "ArrowRight" };
var rtlKeyMap = { ArrowLeft: "ArrowRight", ArrowRight: "ArrowLeft" };
function getEventKey(event, options = {}) {
  const { dir = "ltr", orientation = "horizontal" } = options;
  let { key } = event;
  key = keyMap[key] ?? key;
  const isRtl = dir === "rtl" && orientation === "horizontal";
  if (isRtl && key in rtlKeyMap) {
    key = rtlKeyMap[key];
  }
  return key;
}
function pointFromTouch(e, type = "client") {
  const point = e.touches[0] || e.changedTouches[0];
  return { x: point[`${type}X`], y: point[`${type}Y`] };
}
function pointFromMouse(point, type = "client") {
  return { x: point[`${type}X`], y: point[`${type}Y`] };
}
var isTouchEvent = (event) => "touches" in event && event.touches.length > 0;
function getEventPoint(event, type = "client") {
  return isTouchEvent(event) ? pointFromTouch(event, type) : pointFromMouse(event, type);
}
function getNativeEvent(event) {
  return event.nativeEvent ?? event;
}

// node_modules/@zag-js/utils/dist/index.mjs
var first = (v) => v[0];
var last = (v) => v[v.length - 1];
var add = (v, ...items) => v.concat(items);
var remove = (v, item) => v.filter((t) => t !== item);
var isArrayLike = (value) => value?.constructor.name === "Array";
var isEqual = (a, b) => {
  if (Object.is(a, b)) return true;
  if (a == null && b != null || a != null && b == null) return false;
  if (typeof a?.isEqual === "function" && typeof b?.isEqual === "function") {
    return a.isEqual(b);
  }
  if (typeof a === "function" && typeof b === "function") {
    return a.toString() === b.toString();
  }
  if (isArrayLike(a) && isArrayLike(b)) {
    return Array.from(a).toString() === Array.from(b).toString();
  }
  if (!(typeof a === "object") || !(typeof b === "object")) return false;
  const keys = Object.keys(b ?? /* @__PURE__ */ Object.create(null));
  const length = keys.length;
  for (let i = 0; i < length; i++) {
    const hasKey = Reflect.has(a, keys[i]);
    if (!hasKey) return false;
  }
  for (let i = 0; i < length; i++) {
    const key = keys[i];
    if (!isEqual(a[key], b[key])) return false;
  }
  return true;
};
var runIfFn = (v, ...a) => {
  const res = typeof v === "function" ? v(...a) : v;
  return res ?? void 0;
};
var cast = (v) => v;
var noop = () => {
};
var callAll = (...fns) => (...a) => {
  fns.forEach(function(fn) {
    fn?.(...a);
  });
};
var isFunction = (v) => typeof v === "function";
var isNull = (v) => v == null;
function compact(obj) {
  if (!isPlainObject(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact(value);
    }
  }
  return filtered;
}
var isPlainObject = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};
function splitProps(props3, keys) {
  const rest = {};
  const result = {};
  const keySet = new Set(keys);
  for (const key in props3) {
    if (keySet.has(key)) {
      result[key] = props3[key];
    } else {
      rest[key] = props3[key];
    }
  }
  return [result, rest];
}
var createSplitProps = (keys) => {
  return function split(props3) {
    return splitProps(props3, keys);
  };
};
function warn(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && true) {
    console.warn(m);
  }
}

// node_modules/proxy-compare/dist/index.js
var TRACK_MEMO_SYMBOL = Symbol();
var GET_ORIGINAL_SYMBOL = Symbol();
var getProto = Object.getPrototypeOf;
var objectsToTrack = /* @__PURE__ */ new WeakMap();
var isObjectToTrack = (obj) => obj && (objectsToTrack.has(obj) ? objectsToTrack.get(obj) : getProto(obj) === Object.prototype || getProto(obj) === Array.prototype);
var getUntracked = (obj) => {
  if (isObjectToTrack(obj)) {
    return obj[GET_ORIGINAL_SYMBOL] || null;
  }
  return null;
};
var markToTrack = (obj, mark = true) => {
  objectsToTrack.set(obj, mark);
};

// node_modules/@zag-js/store/dist/index.mjs
function getGlobal() {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
}
function makeGlobal(key, value) {
  const g = getGlobal();
  if (!g) return value();
  g[key] || (g[key] = value());
  return g[key];
}
var isDev = true;
var isObject = (x) => typeof x === "object" && x !== null;
var proxyStateMap = makeGlobal("__zag__proxyStateMap", () => /* @__PURE__ */ new WeakMap());
var refSet = makeGlobal("__zag__refSet", () => /* @__PURE__ */ new WeakSet());
var buildProxyFunction = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), canProxy = (x) => isObject(x) && !refSet.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer), defaultHandlePromise = (promise) => {
  switch (promise.status) {
    case "fulfilled":
      return promise.value;
    case "rejected":
      throw promise.reason;
    default:
      throw promise;
  }
}, snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version, handlePromise = defaultHandlePromise) => {
  const cache = snapCache.get(target);
  if (cache?.[0] === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  markToTrack(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    const value = Reflect.get(target, key);
    if (refSet.has(value)) {
      markToTrack(value, false);
      snap[key] = value;
    } else if (value instanceof Promise) {
      Object.defineProperty(snap, key, { get() {
        return handlePromise(value);
      } });
    } else if (proxyStateMap.has(value)) {
      snap[key] = snapshot(value, handlePromise);
    } else {
      snap[key] = value;
    }
  });
  return Object.freeze(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction2 = (initialObject) => {
  if (!isObject(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if (isDev && propProxyStates.has(prop)) {
      throw new Error("prop listener already exists");
    }
    if (listeners.size) {
      const remove2 = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove2]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      entry[1]?.();
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if (isDev && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove2 = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove2]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove2], prop) => {
          if (remove2) {
            remove2();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = { deleteProperty(target, prop) {
    const prevValue = Reflect.get(target, prop);
    removePropListener(prop);
    const deleted = Reflect.deleteProperty(target, prop);
    if (deleted) {
      notifyUpdate(["delete", [prop], prevValue]);
    }
    return deleted;
  }, set(target, prop, value, receiver) {
    const hasPrevValue = Reflect.has(target, prop);
    const prevValue = Reflect.get(target, prop, receiver);
    if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
      return true;
    }
    removePropListener(prop);
    if (isObject(value)) {
      value = getUntracked(value) || value;
    }
    let nextValue = value;
    if (Object.getOwnPropertyDescriptor(target, prop)?.set) {
    } else if (value instanceof Promise) {
      value.then((v) => {
        Object.assign(value, { status: "fulfilled", value: v });
        notifyUpdate(["resolve", [prop], v]);
      }).catch((e) => {
        Object.assign(value, { status: "rejected", reason: e });
        notifyUpdate(["reject", [prop], e]);
      });
    } else {
      if (!proxyStateMap.has(value) && canProxy(value)) {
        nextValue = proxy(value);
      }
      const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
      if (childProxyState) {
        addPropListener(prop, childProxyState);
      }
    }
    Reflect.set(target, prop, nextValue, receiver);
    notifyUpdate(["set", [prop], value, prevValue]);
    return true;
  } };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [baseObject, ensureVersion, createSnapshot, addListener];
  proxyStateMap.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(initialObject, key);
    if (desc.get || desc.set) {
      Object.defineProperty(baseObject, key, desc);
    } else {
      proxyObject[key] = initialObject[key];
    }
  });
  return proxyObject;
}) => [proxyFunction2, proxyStateMap, refSet, objectIs, newProxy, canProxy, defaultHandlePromise, snapCache, createSnapshot, proxyCache, versionHolder];
var [proxyFunction] = buildProxyFunction();
function proxy(initialObject = {}) {
  return proxyFunction(initialObject);
}
function subscribe(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap.get(proxyObject);
  if (isDev && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot(proxyObject, handlePromise) {
  const proxyState = proxyStateMap.get(proxyObject);
  if (isDev && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion(), handlePromise);
}
function ref(obj) {
  refSet.add(obj);
  return obj;
}
function proxyWithComputed(initialObject, computedFns) {
  const keys = Object.keys(computedFns);
  keys.forEach((key) => {
    if (Object.getOwnPropertyDescriptor(initialObject, key)) {
      throw new Error("object property already defined");
    }
    const computedFn = computedFns[key];
    const { get, set: set5 } = typeof computedFn === "function" ? { get: computedFn } : computedFn;
    const desc = {};
    desc.get = () => get(snapshot(proxyObject));
    if (set5) {
      desc.set = (newValue) => set5(proxyObject, newValue);
    }
    Object.defineProperty(initialObject, key, desc);
  });
  const proxyObject = proxy(initialObject);
  return proxyObject;
}

// node_modules/klona/full/index.mjs
function set2(obj, key, val) {
  if (typeof val.value === "object") val.value = klona(val.value);
  if (!val.enumerable || val.get || val.set || !val.configurable || !val.writable || key === "__proto__") {
    Object.defineProperty(obj, key, val);
  } else obj[key] = val.value;
}
function klona(x) {
  if (typeof x !== "object") return x;
  var i = 0, k, list, tmp, str = Object.prototype.toString.call(x);
  if (str === "[object Object]") {
    tmp = Object.create(x.__proto__ || null);
  } else if (str === "[object Array]") {
    tmp = Array(x.length);
  } else if (str === "[object Set]") {
    tmp = /* @__PURE__ */ new Set();
    x.forEach(function(val) {
      tmp.add(klona(val));
    });
  } else if (str === "[object Map]") {
    tmp = /* @__PURE__ */ new Map();
    x.forEach(function(val, key) {
      tmp.set(klona(key), klona(val));
    });
  } else if (str === "[object Date]") {
    tmp = /* @__PURE__ */ new Date(+x);
  } else if (str === "[object RegExp]") {
    tmp = new RegExp(x.source, x.flags);
  } else if (str === "[object DataView]") {
    tmp = new x.constructor(klona(x.buffer));
  } else if (str === "[object ArrayBuffer]") {
    tmp = x.slice(0);
  } else if (str.slice(-6) === "Array]") {
    tmp = new x.constructor(x);
  }
  if (tmp) {
    for (list = Object.getOwnPropertySymbols(x); i < list.length; i++) {
      set2(tmp, list[i], Object.getOwnPropertyDescriptor(x, list[i]));
    }
    for (i = 0, list = Object.getOwnPropertyNames(x); i < list.length; i++) {
      if (Object.hasOwnProperty.call(tmp, k = list[i]) && tmp[k] === x[k]) continue;
      set2(tmp, k, Object.getOwnPropertyDescriptor(x, k));
    }
  }
  return tmp || x;
}

// node_modules/@zag-js/core/dist/index.mjs
var __defProp2 = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function clear(v) {
  while (v.length > 0) v.pop();
  return v;
}
var runIfFn2 = (v, ...a) => {
  const res = typeof v === "function" ? v(...a) : v;
  return res ?? void 0;
};
var cast2 = (v) => v;
var noop2 = () => {
};
var callAll2 = (...fns) => (...a) => {
  fns.forEach(function(fn) {
    fn?.(...a);
  });
};
var uuid = /* @__PURE__ */ (() => {
  let id = 0;
  return () => {
    id++;
    return id.toString(36);
  };
})();
var isDev2 = () => true;
var isArray = (v) => Array.isArray(v);
var isObject2 = (v) => !(v == null || typeof v !== "object" || isArray(v));
var isNumber = (v) => typeof v === "number" && !Number.isNaN(v);
var isString = (v) => typeof v === "string";
var isFunction2 = (v) => typeof v === "function";
var hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
function compact2(obj) {
  if (!isPlainObject2(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact2(value);
    }
  }
  return filtered;
}
var isPlainObject2 = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};
function warn2(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && true) {
    console.warn(m);
  }
}
function invariant(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && true) {
    throw new Error(m);
  }
}
function deepMerge(source, ...objects) {
  for (const obj of objects) {
    const target = compact2(obj);
    for (const key in target) {
      if (isObject2(obj[key])) {
        if (!source[key]) {
          source[key] = {};
        }
        deepMerge(source[key], obj[key]);
      } else {
        source[key] = obj[key];
      }
    }
  }
  return source;
}
function structuredClone(v) {
  return klona(v);
}
function toEvent(event) {
  const obj = isString(event) ? { type: event } : event;
  return obj;
}
function toArray(value) {
  if (!value) return [];
  return isArray(value) ? value.slice() : [value];
}
function isGuardHelper(value) {
  return isObject2(value) && value.predicate != null;
}
var Truthy = () => true;
function exec(guardMap, ctx, event, meta) {
  return (guard) => {
    if (isString(guard)) {
      return !!guardMap[guard]?.(ctx, event, meta);
    }
    if (isFunction2(guard)) {
      return guard(ctx, event, meta);
    }
    return guard.predicate(guardMap)(ctx, event, meta);
  };
}
function or(...conditions) {
  return { predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).some(Boolean) };
}
function and(...conditions) {
  return { predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).every(Boolean) };
}
function not(condition) {
  return { predicate: (guardMap) => (ctx, event, meta) => {
    return !exec(guardMap, ctx, event, meta)(condition);
  } };
}
function stateIn(...values) {
  return (_ctx, _evt, meta) => meta.state.matches(...values);
}
var guards = { or, and, not, stateIn };
function determineGuardFn(guard, guardMap) {
  guard = guard ?? Truthy;
  return (context, event, meta) => {
    if (isString(guard)) {
      const value = guardMap[guard];
      return isFunction2(value) ? value(context, event, meta) : value;
    }
    if (isGuardHelper(guard)) {
      return guard.predicate(guardMap)(context, event, meta);
    }
    return guard?.(context, event, meta);
  };
}
function determineActionsFn(values, guardMap) {
  return (context, event, meta) => {
    if (isGuardHelper(values)) {
      return values.predicate(guardMap)(context, event, meta);
    }
    return values;
  };
}
function createProxy(config) {
  const computedContext = config.computed ?? cast2({});
  const initialContext = config.context ?? cast2({});
  const initialTags = config.initial ? config.states?.[config.initial]?.tags : [];
  const state = proxy({ value: config.initial ?? "", previousValue: "", event: cast2({}), previousEvent: cast2({}), context: proxyWithComputed(initialContext, computedContext), done: false, tags: initialTags ?? [], hasTag(tag) {
    return this.tags.includes(tag);
  }, matches(...value) {
    return value.includes(this.value);
  }, can(event) {
    return cast2(this).nextEvents.includes(event);
  }, get nextEvents() {
    const stateEvents = config.states?.[this.value]?.["on"] ?? {};
    const globalEvents = config?.on ?? {};
    return Object.keys({ ...stateEvents, ...globalEvents });
  }, get changed() {
    if (this.event.value === "machine.init" || !this.previousValue) return false;
    return this.value !== this.previousValue;
  } });
  return cast2(state);
}
function determineDelayFn(delay, delaysMap) {
  return (context, event) => {
    if (isNumber(delay)) return delay;
    if (isFunction2(delay)) {
      return delay(context, event);
    }
    if (isString(delay)) {
      const value = Number.parseFloat(delay);
      if (!Number.isNaN(value)) {
        return value;
      }
      if (delaysMap) {
        const valueOrFn = delaysMap?.[delay];
        invariant(valueOrFn == null, `[@zag-js/core > determine-delay] Cannot determine delay for \`${delay}\`. It doesn't exist in \`options.delays\``);
        return isFunction2(valueOrFn) ? valueOrFn(context, event) : valueOrFn;
      }
    }
  };
}
function toTarget(target) {
  return isString(target) ? { target } : target;
}
function determineTransitionFn(transitions, guardMap) {
  return (context, event, meta) => {
    return toArray(transitions).map(toTarget).find((transition) => {
      const determineGuard = determineGuardFn(transition.guard, guardMap);
      const guard = determineGuard(context, event, meta);
      return guard ?? transition.target ?? transition.actions;
    });
  };
}
var Machine = class {
  constructor(config, options) {
    __publicField(this, "status", "Not Started");
    __publicField(this, "state");
    __publicField(this, "initialState");
    __publicField(this, "initialContext");
    __publicField(this, "id");
    __publicField(this, "type", "machine");
    __publicField(this, "activityEvents", /* @__PURE__ */ new Map());
    __publicField(this, "delayedEvents", /* @__PURE__ */ new Map());
    __publicField(this, "stateListeners", /* @__PURE__ */ new Set());
    __publicField(this, "doneListeners", /* @__PURE__ */ new Set());
    __publicField(this, "contextWatchers", /* @__PURE__ */ new Set());
    __publicField(this, "removeStateListener", noop2);
    __publicField(this, "parent");
    __publicField(this, "children", /* @__PURE__ */ new Map());
    __publicField(this, "guardMap");
    __publicField(this, "actionMap");
    __publicField(this, "delayMap");
    __publicField(this, "activityMap");
    __publicField(this, "sync");
    __publicField(this, "options");
    __publicField(this, "config");
    __publicField(this, "_created", () => {
      const event = toEvent("machine.created");
      this.executeActions(this.config?.created, event);
    });
    __publicField(this, "start", (init) => {
      this.state.value = "";
      this.state.tags = [];
      if (this.status === "Running") {
        return this;
      }
      this.status = "Running";
      this.removeStateListener = subscribe(this.state, () => {
        this.stateListeners.forEach((listener) => {
          listener(this.stateSnapshot);
        });
      }, this.sync);
      this.setupContextWatchers();
      this.executeActivities(toEvent("machine.start"), toArray(this.config.activities), "machine.start");
      this.executeActions(this.config.entry, toEvent("machine.start"));
      const event = toEvent("machine.init");
      const target = isObject2(init) ? init.value : init;
      const context = isObject2(init) ? init.context : void 0;
      if (context) {
        this.setContext(context);
      }
      const transition = { target: target ?? this.config.initial };
      const next = this.getNextStateInfo(transition, event);
      this.initialState = next;
      this.performStateChangeEffects(this.state.value, next, event);
      return this;
    });
    __publicField(this, "setupContextWatchers", () => {
      const { watch } = this.config;
      if (!watch) return;
      let prev = snapshot(this.state.context);
      const cleanup = subscribe(this.state.context, () => {
        const next = snapshot(this.state.context);
        for (const [key, fn] of Object.entries(watch)) {
          const isEqual2 = this.options.compareFns?.[key] ?? Object.is;
          if (isEqual2(prev[key], next[key])) continue;
          this.executeActions(fn, this.state.event);
        }
        prev = next;
      });
      this.contextWatchers.add(cleanup);
    });
    __publicField(this, "stop", () => {
      if (this.status === "Stopped") return;
      this.performExitEffects(this.state.value, toEvent("machine.stop"));
      this.executeActions(this.config.exit, toEvent("machine.stop"));
      this.setState("");
      this.setEvent("machine.stop");
      this.stopStateListeners();
      this.stopChildren();
      this.stopActivities();
      this.stopDelayedEvents();
      this.stopContextWatchers();
      this.status = "Stopped";
      return this;
    });
    __publicField(this, "stopStateListeners", () => {
      this.removeStateListener();
      this.stateListeners.clear();
    });
    __publicField(this, "stopContextWatchers", () => {
      this.contextWatchers.forEach((fn) => fn());
      this.contextWatchers.clear();
    });
    __publicField(this, "stopDelayedEvents", () => {
      this.delayedEvents.forEach((state) => {
        state.forEach((stop) => stop());
      });
      this.delayedEvents.clear();
    });
    __publicField(this, "stopActivities", (state) => {
      if (state) {
        this.activityEvents.get(state)?.forEach((stop) => stop());
        this.activityEvents.get(state)?.clear();
        this.activityEvents.delete(state);
      } else {
        this.activityEvents.forEach((state2) => {
          state2.forEach((stop) => stop());
          state2.clear();
        });
        this.activityEvents.clear();
      }
    });
    __publicField(this, "sendChild", (evt, to) => {
      const event = toEvent(evt);
      const id = runIfFn2(to, this.contextSnapshot);
      const child = this.children.get(id);
      if (!child) {
        invariant(`[@zag-js/core] Cannot send '${event.type}' event to unknown child`);
      }
      child.send(event);
    });
    __publicField(this, "stopChild", (id) => {
      if (!this.children.has(id)) {
        invariant(`[@zag-js/core > stop-child] Cannot stop unknown child ${id}`);
      }
      this.children.get(id).stop();
      this.children.delete(id);
    });
    __publicField(this, "removeChild", (id) => {
      this.children.delete(id);
    });
    __publicField(this, "stopChildren", () => {
      this.children.forEach((child) => child.stop());
      this.children.clear();
    });
    __publicField(this, "setParent", (parent) => {
      this.parent = parent;
    });
    __publicField(this, "spawn", (src, id) => {
      const actor = runIfFn2(src);
      if (id) actor.id = id;
      actor.type = "machine.actor";
      actor.setParent(this);
      this.children.set(actor.id, cast2(actor));
      actor.onDone(() => {
        this.removeChild(actor.id);
      }).start();
      return cast2(ref(actor));
    });
    __publicField(this, "stopActivity", (key) => {
      if (!this.state.value) return;
      const cleanups2 = this.activityEvents.get(this.state.value);
      cleanups2?.get(key)?.();
      cleanups2?.delete(key);
    });
    __publicField(this, "addActivityCleanup", (state, key, cleanup) => {
      if (!state) return;
      if (!this.activityEvents.has(state)) {
        this.activityEvents.set(state, /* @__PURE__ */ new Map([[key, cleanup]]));
      } else {
        this.activityEvents.get(state)?.set(key, cleanup);
      }
    });
    __publicField(this, "setState", (target) => {
      this.state.previousValue = this.state.value;
      this.state.value = target;
      const stateNode = this.getStateNode(target);
      if (target == null) {
        clear(this.state.tags);
      } else {
        this.state.tags = toArray(stateNode?.tags);
      }
    });
    __publicField(this, "setContext", (context) => {
      if (!context) return;
      deepMerge(this.state.context, compact2(context));
    });
    __publicField(this, "setOptions", (options2) => {
      const opts = compact2(options2);
      this.actionMap = { ...this.actionMap, ...opts.actions };
      this.delayMap = { ...this.delayMap, ...opts.delays };
      this.activityMap = { ...this.activityMap, ...opts.activities };
      this.guardMap = { ...this.guardMap, ...opts.guards };
    });
    __publicField(this, "getStateNode", (state) => {
      if (!state) return;
      return this.config.states?.[state];
    });
    __publicField(this, "getNextStateInfo", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      const isTargetless = !transition?.target;
      const target = transition?.target ?? this.state.value;
      const changed = this.state.value !== target;
      const stateNode = this.getStateNode(target);
      const reenter = !isTargetless && !changed && !transition?.internal;
      const info = { reenter, transition, stateNode, target, changed };
      this.log("NextState:", `[${event.type}]`, this.state.value, "---->", info.target);
      return info;
    });
    __publicField(this, "getAfterActions", (transition, delay) => {
      let id;
      return { entry: () => {
        id = globalThis.setTimeout(() => {
          const next = this.getNextStateInfo(transition, this.state.event);
          this.performStateChangeEffects(this.state.value, next, this.state.event);
        }, delay);
      }, exit: () => {
        globalThis.clearTimeout(id);
      } };
    });
    __publicField(this, "getDelayedEventActions", (state) => {
      const stateNode = this.getStateNode(state);
      const event = this.state.event;
      if (!stateNode || !stateNode.after) return;
      const entries = [];
      const exits = [];
      if (isArray(stateNode.after)) {
        const transition = this.determineTransition(stateNode.after, event);
        if (!transition) return;
        if (!hasProp(transition, "delay")) {
          throw new Error(`[@zag-js/core > after] Delay is required for after transition: ${JSON.stringify(transition)}`);
        }
        const determineDelay = determineDelayFn(transition.delay, this.delayMap);
        const __delay = determineDelay(this.contextSnapshot, event);
        const actions = this.getAfterActions(transition, __delay);
        entries.push(actions.entry);
        exits.push(actions.exit);
        return { entries, exits };
      }
      if (isObject2(stateNode.after)) {
        for (const delay in stateNode.after) {
          const transition = stateNode.after[delay];
          const determineDelay = determineDelayFn(delay, this.delayMap);
          const __delay = determineDelay(this.contextSnapshot, event);
          const actions = this.getAfterActions(transition, __delay);
          entries.push(actions.entry);
          exits.push(actions.exit);
        }
      }
      return { entries, exits };
    });
    __publicField(this, "executeActions", (actions, event) => {
      const pickedActions = determineActionsFn(actions, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      for (const action of toArray(pickedActions)) {
        const fn = isString(action) ? this.actionMap?.[action] : action;
        warn2(isString(action) && !fn, `[@zag-js/core > execute-actions] No implementation found for action: \`${action}\``);
        fn?.(this.state.context, event, this.meta);
      }
    });
    __publicField(this, "executeActivities", (event, activities, state) => {
      for (const activity of activities) {
        const fn = isString(activity) ? this.activityMap?.[activity] : activity;
        if (!fn) {
          warn2(`[@zag-js/core > execute-activity] No implementation found for activity: \`${activity}\``);
          continue;
        }
        const cleanup = fn(this.state.context, event, this.meta);
        if (cleanup) {
          const key = isString(activity) ? activity : activity.name || uuid();
          this.addActivityCleanup(state ?? this.state.value, key, cleanup);
        }
      }
    });
    __publicField(this, "createEveryActivities", (every, callbackfn) => {
      if (!every) return;
      if (isArray(every)) {
        const picked = toArray(every).find((transition) => {
          const delayOrFn = transition.delay;
          const determineDelay2 = determineDelayFn(delayOrFn, this.delayMap);
          const delay2 = determineDelay2(this.contextSnapshot, this.state.event);
          const determineGuard = determineGuardFn(transition.guard, this.guardMap);
          const guard = determineGuard(this.contextSnapshot, this.state.event, this.guardMeta);
          return guard ?? delay2 != null;
        });
        if (!picked) return;
        const determineDelay = determineDelayFn(picked.delay, this.delayMap);
        const delay = determineDelay(this.contextSnapshot, this.state.event);
        const activity = () => {
          const id = globalThis.setInterval(() => {
            this.executeActions(picked.actions, this.state.event);
          }, delay);
          return () => {
            globalThis.clearInterval(id);
          };
        };
        callbackfn(activity);
      } else {
        for (const interval in every) {
          const actions = every?.[interval];
          const determineDelay = determineDelayFn(interval, this.delayMap);
          const delay = determineDelay(this.contextSnapshot, this.state.event);
          const activity = () => {
            const id = globalThis.setInterval(() => {
              this.executeActions(actions, this.state.event);
            }, delay);
            return () => {
              globalThis.clearInterval(id);
            };
          };
          callbackfn(activity);
        }
      }
    });
    __publicField(this, "setEvent", (event) => {
      this.state.previousEvent = this.state.event;
      this.state.event = ref(toEvent(event));
    });
    __publicField(this, "performExitEffects", (current, event) => {
      const currentState = this.state.value;
      if (currentState === "") return;
      const stateNode = current ? this.getStateNode(current) : void 0;
      this.stopActivities(currentState);
      const _exit = determineActionsFn(stateNode?.exit, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      const exitActions = toArray(_exit);
      const afterExitActions = this.delayedEvents.get(currentState);
      if (afterExitActions) {
        exitActions.push(...afterExitActions);
      }
      this.executeActions(exitActions, event);
    });
    __publicField(this, "performEntryEffects", (next, event) => {
      const stateNode = this.getStateNode(next);
      const activities = toArray(stateNode?.activities);
      this.createEveryActivities(stateNode?.every, (activity) => {
        activities.unshift(activity);
      });
      if (activities.length > 0) {
        this.executeActivities(event, activities);
      }
      const pickedActions = determineActionsFn(stateNode?.entry, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      const entryActions = toArray(pickedActions);
      const afterActions = this.getDelayedEventActions(next);
      if (stateNode?.after && afterActions) {
        this.delayedEvents.set(next, afterActions?.exits);
        entryActions.push(...afterActions.entries);
      }
      this.executeActions(entryActions, event);
      if (stateNode?.type === "final") {
        this.state.done = true;
        this.doneListeners.forEach((listener) => {
          listener(this.stateSnapshot);
        });
        this.stop();
      }
    });
    __publicField(this, "performTransitionEffects", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      this.executeActions(transition?.actions, event);
    });
    __publicField(this, "performStateChangeEffects", (current, next, event) => {
      this.setEvent(event);
      const changed = next.changed || next.reenter;
      if (changed) {
        this.performExitEffects(current, event);
      }
      this.performTransitionEffects(next.transition, event);
      this.setState(next.target);
      if (changed) {
        this.performEntryEffects(next.target, event);
      }
    });
    __publicField(this, "determineTransition", (transition, event) => {
      const fn = determineTransitionFn(transition, this.guardMap);
      return fn?.(this.contextSnapshot, event, this.guardMeta);
    });
    __publicField(this, "sendParent", (evt) => {
      if (!this.parent) {
        invariant("[@zag-js/core > send-parent] Cannot send event to an unknown parent");
      }
      const event = toEvent(evt);
      this.parent?.send(event);
    });
    __publicField(this, "log", (...args) => {
      if (isDev2() && this.options.debug) {
        console.log(...args);
      }
    });
    __publicField(this, "send", (evt) => {
      const event = toEvent(evt);
      this.transition(this.state.value, event);
    });
    __publicField(this, "transition", (state, evt) => {
      const stateNode = isString(state) ? this.getStateNode(state) : state?.stateNode;
      const event = toEvent(evt);
      if (!stateNode && !this.config.on) {
        const msg = this.status === "Stopped" ? "[@zag-js/core > transition] Cannot transition a stopped machine" : `[@zag-js/core > transition] State does not have a definition for \`state\`: ${state}, \`event\`: ${event.type}`;
        warn2(msg);
        return;
      }
      const transitions = stateNode?.on?.[event.type] ?? this.config.on?.[event.type];
      const next = this.getNextStateInfo(transitions, event);
      this.performStateChangeEffects(this.state.value, next, event);
      return next.stateNode;
    });
    __publicField(this, "subscribe", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return () => {
        this.stateListeners.delete(listener);
      };
    });
    __publicField(this, "onDone", (listener) => {
      this.doneListeners.add(listener);
      return this;
    });
    __publicField(this, "onTransition", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return this;
    });
    this.config = structuredClone(config);
    this.options = structuredClone(options ?? {});
    this.id = this.config.id ?? `machine-${uuid()}`;
    this.guardMap = this.options?.guards ?? {};
    this.actionMap = this.options?.actions ?? {};
    this.delayMap = this.options?.delays ?? {};
    this.activityMap = this.options?.activities ?? {};
    this.sync = this.options?.sync ?? false;
    this.state = createProxy(this.config);
    this.initialContext = snapshot(this.state.context);
  }
  get stateSnapshot() {
    return cast2(snapshot(this.state));
  }
  getState() {
    return this.stateSnapshot;
  }
  get contextSnapshot() {
    return this.stateSnapshot.context;
  }
  get self() {
    const self2 = this;
    return { id: this.id, send: this.send.bind(this), sendParent: this.sendParent.bind(this), sendChild: this.sendChild.bind(this), stop: this.stop.bind(this), stopChild: this.stopChild.bind(this), spawn: this.spawn.bind(this), stopActivity: this.stopActivity.bind(this), get state() {
      return self2.stateSnapshot;
    }, get initialContext() {
      return self2.initialContext;
    }, get initialState() {
      return self2.initialState?.target ?? "";
    } };
  }
  get meta() {
    return { state: this.stateSnapshot, guards: this.guardMap, send: this.send.bind(this), self: this.self, initialContext: this.initialContext, initialState: this.initialState?.target ?? "", getState: () => this.stateSnapshot, getAction: (key) => this.actionMap[key], getGuard: (key) => this.guardMap[key] };
  }
  get guardMeta() {
    return { state: this.stateSnapshot };
  }
  get [Symbol.toStringTag]() {
    return "Machine";
  }
};
var createMachine = (config, options) => new Machine(config, options);
var clsx = (...args) => args.map((str) => str?.trim?.()).filter(Boolean).join(" ");
var CSS_REGEX = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
var serialize = (style) => {
  const res = {};
  let match2;
  while (match2 = CSS_REGEX.exec(style)) {
    res[match2[1]] = match2[2];
  }
  return res;
};
var css = (a, b) => {
  if (isString(a)) {
    if (isString(b)) return `${a};${b}`;
    a = serialize(a);
  } else if (isString(b)) {
    b = serialize(b);
  }
  return Object.assign({}, a ?? {}, b ?? {});
};
var eventRegex = /^on[A-Z]/;
function mergeProps(...args) {
  let result = {};
  for (let props3 of args) {
    for (let key in result) {
      if (eventRegex.test(key) && typeof result[key] === "function" && typeof props3[key] === "function") {
        result[key] = callAll2(props3[key], result[key]);
        continue;
      }
      if (key === "className" || key === "class") {
        result[key] = clsx(result[key], props3[key]);
        continue;
      }
      if (key === "style") {
        result[key] = css(result[key], props3[key]);
        continue;
      }
      result[key] = props3[key] !== void 0 ? props3[key] : result[key];
    }
    for (let key in props3) {
      if (result[key] === void 0) {
        result[key] = props3[key];
      }
    }
  }
  return result;
}

// node_modules/@zag-js/types/dist/index.mjs
function createNormalizer(fn) {
  return new Proxy({}, { get() {
    return fn;
  } });
}
var createProps = () => (props3) => Array.from(new Set(props3));

// node_modules/@zag-js/accordion/dist/index.mjs
var anatomy = createAnatomy("accordion").parts("root", "item", "itemTrigger", "itemContent", "itemIndicator");
var parts = anatomy.build();
var dom = createScope({ getRootId: (ctx) => ctx.ids?.root ?? `accordion:${ctx.id}`, getItemId: (ctx, value) => ctx.ids?.item?.(value) ?? `accordion:${ctx.id}:item:${value}`, getItemContentId: (ctx, value) => ctx.ids?.content?.(value) ?? `accordion:${ctx.id}:content:${value}`, getItemTriggerId: (ctx, value) => ctx.ids?.trigger?.(value) ?? `accordion:${ctx.id}:trigger:${value}`, getRootEl: (ctx) => dom.getById(ctx, dom.getRootId(ctx)), getTriggers: (ctx) => {
  const ownerId = CSS.escape(dom.getRootId(ctx));
  const selector = `[aria-controls][data-ownedby='${ownerId}']:not([disabled])`;
  return queryAll(dom.getRootEl(ctx), selector);
}, getFirstTriggerEl: (ctx) => first(dom.getTriggers(ctx)), getLastTriggerEl: (ctx) => last(dom.getTriggers(ctx)), getNextTriggerEl: (ctx, id) => nextById(dom.getTriggers(ctx), dom.getItemTriggerId(ctx, id)), getPrevTriggerEl: (ctx, id) => prevById(dom.getTriggers(ctx), dom.getItemTriggerId(ctx, id)) });
function connect(state, send, normalize) {
  const focusedValue = state.context.focusedValue;
  const value = state.context.value;
  const multiple = state.context.multiple;
  function setValue(value2) {
    let nextValue = value2;
    if (multiple && nextValue.length > 1) {
      nextValue = [nextValue[0]];
    }
    send({ type: "VALUE.SET", value: nextValue });
  }
  function getItemState(props22) {
    return { expanded: value.includes(props22.value), focused: focusedValue === props22.value, disabled: Boolean(props22.disabled ?? state.context.disabled) };
  }
  return { focusedValue, value, setValue, getItemState, rootProps: normalize.element({ ...parts.root.attrs, dir: state.context.dir, id: dom.getRootId(state.context), "data-orientation": state.context.orientation }), getItemProps(props22) {
    const itemState = getItemState(props22);
    return normalize.element({ ...parts.item.attrs, dir: state.context.dir, id: dom.getItemId(state.context, props22.value), "data-state": itemState.expanded ? "open" : "closed", "data-focus": dataAttr(itemState.focused), "data-disabled": dataAttr(itemState.disabled), "data-orientation": state.context.orientation });
  }, getItemContentProps(props22) {
    const itemState = getItemState(props22);
    return normalize.element({ ...parts.itemContent.attrs, dir: state.context.dir, role: "region", id: dom.getItemContentId(state.context, props22.value), "aria-labelledby": dom.getItemTriggerId(state.context, props22.value), hidden: !itemState.expanded, "data-state": itemState.expanded ? "open" : "closed", "data-disabled": dataAttr(itemState.disabled), "data-focus": dataAttr(itemState.focused), "data-orientation": state.context.orientation });
  }, getItemIndicatorProps(props22) {
    const itemState = getItemState(props22);
    return normalize.element({ ...parts.itemIndicator.attrs, dir: state.context.dir, "aria-hidden": true, "data-state": itemState.expanded ? "open" : "closed", "data-disabled": dataAttr(itemState.disabled), "data-focus": dataAttr(itemState.focused), "data-orientation": state.context.orientation });
  }, getItemTriggerProps(props22) {
    const { value: value2 } = props22;
    const itemState = getItemState(props22);
    return normalize.button({ ...parts.itemTrigger.attrs, type: "button", dir: state.context.dir, id: dom.getItemTriggerId(state.context, value2), "aria-controls": dom.getItemContentId(state.context, value2), "aria-expanded": itemState.expanded, disabled: itemState.disabled, "data-orientation": state.context.orientation, "aria-disabled": itemState.disabled, "data-state": itemState.expanded ? "open" : "closed", "data-ownedby": dom.getRootId(state.context), onFocus() {
      if (itemState.disabled) return;
      send({ type: "TRIGGER.FOCUS", value: value2 });
    }, onBlur() {
      if (itemState.disabled) return;
      send("TRIGGER.BLUR");
    }, onClick(event) {
      if (itemState.disabled) return;
      if (isSafari()) {
        event.currentTarget.focus();
      }
      send({ type: "TRIGGER.CLICK", value: value2 });
    }, onKeyDown(event) {
      if (event.defaultPrevented) return;
      if (itemState.disabled) return;
      const keyMap2 = { ArrowDown() {
        if (state.context.isHorizontal) return;
        send({ type: "GOTO.NEXT", value: value2 });
      }, ArrowUp() {
        if (state.context.isHorizontal) return;
        send({ type: "GOTO.PREV", value: value2 });
      }, ArrowRight() {
        if (!state.context.isHorizontal) return;
        send({ type: "GOTO.NEXT", value: value2 });
      }, ArrowLeft() {
        if (!state.context.isHorizontal) return;
        send({ type: "GOTO.PREV", value: value2 });
      }, Home() {
        send({ type: "GOTO.FIRST", value: value2 });
      }, End() {
        send({ type: "GOTO.LAST", value: value2 });
      } };
      const key = getEventKey(event, { dir: state.context.dir, orientation: state.context.orientation });
      const exec2 = keyMap2[key];
      if (exec2) {
        exec2(event);
        event.preventDefault();
      }
    } });
  } };
}
var { and: and2, not: not2 } = guards;
function machine(userContext) {
  const ctx = compact(userContext);
  return createMachine({ id: "accordion", initial: "idle", context: { focusedValue: null, value: [], collapsible: false, multiple: false, orientation: "vertical", ...ctx }, watch: { value: "coarseValue", multiple: "coarseValue" }, created: "coarseValue", computed: { isHorizontal: (ctx2) => ctx2.orientation === "horizontal" }, on: { "VALUE.SET": { actions: ["setValue"] } }, states: { idle: { on: { "TRIGGER.FOCUS": { target: "focused", actions: "setFocusedValue" } } }, focused: { on: { "GOTO.NEXT": { actions: "focusNextTrigger" }, "GOTO.PREV": { actions: "focusPrevTrigger" }, "TRIGGER.CLICK": [{ guard: and2("isExpanded", "canToggle"), actions: ["collapse"] }, { guard: not2("isExpanded"), actions: ["expand"] }], "GOTO.FIRST": { actions: "focusFirstTrigger" }, "GOTO.LAST": { actions: "focusLastTrigger" }, "TRIGGER.BLUR": { target: "idle", actions: "clearFocusedValue" } } } } }, { guards: { canToggle: (ctx2) => !!ctx2.collapsible || !!ctx2.multiple, isExpanded: (ctx2, evt) => ctx2.value.includes(evt.value) }, actions: { collapse(ctx2, evt) {
    const next = ctx2.multiple ? remove(ctx2.value, evt.value) : [];
    set3.value(ctx2, ctx2.multiple ? next : []);
  }, expand(ctx2, evt) {
    const next = ctx2.multiple ? add(ctx2.value, evt.value) : [evt.value];
    set3.value(ctx2, next);
  }, focusFirstTrigger(ctx2) {
    dom.getFirstTriggerEl(ctx2)?.focus();
  }, focusLastTrigger(ctx2) {
    dom.getLastTriggerEl(ctx2)?.focus();
  }, focusNextTrigger(ctx2) {
    if (!ctx2.focusedValue) return;
    const triggerEl = dom.getNextTriggerEl(ctx2, ctx2.focusedValue);
    triggerEl?.focus();
  }, focusPrevTrigger(ctx2) {
    if (!ctx2.focusedValue) return;
    const triggerEl = dom.getPrevTriggerEl(ctx2, ctx2.focusedValue);
    triggerEl?.focus();
  }, setFocusedValue(ctx2, evt) {
    set3.focusedValue(ctx2, evt.value);
  }, clearFocusedValue(ctx2) {
    set3.focusedValue(ctx2, null);
  }, setValue(ctx2, evt) {
    set3.value(ctx2, evt.value);
  }, coarseValue(ctx2) {
    if (!ctx2.multiple && ctx2.value.length > 1) {
      warn(`The value of accordion should be a single value when multiple is false.`);
      ctx2.value = [ctx2.value[0]];
    }
  } } });
}
var invoke = { change(ctx) {
  ctx.onValueChange?.({ value: Array.from(ctx.value) });
}, focusChange(ctx) {
  ctx.onFocusChange?.({ value: ctx.focusedValue });
} };
var set3 = { value(ctx, value) {
  if (isEqual(ctx.value, value)) return;
  ctx.value = value;
  invoke.change(ctx);
}, focusedValue(ctx, value) {
  if (isEqual(ctx.focusedValue, value)) return;
  ctx.focusedValue = value;
  invoke.focusChange(ctx);
} };
var props = createProps()(["collapsible", "dir", "disabled", "getRootNode", "id", "ids", "multiple", "onFocusChange", "onValueChange", "orientation", "value"]);
var splitProps2 = createSplitProps(props);
var itemProps = createProps()(["value", "disabled"]);
var splitItemProps = createSplitProps(itemProps);

// js/normalize-props.js
var propMap = {
  onFocus: "onFocusin",
  onBlur: "onFocusout",
  onChange: "onInput",
  onDoubleClick: "onDblclick",
  htmlFor: "for",
  className: "class",
  defaultValue: "value",
  defaultChecked: "checked"
};
var toStyleString = (style) => {
  let string = "";
  for (let key in style) {
    const value = style[key];
    if (value === null || value === void 0) continue;
    if (!key.startsWith("--")) key = key.replace(/[A-Z]/g, (match2) => `-${match2.toLowerCase()}`);
    string += `${key}:${value};`;
  }
  return string;
};
var normalizeProps = createNormalizer((props3) => {
  return Object.entries(props3).reduce((acc, [key, value]) => {
    if (value === void 0) return acc;
    if (key in propMap) {
      key = propMap[key];
    }
    if (key === "style" && typeof value === "object") {
      acc.style = toStyleString(value);
      return acc;
    }
    acc[key.toLowerCase()] = value;
    return acc;
  }, {});
});

// js/spread-props.js
var prevAttrsMap = /* @__PURE__ */ new WeakMap();
function spreadProps(node, attrs) {
  const oldAttrs = prevAttrsMap.get(node) || {};
  const attrKeys = Object.keys(attrs);
  const addEvent = (e, f) => {
    node.addEventListener(e.toLowerCase(), f);
  };
  const removeEvent = (e, f) => {
    node.removeEventListener(e.toLowerCase(), f);
  };
  const onEvents = (attr) => attr.startsWith("on");
  const others = (attr) => !attr.startsWith("on");
  const setup = (attr) => addEvent(attr.substring(2), attrs[attr]);
  const teardown = (attr) => removeEvent(attr.substring(2), attrs[attr]);
  const apply = (attrName) => {
    let value = attrs[attrName];
    const oldValue = oldAttrs[attrName];
    if (value === oldValue) return;
    if (typeof value === "boolean") {
      value = value || void 0;
    }
    if (value != null) {
      if (["value", "checked", "htmlFor"].includes(attrName)) {
        node[attrName] = value;
      } else {
        node.setAttribute(attrName.toLowerCase(), value);
      }
      return;
    }
    node.removeAttribute(attrName.toLowerCase());
  };
  for (const key in oldAttrs) {
    if (attrs[key] == null) {
      node.removeAttribute(key.toLowerCase());
    }
  }
  const oldEvents = Object.keys(oldAttrs).filter(onEvents);
  oldEvents.forEach((evt) => {
    removeEvent(evt.substring(2), oldAttrs[evt]);
  });
  attrKeys.filter(onEvents).forEach(setup);
  attrKeys.filter(others).forEach(apply);
  prevAttrsMap.set(node, attrs);
  return function cleanup() {
    attrKeys.filter(onEvents).forEach(teardown);
  };
}

// js/accordion.js
var Accordion = {
  mounted() {
    this.context = { id: this.el.id };
    this.service = machine(this.context);
    this.api = connect(this.service.state, this.service.send, normalizeProps);
    this.init();
  },
  beforeDestroy() {
    this.service.stop();
  },
  init() {
    const service = this.service;
    this.render();
    service.subscribe(() => {
      this.api = connect(service.state, service.send, normalizeProps);
      this.render();
    });
    service.start();
  },
  items() {
    return Array.from(this.el.querySelectorAll("[data-element='item']"));
  },
  render() {
    spreadProps(this.el, this.api.rootProps);
    this.items().forEach((item) => {
      this.renderItem(item);
    });
  },
  renderItem(item) {
    const index = item.dataset.index;
    if (!index) throw new Error("Expected index to be defined");
    const trigger = item.querySelector("[data-element='trigger']");
    const content = item.querySelector("[data-element='content']");
    if (!trigger) throw new Error("Expected trigger to be defined");
    if (!content) throw new Error("Expected content to be defined");
    spreadProps(item, this.api.getItemProps({ value: index }));
    spreadProps(trigger, this.api.getItemTriggerProps({ value: index }));
    spreadProps(content, this.api.getItemContentProps({ value: index }));
  }
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max3 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset3 = clamp(min$1, center, max3);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max3 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset3,
        centerOffset: center - offset3 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$map$so;
              const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min3 = mainAxisCoord + overflow[minSide];
        const max3 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min3, mainAxisCoord, max3);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min3 = crossAxisCoord + overflow[minSide];
        const max3 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min3, crossAxisCoord, max3);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};
var limitShift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset: offset3 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset3, state);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = ["top", "left"].includes(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function getNodeName(node) {
  if (isNode2(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow2(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode2(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode2(value) {
  return value instanceof Node || value instanceof getWindow2(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow2(value).Element;
}
function isHTMLElement3(value) {
  return value instanceof HTMLElement || value instanceof getWindow2(value).HTMLElement;
}
function isShadowRoot2(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow2(value).ShadowRoot;
}
function isOverflowElement2(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css2 = getComputedStyle(element);
  return css2.transform !== "none" || css2.perspective !== "none" || (css2.containerType ? css2.containerType !== "normal" : false) || !webkit && (css2.backdropFilter ? css2.backdropFilter !== "none" : false) || !webkit && (css2.filter ? css2.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css2.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css2.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement3(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow2(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot2(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot2(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement3(parentNode) && isOverflowElement2(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow2(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement2(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css2 = getComputedStyle(element);
  let width = parseFloat(css2.width) || 0;
  let height = parseFloat(css2.height) || 0;
  const hasOffset = isHTMLElement3(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement3(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow2(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow2(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow2(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow2(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css2 = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css2.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css2.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow2(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
var topLayerSelectors = [":popover-open", ":modal"];
function isTopLayer(element) {
  return topLayerSelectors.some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement3(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement2(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement3(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow2(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement3(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement2(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement3(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement2(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement3(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow2(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement3(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var arrow2 = arrow;
var limitShift2 = limitShift;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/@zag-js/popper/dist/index.mjs
function createDOMRect(x = 0, y = 0, width = 0, height = 0) {
  if (typeof DOMRect === "function") {
    return new DOMRect(x, y, width, height);
  }
  const rect = { x, y, width, height, top: y, right: x + width, bottom: y + height, left: x };
  return { ...rect, toJSON: () => rect };
}
function getDOMRect(anchorRect) {
  if (!anchorRect) return createDOMRect();
  const { x, y, width, height } = anchorRect;
  return createDOMRect(x, y, width, height);
}
function getAnchorElement(anchorElement, getAnchorRect) {
  return { contextElement: isHTMLElement(anchorElement) ? anchorElement : void 0, getBoundingClientRect: () => {
    const anchor = anchorElement;
    const anchorRect = getAnchorRect?.(anchor);
    if (anchorRect || !anchor) {
      return getDOMRect(anchorRect);
    }
    return anchor.getBoundingClientRect();
  } };
}
var toVar = (value) => ({ variable: value, reference: `var(${value})` });
var cssVars = { arrowSize: toVar("--arrow-size"), arrowSizeHalf: toVar("--arrow-size-half"), arrowBg: toVar("--arrow-background"), transformOrigin: toVar("--transform-origin"), arrowOffset: toVar("--arrow-offset") };
var getTransformOrigin = (arrow22) => ({ top: "bottom center", "top-start": arrow22 ? `${arrow22.x}px bottom` : "left bottom", "top-end": arrow22 ? `${arrow22.x}px bottom` : "right bottom", bottom: "top center", "bottom-start": arrow22 ? `${arrow22.x}px top` : "top left", "bottom-end": arrow22 ? `${arrow22.x}px top` : "top right", left: "right center", "left-start": arrow22 ? `right ${arrow22.y}px` : "right top", "left-end": arrow22 ? `right ${arrow22.y}px` : "right bottom", right: "left center", "right-start": arrow22 ? `left ${arrow22.y}px` : "left top", "right-end": arrow22 ? `left ${arrow22.y}px` : "left bottom" });
var transformOriginMiddleware = { name: "transformOrigin", fn({ placement, elements, middlewareData }) {
  const { arrow: arrow22 } = middlewareData;
  const transformOrigin = getTransformOrigin(arrow22)[placement];
  const { floating } = elements;
  floating.style.setProperty(cssVars.transformOrigin.variable, transformOrigin);
  return { data: { transformOrigin } };
} };
var rectMiddleware = { name: "rects", fn({ rects }) {
  return { data: rects };
} };
var shiftArrowMiddleware = (arrowEl) => {
  if (!arrowEl) return;
  return { name: "shiftArrow", fn({ placement, middlewareData }) {
    if (!middlewareData.arrow) return {};
    const { x, y } = middlewareData.arrow;
    const dir = placement.split("-")[0];
    Object.assign(arrowEl.style, { left: x != null ? `${x}px` : "", top: y != null ? `${y}px` : "", [dir]: `calc(100% + ${cssVars.arrowOffset.reference})` });
    return {};
  } };
};
function getPlacementDetails(placement) {
  const [side, align] = placement.split("-");
  return { side, align, hasAlign: align != null };
}
function getPlacementSide(placement) {
  return placement.split("-")[0];
}
var defaultOptions = { strategy: "absolute", placement: "bottom", listeners: true, gutter: 8, flip: true, slide: true, overlap: false, sameWidth: false, fitViewport: false, overflowPadding: 8, arrowPadding: 4 };
function roundByDpr(win, value) {
  const dpr = win.devicePixelRatio || 1;
  return Math.round(value * dpr) / dpr;
}
function getBoundaryMiddleware(opts) {
  return runIfFn(opts.boundary);
}
function getArrowMiddleware(arrowElement, opts) {
  if (!arrowElement) return;
  return arrow2({ element: arrowElement, padding: opts.arrowPadding });
}
function getOffsetMiddleware(arrowElement, opts) {
  if (isNull(opts.offset ?? opts.gutter)) return;
  return offset2(({ placement }) => {
    const arrowOffset = (arrowElement?.clientHeight || 0) / 2;
    const gutter = opts.offset?.mainAxis ?? opts.gutter;
    const mainAxis = typeof gutter === "number" ? gutter + arrowOffset : gutter ?? arrowOffset;
    const { hasAlign } = getPlacementDetails(placement);
    const shift22 = !hasAlign ? opts.shift : void 0;
    const crossAxis = opts.offset?.crossAxis ?? shift22;
    return compact({ crossAxis, mainAxis, alignmentAxis: opts.shift });
  });
}
function getFlipMiddleware(opts) {
  if (!opts.flip) return;
  return flip2({ boundary: getBoundaryMiddleware(opts), padding: opts.overflowPadding, fallbackPlacements: opts.flip === true ? void 0 : opts.flip });
}
function getShiftMiddleware(opts) {
  if (!opts.slide && !opts.overlap) return;
  return shift2({ boundary: getBoundaryMiddleware(opts), mainAxis: opts.slide, crossAxis: opts.overlap, padding: opts.overflowPadding, limiter: limitShift2() });
}
function getSizeMiddleware(opts) {
  return size2({ padding: opts.overflowPadding, apply({ elements, rects, availableHeight, availableWidth }) {
    const floating = elements.floating;
    const referenceWidth = Math.round(rects.reference.width);
    availableWidth = Math.floor(availableWidth);
    availableHeight = Math.floor(availableHeight);
    floating.style.setProperty("--reference-width", `${referenceWidth}px`);
    floating.style.setProperty("--available-width", `${availableWidth}px`);
    floating.style.setProperty("--available-height", `${availableHeight}px`);
  } });
}
function getAutoUpdateOptions(opts) {
  if (!opts) return {};
  if (opts === true) {
    return { ancestorResize: true, ancestorScroll: true, elementResize: true, layoutShift: true };
  }
  return opts;
}
function getPlacementImpl(referenceOrVirtual, floating, opts = {}) {
  const reference = getAnchorElement(referenceOrVirtual, opts.getAnchorRect);
  if (!floating || !reference) return;
  const options = Object.assign({}, defaultOptions, opts);
  const arrowEl = floating.querySelector("[data-part=arrow]");
  const middleware = [getOffsetMiddleware(arrowEl, options), getFlipMiddleware(options), getShiftMiddleware(options), getArrowMiddleware(arrowEl, options), shiftArrowMiddleware(arrowEl), transformOriginMiddleware, getSizeMiddleware(options), rectMiddleware];
  const { placement, strategy, onComplete, onPositioned } = options;
  const updatePosition = async () => {
    if (!reference || !floating) return;
    const pos = await computePosition2(reference, floating, { placement, middleware, strategy });
    onComplete?.(pos);
    onPositioned?.({ placed: true });
    const win = getWindow(floating);
    const x = roundByDpr(win, pos.x);
    const y = roundByDpr(win, pos.y);
    floating.style.setProperty("--x", `${x}px`);
    floating.style.setProperty("--y", `${y}px`);
    const contentEl = floating.firstElementChild;
    if (contentEl) {
      const zIndex = win.getComputedStyle(contentEl).zIndex;
      floating.style.setProperty("--z-index", zIndex);
    }
  };
  const update = async () => {
    if (opts.updatePosition) {
      await opts.updatePosition({ updatePosition });
      onPositioned?.({ placed: true });
    } else {
      await updatePosition();
    }
  };
  const autoUpdateOptions = getAutoUpdateOptions(options.listeners);
  const cancelAutoUpdate = options.listeners ? autoUpdate(reference, floating, update, autoUpdateOptions) : noop;
  update();
  return () => {
    cancelAutoUpdate?.();
    onPositioned?.({ placed: false });
  };
}
function getPlacement(referenceOrFn, floatingOrFn, opts = {}) {
  const { defer, ...options } = opts;
  const func = defer ? raf : (v) => v();
  const cleanups2 = [];
  cleanups2.push(func(() => {
    const reference = typeof referenceOrFn === "function" ? referenceOrFn() : referenceOrFn;
    const floating = typeof floatingOrFn === "function" ? floatingOrFn() : floatingOrFn;
    cleanups2.push(getPlacementImpl(reference, floating, options));
  }));
  return () => {
    cleanups2.forEach((fn) => fn?.());
  };
}
var ARROW_FLOATING_STYLE = { bottom: "rotate(45deg)", left: "rotate(135deg)", top: "rotate(225deg)", right: "rotate(315deg)" };
function getPlacementStyles(options = {}) {
  const { placement, sameWidth, fitViewport, strategy = "absolute" } = options;
  return { arrow: { position: "absolute", width: cssVars.arrowSize.reference, height: cssVars.arrowSize.reference, [cssVars.arrowSizeHalf.variable]: `calc(${cssVars.arrowSize.reference} / 2)`, [cssVars.arrowOffset.variable]: `calc(${cssVars.arrowSizeHalf.reference} * -1)` }, arrowTip: { transform: placement ? ARROW_FLOATING_STYLE[placement.split("-")[0]] : void 0, background: cssVars.arrowBg.reference, top: "0", left: "0", width: "100%", height: "100%", position: "absolute", zIndex: "inherit" }, floating: { position: strategy, isolation: "isolate", minWidth: sameWidth ? void 0 : "max-content", width: sameWidth ? "var(--reference-width)" : void 0, maxWidth: fitViewport ? "var(--available-width)" : void 0, maxHeight: fitViewport ? "var(--available-height)" : void 0, top: "0px", left: "0px", transform: placement ? "translate3d(var(--x), var(--y), 0)" : "translate3d(0, -100vh, 0)", zIndex: "var(--z-index)" } };
}

// node_modules/@zag-js/interact-outside/dist/index.mjs
function getWindowFrames(win) {
  const frames = { each(cb) {
    for (let i = 0; i < win.frames?.length; i += 1) {
      const frame = win.frames[i];
      if (frame) cb(frame);
    }
  }, addEventListener(event, listener, options) {
    frames.each((frame) => {
      try {
        frame.document.addEventListener(event, listener, options);
      } catch {
      }
    });
    return () => {
      try {
        frames.removeEventListener(event, listener, options);
      } catch {
      }
    };
  }, removeEventListener(event, listener, options) {
    frames.each((frame) => {
      try {
        frame.document.removeEventListener(event, listener, options);
      } catch {
      }
    });
  } };
  return frames;
}
var POINTER_OUTSIDE_EVENT = "pointerdown.outside";
var FOCUS_OUTSIDE_EVENT = "focus.outside";
function isComposedPathFocusable(composedPath) {
  for (const node of composedPath) {
    if (isHTMLElement(node) && isFocusable(node)) return true;
  }
  return false;
}
var isPointerEvent = (event) => "clientY" in event;
function isEventPointWithin(node, event) {
  if (!isPointerEvent(event) || !node) return false;
  const rect = node.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return false;
  return rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
}
function isEventWithinScrollbar(event) {
  const target = getEventTarget(event);
  if (!target || !isPointerEvent(event)) return false;
  const isScrollableY = target.scrollHeight > target.clientHeight;
  const onScrollbarY = isScrollableY && event.clientX > target.clientWidth;
  const isScrollableX = target.scrollWidth > target.clientWidth;
  const onScrollbarX = isScrollableX && event.clientY > target.clientHeight;
  return onScrollbarY || onScrollbarX;
}
function trackInteractOutsideImpl(node, options) {
  const { exclude, onFocusOutside, onPointerDownOutside, onInteractOutside, defer } = options;
  if (!node) return;
  const doc = getDocument(node);
  const win = getWindow(node);
  const frames = getWindowFrames(win);
  function isEventOutside(event) {
    const target = getEventTarget(event);
    if (!isHTMLElement(target)) return false;
    if (contains(node, target)) return false;
    if (isEventPointWithin(node, event)) return false;
    if (isEventWithinScrollbar(event)) return false;
    return !exclude?.(target);
  }
  let clickHandler;
  function onPointerDown(event) {
    function handler() {
      const func = defer ? raf : (v) => v();
      const composedPath = event.composedPath?.() ?? [event.target];
      func(() => {
        if (!node || !isEventOutside(event)) return;
        if (onPointerDownOutside || onInteractOutside) {
          const handler2 = callAll(onPointerDownOutside, onInteractOutside);
          node.addEventListener(POINTER_OUTSIDE_EVENT, handler2, { once: true });
        }
        fireCustomEvent(node, POINTER_OUTSIDE_EVENT, { bubbles: false, cancelable: true, detail: { originalEvent: event, contextmenu: isContextMenuEvent(event), focusable: isComposedPathFocusable(composedPath) } });
      });
    }
    if (event.pointerType === "touch") {
      frames.removeEventListener("click", handler);
      doc.removeEventListener("click", handler);
      clickHandler = handler;
      doc.addEventListener("click", handler, { once: true });
      frames.addEventListener("click", handler, { once: true });
    } else {
      handler();
    }
  }
  const cleanups2 = /* @__PURE__ */ new Set();
  const timer = setTimeout(() => {
    cleanups2.add(frames.addEventListener("pointerdown", onPointerDown, true));
    cleanups2.add(addDomEvent(doc, "pointerdown", onPointerDown, true));
  }, 0);
  function onFocusin(event) {
    const func = defer ? raf : (v) => v();
    func(() => {
      if (!node || !isEventOutside(event)) return;
      if (onFocusOutside || onInteractOutside) {
        const handler = callAll(onFocusOutside, onInteractOutside);
        node.addEventListener(FOCUS_OUTSIDE_EVENT, handler, { once: true });
      }
      fireCustomEvent(node, FOCUS_OUTSIDE_EVENT, { bubbles: false, cancelable: true, detail: { originalEvent: event, contextmenu: false, focusable: isFocusable(getEventTarget(event)) } });
    });
  }
  cleanups2.add(addDomEvent(doc, "focusin", onFocusin, true));
  cleanups2.add(frames.addEventListener("focusin", onFocusin, true));
  return () => {
    clearTimeout(timer);
    if (clickHandler) {
      frames.removeEventListener("click", clickHandler);
      doc.removeEventListener("click", clickHandler);
    }
    cleanups2.forEach((fn) => fn());
  };
}
function trackInteractOutside(nodeOrFn, options) {
  const { defer } = options;
  const func = defer ? raf : (v) => v();
  const cleanups2 = [];
  cleanups2.push(func(() => {
    const node = typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn;
    cleanups2.push(trackInteractOutsideImpl(node, options));
  }));
  return () => {
    cleanups2.forEach((fn) => fn?.());
  };
}

// node_modules/@zag-js/dismissable/dist/index.mjs
function trackEscapeKeydown(node, fn) {
  const handleKeyDown = (event) => {
    if (event.key !== "Escape") return;
    if (event.isComposing) return;
    fn?.(event);
  };
  return addDomEvent(getDocument(node), "keydown", handleKeyDown, { capture: true });
}
var layerStack = { layers: [], branches: [], count() {
  return this.layers.length;
}, pointerBlockingLayers() {
  return this.layers.filter((layer) => layer.pointerBlocking);
}, topMostPointerBlockingLayer() {
  return [...this.pointerBlockingLayers()].slice(-1)[0];
}, hasPointerBlockingLayer() {
  return this.pointerBlockingLayers().length > 0;
}, isBelowPointerBlockingLayer(node) {
  const index = this.indexOf(node);
  const highestBlockingIndex = this.topMostPointerBlockingLayer() ? this.indexOf(this.topMostPointerBlockingLayer()?.node) : -1;
  return index < highestBlockingIndex;
}, isTopMost(node) {
  const layer = this.layers[this.count() - 1];
  return layer?.node === node;
}, getNestedLayers(node) {
  return Array.from(this.layers).slice(this.indexOf(node) + 1);
}, isInNestedLayer(node, target) {
  return this.getNestedLayers(node).some((layer) => contains(layer.node, target));
}, isInBranch(target) {
  return Array.from(this.branches).some((branch) => contains(branch, target));
}, add(layer) {
  const num = this.layers.push(layer);
  layer.node.style.setProperty("--layer-index", `${num}`);
}, addBranch(node) {
  this.branches.push(node);
}, remove(node) {
  const index = this.indexOf(node);
  if (index < 0) return;
  if (index < this.count() - 1) {
    const _layers = this.getNestedLayers(node);
    _layers.forEach((layer) => layer.dismiss());
  }
  this.layers.splice(index, 1);
  node.style.removeProperty("--layer-index");
}, removeBranch(node) {
  const index = this.branches.indexOf(node);
  if (index >= 0) this.branches.splice(index, 1);
}, indexOf(node) {
  return this.layers.findIndex((layer) => layer.node === node);
}, dismiss(node) {
  this.layers[this.indexOf(node)]?.dismiss();
}, clear() {
  this.remove(this.layers[0].node);
} };
var originalBodyPointerEvents;
function assignPointerEventToLayers() {
  layerStack.layers.forEach(({ node }) => {
    node.style.pointerEvents = layerStack.isBelowPointerBlockingLayer(node) ? "none" : "auto";
  });
}
function clearPointerEvent(node) {
  node.style.pointerEvents = "";
}
function disablePointerEventsOutside(node, peristentElements) {
  const doc = getDocument(node);
  const cleanups2 = [];
  if (layerStack.hasPointerBlockingLayer() && !doc.body.hasAttribute("data-inert")) {
    originalBodyPointerEvents = document.body.style.pointerEvents;
    queueMicrotask(() => {
      doc.body.style.pointerEvents = "none";
      doc.body.setAttribute("data-inert", "");
    });
  }
  if (peristentElements) {
    const persistedCleanup = waitForElements(peristentElements, (el) => {
      cleanups2.push(setStyle(el, { pointerEvents: "auto" }));
    });
    cleanups2.push(persistedCleanup);
  }
  return () => {
    if (layerStack.hasPointerBlockingLayer()) return;
    queueMicrotask(() => {
      doc.body.style.pointerEvents = originalBodyPointerEvents;
      doc.body.removeAttribute("data-inert");
      if (doc.body.style.length === 0) doc.body.removeAttribute("style");
    });
    cleanups2.forEach((fn) => fn());
  };
}
function trackDismissableElementImpl(node, options) {
  if (!node) {
    warn("[@zag-js/dismissable] node is `null` or `undefined`");
    return;
  }
  const { onDismiss, pointerBlocking, exclude: excludeContainers, debug } = options;
  const layer = { dismiss: onDismiss, node, pointerBlocking };
  layerStack.add(layer);
  assignPointerEventToLayers();
  function onPointerDownOutside(event) {
    const target = getEventTarget(event.detail.originalEvent);
    if (layerStack.isBelowPointerBlockingLayer(node) || layerStack.isInBranch(target)) return;
    options.onPointerDownOutside?.(event);
    options.onInteractOutside?.(event);
    if (event.defaultPrevented) return;
    if (debug) {
      console.log("onPointerDownOutside:", event.detail.originalEvent);
    }
    onDismiss?.();
  }
  function onFocusOutside(event) {
    const target = getEventTarget(event.detail.originalEvent);
    if (layerStack.isInBranch(target)) return;
    options.onFocusOutside?.(event);
    options.onInteractOutside?.(event);
    if (event.defaultPrevented) return;
    if (debug) {
      console.log("onFocusOutside:", event.detail.originalEvent);
    }
    onDismiss?.();
  }
  function onEscapeKeyDown(event) {
    if (!layerStack.isTopMost(node)) return;
    options.onEscapeKeyDown?.(event);
    if (!event.defaultPrevented && onDismiss) {
      event.preventDefault();
      onDismiss();
    }
  }
  function exclude(target) {
    if (!node) return false;
    const containers = typeof excludeContainers === "function" ? excludeContainers() : excludeContainers;
    const _containers = Array.isArray(containers) ? containers : [containers];
    const persistentElements = options.persistentElements?.map((fn) => fn()).filter(isHTMLElement);
    if (persistentElements) _containers.push(...persistentElements);
    return _containers.some((node2) => contains(node2, target)) || layerStack.isInNestedLayer(node, target);
  }
  const cleanups2 = [pointerBlocking ? disablePointerEventsOutside(node, options.persistentElements) : void 0, trackEscapeKeydown(node, onEscapeKeyDown), trackInteractOutside(node, { exclude, onFocusOutside, onPointerDownOutside, defer: options.defer })];
  return () => {
    layerStack.remove(node);
    assignPointerEventToLayers();
    clearPointerEvent(node);
    cleanups2.forEach((fn) => fn?.());
  };
}
function trackDismissableElement(nodeOrFn, options) {
  const { defer } = options;
  const func = defer ? raf : (v) => v();
  const cleanups2 = [];
  cleanups2.push(func(() => {
    const node = isFunction(nodeOrFn) ? nodeOrFn() : nodeOrFn;
    cleanups2.push(trackDismissableElementImpl(node, options));
  }));
  return () => {
    cleanups2.forEach((fn) => fn?.());
  };
}

// node_modules/@zag-js/rect-utils/dist/index.mjs
var createPoint = (x, y) => ({ x, y });
function createRect(r) {
  const { x, y, width, height } = r;
  const midX = x + width / 2;
  const midY = y + height / 2;
  return { x, y, width, height, minX: x, minY: y, maxX: x + width, maxY: y + height, midX, midY, center: createPoint(midX, midY) };
}
function getRectCorners(v) {
  const top = createPoint(v.minX, v.minY);
  const right = createPoint(v.maxX, v.minY);
  const bottom = createPoint(v.maxX, v.maxY);
  const left = createPoint(v.minX, v.maxY);
  return { top, right, bottom, left };
}
var { min: min2, max: max2 } = Math;
function getElementPolygon(rectValue, placement) {
  const rect = createRect(rectValue);
  const { top, right, left, bottom } = getRectCorners(rect);
  const [base] = placement.split("-");
  return { top: [left, top, right, bottom], right: [top, right, bottom, left], bottom: [top, left, bottom, right], left: [right, top, left, bottom] }[base];
}
function isPointInPolygon(polygon, point) {
  const { x, y } = point;
  let c = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) {
      c = !c;
    }
  }
  return c;
}
var { sign, abs, min: min22 } = Math;

// node_modules/@zag-js/menu/dist/index.mjs
var anatomy2 = createAnatomy("menu").parts("arrow", "arrowTip", "content", "contextTrigger", "indicator", "item", "itemGroup", "itemGroupLabel", "itemIndicator", "itemText", "positioner", "separator", "trigger", "triggerItem");
var parts2 = anatomy2.build();
var dom2 = createScope({ getTriggerId: (ctx) => ctx.ids?.trigger ?? `menu:${ctx.id}:trigger`, getContextTriggerId: (ctx) => ctx.ids?.contextTrigger ?? `menu:${ctx.id}:ctx-trigger`, getContentId: (ctx) => ctx.ids?.content ?? `menu:${ctx.id}:content`, getArrowId: (ctx) => ctx.ids?.arrow ?? `menu:${ctx.id}:arrow`, getPositionerId: (ctx) => ctx.ids?.positioner ?? `menu:${ctx.id}:popper`, getGroupId: (ctx, id) => ctx.ids?.group?.(id) ?? `menu:${ctx.id}:group:${id}`, getGroupLabelId: (ctx, id) => ctx.ids?.label?.(id) ?? `menu:${ctx.id}:label:${id}`, getContentEl: (ctx) => dom2.getById(ctx, dom2.getContentId(ctx)), getPositionerEl: (ctx) => dom2.getById(ctx, dom2.getPositionerId(ctx)), getTriggerEl: (ctx) => dom2.getById(ctx, dom2.getTriggerId(ctx)), getHighlightedItemEl: (ctx) => ctx.highlightedValue ? dom2.getById(ctx, ctx.highlightedValue) : null, getArrowEl: (ctx) => dom2.getById(ctx, dom2.getArrowId(ctx)), getElements: (ctx) => {
  const ownerId = CSS.escape(dom2.getContentId(ctx));
  const selector = `[role^="menuitem"][data-ownedby=${ownerId}]:not([data-disabled])`;
  return queryAll(dom2.getContentEl(ctx), selector);
}, getFirstEl: (ctx) => first(dom2.getElements(ctx)), getLastEl: (ctx) => last(dom2.getElements(ctx)), getNextEl: (ctx, loop) => nextById(dom2.getElements(ctx), ctx.highlightedValue, loop ?? ctx.loopFocus), getPrevEl: (ctx, loop) => prevById(dom2.getElements(ctx), ctx.highlightedValue, loop ?? ctx.loopFocus), getElemByKey: (ctx, key) => getByTypeahead(dom2.getElements(ctx), { state: ctx.typeaheadState, key, activeId: ctx.highlightedValue }), isTargetDisabled: (v) => {
  return isHTMLElement(v) && (v.dataset.disabled === "" || v.hasAttribute("disabled"));
}, isTriggerItem: (el) => {
  return !!el?.getAttribute("role")?.startsWith("menuitem") && !!el?.hasAttribute("aria-controls");
}, getOptionFromItemEl(el) {
  return { id: el.id, name: el.dataset.name, value: el.dataset.value, valueText: el.dataset.valueText, type: el.dataset.type };
} });
function connect2(state, send, normalize) {
  const isSubmenu = state.context.isSubmenu;
  const isTypingAhead = state.context.isTypingAhead;
  const composite = state.context.composite;
  const open = state.hasTag("open");
  const popperStyles = getPlacementStyles({ ...state.context.positioning, placement: state.context.anchorPoint ? "bottom" : state.context.currentPlacement });
  function getItemState(props22) {
    return { disabled: !!props22.disabled, highlighted: state.context.highlightedValue === props22.value };
  }
  function getOptionItemProps(props22) {
    const valueText = props22.valueText ?? props22.value;
    return { ...props22, id: props22.value, valueText };
  }
  function getOptionItemState(props22) {
    const itemState = getItemState(getOptionItemProps(props22));
    return { ...itemState, checked: !!props22.checked };
  }
  function getItemProps(props22) {
    const { value: id, closeOnSelect, valueText } = props22;
    const itemState = getItemState(props22);
    return normalize.element({ ...parts2.item.attrs, id, role: "menuitem", "aria-disabled": itemState.disabled, "data-disabled": dataAttr(itemState.disabled), "data-ownedby": dom2.getContentId(state.context), "data-highlighted": dataAttr(itemState.highlighted), "data-valuetext": valueText, onDragStart(event) {
      const isLink = event.currentTarget.matches("a[href]");
      if (isLink) event.preventDefault();
    }, onPointerMove(event) {
      if (itemState.disabled) return;
      if (event.pointerType !== "mouse") return;
      const target = event.currentTarget;
      if (itemState.highlighted) return;
      send({ type: "ITEM_POINTERMOVE", id, target, closeOnSelect });
    }, onPointerLeave(event) {
      if (itemState.disabled) return;
      if (event.pointerType !== "mouse") return;
      const mouseMoved = state.previousEvent.type.includes("POINTER");
      if (!mouseMoved) return;
      const target = event.currentTarget;
      send({ type: "ITEM_POINTERLEAVE", id, target, closeOnSelect });
    }, onPointerDown(event) {
      if (itemState.disabled) return;
      const target = event.currentTarget;
      send({ type: "ITEM_POINTERDOWN", target, id, closeOnSelect });
    }, onPointerUp(event) {
      if (isDownloadingEvent(event)) return;
      if (isOpeningInNewTab(event)) return;
      if (itemState.disabled) return;
      if (!isLeftClick(event)) return;
      const target = event.currentTarget;
      send({ type: "ITEM_CLICK", src: "pointerup", target, id, closeOnSelect });
      if (event.pointerType === "touch") clickIfLink(target);
    }, onTouchEnd(event) {
      event.preventDefault();
      event.stopPropagation();
    } });
  }
  return { highlightedValue: state.context.highlightedValue, open, setOpen(nextOpen) {
    if (nextOpen === open) return;
    send(nextOpen ? "OPEN" : "CLOSE");
  }, setHighlightedValue(value) {
    send({ type: "HIGHLIGHTED.SET", id: value });
  }, setParent(parent) {
    send({ type: "PARENT.SET", value: parent, id: parent.state.context.id });
  }, setChild(child) {
    send({ type: "CHILD.SET", value: child, id: child.state.context.id });
  }, reposition(options = {}) {
    send({ type: "POSITIONING.SET", options });
  }, contextTriggerProps: normalize.element({ ...parts2.contextTrigger.attrs, dir: state.context.dir, id: dom2.getContextTriggerId(state.context), onPointerDown(event) {
    if (event.pointerType === "mouse") return;
    const evt = getNativeEvent(event);
    const point = getEventPoint(evt);
    send({ type: "CONTEXT_MENU_START", point });
  }, onPointerCancel(event) {
    if (event.pointerType === "mouse") return;
    send("CONTEXT_MENU_CANCEL");
  }, onPointerMove(event) {
    if (event.pointerType === "mouse") return;
    send("CONTEXT_MENU_CANCEL");
  }, onPointerUp(event) {
    if (event.pointerType === "mouse") return;
    send("CONTEXT_MENU_CANCEL");
  }, onContextMenu(event) {
    const evt = getNativeEvent(event);
    const point = getEventPoint(evt);
    send({ type: "CONTEXT_MENU", point });
    event.preventDefault();
  }, style: { WebkitTouchCallout: "none", userSelect: "none" } }), getTriggerItemProps(childApi) {
    return mergeProps(getItemProps({ value: childApi.triggerProps.id }), childApi.triggerProps);
  }, triggerProps: normalize.button({ ...isSubmenu ? parts2.triggerItem.attrs : parts2.trigger.attrs, "data-placement": state.context.currentPlacement, type: "button", dir: state.context.dir, id: dom2.getTriggerId(state.context), "data-uid": state.context.id, "aria-haspopup": composite ? "menu" : "dialog", "aria-controls": dom2.getContentId(state.context), "aria-expanded": open || void 0, "data-state": open ? "open" : "closed", onPointerMove(event) {
    if (event.pointerType !== "mouse") return;
    const disabled = dom2.isTargetDisabled(event.currentTarget);
    if (disabled || !isSubmenu) return;
    send({ type: "TRIGGER_POINTERMOVE", target: event.currentTarget });
  }, onPointerLeave(event) {
    if (event.pointerType !== "mouse") return;
    const evt = getNativeEvent(event);
    const disabled = dom2.isTargetDisabled(event.currentTarget);
    if (disabled || !isSubmenu) return;
    const point = getEventPoint(evt);
    send({ type: "TRIGGER_POINTERLEAVE", target: event.currentTarget, point });
  }, onClick(event) {
    if (dom2.isTriggerItem(event.currentTarget)) {
      send({ type: "TRIGGER_CLICK", target: event.currentTarget });
    }
  }, onPointerDown(event) {
    const disabled = dom2.isTargetDisabled(event.currentTarget);
    const evt = getNativeEvent(event);
    if (!isLeftClick(evt) || disabled || isContextMenuEvent(event)) return;
    event.preventDefault();
    if (!dom2.isTriggerItem(event.currentTarget)) {
      send({ type: "TRIGGER_CLICK", target: event.currentTarget });
    }
  }, onBlur() {
    send("TRIGGER_BLUR");
  }, onFocus() {
    send("TRIGGER_FOCUS");
  }, onKeyDown(event) {
    if (event.defaultPrevented) return;
    const keyMap2 = { ArrowDown() {
      send("ARROW_DOWN");
    }, ArrowUp() {
      send("ARROW_UP");
    }, Enter() {
      send({ type: "ARROW_DOWN", src: "enter" });
    }, Space() {
      send({ type: "ARROW_DOWN", src: "space" });
    } };
    const key = getEventKey(event, state.context);
    const exec2 = keyMap2[key];
    if (exec2) {
      event.preventDefault();
      exec2(event);
    }
  } }), indicatorProps: normalize.element({ ...parts2.indicator.attrs, dir: state.context.dir, "data-state": open ? "open" : "closed" }), positionerProps: normalize.element({ ...parts2.positioner.attrs, dir: state.context.dir, id: dom2.getPositionerId(state.context), style: popperStyles.floating }), arrowProps: normalize.element({ id: dom2.getArrowId(state.context), ...parts2.arrow.attrs, dir: state.context.dir, style: popperStyles.arrow }), arrowTipProps: normalize.element({ ...parts2.arrowTip.attrs, dir: state.context.dir, style: popperStyles.arrowTip }), contentProps: normalize.element({ ...parts2.content.attrs, id: dom2.getContentId(state.context), "aria-label": state.context["aria-label"], hidden: !open, "data-state": open ? "open" : "closed", role: composite ? "menu" : "dialog", tabIndex: 0, dir: state.context.dir, "aria-activedescendant": state.context.highlightedValue ?? void 0, "aria-labelledby": dom2.getTriggerId(state.context), "data-placement": state.context.currentPlacement, onPointerEnter(event) {
    if (event.pointerType !== "mouse") return;
    send("MENU_POINTERENTER");
  }, onKeyDown(event) {
    if (event.defaultPrevented) return;
    const evt = getNativeEvent(event);
    if (!isSelfTarget(evt)) return;
    const target = getEventTarget(evt);
    const sameMenu = target?.closest("[role=menu]") === event.currentTarget || target === event.currentTarget;
    if (!sameMenu) return;
    if (event.key === "Tab") {
      const valid = isValidTabEvent(event);
      if (!valid) {
        event.preventDefault();
        return;
      }
    }
    const item = dom2.getHighlightedItemEl(state.context);
    const keyMap2 = { ArrowDown() {
      send("ARROW_DOWN");
    }, ArrowUp() {
      send("ARROW_UP");
    }, ArrowLeft() {
      send("ARROW_LEFT");
    }, ArrowRight() {
      send("ARROW_RIGHT");
    }, Enter() {
      send("ENTER");
      clickIfLink(item);
    }, Space(event2) {
      if (isTypingAhead) {
        send({ type: "TYPEAHEAD", key: event2.key });
      } else {
        keyMap2.Enter?.(event2);
      }
    }, Home() {
      send("HOME");
    }, End() {
      send("END");
    } };
    const key = getEventKey(event, { dir: state.context.dir });
    const exec2 = keyMap2[key];
    if (exec2) {
      exec2(event);
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    if (!state.context.typeahead) return;
    if (!isPrintableKey(event)) return;
    if (isModifierKey(event)) return;
    if (isEditableElement(target)) return;
    send({ type: "TYPEAHEAD", key: event.key });
    event.preventDefault();
  } }), separatorProps: normalize.element({ ...parts2.separator.attrs, role: "separator", dir: state.context.dir, "aria-orientation": "horizontal" }), getItemState, getItemProps, getOptionItemState, getOptionItemProps(props22) {
    const { type, disabled, onCheckedChange, closeOnSelect } = props22;
    const option = getOptionItemProps(props22);
    const itemState = getOptionItemState(props22);
    return { ...getItemProps(option), ...normalize.element({ "data-type": type, ...parts2.item.attrs, dir: state.context.dir, "data-value": option.value, role: `menuitem${type}`, "aria-checked": !!itemState.checked, "data-state": itemState.checked ? "checked" : "unchecked", onPointerUp(event) {
      if (!isLeftClick(event) || disabled) return;
      if (isDownloadingEvent(event)) return;
      if (isOpeningInNewTab(event)) return;
      const target = event.currentTarget;
      send({ type: "ITEM_CLICK", src: "pointerup", target, option, closeOnSelect });
      onCheckedChange?.(!itemState.checked);
    } }) };
  }, getItemIndicatorProps(props22) {
    const itemState = getOptionItemState(props22);
    return normalize.element({ ...parts2.itemIndicator.attrs, dir: state.context.dir, "data-disabled": dataAttr(itemState.disabled), "data-highlighted": dataAttr(itemState.highlighted), "data-state": itemState.checked ? "checked" : "unchecked", hidden: !itemState.checked });
  }, getItemTextProps(props22) {
    const itemState = getOptionItemState(props22);
    return normalize.element({ ...parts2.itemText.attrs, dir: state.context.dir, "data-disabled": dataAttr(itemState.disabled), "data-highlighted": dataAttr(itemState.highlighted), "data-state": itemState.checked ? "checked" : "unchecked" });
  }, getItemGroupLabelProps(props22) {
    return normalize.element({ id: dom2.getGroupLabelId(state.context, props22.htmlFor), dir: state.context.dir, ...parts2.itemGroupLabel.attrs });
  }, getItemGroupProps(props22) {
    return normalize.element({ id: dom2.getGroupId(state.context, props22.id), ...parts2.itemGroup.attrs, dir: state.context.dir, "aria-labelledby": dom2.getGroupLabelId(state.context, props22.id), role: "group" });
  } };
}
var { not: not3, and: and3, or: or2 } = guards;
function machine2(userContext) {
  const ctx = compact(userContext);
  return createMachine({ id: "menu", initial: ctx.open ? "open" : "idle", context: { highlightedValue: null, loopFocus: false, anchorPoint: null, closeOnSelect: true, typeahead: true, composite: true, ...ctx, positioning: { placement: "bottom-start", gutter: 8, ...ctx.positioning }, intentPolygon: null, parent: null, lastHighlightedValue: null, children: cast(ref({})), suspendPointer: false, restoreFocus: true, typeaheadState: getByTypeahead.defaultOptions }, computed: { isSubmenu: (ctx2) => ctx2.parent !== null, isRtl: (ctx2) => ctx2.dir === "rtl", isTypingAhead: (ctx2) => ctx2.typeaheadState.keysSoFar !== "" }, watch: { isSubmenu: "setSubmenuPlacement", anchorPoint: "reposition", open: "toggleVisibility" }, on: { "PARENT.SET": { actions: "setParentMenu" }, "CHILD.SET": { actions: "setChildMenu" }, OPEN: [{ guard: "isOpenControlled", actions: "invokeOnOpen" }, { target: "open", actions: "invokeOnOpen" }], OPEN_AUTOFOCUS: [{ guard: "isOpenControlled", actions: ["invokeOnOpen"] }, { internal: true, target: "open", actions: ["highlightFirstItem", "invokeOnOpen"] }], CLOSE: [{ guard: "isOpenControlled", actions: "invokeOnClose" }, { target: "closed", actions: "invokeOnClose" }], "HIGHLIGHTED.RESTORE": { actions: "restoreHighlightedItem" }, "HIGHLIGHTED.SET": { actions: "setHighlightedItem" } }, states: { idle: { tags: ["closed"], on: { "CONTROLLED.OPEN": "open", "CONTROLLED.CLOSE": "closed", CONTEXT_MENU_START: { target: "opening:contextmenu", actions: "setAnchorPoint" }, CONTEXT_MENU: [{ guard: "isOpenControlled", actions: ["setAnchorPoint", "invokeOnOpen"] }, { target: "open", actions: ["setAnchorPoint", "invokeOnOpen"] }], TRIGGER_CLICK: [{ guard: "isOpenControlled", actions: "invokeOnOpen" }, { target: "open", actions: "invokeOnOpen" }], TRIGGER_FOCUS: { guard: not3("isSubmenu"), target: "closed" }, TRIGGER_POINTERMOVE: { guard: "isSubmenu", target: "opening" } } }, "opening:contextmenu": { tags: ["closed"], after: { LONG_PRESS_DELAY: [{ guard: "isOpenControlled", actions: "invokeOnOpen" }, { target: "open", actions: "invokeOnOpen" }] }, on: { "CONTROLLED.OPEN": "open", "CONTROLLED.CLOSE": "closed", CONTEXT_MENU_CANCEL: [{ guard: "isOpenControlled", actions: "invokeOnClose" }, { target: "closed", actions: "invokeOnClose" }] } }, opening: { tags: ["closed"], after: { SUBMENU_OPEN_DELAY: [{ guard: "isOpenControlled", actions: "invokeOnOpen" }, { target: "open", actions: "invokeOnOpen" }] }, on: { "CONTROLLED.OPEN": "open", "CONTROLLED.CLOSE": "closed", BLUR: [{ guard: "isOpenControlled", actions: "invokeOnClose" }, { target: "closed", actions: "invokeOnClose" }], TRIGGER_POINTERLEAVE: [{ guard: "isOpenControlled", actions: "invokeOnClose" }, { target: "closed", actions: "invokeOnClose" }] } }, closing: { tags: ["open"], activities: ["trackPointerMove", "trackInteractOutside"], after: { SUBMENU_CLOSE_DELAY: [{ guard: "isOpenControlled", actions: ["invokeOnClose"] }, { target: "closed", actions: ["focusParentMenu", "restoreParentHiglightedItem", "invokeOnClose"] }] }, on: { "CONTROLLED.OPEN": "open", "CONTROLLED.CLOSE": { target: "closed", actions: ["focusParentMenu", "restoreParentHiglightedItem"] }, MENU_POINTERENTER: { target: "open", actions: "clearIntentPolygon" }, POINTER_MOVED_AWAY_FROM_SUBMENU: [{ guard: "isOpenControlled", actions: "invokeOnClose" }, { target: "closed", actions: ["focusParentMenu", "restoreParentHiglightedItem"] }] } }, closed: { tags: ["closed"], entry: ["clearHighlightedItem", "focusTrigger", "clearAnchorPoint", "resumePointer"], on: { "CONTROLLED.OPEN": [{ guard: or2("isOpenAutoFocusEvent", "isArrowDownEvent"), target: "open", actions: "highlightFirstItem" }, { guard: "isArrowUpEvent", target: "open", actions: "highlightLastItem" }, { target: "open" }], CONTEXT_MENU_START: { target: "opening:contextmenu", actions: "setAnchorPoint" }, CONTEXT_MENU: [{ guard: "isOpenControlled", actions: ["setAnchorPoint", "invokeOnOpen"] }, { target: "open", actions: ["setAnchorPoint", "invokeOnOpen"] }], TRIGGER_CLICK: [{ guard: "isOpenControlled", actions: "invokeOnOpen" }, { target: "open", actions: "invokeOnOpen" }], TRIGGER_POINTERMOVE: { guard: "isTriggerItem", target: "opening" }, TRIGGER_BLUR: "idle", ARROW_DOWN: [{ guard: "isOpenControlled", actions: "invokeOnOpen" }, { target: "open", actions: ["highlightFirstItem", "invokeOnOpen"] }], ARROW_UP: [{ guard: "isOpenControlled", actions: "invokeOnOpen" }, { target: "open", actions: ["highlightLastItem", "invokeOnOpen"] }] } }, open: { tags: ["open"], activities: ["trackInteractOutside", "trackPositioning", "scrollToHighlightedItem"], entry: ["focusMenu", "resumePointer"], on: { "CONTROLLED.CLOSE": [{ target: "closed", guard: "isArrowLeftEvent", actions: ["focusParentMenu"] }, { target: "closed" }], TRIGGER_CLICK: [{ guard: and3(not3("isTriggerItem"), "isOpenControlled"), actions: "invokeOnClose" }, { guard: not3("isTriggerItem"), target: "closed", actions: "invokeOnClose" }], ARROW_UP: { actions: ["highlightPrevItem", "focusMenu"] }, ARROW_DOWN: { actions: ["highlightNextItem", "focusMenu"] }, ARROW_LEFT: [{ guard: and3("isSubmenu", "isOpenControlled"), actions: "invokeOnClose" }, { guard: "isSubmenu", target: "closed", actions: ["focusParentMenu", "invokeOnClose"] }], HOME: { actions: ["highlightFirstItem", "focusMenu"] }, END: { actions: ["highlightLastItem", "focusMenu"] }, ARROW_RIGHT: { guard: "isTriggerItemHighlighted", actions: "openSubmenu" }, ENTER: [{ guard: "isTriggerItemHighlighted", actions: "openSubmenu" }, { guard: and3("closeOnSelect", "isOpenControlled"), actions: ["clickHighlightedItem", "invokeOnClose"] }, { guard: "closeOnSelect", target: "closed", actions: "clickHighlightedItem" }, { actions: "clickHighlightedItem" }], ITEM_POINTERMOVE: [{ guard: not3("suspendPointer"), actions: ["setHighlightedItem", "focusMenu"] }, { actions: "setLastHighlightedItem" }], ITEM_POINTERLEAVE: { guard: and3(not3("suspendPointer"), not3("isTriggerItem")), actions: "clearHighlightedItem" }, ITEM_CLICK: [{ guard: and3(not3("isTriggerItemHighlighted"), not3("isHighlightedItemEditable"), "closeOnSelect", "isOpenControlled"), actions: ["invokeOnSelect", "setOptionState", "closeRootMenu", "invokeOnClose"] }, { guard: and3(not3("isTriggerItemHighlighted"), not3("isHighlightedItemEditable"), "closeOnSelect"), target: "closed", actions: ["invokeOnSelect", "setOptionState", "closeRootMenu", "invokeOnClose"] }, { guard: and3(not3("isTriggerItemHighlighted"), not3("isHighlightedItemEditable")), actions: ["invokeOnSelect", "setOptionState"] }, { actions: "setHighlightedItem" }], TRIGGER_POINTERLEAVE: { target: "closing", actions: "setIntentPolygon" }, ITEM_POINTERDOWN: { actions: "setHighlightedItem" }, TYPEAHEAD: { actions: "highlightMatchedItem" }, FOCUS_MENU: { actions: "focusMenu" }, "POSITIONING.SET": { actions: "reposition" } } } } }, { delays: { LONG_PRESS_DELAY: 700, SUBMENU_OPEN_DELAY: 100, SUBMENU_CLOSE_DELAY: 100 }, guards: { closeOnSelect: (ctx2, evt) => !!(evt?.closeOnSelect ?? ctx2.closeOnSelect), isTriggerItem: (_ctx, evt) => dom2.isTriggerItem(evt.target), isTriggerItemHighlighted: (ctx2, evt) => {
    const target = evt.target ?? dom2.getHighlightedItemEl(ctx2);
    return !!target?.hasAttribute("aria-controls");
  }, isSubmenu: (ctx2) => ctx2.isSubmenu, suspendPointer: (ctx2) => ctx2.suspendPointer, isHighlightedItemEditable: (ctx2) => isEditableElement(dom2.getHighlightedItemEl(ctx2)), isWithinPolygon: (ctx2, evt) => {
    if (!ctx2.intentPolygon) return false;
    return isPointInPolygon(ctx2.intentPolygon, evt.point);
  }, isOpenControlled: (ctx2) => !!ctx2["open.controlled"], isArrowLeftEvent: (_ctx, evt) => evt.previousEvent?.type === "ARROW_LEFT", isArrowUpEvent: (_ctx, evt) => evt.previousEvent?.type === "ARROW_UP", isArrowDownEvent: (_ctx, evt) => evt.previousEvent?.type === "ARROW_DOWN", isOpenAutoFocusEvent: (_ctx, evt) => evt.previousEvent?.type === "OPEN_AUTOFOCUS" }, activities: { trackPositioning(ctx2) {
    if (ctx2.anchorPoint) return;
    ctx2.currentPlacement = ctx2.positioning.placement;
    const getPositionerEl = () => dom2.getPositionerEl(ctx2);
    return getPlacement(dom2.getTriggerEl(ctx2), getPositionerEl, { ...ctx2.positioning, defer: true, onComplete(data) {
      ctx2.currentPlacement = data.placement;
    } });
  }, trackInteractOutside(ctx2, _evt, { send }) {
    const getContentEl = () => dom2.getContentEl(ctx2);
    return trackDismissableElement(getContentEl, { defer: true, exclude: [dom2.getTriggerEl(ctx2)], onInteractOutside: ctx2.onInteractOutside, onFocusOutside: ctx2.onFocusOutside, onEscapeKeyDown(event) {
      ctx2.onEscapeKeyDown?.(event);
      if (ctx2.isSubmenu) event.preventDefault();
      closeRootMenu(ctx2);
    }, onPointerDownOutside(event) {
      ctx2.restoreFocus = !event.detail.focusable;
      ctx2.onPointerDownOutside?.(event);
    }, onDismiss() {
      send({ type: "CLOSE", src: "interact-outside" });
    } });
  }, trackPointerMove(ctx2, _evt, { guards: guards2, send }) {
    const { isWithinPolygon } = guards2;
    ctx2.parent.state.context.suspendPointer = true;
    const doc = dom2.getDoc(ctx2);
    return addDomEvent(doc, "pointermove", (e) => {
      const point = { x: e.clientX, y: e.clientY };
      const isMovingToSubmenu = isWithinPolygon(ctx2, { point });
      if (!isMovingToSubmenu) {
        send("POINTER_MOVED_AWAY_FROM_SUBMENU");
        ctx2.parent.state.context.suspendPointer = false;
      }
    });
  }, scrollToHighlightedItem(ctx2, _evt, { getState }) {
    const exec2 = () => {
      const state = getState();
      if (state.event.type.startsWith("ITEM_POINTER")) return;
      const itemEl = dom2.getHighlightedItemEl(ctx2);
      const contentEl2 = dom2.getContentEl(ctx2);
      scrollIntoView(itemEl, { rootEl: contentEl2, block: "nearest" });
    };
    raf(() => exec2());
    const contentEl = () => dom2.getContentEl(ctx2);
    return observeAttributes(contentEl, { defer: true, attributes: ["aria-activedescendant"], callback: exec2 });
  } }, actions: { setAnchorPoint(ctx2, evt) {
    ctx2.anchorPoint = evt.point;
  }, clearAnchorPoint(ctx2) {
    ctx2.anchorPoint = null;
  }, setSubmenuPlacement(ctx2) {
    if (!ctx2.isSubmenu) return;
    ctx2.positioning.placement = ctx2.isRtl ? "left-start" : "right-start";
    ctx2.positioning.gutter = 0;
  }, reposition(ctx2, evt) {
    const getPositionerEl = () => dom2.getPositionerEl(ctx2);
    const getAnchorRect = ctx2.anchorPoint ? () => ({ width: 0, height: 0, ...ctx2.anchorPoint }) : void 0;
    getPlacement(dom2.getTriggerEl(ctx2), getPositionerEl, { ...ctx2.positioning, getAnchorRect, ...evt.options ?? {}, listeners: false, onComplete(data) {
      ctx2.currentPlacement = data.placement;
    } });
  }, setOptionState(_ctx, evt) {
    if (!evt.option) return;
    const { checked, onCheckedChange, type } = evt.option;
    if (type === "radio") {
      onCheckedChange?.(true);
    } else if (type === "checkbox") {
      onCheckedChange?.(!checked);
    }
  }, clickHighlightedItem(ctx2, _evt, { send }) {
    const itemEl = dom2.getHighlightedItemEl(ctx2);
    if (!itemEl || itemEl.dataset.disabled) return;
    const option = dom2.getOptionFromItemEl(itemEl);
    send({ type: "ITEM_CLICK", src: "enter", target: itemEl, id: option.id, option, closeOnSelect: ctx2.closeOnSelect });
  }, setIntentPolygon(ctx2, evt) {
    const menu = dom2.getContentEl(ctx2);
    const placement = ctx2.currentPlacement;
    if (!menu || !placement) return;
    const rect = menu.getBoundingClientRect();
    const polygon = getElementPolygon(rect, placement);
    if (!polygon) return;
    const rightSide = getPlacementSide(placement) === "right";
    const bleed = rightSide ? -5 : 5;
    ctx2.intentPolygon = [{ ...evt.point, x: evt.point.x + bleed }, ...polygon];
  }, clearIntentPolygon(ctx2) {
    ctx2.intentPolygon = null;
  }, resumePointer(ctx2) {
    if (!ctx2.parent) return;
    ctx2.parent.state.context.suspendPointer = false;
  }, setHighlightedItem(ctx2, evt) {
    set4.highlighted(ctx2, evt.id);
  }, clearHighlightedItem(ctx2) {
    set4.highlighted(ctx2, null);
  }, focusMenu(ctx2) {
    raf(() => {
      const contentEl = dom2.getContentEl(ctx2);
      if (contains(contentEl, dom2.getActiveElement(ctx2))) return;
      const firstFocusableEl = getFirstTabbable(contentEl, false) || contentEl;
      firstFocusableEl?.focus({ preventScroll: true });
    });
  }, highlightFirstItem(ctx2) {
    const first2 = dom2.getFirstEl(ctx2);
    if (!first2) return;
    set4.highlighted(ctx2, first2.id);
  }, highlightLastItem(ctx2) {
    const last2 = dom2.getLastEl(ctx2);
    if (!last2) return;
    set4.highlighted(ctx2, last2.id);
  }, highlightNextItem(ctx2, evt) {
    const next = dom2.getNextEl(ctx2, evt.loop);
    set4.highlighted(ctx2, next?.id ?? null);
  }, highlightPrevItem(ctx2, evt) {
    const prev = dom2.getPrevEl(ctx2, evt.loop);
    set4.highlighted(ctx2, prev?.id ?? null);
  }, invokeOnSelect(ctx2) {
    if (!ctx2.highlightedValue) return;
    ctx2.onSelect?.({ value: ctx2.highlightedValue });
  }, focusTrigger(ctx2) {
    if (ctx2.isSubmenu || ctx2.anchorPoint || !ctx2.restoreFocus) return;
    raf(() => dom2.getTriggerEl(ctx2)?.focus({ preventScroll: true }));
  }, highlightMatchedItem(ctx2, evt) {
    const node = dom2.getElemByKey(ctx2, evt.key);
    if (!node) return;
    set4.highlighted(ctx2, node.id);
  }, setParentMenu(ctx2, evt) {
    ctx2.parent = ref(evt.value);
  }, setChildMenu(ctx2, evt) {
    ctx2.children[evt.id] = ref(evt.value);
  }, closeRootMenu(ctx2) {
    closeRootMenu(ctx2);
  }, openSubmenu(ctx2) {
    const item = dom2.getHighlightedItemEl(ctx2);
    const id = item?.getAttribute("data-uid");
    const child = id ? ctx2.children[id] : null;
    child?.send("OPEN_AUTOFOCUS");
  }, focusParentMenu(ctx2) {
    ctx2.parent?.send("FOCUS_MENU");
  }, setLastHighlightedItem(ctx2, evt) {
    ctx2.lastHighlightedValue = evt.id;
  }, restoreHighlightedItem(ctx2) {
    if (!ctx2.lastHighlightedValue) return;
    set4.highlighted(ctx2, ctx2.lastHighlightedValue);
    ctx2.lastHighlightedValue = null;
  }, restoreParentHiglightedItem(ctx2) {
    ctx2.parent?.send("HIGHLIGHTED.RESTORE");
  }, invokeOnOpen(ctx2) {
    ctx2.onOpenChange?.({ open: true });
  }, invokeOnClose(ctx2) {
    ctx2.onOpenChange?.({ open: false });
  }, toggleVisibility(ctx2, evt, { send }) {
    send({ type: ctx2.open ? "CONTROLLED.OPEN" : "CONTROLLED.CLOSE", previousEvent: evt });
  } } });
}
function closeRootMenu(ctx) {
  let parent = ctx.parent;
  while (parent && parent.state.context.isSubmenu) {
    parent = parent.state.context.parent;
  }
  parent?.send("CLOSE");
}
var set4 = { highlighted(ctx, value) {
  if (isEqual(ctx.highlightedValue, value)) return;
  ctx.highlightedValue = value;
  ctx.onHighlightChange?.({ highlightedValue: value });
} };
var props2 = createProps()(["anchorPoint", "aria-label", "closeOnSelect", "dir", "getRootNode", "highlightedValue", "id", "ids", "loopFocus", "onFocusOutside", "onInteractOutside", "onOpenChange", "onPointerDownOutside", "onEscapeKeyDown", "onSelect", "onHighlightChange", "open", "open.controlled", "positioning", "typeahead", "composite"]);
var splitProps3 = createSplitProps(props2);
var itemProps2 = createProps()(["closeOnSelect", "disabled", "value", "valueText"]);
var splitItemProps2 = createSplitProps(itemProps2);
var itemGroupLabelProps = createProps()(["htmlFor"]);
var splitItemGroupLabelProps = createSplitProps(itemGroupLabelProps);
var itemGroupProps = createProps()(["id"]);
var splitItemGroupProps = createSplitProps(itemGroupProps);
var optionItemProps = createProps()(["disabled", "valueText", "closeOnSelect", "type", "value", "checked", "onCheckedChange"]);
var splitOptionItemProps = createSplitProps(optionItemProps);

// js/menu.js
var Menu = {
  mounted() {
    this.context = { id: this.el.id };
    this.service = machine2(this.context);
    this.api = connect2(this.service.state, this.service.send, normalizeProps);
    this.init();
  },
  beforeDestroy() {
    this.service.stop();
  },
  init() {
    const service = this.service;
    this.render();
    service.subscribe(() => {
      this.api = connect2(service.state, service.send, normalizeProps);
      this.render();
    });
    service.start();
  },
  labels() {
    return Array.from(this.el.querySelectorAll("[data-part='label']"));
  },
  groups() {
    return Array.from(this.el.querySelectorAll("[data-part='group']"));
  },
  items() {
    return Array.from(this.el.querySelectorAll("[data-part='item']"));
  },
  render() {
    const trigger = this.el.querySelector("[data-part='trigger']");
    const positioner = this.el.querySelector("[data-part='positioner']");
    const content = this.el.querySelector("[data-part='content']");
    if (trigger) spreadProps(trigger, this.api.triggerProps);
    if (positioner) spreadProps(positioner, this.api.positionerProps);
    if (content) spreadProps(content, this.api.contentProps);
    this.labels().forEach((label) => {
      this.renderLabel(label);
    });
    this.groups().forEach((group) => {
      this.renderGroup(group);
    });
    this.items().forEach((item) => {
      this.renderItem(item);
    });
  },
  renderLabel(label) {
    spreadProps(label, this.api.getItemGroupLabelProps({ htmlFor: label.dataset.for }));
  },
  renderGroup(group) {
    spreadProps(group, this.api.getItemGroupProps({ id: group.id }));
  },
  renderItem(item) {
    spreadProps(item, this.api.getItemProps({ value: item.id }));
  }
};

// js/index.js
var Hooks = {
  Accordion,
  Menu
};
//# sourceMappingURL=guillotine.cjs.js.map
