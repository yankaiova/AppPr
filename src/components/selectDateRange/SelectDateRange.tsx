import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import style from "./SelectDateRange.module.css";
import { useDispatch } from "react-redux";
import { onChangeDate } from "../../model/store/slice";

export const SelectDateRange = () => {
  const dispatch = useDispatch();
  const onChangeDateRange = (
    _dates: unknown,
    dateStrings: [dateTo: string, dateFrom: string]
  ) => {
    const [dateFrom, dateTo] = dateStrings;
    console.log(dateStrings);
    dispatch(onChangeDate({ dateFrom, dateTo }));
  };

  return (
    <div className={style.container}>
      <div>Period</div>
      <RangePicker onChange={onChangeDateRange} width={"700px"} />
    </div>
  );
};
