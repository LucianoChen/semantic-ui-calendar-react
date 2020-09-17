/// <reference types="react" />
import BaseCalendarView, { BaseCalendarViewProps, CalendarWithHeaderViewProps, HeadingValueProps, RangeSelectionCalendarViewProps } from './BaseCalendarView';
export declare const YEAR_RANGE_CALENDAR_ROW_WIDTH = 4;
export declare const YEAR_POSITIONS: number[];
interface YearRangeViewProps extends BaseCalendarViewProps, HeadingValueProps, RangeSelectionCalendarViewProps, CalendarWithHeaderViewProps {
}
declare class YearRangeView extends BaseCalendarView<YearRangeViewProps, any> {
    static defaultProps: {
        active: {
            start: any;
            end: any;
        };
    };
    render(): JSX.Element;
}
export default YearRangeView;
