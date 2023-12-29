"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _user = _interopRequireDefault(require("../services/user.service"));
var _meal = _interopRequireDefault(require("../services/meal.service"));
var _reactRouterDom = require("react-router-dom");
var _responses = require("../interfaces/api/responses");
var _common = require("../interfaces/common.interfaces");
var _reactSwitch = _interopRequireDefault(require("react-switch"));
require("./MealManagement.css");
var _KidSelection = _interopRequireDefault(require("./KidSelection"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function MealManagement() {
  var mealService = _meal.default.getInstance();
  var userService = _user.default.getInstance();
  var kids = userService.getKids();
  var _useParams = (0, _reactRouterDom.useParams)(),
    id = _useParams.id; //used url palceholders to validate replacing userService.getUserID()
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    kidSelectionOptions = _useState2[0],
    setKidSelectionOptions = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedKidIds = _useState4[0],
    setSelectedKidIds = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    preferences = _useState6[0],
    setPreferences = _useState6[1];
  var _useState7 = (0, _react.useState)(),
    _useState8 = _slicedToArray(_useState7, 2),
    selectedPreference = _useState8[0],
    setSelectedPreference = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    showInactivePreferences = _useState10[0],
    setShowInactivePreferences = _useState10[1];
  var _useState11 = (0, _react.useState)({
      mealId: 0,
      mealName: '',
      mealDescription: '',
      mealTypes: [],
      isSideDish: false,
      isTakeout: false
    }),
    _useState12 = _slicedToArray(_useState11, 2),
    selectedMealPrefrenceDetails = _useState12[0],
    setSelectedMealPrefrenceDetails = _useState12[1];
  var badgeClasses = "uk-badge uk-padding-small uk-margin-small-bottom uk-margin-small-left";
  var inactiveBadgeClass = "inactive-badge";
  var selectedBadgeClass = "selected-badge";
  var _useState13 = (0, _react.useState)(true),
    _useState14 = _slicedToArray(_useState13, 2),
    isFormDisabled = _useState14[0],
    setIsFormDisabled = _useState14[1];
  (0, _react.useEffect)(function () {
    var clearPreferenceSelection = function clearPreferenceSelection() {
      if (selectedPreference) {
        setSelectedPreference(undefined);
      }
    };
    clearPreferenceSelection();
    toggleFormDisabledState();
    loadPreferencesAysnc();
  }, [selectedKidIds]);
  (0, _react.useEffect)(function () {
    loadPreferencesAysnc();
  }, [showInactivePreferences]);
  (0, _react.useEffect)(function () {
    var loadPreferenceDetailsAsync = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (selectedPreference) {
                _context.next = 3;
                break;
              }
              //Clear previsouly selected details
              setSelectedMealPrefrenceDetails({
                mealId: 0,
                mealName: '',
                mealDescription: '',
                mealTypes: [],
                isSideDish: false,
                isTakeout: false
              });
              return _context.abrupt("return");
            case 3:
              if (!(selectedKidIds.length > 0)) {
                _context.next = 8;
                break;
              }
              _context.next = 6;
              return mealService.getPreferredMealDetails(selectedPreference.mealId, selectedKidIds);
            case 6:
              response = _context.sent;
              setSelectedMealPrefrenceDetails(response);
            case 8:
              refreshDisplayedPreferences();
              toggleFormDisabledState();
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function loadPreferenceDetailsAsync() {
        return _ref.apply(this, arguments);
      };
    }();
    loadPreferenceDetailsAsync();
  }, [selectedPreference]);
  (0, _react.useEffect)(function () {
    //Make sure the correct meal preference is always selected
    //if details are being displayed after a reload of preferences
    var mealId = selectedMealPrefrenceDetails === null || selectedMealPrefrenceDetails === void 0 ? void 0 : selectedMealPrefrenceDetails.mealId;
    if (mealId === 0) {
      var mealName = selectedMealPrefrenceDetails === null || selectedMealPrefrenceDetails === void 0 ? void 0 : selectedMealPrefrenceDetails.mealName;
      if (!mealName) {
        return; //details have no mealId and no meal name thus nothing to select 
      }

      var _preferencesToSelect = preferences.find(function (p) {
        return p.mealName === mealName;
      });
      setSelectedPreference(_preferencesToSelect);
      return;
    }
    if (mealId === (selectedPreference === null || selectedPreference === void 0 ? void 0 : selectedPreference.mealId)) {
      return; //details displayed are for the currently selected preference
    }

    var preferencesToSelect = preferences.find(function (p) {
      return p.mealId === mealId;
    });
    setSelectedPreference(preferencesToSelect);
  }, [preferences]);
  var loadKidSelectionOptions = function loadKidSelectionOptions(kids) {
    if (kidSelectionOptions.length > 0) {
      return;
    }
    var selectOptions = [{
      value: '0',
      text: '--Choose an option--',
      disabled: true
    }];
    var kidOptions = kids.map(function (kid, index) {
      return {
        value: kid.id.toString(),
        text: kid.name
      };
    });
    selectOptions.push.apply(selectOptions, _toConsumableArray(kidOptions));
    if (kids.length > 1) {
      selectOptions.push({
        value: 'all',
        text: 'All Kids'
      });
    }
    setKidSelectionOptions([].concat(selectOptions));
  };
  var handleKidSelectionChange = function handleKidSelectionChange(selectedKidIds) {
    setSelectedKidIds(selectedKidIds);
  };
  var loadPreferencesAysnc = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var updatedPreferences;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!(selectedKidIds.length > 0)) {
              _context2.next = 5;
              break;
            }
            _context2.next = 3;
            return mealService.getCommonMealPreferencesAsync(selectedKidIds, !showInactivePreferences);
          case 3:
            updatedPreferences = _context2.sent;
            setPreferences(updatedPreferences);
          case 5:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function loadPreferencesAysnc() {
      return _ref2.apply(this, arguments);
    };
  }();
  var toggleFormDisabledState = function toggleFormDisabledState() {
    var _ref3;
    var isInactivePreferenceSelected = (_ref3 = selectedPreference && !selectedPreference.isActive) !== null && _ref3 !== void 0 ? _ref3 : false;
    var hasKidOptionBeenSelected = selectedKidIds.length > 0;
    setIsFormDisabled(!hasKidOptionBeenSelected || isInactivePreferenceSelected);
  };
  var refreshDisplayedPreferences = function refreshDisplayedPreferences() {
    if (!selectedPreference) {
      return;
    }
    var displayedPreference = preferences.find(function (p) {
      return p.mealId === selectedPreference.mealId;
    });
    if (!displayedPreference) {
      return;
    }

    //Check is displayed preference needs to be updated
    if (displayedPreference.mealName !== selectedPreference.mealName || displayedPreference.isActive !== selectedPreference.isActive) {
      var updatedPreferences = _toConsumableArray(preferences.filter(function (p) {
        return p.mealId !== selectedPreference.mealId;
      }));
      var isSelectedPreferenceVisible = false;
      if (selectedPreference.isActive || !selectedPreference.isActive && showInactivePreferences) {
        updatedPreferences = [].concat(_toConsumableArray(updatedPreferences), [selectedPreference]);
        isSelectedPreferenceVisible = true;
      }
      setPreferences(function () {
        return updatedPreferences;
      });
      if (!isSelectedPreferenceVisible) {
        setSelectedPreference(function () {
          return undefined;
        });
      }
    }
  };
  var handleMealPreferenceSelection = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(preference) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (preference) {
              _context3.next = 3;
              break;
            }
            setSelectedPreference(undefined);
            return _context3.abrupt("return");
          case 3:
            setSelectedPreference(preference);
          case 4:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function handleMealPreferenceSelection(_x) {
      return _ref4.apply(this, arguments);
    };
  }();
  var handleShowInactivePreferencesToggleAsync = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(checked) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            setShowInactivePreferences(checked);
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function handleShowInactivePreferencesToggleAsync(_x2) {
      return _ref5.apply(this, arguments);
    };
  }();
  var handleDetailChanges = function handleDetailChanges(evt) {
    if (!(evt !== null && evt !== void 0 && evt.target)) {
      return;
    }
    var value = evt.target.value;
    if (evt.target.type === "checkbox") {
      var isChecked = evt.target.checked;
      //update mealtypes
      if (evt.target.name === "mealTypes") {
        var mealType = parseInt(value, 10);
        setSelectedMealPrefrenceDetails(_objectSpread(_objectSpread({}, selectedMealPrefrenceDetails), {}, {
          mealTypes: isChecked ? [].concat(_toConsumableArray(selectedMealPrefrenceDetails.mealTypes), [mealType]) : selectedMealPrefrenceDetails.mealTypes.filter(function (mt) {
            return mt !== mealType;
          })
        }));
      } else {
        //update other checkbox driven properties
        setSelectedMealPrefrenceDetails(_objectSpread(_objectSpread({}, selectedMealPrefrenceDetails), {}, _defineProperty({}, evt.target.name, isChecked)));
      }
    } else {
      //update any other non-checkbox driven properties
      setSelectedMealPrefrenceDetails(_objectSpread(_objectSpread({}, selectedMealPrefrenceDetails), {}, _defineProperty({}, evt.target.name, value)));
    }
  };
  var handleRemoveMealPreference = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(preference) {
      var response, updatedPreferences;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            if (!(selectedKidIds.length > 0)) {
              _context5.next = 5;
              break;
            }
            _context5.next = 3;
            return mealService.removeMealPreferenceAsync(preference.mealId, selectedKidIds);
          case 3:
            response = _context5.sent;
            if (selectedPreference) {
              setSelectedPreference(_objectSpread(_objectSpread({}, selectedPreference), {}, {
                isActive: false
              }));
            } else if (preferences) {
              updatedPreferences = _toConsumableArray(preferences.filter(function (p) {
                return p.mealId !== preference.mealId;
              }));
              if (showInactivePreferences) updatedPreferences = [].concat(_toConsumableArray(updatedPreferences), [_objectSpread(_objectSpread({}, preference), {}, {
                isActive: false
              })]);
              setPreferences(updatedPreferences);
            }
          case 5:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function handleRemoveMealPreference(_x3) {
      return _ref6.apply(this, arguments);
    };
  }();
  var handleAddMealPreference = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var response;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            if (!(selectedKidIds.length > 0)) {
              _context6.next = 6;
              break;
            }
            _context6.next = 3;
            return mealService.addMealPreferenceAsync(selectedKidIds, selectedMealPrefrenceDetails);
          case 3:
            response = _context6.sent;
            _context6.next = 6;
            return loadPreferencesAysnc();
          case 6:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function handleAddMealPreference() {
      return _ref7.apply(this, arguments);
    };
  }();
  var handleUpdateMealPreference = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var response;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            if (!(selectedKidIds.length > 0 && selectedPreference)) {
              _context7.next = 5;
              break;
            }
            _context7.next = 3;
            return mealService.updateMealPreferenceAsync(selectedKidIds, selectedMealPrefrenceDetails, selectedPreference.isActive);
          case 3:
            response = _context7.sent;
            setSelectedPreference(_objectSpread(_objectSpread({}, selectedPreference), {}, {
              mealName: selectedMealPrefrenceDetails.mealName
            }));
          case 5:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    return function handleUpdateMealPreference() {
      return _ref8.apply(this, arguments);
    };
  }();
  var handleRestoreMealPreference = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var response;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            if (!(selectedKidIds.length > 0)) {
              _context8.next = 5;
              break;
            }
            _context8.next = 3;
            return mealService.restoreMealPreferenceAsync(selectedKidIds, selectedMealPrefrenceDetails);
          case 3:
            response = _context8.sent;
            if (selectedPreference) {
              setSelectedPreference(_objectSpread(_objectSpread({}, selectedPreference), {}, {
                isActive: true
              }));
            }
          case 5:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    return function handleRestoreMealPreference() {
      return _ref9.apply(this, arguments);
    };
  }();
  var handleCancelUserAction = function handleCancelUserAction() {
    if (selectedPreference) {
      setSelectedPreference(undefined);
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "uk-position-center"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "uk-card uk-card-default uk-width-xlarge uk-margin-small-top"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "uk-card-header"
  }, /*#__PURE__*/_react.default.createElement(_KidSelection.default, {
    kids: kids,
    onSelectionChange: handleKidSelectionChange
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "uk-card-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "uk-align-left"
  }, preferences === null || preferences === void 0 ? void 0 : preferences.filter(function (p) {
    return p.isActive;
  }).map(function (preference, index) {
    return /*#__PURE__*/_react.default.createElement("a", {
      key: index,
      className: (selectedMealPrefrenceDetails === null || selectedMealPrefrenceDetails === void 0 ? void 0 : selectedMealPrefrenceDetails.mealId) === preference.mealId ? "".concat(badgeClasses, " ").concat(selectedBadgeClass) : badgeClasses
    }, /*#__PURE__*/_react.default.createElement("span", {
      onClick: function onClick() {
        return handleMealPreferenceSelection(preference);
      }
    }, preference.mealName, "\xA0"), /*#__PURE__*/_react.default.createElement("button", {
      onClick: function onClick() {
        return handleRemoveMealPreference(preference);
      },
      type: "button",
      "aria-label": "Close",
      "uk-close": "true"
    }));
  }), preferences === null || preferences === void 0 ? void 0 : preferences.filter(function (p) {
    return !p.isActive;
  }).map(function (preference, index) {
    return /*#__PURE__*/_react.default.createElement("a", {
      key: index,
      className: (selectedMealPrefrenceDetails === null || selectedMealPrefrenceDetails === void 0 ? void 0 : selectedMealPrefrenceDetails.mealId) === preference.mealId ? "".concat(badgeClasses, " ").concat(inactiveBadgeClass, " ").concat(selectedBadgeClass) : "".concat(badgeClasses, " ").concat(inactiveBadgeClass)
    }, /*#__PURE__*/_react.default.createElement("span", {
      onClick: function onClick() {
        return handleMealPreferenceSelection(preference);
      }
    }, preference.mealName, "\xA0"));
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "uk-align-right"
  }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("span", null, "Include Inactive"), /*#__PURE__*/_react.default.createElement(_reactSwitch.default, {
    onChange: handleShowInactivePreferencesToggleAsync,
    checked: showInactivePreferences,
    className: "react-switch",
    checkedIcon: false,
    uncheckedIcon: false,
    onColor: "#ff7f50"
  })))), /*#__PURE__*/_react.default.createElement("div", {
    className: "uk-card-footer"
  }, /*#__PURE__*/_react.default.createElement("form", {
    className: "uk-form-stacked"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "uk-margin uk-form-controls"
  }, /*#__PURE__*/_react.default.createElement("input", {
    name: "mealName",
    className: "uk-input",
    type: "text",
    placeholder: "Name of Meal",
    value: selectedMealPrefrenceDetails === null || selectedMealPrefrenceDetails === void 0 ? void 0 : selectedMealPrefrenceDetails.mealName,
    onChange: handleDetailChanges,
    disabled: isFormDisabled
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "uk-margin uk-form-controls"
  }, /*#__PURE__*/_react.default.createElement("textarea", {
    name: "mealDescription",
    className: "uk-textarea",
    rows: 3,
    placeholder: "Description",
    value: selectedMealPrefrenceDetails === null || selectedMealPrefrenceDetails === void 0 ? void 0 : selectedMealPrefrenceDetails.mealDescription,
    onChange: handleDetailChanges,
    disabled: isFormDisabled
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "uk-margin uk-form-controls"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "uk-child-width-1-4",
    "uk-grid": "true"
  }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    name: "mealTypes",
    className: "uk-checkbox uk-margin-small-right",
    type: "checkbox",
    onChange: handleDetailChanges,
    value: _common.MealType.Breakfast,
    checked: selectedMealPrefrenceDetails === null || selectedMealPrefrenceDetails === void 0 ? void 0 : selectedMealPrefrenceDetails.mealTypes.some(function (mt) {
      return mt === _common.MealType.Breakfast;
    }),
    disabled: isFormDisabled
  }), "Breakfast"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    name: "mealTypes",
    className: "uk-checkbox uk-margin-small-right",
    type: "checkbox",
    onChange: handleDetailChanges,
    value: _common.MealType.Lunch,
    checked: selectedMealPrefrenceDetails === null || selectedMealPrefrenceDetails === void 0 ? void 0 : selectedMealPrefrenceDetails.mealTypes.some(function (mt) {
      return mt === _common.MealType.Lunch;
    }),
    disabled: isFormDisabled
  }), "Lunch"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    name: "mealTypes",
    className: "uk-checkbox uk-margin-small-right",
    type: "checkbox",
    onChange: handleDetailChanges,
    value: _common.MealType.Snack,
    checked: selectedMealPrefrenceDetails === null || selectedMealPrefrenceDetails === void 0 ? void 0 : selectedMealPrefrenceDetails.mealTypes.some(function (mt) {
      return mt === _common.MealType.Snack;
    }),
    disabled: isFormDisabled
  }), "Snack"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    name: "mealTypes",
    className: "uk-checkbox uk-margin-small-right",
    type: "checkbox",
    onChange: handleDetailChanges,
    value: _common.MealType.Dinner,
    checked: selectedMealPrefrenceDetails === null || selectedMealPrefrenceDetails === void 0 ? void 0 : selectedMealPrefrenceDetails.mealTypes.some(function (mt) {
      return mt === _common.MealType.Dinner;
    }),
    disabled: isFormDisabled
  }), "Dinner"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    name: "isTakeout",
    className: "uk-checkbox uk-margin-small-right",
    type: "checkbox",
    onChange: handleDetailChanges,
    checked: selectedMealPrefrenceDetails === null || selectedMealPrefrenceDetails === void 0 ? void 0 : selectedMealPrefrenceDetails.isTakeout,
    disabled: isFormDisabled
  }), "Takeout?"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    name: "isSideDish",
    className: "uk-checkbox uk-margin-small-right",
    type: "checkbox",
    onChange: handleDetailChanges,
    checked: selectedMealPrefrenceDetails === null || selectedMealPrefrenceDetails === void 0 ? void 0 : selectedMealPrefrenceDetails.isSideDish,
    disabled: isFormDisabled
  }), "Side?"))), !selectedPreference && /*#__PURE__*/_react.default.createElement("div", {
    className: "uk-margin uk-form-controls"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "uk-button uk-button-default uk-width-small uk-align-left",
    onClick: handleCancelUserAction
  }, "Cancel"), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "uk-button uk-button-primary uk-width-small uk-align-right",
    onClick: handleAddMealPreference,
    disabled: isFormDisabled
  }, "Add")), selectedPreference && /*#__PURE__*/_react.default.createElement("div", {
    className: "uk-margin uk-form-controls"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "uk-button uk-button-default uk-width-small uk-align-left",
    onClick: handleCancelUserAction
  }, "Cancel"), selectedPreference.isActive && /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "uk-button uk-button-primary uk-width-small uk-align-right",
    onClick: handleUpdateMealPreference
  }, "Update"), !selectedPreference.isActive && /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "uk-button uk-button-primary uk-width-small uk-align-right",
    onClick: handleRestoreMealPreference
  }, "Restore"))))));
}
var _default = MealManagement;
exports.default = _default;