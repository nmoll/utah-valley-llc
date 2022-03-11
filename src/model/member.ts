import { Dayjs } from "dayjs";

export interface Member {
  name: string;
  active: Dayjs;
  inactive?: {
    start: Dayjs;
    end: Dayjs | null;
  }[];
}
