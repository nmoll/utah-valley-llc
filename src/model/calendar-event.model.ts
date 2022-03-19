import { Dayjs } from "dayjs";
import { Member } from "./member";

export interface CalendarEvent {
  date: Dayjs;
  description: string;
  host: Member;
  bibleClassLeader: Member | null;
  pianists: Member[];
}

export type CalendarEvents = Record<string, CalendarEvent>;
