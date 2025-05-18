import { DashBoard } from "../components/dashBoard/DashBoard";
import { SelectCountry } from "../components/selectCountry/SelectCountry";
import { SelectDateRange } from "../components/selectDateRange/SelectDateRange";

import style from "./MainPage.module.css";

const MainPage = () => {
  return (
    <>
      <div className={style.container}>
        <SelectCountry />
        <SelectDateRange />
      </div>
      <DashBoard />
    </>
  );
};

export default MainPage;
