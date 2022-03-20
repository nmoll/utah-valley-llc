import { Dayjs } from "dayjs";
import { CalendarEvent } from "./calendar-event.model";
export interface CalendarDay {
    date: Dayjs;
    event: CalendarEvent | null;
}
