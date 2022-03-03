import { CalendarEvent } from "./calendar-event.model";

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  event: CalendarEvent | null;
}
