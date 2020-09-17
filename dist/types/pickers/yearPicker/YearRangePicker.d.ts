import { Moment } from 'moment';
import * as React from 'react';
import { RangeIndexes } from '../../views/BaseCalendarView';
import { BasePickerOnChangeData, BasePickerProps, DisableValuesProps, EnableValuesProps, MinMaxValueProps, ProvideHeadingValue, RangeSelectionPicker } from '../BasePicker';
interface YearRangePickerProps extends BasePickerProps, MinMaxValueProps, DisableValuesProps, EnableValuesProps {
    /** Moment date formatting string. */
    dateFormat: string;
    /** Start of currently selected dates range. */
    start: Moment;
    /** End of currently selected dates range. */
    end: Moment;
}
export declare type YearRangePickerOnChangeData = BasePickerOnChangeData;
declare class YearRangePicker extends RangeSelectionPicker<YearRangePickerProps> implements ProvideHeadingValue {
    constructor(props: any);
    render(): JSX.Element;
    getCurrentDate(): string;
    protected buildCalendarValues(): string[];
    protected getInitialDatePosition(): number;
    protected getSelectedRange(): string;
    protected getActiveCellsPositions(): RangeIndexes;
    protected getSelectableCellPositions(): number[];
    protected getDisabledPositions(): number[];
    protected isNextPageAvailable(): boolean;
    protected isPrevPageAvailable(): boolean;
    protected handleChange: (e: React.SyntheticEvent<HTMLElement>, { value }: {
        value: any;
    }) => void;
    protected switchToNextPage: (e: React.SyntheticEvent<HTMLElement>, data: any, callback: () => void) => void;
    protected switchToPrevPage: (e: React.SyntheticEvent<HTMLElement>, data: any, callback: () => void) => void;
}
export default YearRangePicker;
