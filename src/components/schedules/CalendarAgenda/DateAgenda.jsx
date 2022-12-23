import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Agenda } from "react-native-calendars";
import RenderEmptyData from "./RenderEmptyData";
import SchedulesRenderItem from "./SchedulesRenderItem";
import { apiGet } from "../../../services/api/axios.method";
// main component
const DateAgenda = ({ selected_place }) => {
  const [schedules, setSchedules] = useState({});
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsloading] = useState(false);
// 
  const getSchedules = async () => {
    if(!selected_place || isLoading) return 
    setSchedules({});
    setIsloading(true);
    const { data, error } = await apiGet(
      `/api/schedule/${date}/${selected_place}`
    ); // add place to a
    if (data?.data?.length && !error) {
      const scheds = {};
      scheds[
        `${date?.getFullYear()}-${date?.getMonth() + 1}-${date?.getDate()}`
      ] = data?.data;
      setSchedules(scheds);
      setIsloading(false);
    } else {
      setSchedules({});
      setIsloading(false);
      console.log("errrrrrrrr", error);
    }
    setIsloading(false);
  };
  useEffect(() => {
    getSchedules();
  }, [date, selected_place]);
  return (
    <Agenda
      // The list of items that have to be displayed in agenda. If you want to render item as empty date
      // the value of date key has to be an empty array []. If there exists no value for date key it is
      // considered that the date in question is not yet loaded
      items={schedules}
      // Callback that gets called on day press
      onDayPress={(day) => {
        setDate(new Date(day?.dateString));
        console.log("day pressed", new Date(day?.dateString));
      }}
      // Initially selected day
      selected={new Date()}
      // Max amount of months allowed to scroll to the past. Default = 50
      pastScrollRange={1}
      // Max amount of months allowed to scroll to the future. Default = 50
      futureScrollRange={1}
      renderEmptyData={() => {
        return isLoading ? (
          <ActivityIndicator
            className="absolute right-[50%] top-[50%]"
            size={32}
            color="#2389DA"
          />
        ) : (
          <RenderEmptyData />
        );
      }}
      renderDay={(day, item) => <SchedulesRenderItem day={day} item={item} getSchedules={getSchedules} />}
      theme={{
        agendaDayTextColor: "#2389DA",
        agendaDayNumColor: "green",
        agendaTodayColor: "red",
        agendaKnobColor: "#2389DA",
      }}
      // Agenda container style
      style={null}
    />
  );
};

export default DateAgenda;
