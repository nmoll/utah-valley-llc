import * as dayjs from "dayjs";
import { Member } from "../model/member";

export const hostsByName: Record<string, Member> = {
  A: {
    name: "Host A",
    active: dayjs("2022-01-02"),
  },
  B: {
    name: "Host B",
    active: dayjs("2022-01-02"),
  },
  C: {
    name: "Host C",
    active: dayjs("2022-01-02"),
  },
  D: {
    name: "Host D",
    active: dayjs("2022-01-02"),
  },
};
export const hosts = Object.values(hostsByName);

export const bibleClassLeadersByName: Record<string, Member> = {
  A: {
    name: "BCL A",
    active: dayjs("2022-01-02"),
  },
  B: {
    name: "BCL B",
    active: dayjs("2022-01-02"),
  },
  C: {
    name: "BCL C",
    active: dayjs("2022-01-02"),
  },
};
export const bibleClassLeaders = Object.values(bibleClassLeadersByName);

export const pianistsByName: Record<string, Member> = {
  A: {
    name: "Pianist A",
    active: dayjs("2022-01-02"),
  },
  B: {
    name: "Pianist B",
    active: dayjs("2022-01-02"),
  },
  C: {
    name: "Pianist C",
    active: dayjs("2022-01-02"),
  },
  D: {
    name: "Pianist D",
    active: dayjs("2022-01-02"),
  },
};
export const pianists = Object.values(pianistsByName);
