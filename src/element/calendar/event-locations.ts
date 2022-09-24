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
  "2022-09-04": broadbentCommunityRoom,
  "2022-09-07": seniorCenter,
  "2022-09-11": broadbentCommunityRoom,
  "2022-09-14": seniorCenter,
  "2022-09-18": broadbentCommunityRoom,
  "2022-09-22": seniorCenter,
  "2022-09-24": broadbentCommunityRoom,
  "2022-09-25": broadbentCommunityRoom,
  "2022-10-05": seniorCenter,
  "2022-10-09": broadbentCommunityRoom,
  "2022-10-12": seniorCenter,
  "2022-10-16": broadbentCommunityRoom,
  "2022-10-19": seniorCenter,
};
