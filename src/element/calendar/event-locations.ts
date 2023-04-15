import { Dayjs } from "dayjs";

export interface EventLocation {
  name: string;
  address: string;
}

const seniorCenter: EventLocation = {
  name: "Senior Center",
  address: "123 N Center Street, Lehi, UT 84043",
};

const postedOnSignal: EventLocation = {
  name: "Posted on Signal",
  address: "",
};

const cedarFort: EventLocation = {
  name: "Cedar Fort",
  address: "475 100 E St, Cedar Fort, UT 84013",
};

const tbd: EventLocation = {
  name: "TBD",
  address: "",
};

export const locationData: Record<string, EventLocation> = {
  "2022-12-03": seniorCenter,
  "2023-02-16": seniorCenter,
  "2023-03-04": seniorCenter,
  "2023-03-11": seniorCenter,
  "2023-03-24": seniorCenter,
  "2023-03-30": seniorCenter,
  "2023-04-07": seniorCenter,
  "2023-04-09": cedarFort,
  "2023-04-11": seniorCenter,
  "2023-04-19": postedOnSignal,
  "2023-04-25": seniorCenter,
  "2023-05-20": tbd,
};

export const getLocation = (date: Dayjs): EventLocation | undefined => {
  const location = locationData[date.format("YYYY-MM-DD")];

  if (location) {
    return location;
  }

  // if the date is Wednesday, return senior center
  if (date.day() === 3) {
    return seniorCenter;
  } else {
    return cedarFort;
  }
};
