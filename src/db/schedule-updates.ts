import * as dayjs from "dayjs";
import { CalendarEvent } from "../model/calendar-event.model";
import { ScheduleUpdate } from "../model/schedule-update.model";

const update = (
  date: string,
  update?: {
    changes: Partial<CalendarEvent>;
    twoPianists?: true;
  }
): ScheduleUpdate => ({
  date: dayjs(date),
  changes: update?.changes ?? {},
  twoPianists: update?.twoPianists,
});

export const scheduleUpdates: ScheduleUpdate[] = [
  update("2022-03-26", {
    changes: {
      description: "7pm Bible Class - Daniel",
    },
  }),
  update("2022-03-27", {
    changes: {
      description: "10:30 Communion",
    },
    twoPianists: true,
  }),
];
