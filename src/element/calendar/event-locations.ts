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

// const tbd: EventLocation = {
//   name: "TBD",
//   address: "",
// };

export const locationData: Record<string, EventLocation> = {
  "2022-07-10": broadbentCommunityRoom,
  "2022-07-13": seniorCenter,
  "2022-07-17": broadbentCommunityRoom,
  "2022-07-20": seniorCenter,
  "2022-07-24": broadbentCommunityRoom,
  "2022-07-27": seniorCenter,
  "2022-07-31": broadbentCommunityRoom,

  "2022-08-03": seniorCenter,
  "2022-08-07": broadbentCommunityRoom,
  "2022-08-10": seniorCenter,
  "2022-08-14": broadbentCommunityRoom,
  "2022-08-17": seniorCenter,
  "2022-08-21": broadbentCommunityRoom,
  "2022-08-24": seniorCenter,
  "2022-08-28": broadbentCommunityRoom,
};
