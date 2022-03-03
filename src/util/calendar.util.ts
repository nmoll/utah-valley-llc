import { CalendarDay } from "../model/calendar-day.model";
import { CalendarEvent } from "../model/calendar-event.model";

const TODAY = new Date();
const START_OF_MONTH = new Date(
  TODAY.getFullYear(),
  TODAY.getMonth(),
  0
).getDay();

const WEEK_DAY_NAMES: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const MONTH_NAMES: Record<number, string> = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const buildDays = (events: Record<string, CalendarEvent>): CalendarDay[] => {
  const result: CalendarDay[] = [];
  let day = 0 - START_OF_MONTH;
  while (result.length < 35) {
    const date = new Date(TODAY.getFullYear(), TODAY.getMonth(), day++);
    const isCurrentMonth = date.getMonth() === TODAY.getMonth();
    const isToday = isCurrentMonth && date.getDate() === TODAY.getDate();

    result.push({
      date,
      isCurrentMonth,
      isToday,
      event: events[`${date.getMonth()}-${date.getDate()}`] ?? null,
    });
  }

  return result;
};

const filterByFutureEvent = (days: CalendarDay[]): CalendarDay[] =>
  days.filter(
    (day) =>
      !!day.event &&
      day.date.getMonth() >= TODAY.getMonth() &&
      day.date.getDate() >= TODAY.getDate()
  );

const getMonthName = (date: Date) => MONTH_NAMES[date.getMonth()];

const getWeekDayName = (date: Date) => WEEK_DAY_NAMES[date.getDay()];

export const CalendarUtil = {
  buildDays,
  filterByFutureEvent,
  getMonthName,
  getWeekDayName,
};
