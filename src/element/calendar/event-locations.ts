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

const tbd: EventLocation = {
  name: "TBD",
  address: "",
};

export const locationData: Record<string, EventLocation> = {
  "2022-06-05": tbd,
  "2022-06-08": seniorCenter,
  "2022-06-11": broadbentCommunityRoom,
  "2022-06-12": broadbentCommunityRoom,
  "2022-06-15": seniorCenter,
  "2022-06-19": tbd,
  "2022-06-22": seniorCenter,
  "2022-06-25": broadbentCommunityRoom,
};
