import {
  require_react
} from "./chunk-2CLD7BNN.js";
import {
  __toESM
} from "./chunk-WOOG5QLI.js";

// node_modules/@dnd-kit/utilities/dist/utilities.esm.js
var import_react = __toESM(require_react());
function useCombinedRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }
  return (0, import_react.useMemo)(
    () => (node) => {
      refs.forEach((ref) => ref(node));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}
var canUseDOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function isWindow(element) {
  const elementString = Object.prototype.toString.call(element);
  return elementString === "[object Window]" || // In Electron context the Window object serializes to [object global]
  elementString === "[object global]";
}
function isNode(node) {
  return "nodeType" in node;
}
function getWindow(target) {
  var _target$ownerDocument, _target$ownerDocument2;
  if (!target) {
    return window;
  }
  if (isWindow(target)) {
    return target;
  }
  if (!isNode(target)) {
    return window;
  }
  return (_target$ownerDocument = (_target$ownerDocument2 = target.ownerDocument) == null ? void 0 : _target$ownerDocument2.defaultView) != null ? _target$ownerDocument : window;
}
function isDocument(node) {
  const {
    Document
  } = getWindow(node);
  return node instanceof Document;
}
function isHTMLElement(node) {
  if (isWindow(node)) {
    return false;
  }
  return node instanceof getWindow(node).HTMLElement;
}
function isSVGElement(node) {
  return node instanceof getWindow(node).SVGElement;
}
function getOwnerDocument(target) {
  if (!target) {
    return document;
  }
  if (isWindow(target)) {
    return target.document;
  }
  if (!isNode(target)) {
    return document;
  }
  if (isDocument(target)) {
    return target;
  }
  if (isHTMLElement(target) || isSVGElement(target)) {
    return target.ownerDocument;
  }
  return document;
}
var useIsomorphicLayoutEffect = canUseDOM ? import_react.useLayoutEffect : import_react.useEffect;
function useEvent(handler) {
  const handlerRef = (0, import_react.useRef)(handler);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });
  return (0, import_react.useCallback)(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return handlerRef.current == null ? void 0 : handlerRef.current(...args);
  }, []);
}
function useInterval() {
  const intervalRef = (0, import_react.useRef)(null);
  const set = (0, import_react.useCallback)((listener, duration) => {
    intervalRef.current = setInterval(listener, duration);
  }, []);
  const clear = (0, import_react.useCallback)(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  return [set, clear];
}
function useLatestValue(value, dependencies) {
  if (dependencies === void 0) {
    dependencies = [value];
  }
  const valueRef = (0, import_react.useRef)(value);
  useIsomorphicLayoutEffect(() => {
    if (valueRef.current !== value) {
      valueRef.current = value;
    }
  }, dependencies);
  return valueRef;
}
function useLazyMemo(callback, dependencies) {
  const valueRef = (0, import_react.useRef)();
  return (0, import_react.useMemo)(
    () => {
      const newValue = callback(valueRef.current);
      valueRef.current = newValue;
      return newValue;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...dependencies]
  );
}
function useNodeRef(onChange) {
  const onChangeHandler = useEvent(onChange);
  const node = (0, import_react.useRef)(null);
  const setNodeRef = (0, import_react.useCallback)(
    (element) => {
      if (element !== node.current) {
        onChangeHandler == null ? void 0 : onChangeHandler(element, node.current);
      }
      node.current = element;
    },
    //eslint-disable-next-line
    []
  );
  return [node, setNodeRef];
}
function usePrevious(value) {
  const ref = (0, import_react.useRef)();
  (0, import_react.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
var ids = {};
function useUniqueId(prefix, value) {
  return (0, import_react.useMemo)(() => {
    if (value) {
      return value;
    }
    const id = ids[prefix] == null ? 0 : ids[prefix] + 1;
    ids[prefix] = id;
    return prefix + "-" + id;
  }, [prefix, value]);
}
function createAdjustmentFn(modifier) {
  return function(object) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }
    return adjustments.reduce((accumulator, adjustment) => {
      const entries = Object.entries(adjustment);
      for (const [key, valueAdjustment] of entries) {
        const value = accumulator[key];
        if (value != null) {
          accumulator[key] = value + modifier * valueAdjustment;
        }
      }
      return accumulator;
    }, {
      ...object
    });
  };
}
var add = createAdjustmentFn(1);
var subtract = createAdjustmentFn(-1);
function hasViewportRelativeCoordinates(event) {
  return "clientX" in event && "clientY" in event;
}
function isKeyboardEvent(event) {
  if (!event) {
    return false;
  }
  const {
    KeyboardEvent
  } = getWindow(event.target);
  return KeyboardEvent && event instanceof KeyboardEvent;
}
function isTouchEvent(event) {
  if (!event) {
    return false;
  }
  const {
    TouchEvent
  } = getWindow(event.target);
  return TouchEvent && event instanceof TouchEvent;
}
function getEventCoordinates(event) {
  if (isTouchEvent(event)) {
    if (event.touches && event.touches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.touches[0];
      return {
        x,
        y
      };
    } else if (event.changedTouches && event.changedTouches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.changedTouches[0];
      return {
        x,
        y
      };
    }
  }
  if (hasViewportRelativeCoordinates(event)) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }
  return null;
}
var CSS = Object.freeze({
  Translate: {
    toString(transform) {
      if (!transform) {
        return;
      }
      const {
        x,
        y
      } = transform;
      return "translate3d(" + (x ? Math.round(x) : 0) + "px, " + (y ? Math.round(y) : 0) + "px, 0)";
    }
  },
  Scale: {
    toString(transform) {
      if (!transform) {
        return;
      }
      const {
        scaleX,
        scaleY
      } = transform;
      return "scaleX(" + scaleX + ") scaleY(" + scaleY + ")";
    }
  },
  Transform: {
    toString(transform) {
      if (!transform) {
        return;
      }
      return [CSS.Translate.toString(transform), CSS.Scale.toString(transform)].join(" ");
    }
  },
  Transition: {
    toString(_ref) {
      let {
        property,
        duration,
        easing
      } = _ref;
      return property + " " + duration + "ms " + easing;
    }
  }
});
var SELECTOR = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function findFirstFocusableNode(element) {
  if (element.matches(SELECTOR)) {
    return element;
  }
  return element.querySelector(SELECTOR);
}

export {
  useCombinedRefs,
  canUseDOM,
  isWindow,
  isNode,
  getWindow,
  isDocument,
  isHTMLElement,
  isSVGElement,
  getOwnerDocument,
  useIsomorphicLayoutEffect,
  useEvent,
  useInterval,
  useLatestValue,
  useLazyMemo,
  useNodeRef,
  usePrevious,
  useUniqueId,
  add,
  subtract,
  hasViewportRelativeCoordinates,
  isKeyboardEvent,
  isTouchEvent,
  getEventCoordinates,
  CSS,
  findFirstFocusableNode
};
//# sourceMappingURL=chunk-ROF5JL5R.js.map
