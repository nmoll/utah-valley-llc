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

const ssPicnic: EventLocation = {
  name: "Mesquite Park",
  address: "N Mesquite Way, Cedar Hills, UT 84062",
};

export const locationData: Record<string, EventLocation> = {
  "2023-06-04": ssPicnic,
};

export const getLocation = (date: Dayjs): EventLocation | undefined => {
  const location = locationData[date.format("YYYY-MM-DD")];

  if (location) {
    return location;
  }

  return cedarFort;
};
