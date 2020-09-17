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
var range_1 = __importDefault(require("lodash/range"));
var includes_1 = __importDefault(require("lodash/includes"));
var isNil_1 = __importDefault(require("lodash/isNil"));
var isArray_1 = __importDefault(require("lodash/isArray"));
var concat_1 = __importDefault(require("lodash/concat"));
var uniq_1 = __importDefault(require("lodash/uniq"));
var filter_1 = __importDefault(require("lodash/filter"));
var last_1 = __importDefault(require("lodash/last"));
var first_1 = __importDefault(require("lodash/first"));
var some_1 = __importDefault(require("lodash/some"));
var moment_1 = __importDefault(require("moment"));
var React = __importStar(require("react"));
var YearRangeView_1 = __importDefault(require("../../views/YearRangeView"));
var BasePicker_1 = require("../BasePicker");
var const_1 = require("./const");
var PAGE_WIDTH = const_1.YEAR_RANGE_PAGE_WIDTH;
// const PAGE_HEIGHT = 4;
var YEARS_ON_PAGE = const_1.YEARS_IN_YEARRANGE;
var YearRangePicker = /** @class */ (function (_super) {
    __extends(YearRangePicker, _super);
    /*
      Note:
        use it like this <YearPicker key={someInputValue} />
        to make react create new instance when input value changes
    */
    function YearRangePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (e, _a) {
            var value = _a.value;
            var _b = _this.props, start = _b.start, end = _b.end;
            var data = __assign(__assign({}, _this.props), { value: {} });
            var selectedYear = moment_1.default(value);
            if (isNil_1.default(start) && isNil_1.default(end)) {
                data.value = { start: selectedYear };
            }
            else if (!isNil_1.default(start) && isNil_1.default(end)) {
                if (selectedYear.isAfter(start, 'date')) {
                    data.value = {
                        start: start,
                        end: selectedYear,
                    };
                }
                else if (!selectedYear.isSame(start, 'date')) {
                    data.value = {
                        start: selectedYear,
                        end: start,
                    };
                }
            }
            else if (!isNil_1.default(start) && !isNil_1.default(end)) {
                data.value = {
                    start: selectedYear,
                };
            }
            _this.props.onChange(e, data);
        };
        _this.switchToNextPage = function (e, data, callback) {
            _this.setState(function (_a) {
                var date = _a.date;
                var nextDate = date.clone();
                nextDate.add(YEARS_ON_PAGE, 'year');
                return { date: nextDate };
            }, callback);
        };
        _this.switchToPrevPage = function (e, data, callback) {
            _this.setState(function (_a) {
                var date = _a.date;
                var prevDate = date.clone();
                prevDate.subtract(YEARS_ON_PAGE, 'year');
                return { date: prevDate };
            }, callback);
        };
        _this.PAGE_WIDTH = PAGE_WIDTH;
        return _this;
    }
    YearRangePicker.prototype.render = function () {
        var _a = this.props, onChange = _a.onChange, value = _a.value, initializeWith = _a.initializeWith, closePopup = _a.closePopup, inline = _a.inline, isPickerInFocus = _a.isPickerInFocus, isTriggerInFocus = _a.isTriggerInFocus, onCalendarViewMount = _a.onCalendarViewMount, dateFormat = _a.dateFormat, disable = _a.disable, enable = _a.enable, start = _a.start, end = _a.end, minDate = _a.minDate, maxDate = _a.maxDate, localization = _a.localization, rest = __rest(_a, ["onChange", "value", "initializeWith", "closePopup", "inline", "isPickerInFocus", "isTriggerInFocus", "onCalendarViewMount", "dateFormat", "disable", "enable", "start", "end", "minDate", "maxDate", "localization"]);
        return (React.createElement(YearRangeView_1.default, __assign({}, rest, { values: this.buildCalendarValues(), onNextPageBtnClick: this.switchToNextPage, onPrevPageBtnClick: this.switchToPrevPage, onCellHover: this.onHoveredCellPositionChange, hoveredItemIndex: this.state.hoveredCellPosition, onValueClick: this.handleChange, inline: this.props.inline, hasPrevPage: this.isPrevPageAvailable(), hasNextPage: this.isNextPageAvailable(), onBlur: this.handleBlur, onMount: this.props.onCalendarViewMount, currentHeadingValue: this.getCurrentDate(), currentRangeHeadingValue: this.getSelectedRange(), activeRange: this.getActiveCellsPositions(), disabledItemIndexes: this.getDisabledPositions(), localization: localization })));
    };
    YearRangePicker.prototype.getCurrentDate = function () {
        /* Return currently selected year and month(string) to display in calendar header. */
        return this.state.date.format('YYYY');
    };
    YearRangePicker.prototype.buildCalendarValues = function () {
        /*
          Return array of years (strings) like ['2012', '2013', ...]
          that used to populate calendar's page.
        */
        var years = [];
        var date = this.state.date;
        var padd = date.year() % YEARS_ON_PAGE;
        var firstYear = date.year() - padd;
        for (var i = 0; i < YEARS_ON_PAGE; i++) {
            years[i] = (firstYear + i).toString();
        }
        return years;
    };
    YearRangePicker.prototype.getInitialDatePosition = function () {
        var selectable = this.getSelectableCellPositions();
        var values = this.buildCalendarValues();
        var currentYearIndex = values.indexOf(this.state.date.year().toString());
        if (selectable.indexOf(currentYearIndex) < 0) {
            return selectable[0];
        }
        return currentYearIndex;
    };
    YearRangePicker.prototype.getSelectedRange = function () {
        /* Return currently selected dates range(string) to display in calendar header. */
        var _a = this.props, start = _a.start, end = _a.end, dateFormat = _a.dateFormat;
        return (start ? start.format(dateFormat) : '- - -') + " - " + (end ? end.format(dateFormat) : '- - -');
    };
    YearRangePicker.prototype.getActiveCellsPositions = function () {
        /*
          Return starting and ending positions of month range that should be displayed as active
          { start: number, end: number }
        */
        var _a = this.props, start = _a.start, end = _a.end;
        var currentYears = this.buildCalendarValues();
        var minYear = Number(currentYears[0]);
        var maxYear = Number(currentYears[YEARS_ON_PAGE - 1]);
        var result = {
            start: undefined,
            end: undefined,
        };
        if (start && end) {
            if (maxYear < start.year() || minYear > end.year()) {
                return result;
            }
            result.start = minYear < start.year() ? currentYears.indexOf(start.year().toString()) : 0;
            result.end = maxYear > end.year() ? currentYears.indexOf(end.year().toString()) : const_1.YEARS_IN_YEARRANGE - 1;
        }
        if (start && !end) {
            result.start = minYear <= start.year() && maxYear >= start.year() ? currentYears.indexOf(start.year().toString()) : undefined;
        }
        return result;
    };
    YearRangePicker.prototype.getSelectableCellPositions = function () {
        var _this = this;
        return filter_1.default(range_1.default(0, YEARS_ON_PAGE), function (y) { return !includes_1.default(_this.getDisabledPositions(), y); });
    };
    YearRangePicker.prototype.getDisabledPositions = function () {
        /*
          Return position numbers of years that should be displayed as disabled
          (position in array returned by `this.buildCalendarValues`).
        */
        var disabled = [];
        var years = this.buildCalendarValues();
        if (isArray_1.default(this.props.enable)) {
            var enabledYears_1 = this.props.enable.map(function (yearMoment) { return yearMoment.year().toString(); });
            disabled = concat_1.default(disabled, years
                .filter(function (year) { return !includes_1.default(enabledYears_1, year); })
                .map(function (year) { return years.indexOf(year); }));
        }
        if (isArray_1.default(this.props.disable)) {
            disabled = concat_1.default(disabled, this.props.disable
                .filter(function (yearMoment) { return includes_1.default(years, yearMoment.year().toString()); })
                .map(function (yearMoment) { return years.indexOf(yearMoment.year().toString()); }));
        }
        if (!isNil_1.default(this.props.maxDate)) {
            if (parseInt(first_1.default(years), 10) > this.props.maxDate.year()) {
                disabled = range_1.default(0, years.length);
            }
            else if (includes_1.default(years, this.props.maxDate.year().toString())) {
                disabled = concat_1.default(disabled, range_1.default(years.indexOf(this.props.maxDate.year().toString()) + 1, years.length));
            }
        }
        if (!isNil_1.default(this.props.minDate)) {
            if (parseInt(last_1.default(years), 10) < this.props.minDate.year()) {
                disabled = range_1.default(0, years.length);
            }
            else if (includes_1.default(years, this.props.minDate.year().toString())) {
                disabled = concat_1.default(disabled, range_1.default(0, years.indexOf(this.props.minDate.year().toString())));
            }
        }
        if (disabled.length > 0) {
            return uniq_1.default(disabled);
        }
    };
    YearRangePicker.prototype.isNextPageAvailable = function () {
        var _a = this.props, maxDate = _a.maxDate, enable = _a.enable;
        var lastOnPage = parseInt(last_1.default(this.buildCalendarValues()), 10);
        if (isArray_1.default(enable)) {
            return some_1.default(enable, function (enabledYear) { return enabledYear.year() > lastOnPage; });
        }
        if (isNil_1.default(maxDate)) {
            return true;
        }
        return lastOnPage < maxDate.year();
    };
    YearRangePicker.prototype.isPrevPageAvailable = function () {
        var _a = this.props, minDate = _a.minDate, enable = _a.enable;
        var firstOnPage = parseInt(first_1.default(this.buildCalendarValues()), 10);
        if (isArray_1.default(enable)) {
            return some_1.default(enable, function (enabledYear) { return enabledYear.year() < firstOnPage; });
        }
        if (isNil_1.default(minDate)) {
            return true;
        }
        return firstOnPage > minDate.year();
    };
    return YearRangePicker;
}(BasePicker_1.RangeSelectionPicker));
exports.default = YearRangePicker;
