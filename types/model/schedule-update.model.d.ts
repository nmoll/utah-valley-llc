import { Dayjs } from "dayjs";
import { CalendarEvent } from "./calendar-event.model";
export interface ScheduleUpdate {
    date: Dayjs;
    changes: Partial<CalendarEvent>;
    twoPianists?: true;
}
