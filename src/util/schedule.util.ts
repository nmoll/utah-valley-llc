import { Dayjs } from "dayjs";
import { ScheduleStrategy } from "../event-scheduler/schedule-strategy";
import { Member } from "../model/member";

/**
 * Returns the next active member starting
 * from the given member.
 */
const getNextActiveMember = (
  prev: Member | null,
  members: Member[],
  date: Dayjs
): Member => {
  if (!prev) {
    return members[0];
  }
  const prevIdx = members.findIndex((member) => member.name === prev.name);
  const next = members[prevIdx + 1];
  if (!next) {
    return members[0];
  }
  if (!isMemberActive(next, date)) {
    return getNextActiveMember(next, members, date);
  }
  return next;
};

/**
 * Schedules the member on rotation for the last event date
 */
const scheduleMember = (
  members: Member[],
  eventDates: Dayjs[],
  options?: { initial: Member | null }
): Member | null =>
  eventDates.reduce<Member | null>(
    (prev, eventDate) => getNextActiveMember(prev, members, eventDate),
    options?.initial ?? null
  );

/**
 * Whether the member is active on the given date
 */
const isMemberActive = (member: Member, date: Dayjs): boolean =>
  member.active <= date &&
  !member.inactive?.some(
    (inactive) =>
      inactive.start <= date && (!inactive.end || inactive.end >= date)
  );

/**
 * Returns a list of dates between and including the given dates
 */
const getDatesBetween = (start: Dayjs, end: Dayjs): Dayjs[] => [
  start,
  ...(start < end ? getDatesBetween(start.add(1, "day"), end) : []),
];

/**
 * Filters dates by schedule strategies
 */
const dateFilter = (scheduleStrategies: ScheduleStrategy[]) => (date: Dayjs) =>
  scheduleStrategies.some((strategy) => strategy.matches(date));

export const ScheduleUtil = {
  getNextActiveMember,
  scheduleMember,
  isMemberActive,
  getDatesBetween,
  dateFilter,
};
