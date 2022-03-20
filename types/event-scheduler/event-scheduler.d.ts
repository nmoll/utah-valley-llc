import { Dayjs } from "dayjs";
import { CalendarEvent } from "../model/calendar-event.model";
import { ScheduleConfig } from "./schedule-config";
export declare class EventScheduler {
    private config;
    constructor(config: ScheduleConfig);
    private scheduleEventStrategyFactory;
    schedule(date: Dayjs): CalendarEvent | null;
    scheduleAll(start: Dayjs, end: Dayjs): CalendarEvent[];
    private scheduleHost;
    private schedulePianists;
    private scheduleBibleClassLeader;
    /**
     * Returns all dates which match any event scheduling strategy
     * between the scheduling start date and the given date.
     *
     * The scheduling start date is determined by the
     * first host's active date
     */
    private getEventDates;
}
