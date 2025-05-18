import { useGetCountriesQuery } from "../../model/store/api";
import { Select, Space } from "antd";
import type { SelectProps } from "antd";
import { useDispatch } from "react-redux";
import { onChangeCountry } from "../../model/store/slice";
import type { CountryFromApi } from "../../model/types/types";

import style from "./SelectCountry.module.css";

export const SelectCountry = () => {
  const dispatch = useDispatch();
  const { data: countries } = useGetCountriesQuery();

  const options: SelectProps["options"] = [];
  if (countries && countries.length > 0) {
    countries.map((item: CountryFromApi) =>
      options.push({
        value: item.id,
        label: (
          <Space>
            <img src={item.icon} alt="" />
            {item.name}
          </Space>
        ),
        emoji: item.icon,
        desc: item.country,
      })
    );
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    dispatch(onChangeCountry(value));
  };
  return (
    <div className={style.container}>
      <div>Country</div>
      <Select
        placeholder="Country"
        onChange={handleChange}
        options={options}
        labelInValue={false}
        optionRender={(option) => (
          <Space>
            <img src={option.data.emoji} alt="" />
            {option.data.desc}
          </Space>
        )}
      />
    </div>
  );
};
