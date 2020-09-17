import moment, { Moment } from 'moment';
import * as React from 'react';

import YearRangePicker, {
  YearRangePickerOnChangeData,
} from '../pickers/yearPicker/YearRangePicker';
import InputView from '../views/InputView';
import BaseInput, {
  BaseInputProps,
  BaseInputPropTypes,
  BaseInputState,
  DateRelatedProps,
  DateRelatedPropTypes,
  DisableValuesProps,
  DisableValuesPropTypes,
  MinMaxValueProps,
  MinMaxValuePropTypes,
} from './BaseInput';
import {
  parseArrayOrValue,
  parseValue,
  buildValue,
  parseDatesRange
} from './parse';

export type YearRangeInputProps =
  & BaseInputProps
  & DateRelatedProps
  & MinMaxValueProps
  & DisableValuesProps;

export type YearRangeInputOnChangeData = YearRangeInputProps;

class YearRangeInput extends BaseInput<YearRangeInputProps, BaseInputState> {
  public static readonly defaultProps = {
    ...BaseInput.defaultProps,
    dateFormat: 'YYYY',
    icon: 'calendar',
  };

  public static readonly propTypes = {
    ...BaseInputPropTypes,
    ...DateRelatedPropTypes,
    ...MinMaxValuePropTypes,
    ...DisableValuesPropTypes,
  };

  constructor(props) {
    super(props);
    this.state = {
      popupIsClosed: true,
    };
  }

  public render() {
    const {
      value,
      disable,
      maxDate,
      minDate,
      initialDate,
      dateFormat,
      closable,
      localization,
      ...rest
    } = this.props;

    return (
      <InputView
        popupIsClosed={this.state.popupIsClosed}
        closePopup={this.closePopup}
        openPopup={this.openPopup}
        {...rest}
        value={value}
        onMount={this.onInputViewMount}
        renderPicker={this.getPicker}
      />
    );
  }

  private getPicker = () => {
    const {
      value,
      disable,
      maxDate,
      minDate,
      initialDate,
      dateFormat,
      localization,
    } = this.props;
    const {
      start,
      end,
    } = parseDatesRange(value, dateFormat);
    return (
      <YearRangePicker
        isPickerInFocus={this.isPickerInFocus}
        isTriggerInFocus={this.isTriggerInFocus}
        inline={this.props.inline}
        onCalendarViewMount={this.onCalendarViewMount}
        closePopup={this.closePopup}
        onChange={this.handleSelect}
        dateFormat={dateFormat}
        initializeWith={buildValue(value, initialDate, localization, dateFormat)}
        start={start}
        end={end}
        disable={parseArrayOrValue(disable, dateFormat, localization)}
        maxDate={parseValue(maxDate, dateFormat, localization)}
        minDate={parseValue(minDate, dateFormat, localization)}
        onHeaderClick={() => undefined}
      />
    );
  }

  private handleSelect = (e: React.SyntheticEvent<HTMLElement>,
    { value }: YearRangePickerOnChangeData) => {
    let output = ' - ';
    const {start, end} = value;
    if (start && start.isValid()) {
      if(!end){
        output = `${start.format(this.props.dateFormat)} - `
      }else   if(end.isValid()){
        output = `${start.format(this.props.dateFormat)} - ${end.format(this.props.dateFormat)}`
      }
    }
    const data = {
      ...this.props,
      value: output,
    };
    this.props.onChange(e, data);
    if (this.props.closable && end) {
      this.closePopup();
    }
  }
}

export default YearRangeInput;
