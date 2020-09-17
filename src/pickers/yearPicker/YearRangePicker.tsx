import range from 'lodash/range';
import includes from 'lodash/includes';
import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';
import concat from 'lodash/concat';
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';
import last from 'lodash/last';
import first from 'lodash/first';
import some from 'lodash/some';
import moment, { Moment } from 'moment';

import * as React from 'react';
import { RangeIndexes } from '../../views/BaseCalendarView';

import YearRangeView from '../../views/YearRangeView';
import {
  BasePickerOnChangeData,
  BasePickerProps,
  DisableValuesProps,
  EnableValuesProps,
  MinMaxValueProps,
  ProvideHeadingValue,
  RangeSelectionPicker
} from '../BasePicker';
import { YEARS_IN_YEARRANGE, YEAR_RANGE_PAGE_WIDTH } from './const';

const PAGE_WIDTH = YEAR_RANGE_PAGE_WIDTH;
// const PAGE_HEIGHT = 4;
const YEARS_ON_PAGE = YEARS_IN_YEARRANGE;

interface YearRangePickerProps extends BasePickerProps, MinMaxValueProps, DisableValuesProps, EnableValuesProps {
  /** Moment date formatting string. */
  dateFormat: string;
  /** Start of currently selected dates range. */
  start: Moment;
  /** End of currently selected dates range. */
  end: Moment;
}

export type YearRangePickerOnChangeData = BasePickerOnChangeData;

class YearRangePicker extends RangeSelectionPicker<YearRangePickerProps> implements ProvideHeadingValue {
  /*
    Note:
      use it like this <YearPicker key={someInputValue} />
      to make react create new instance when input value changes
  */
  constructor(props) {
    super(props);
    this.PAGE_WIDTH = PAGE_WIDTH;
  }

  public render() {
    const {
      onChange,
      value,
      initializeWith,
      closePopup,
      inline,
      isPickerInFocus,
      isTriggerInFocus,
      onCalendarViewMount,
      dateFormat,
      disable,
      enable,
      start,
      end,
      minDate,
      maxDate,
      localization,
      ...rest
    } = this.props;
    return (
      <YearRangeView
        {...rest}
        values={this.buildCalendarValues()}
        onNextPageBtnClick={this.switchToNextPage}
        onPrevPageBtnClick={this.switchToPrevPage}
        onCellHover={this.onHoveredCellPositionChange}
        hoveredItemIndex={this.state.hoveredCellPosition}
        onValueClick={this.handleChange}
        inline={this.props.inline}
        hasPrevPage={this.isPrevPageAvailable()}
        hasNextPage={this.isNextPageAvailable()}
        onBlur={this.handleBlur}
        onMount={this.props.onCalendarViewMount}
        currentHeadingValue={this.getCurrentDate()}
        currentRangeHeadingValue={this.getSelectedRange()}
        activeRange={this.getActiveCellsPositions()}
        disabledItemIndexes={this.getDisabledPositions()}
        localization={localization} />
    );
  }
  public getCurrentDate(): string {
    /* Return currently selected year and month(string) to display in calendar header. */
    return this.state.date.format('YYYY');
  }

  protected buildCalendarValues(): string[] {
    /*
      Return array of years (strings) like ['2012', '2013', ...]
      that used to populate calendar's page.
    */
    const years = [];
    const date = this.state.date;
    const padd = date.year() % YEARS_ON_PAGE;
    const firstYear = date.year() - padd;
    for (let i = 0; i < YEARS_ON_PAGE; i++) {
      years[i] = (firstYear + i).toString();
    }

    return years;
  }

  protected getInitialDatePosition(): number {
    const selectable = this.getSelectableCellPositions();
    const values = this.buildCalendarValues();
    const currentYearIndex = values.indexOf(this.state.date.year().toString());
    if (selectable.indexOf(currentYearIndex) < 0) {
      return selectable[0];
    }

    return currentYearIndex;
  }
  protected getSelectedRange(): string {
    /* Return currently selected dates range(string) to display in calendar header. */
    const {
      start,
      end,
      dateFormat,
    } = this.props;

    return `${start ? start.format(dateFormat) : '- - -'} - ${end ? end.format(dateFormat) : '- - -'}`;
  }

  protected getActiveCellsPositions(): RangeIndexes {
    /*
      Return starting and ending positions of month range that should be displayed as active
      { start: number, end: number }
    */
    const {
      start,
      end,
    } = this.props;
    const currentYears = this.buildCalendarValues();
    const minYear = Number(currentYears[0])
    const maxYear = Number(currentYears[YEARS_ON_PAGE - 1])
    const result = {
      start: undefined,
      end: undefined,
    };
    if (start && end) {
      if (maxYear < start.year() || minYear > end.year()) {
        return result;
      }

      result.start = minYear < start.year() ? currentYears.indexOf(start.year().toString()) : 0;
      result.end = maxYear > end.year() ? currentYears.indexOf(end.year().toString()) : YEARS_IN_YEARRANGE - 1;
    }
    if (start && !end) {
      result.start = minYear <= start.year() && maxYear >= start.year() ? currentYears.indexOf(start.year().toString()) : undefined;
    }
    return result;
  }

  protected getSelectableCellPositions(): number[] {
    return filter(
      range(0, YEARS_ON_PAGE),
      (y) => !includes(this.getDisabledPositions(), y),
    );
  }

  protected getDisabledPositions(): number[] {
    /*
      Return position numbers of years that should be displayed as disabled
      (position in array returned by `this.buildCalendarValues`).
    */
    let disabled = [];
    const years = this.buildCalendarValues();
    if (isArray(this.props.enable)) {
      const enabledYears = this.props.enable.map((yearMoment) => yearMoment.year().toString());
      disabled = concat(disabled,
        years
          .filter((year) => !includes(enabledYears, year))
          .map((year) => years.indexOf(year)));
    }
    if (isArray(this.props.disable)) {
      disabled = concat(disabled,
        this.props.disable
          .filter((yearMoment) => includes(years, yearMoment.year().toString()))
          .map((yearMoment) => years.indexOf(yearMoment.year().toString())));
    }
    if (!isNil(this.props.maxDate)) {
      if (parseInt(first(years), 10) > this.props.maxDate.year()) {
        disabled = range(0, years.length);
      } else if (includes(years, this.props.maxDate.year().toString())) {
        disabled = concat(
          disabled,
          range(years.indexOf(this.props.maxDate.year().toString()) + 1, years.length));
      }
    }
    if (!isNil(this.props.minDate)) {
      if (parseInt(last(years), 10) < this.props.minDate.year()) {
        disabled = range(0, years.length);
      } else if (includes(years, this.props.minDate.year().toString())) {
        disabled = concat(
          disabled,
          range(0, years.indexOf(this.props.minDate.year().toString())));
      }
    }
    if (disabled.length > 0) {
      return uniq(disabled);
    }
  }

  protected isNextPageAvailable(): boolean {
    const {
      maxDate,
      enable,
    } = this.props;
    const lastOnPage = parseInt(last(this.buildCalendarValues()), 10);

    if (isArray(enable)) {
      return some(enable, (enabledYear) => enabledYear.year() > lastOnPage);
    }
    if (isNil(maxDate)) {
      return true;
    }

    return lastOnPage < maxDate.year();
  }

  protected isPrevPageAvailable(): boolean {
    const {
      minDate,
      enable,
    } = this.props;
    const firstOnPage = parseInt(first(this.buildCalendarValues()), 10);

    if (isArray(enable)) {
      return some(enable, (enabledYear) => enabledYear.year() < firstOnPage);
    }
    if (isNil(minDate)) {
      return true;
    }

    return firstOnPage > minDate.year();
  }

  protected handleChange = (e: React.SyntheticEvent<HTMLElement>, { value }): void => {
    const {
      start,
      end,
    } = this.props;
    const data: YearRangePickerOnChangeData = {
      ...this.props,
      value: {}
    };
    const selectedYear = moment(value)
    if (isNil(start) && isNil(end)) {
      data.value = { start: selectedYear }
    } else if (!isNil(start) && isNil(end)) {
      if (selectedYear.isAfter(start, 'date')) {
        data.value = {
          start,
          end: selectedYear,
        };
      } else if (!selectedYear.isSame(start, 'date')) {
        data.value = {
          start: selectedYear,
          end: start,
        };
      }
    } else if (!isNil(start) && !isNil(end)) {
      data.value = {
        start: selectedYear,
      };
    }
    this.props.onChange(e, data);
  }

  protected switchToNextPage = (e: React.SyntheticEvent<HTMLElement>,
    data: any,
    callback: () => void): void => {
    this.setState(({ date }) => {
      const nextDate = date.clone();
      nextDate.add(YEARS_ON_PAGE, 'year');

      return { date: nextDate };
    }, callback);
  }

  protected switchToPrevPage = (e: React.SyntheticEvent<HTMLElement>,
    data: any,
    callback: () => void): void => {
    this.setState(({ date }) => {
      const prevDate = date.clone();
      prevDate.subtract(YEARS_ON_PAGE, 'year');

      return { date: prevDate };
    }, callback);
  }
}

export default YearRangePicker;
