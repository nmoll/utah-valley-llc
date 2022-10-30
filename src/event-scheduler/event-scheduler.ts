import { Dayjs } from "dayjs";
import { CalendarEvent } from "../model/calendar-event.model";
import { Member } from "../model/member";
import { ScheduleUtil } from "../util/schedule.util";
import { ScheduleConfig } from "./schedule-config";
import {
  BibleClassStrategy,
  ScheduleEventStrategyFactory,
  ScheduleMultiplePianistsStrategy,
} from "./schedule-strategy";

export class EventScheduler {
  constructor(private config: ScheduleConfig) {}

  private scheduleEventStrategyFactory = new ScheduleEventStrategyFactory(
    this.config.scheduleUpdates
  );

  schedule(date: Dayjs): CalendarEvent | null {
    const update = this.config.scheduleUpdates.find((update) =>
      update.date.isSame(date, "day")
    );

    if (update?.cancelled) {
      return null;
    }

    const scheduleStrategy =
      this.scheduleEventStrategyFactory.getStrategy(date);
    if (!scheduleStrategy) {
      return null;
    }

    const description = scheduleStrategy.getDescription(date);
    const host = this.scheduleHost(date);
    const pianists = this.schedulePianists(date);
    const bibleClassLeader = this.scheduleBibleClassLeader(date);

    if (!host) {
      return null;
    }

    return {
      date,
      description,
      host,
      pianists,
      bibleClassLeader,

      ...update?.changes,
    };
  }

  scheduleAll(start: Dayjs, end: Dayjs): CalendarEvent[] {
    return ScheduleUtil.getDatesBetween(start, end)
      .map((date) => this.schedule(date))
      .filter((event): event is CalendarEvent => !!event);
  }

  private scheduleHost(date: Dayjs): Member | null {
    const eventDates = this.getEventDates(date);

    return ScheduleUtil.scheduleMember(this.config.hosts, eventDates);
  }

  private schedulePianists(date: Dayjs): Member[] {
    const schedulePianistStrategy = new ScheduleMultiplePianistsStrategy(
      this.config.scheduleUpdates
    );
    const eventDates = this.getEventDates(date);
    const pastEventsWithMultiplePianists = eventDates
      .filter((d) => d.isBefore(date))
      .filter(ScheduleUtil.dateFilter([schedulePianistStrategy]));

    const allEvents = eventDates
      .concat(pastEventsWithMultiplePianists)
      .sort((a, b) => a.unix() - b.unix());

    const pianist = ScheduleUtil.scheduleMember(
      this.config.pianists,
      allEvents
    );

    if (!pianist) {
      return [];
    }

    const result = [pianist];

    if (schedulePianistStrategy.matches(date)) {
      result.push(
        ScheduleUtil.getNextActiveMember(pianist, this.config.pianists, date)
      );
    }
    return result;
  }

  private scheduleBibleClassLeader(date: Dayjs): Member | null {
    const bibleClassStrategy = new BibleClassStrategy();
    if (!bibleClassStrategy.matches(date)) {
      return null;
    }

    const eventDates = this.getEventDates(date).filter(
      ScheduleUtil.dateFilter([bibleClassStrategy])
    );

    return ScheduleUtil.scheduleMember(
      this.config.bibleClassLeaders,
      eventDates
    );
  }

  /**
   * Returns all dates which match any event scheduling strategy
   * between the scheduling start date and the given date.
   *
   * The scheduling start date is determined by the
   * first host's active date
   */
  private getEventDates(date: Dayjs): Dayjs[] {
    return ScheduleUtil.getDatesBetween(this.config.hosts[0].active, date)
      .filter((date) => !this.isCancelled(date))
      .filter(
        ScheduleUtil.dateFilter(this.scheduleEventStrategyFactory.getAll())
      );
  }

  private isCancelled(date: Dayjs): boolean {
    return this.config.scheduleUpdates.some(
      (update) => update.date.isSame(date, "day") && update.cancelled
    );
  }
}
