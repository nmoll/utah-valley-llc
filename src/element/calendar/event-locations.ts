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

export const locationData: Record<string, EventLocation> = {
  "2022-12-03": seniorCenter,
  "2023-02-16": seniorCenter,
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
