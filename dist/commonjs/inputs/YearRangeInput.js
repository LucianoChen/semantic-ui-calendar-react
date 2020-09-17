"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var YearRangePicker_1 = __importDefault(require("../pickers/yearPicker/YearRangePicker"));
var InputView_1 = __importDefault(require("../views/InputView"));
var BaseInput_1 = __importStar(require("./BaseInput"));
var parse_1 = require("./parse");
var YearRangeInput = /** @class */ (function (_super) {
    __extends(YearRangeInput, _super);
    function YearRangeInput(props) {
        var _this = _super.call(this, props) || this;
        _this.getPicker = function () {
            var _a = _this.props, value = _a.value, disable = _a.disable, maxDate = _a.maxDate, minDate = _a.minDate, initialDate = _a.initialDate, dateFormat = _a.dateFormat, localization = _a.localization;
            var _b = parse_1.parseDatesRange(value, dateFormat), start = _b.start, end = _b.end;
            return (React.createElement(YearRangePicker_1.default, { isPickerInFocus: _this.isPickerInFocus, isTriggerInFocus: _this.isTriggerInFocus, inline: _this.props.inline, onCalendarViewMount: _this.onCalendarViewMount, closePopup: _this.closePopup, onChange: _this.handleSelect, dateFormat: dateFormat, initializeWith: parse_1.buildValue(value, initialDate, localization, dateFormat), start: start, end: end, disable: parse_1.parseArrayOrValue(disable, dateFormat, localization), maxDate: parse_1.parseValue(maxDate, dateFormat, localization), minDate: parse_1.parseValue(minDate, dateFormat, localization), onHeaderClick: function () { return undefined; } }));
        };
        _this.handleSelect = function (e, _a) {
            var value = _a.value;
            var output = ' - ';
            var start = value.start, end = value.end;
            if (start && start.isValid()) {
                if (!end) {
                    output = start.format(_this.props.dateFormat) + " - ";
                }
                else if (end.isValid()) {
                    output = start.format(_this.props.dateFormat) + " - " + end.format(_this.props.dateFormat);
                }
            }
            var data = __assign(__assign({}, _this.props), { value: output });
            _this.props.onChange(e, data);
            if (_this.props.closable && end) {
                _this.closePopup();
            }
        };
        _this.state = {
            popupIsClosed: true,
        };
        return _this;
    }
    YearRangeInput.prototype.render = function () {
        var _a = this.props, value = _a.value, disable = _a.disable, maxDate = _a.maxDate, minDate = _a.minDate, initialDate = _a.initialDate, dateFormat = _a.dateFormat, closable = _a.closable, localization = _a.localization, rest = __rest(_a, ["value", "disable", "maxDate", "minDate", "initialDate", "dateFormat", "closable", "localization"]);
        return (React.createElement(InputView_1.default, __assign({ popupIsClosed: this.state.popupIsClosed, closePopup: this.closePopup, openPopup: this.openPopup }, rest, { value: value, onMount: this.onInputViewMount, renderPicker: this.getPicker })));
    };
    YearRangeInput.defaultProps = __assign(__assign({}, BaseInput_1.default.defaultProps), { dateFormat: 'YYYY', icon: 'calendar' });
    YearRangeInput.propTypes = __assign(__assign(__assign(__assign({}, BaseInput_1.BaseInputPropTypes), BaseInput_1.DateRelatedPropTypes), BaseInput_1.MinMaxValuePropTypes), BaseInput_1.DisableValuesPropTypes);
    return YearRangeInput;
}(BaseInput_1.default));
exports.default = YearRangeInput;
