import last from 'lodash/last';
import first from 'lodash/first';
import range from 'lodash/range';
import isNil from 'lodash/isNil';

import * as React from 'react';

import BaseCalendarView, {
  BaseCalendarViewProps,
  CalendarWithHeaderViewProps,
  HeadingValueProps,
  RangeSelectionCalendarViewProps,
} from './BaseCalendarView';
import Calendar from './Calendar';
import Body from './CalendarBody/Body';
import Header from './CalendarHeader/Header';

import { findHTMLElement } from '../lib';
import { YEARS_IN_YEARRANGE, YEAR_RANGE_PAGE_WIDTH } from '../pickers/yearPicker/const'

export const YEAR_RANGE_CALENDAR_ROW_WIDTH = YEAR_RANGE_PAGE_WIDTH;
export const YEAR_POSITIONS = range(YEARS_IN_YEARRANGE);
interface YearRangeViewProps extends
  BaseCalendarViewProps, HeadingValueProps, RangeSelectionCalendarViewProps, CalendarWithHeaderViewProps {
}

function getActive(start: number, end: number): number | number[] | undefined {
  if (isNil(start) && isNil(end)) {
    return;
  }
  if (!isNil(start) && isNil(end)) {
    return start;
  }
  if (!isNil(start) && !isNil(end)) {
    return YEAR_POSITIONS.slice(start, end + 1);
  }
}

class YearRangeView extends BaseCalendarView<YearRangeViewProps, any> {
  public static defaultProps = {
    active: {
      start: undefined,
      end: undefined,
    },
  };
  public render() {
    const {
      values,
      onNextPageBtnClick,
      onPrevPageBtnClick,
      onValueClick,
      hasNextPage,
      hasPrevPage,
      onHeaderClick,
      disabledItemIndexes,
      currentHeadingValue,
      currentRangeHeadingValue,
      hoveredItemIndex,
      onCellHover,
      onMount,
      inline,
      localization,
      activeRange,
      ...rest
    } = this.props;
    const headerTitle = `${first(values)} - ${last(values)}`;
    const {
      start,
      end,
    } = activeRange;
    const width = YEAR_RANGE_CALENDAR_ROW_WIDTH
    return (
      <Calendar ref={(e) => this.calendarNode = findHTMLElement(e)} outlineOnFocus={inline} {...rest}>
        <Header
          className='suicr-year-view-header'
          rangeRowContent={currentRangeHeadingValue}
          onNextPageBtnClick={onNextPageBtnClick}
          onPrevPageBtnClick={onPrevPageBtnClick}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          title={headerTitle}
          onHeaderClick={onHeaderClick}
          width={width}
          displayWeeks={false}
          localization={localization} />
        <Body
          width={width}
          data={values}
          onCellHover={onCellHover}
          onCellClick={onValueClick}
          hovered={hoveredItemIndex}
          active={getActive(start, end)}
          disabled={disabledItemIndexes} />
      </Calendar>
    );
  }
}

export default YearRangeView;
