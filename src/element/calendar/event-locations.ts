import { Dayjs } from "dayjs";

export interface EventLocation {
  name: string;
  address: string;
}

const cedarFort: EventLocation = {
  name: "Cedar Fort",
  address: "475 100 E St, Cedar Fort, UT 84013",
};

// const tbd: EventLocation = {
//   name: "TBD",
//   address: "",
// };

export const locationData: Record<string, EventLocation> = {};

export const getLocation = (date: Dayjs): EventLocation | undefined => {
  const location = locationData[date.format("YYYY-MM-DD")];

  if (location) {
    return location;
  }

  return cedarFort;
};
