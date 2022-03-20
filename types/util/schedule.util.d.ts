import { Dayjs } from "dayjs";
import { ScheduleStrategy } from "../event-scheduler/schedule-strategy";
import { Member } from "../model/member";
export declare const ScheduleUtil: {
    getNextActiveMember: (prev: Member | null, members: Member[], date: Dayjs) => Member;
    scheduleMember: (members: Member[], eventDates: Dayjs[], options?: {
        initial: Member | null;
    } | undefined) => Member | null;
    isMemberActive: (member: Member, date: Dayjs) => boolean;
    getDatesBetween: (start: Dayjs, end: Dayjs) => Dayjs[];
    dateFilter: (scheduleStrategies: ScheduleStrategy[]) => (date: Dayjs) => boolean;
};
