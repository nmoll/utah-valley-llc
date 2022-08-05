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
  "2022-08-03": seniorCenter,
  "2022-08-07": {
    address: "730 W Northlake Dr, Lehi",
    name: "Nate & Kate's",
  },
  "2022-08-11": broadbentCommunityRoom,
  "2022-08-14": broadbentCommunityRoom,
  "2022-08-18": broadbentCommunityRoom,
  "2022-08-21": broadbentCommunityRoom,
  "2022-08-24": seniorCenter,
  "2022-08-27": broadbentCommunityRoom,
  "2022-08-28": broadbentCommunityRoom,
  "2022-08-31": seniorCenter,

  "2022-09-04": broadbentCommunityRoom,
  "2022-09-07": seniorCenter,
  "2022-09-11": broadbentCommunityRoom,
  "2022-09-14": seniorCenter,
  "2022-09-18": broadbentCommunityRoom,
  "2022-09-22": broadbentCommunityRoom,
  "2022-09-24": broadbentCommunityRoom,
  "2022-09-25": broadbentCommunityRoom,
};
