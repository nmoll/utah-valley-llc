import * as dayjs from "dayjs";
import { Member } from "../model/member";

export const createMember = (
  name: string,
  active: string,
  extra?: {
    inactive?: [
      {
        start: string;
        end: string | null;
      }
    ];
  }
): Member => ({
  name,
  active: dayjs(active),
  inactive: extra?.inactive?.map((inactive) => ({
    start: dayjs(inactive.start),
    end: inactive.end ? dayjs(inactive.end) : null,
  })),
});
