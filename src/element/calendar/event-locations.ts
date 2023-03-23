import { Dayjs } from "dayjs";

export interface EventLocation {
  name: string;
  address: string;
}

const seniorCenter: EventLocation = {
  name: "Senior Center",
  address: "123 N Center Street, Lehi, UT 84043",
};

const broadbentCommunityRoom: EventLocation = {
  name: "Broadbent Community Room",
  address: "128 North 100 East, Lehi, UT 43033",
};

const postedOnSignal: EventLocation = {
  name: "Posted on Signal",
  address: "",
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
  "2023-04-09": tbd,
  "2023-04-11": seniorCenter,
  "2023-04-19": postedOnSignal,
  "2023-04-25": seniorCenter,
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
    return broadbentCommunityRoom;
  }
};
