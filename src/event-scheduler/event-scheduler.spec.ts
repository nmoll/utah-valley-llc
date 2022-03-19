import * as dayjs from "dayjs";
import { CalendarEvent } from "../model/calendar-event.model";
import { Member } from "../model/member";
import {
  bibleClassLeaders,
  hosts,
  hostsByName,
  pianists,
  pianistsByName,
} from "../test/mock-data";
import { EventScheduler } from "./event-scheduler";
import { ScheduleConfig } from "./schedule-config";

const isCalendarEvent = (obj: any): boolean =>
  !!obj.date && !!obj.description && !!obj.host;

const serializeEvent = (event: CalendarEvent) =>
  `
${event.date.format("ddd MMM D")}: ${event.description}
  Host: ${event.host.name}
  Pianists: ${event.pianists.map((p) => p.name).join(", ")}
  Bible Class: ${event.bibleClassLeader?.name ?? ""}
`.trimStart();

expect.addSnapshotSerializer({
  test: isCalendarEvent,
  serialize: serializeEvent,
});

describe("EventScheduler", () => {
  const config: ScheduleConfig = {
    hosts: hosts,
    bibleClassLeaders: bibleClassLeaders,
    pianists: pianists,
    scheduleUpdates: [],
  };

  describe("scheduleAll()", () => {
    it("should schedule events between dates", () => {
      const scheduler = new EventScheduler(config);

      expect(
        scheduler.scheduleAll(dayjs("2022-01-02"), dayjs("2022-01-30"))
      ).toMatchSnapshot();
    });

    it("should apply description update to event", () => {
      const scheduler = new EventScheduler({
        ...config,
        scheduleUpdates: [
          {
            date: dayjs("2022-01-09"),
            changes: {
              description: "10:30 Communion",
            },
          },
        ],
      });

      expect(scheduler.schedule(dayjs("2022-01-09"))).toEqual<CalendarEvent>({
        date: dayjs("2022-01-09"),
        description: "10:30 Communion",
        bibleClassLeader: null,
        host: hostsByName["B"],
        pianists: [pianistsByName["C"]],
      });
    });

    it("should use default description not updated", () => {
      const scheduler = new EventScheduler({
        ...config,
        scheduleUpdates: [
          {
            date: dayjs("2022-01-09"),
            changes: {
              host: hostsByName["C"],
            },
          },
        ],
      });

      expect(
        scheduler.schedule(dayjs("2022-01-09"))?.description
      ).toEqual<string>("10:30am Service");
    });

    it("should not affect host rotation if replaced for existing event", () => {
      const scheduler = new EventScheduler({
        ...config,
        scheduleUpdates: [
          {
            date: dayjs("2022-01-09"),
            changes: {
              description: "10:30 Communion",
              host: hostsByName["D"],
            },
          },
        ],
      });

      expect(scheduler.schedule(dayjs("2022-01-02"))?.host).toEqual<Member>(
        hostsByName["A"]
      );
      expect(scheduler.schedule(dayjs("2022-01-09"))?.host).toEqual<Member>(
        hostsByName["D"]
      );
      expect(scheduler.schedule(dayjs("2022-01-16"))?.host).toEqual<Member>(
        hostsByName["C"]
      );
    });

    it("should use wednesday rotation if new evening event is scheduled without a specified host", () => {
      const scheduler = new EventScheduler({
        ...config,
        scheduleUpdates: [
          {
            date: dayjs("2022-01-07"),
            changes: {
              description: "New Event",
            },
          },
        ],
      });

      // Host before event is not affected
      expect(scheduler.schedule(dayjs("2022-01-05"))?.host).toEqual<Member>(
        hostsByName["C"]
      );
      // Next host on rotation is scheduled for new event
      expect(scheduler.schedule(dayjs("2022-01-07"))?.host).toEqual<Member>(
        hostsByName["D"]
      );
      // Sunday rotation is not affected
      expect(scheduler.schedule(dayjs("2022-01-09"))?.host).toEqual<Member>(
        hostsByName["B"]
      );
      // Wednesday rotation is adjusted
      expect(scheduler.schedule(dayjs("2022-01-12"))?.host).toEqual<Member>(
        hostsByName["A"]
      );
    });

    it("should use pianist rotation if new event is scheduled", () => {
      const scheduler = new EventScheduler({
        ...config,
        scheduleUpdates: [
          {
            date: dayjs("2022-01-08"),
            changes: {
              description: "New Event",
            },
          },
        ],
      });

      // Pianist before event is not affected
      expect(scheduler.schedule(dayjs("2022-01-05"))?.pianists).toEqual<
        Member[]
      >([pianistsByName["B"]]);
      // Next pianist on rotation is scheduled for new event
      expect(scheduler.schedule(dayjs("2022-01-08"))?.pianists).toEqual<
        Member[]
      >([pianistsByName["C"]]);
      // Sunday rotation is not affected
      expect(scheduler.schedule(dayjs("2022-01-09"))?.pianists).toEqual<
        Member[]
      >([pianistsByName["D"]]);
      // Wednesday rotation is adjusted
      expect(scheduler.schedule(dayjs("2022-01-12"))?.pianists).toEqual<
        Member[]
      >([pianistsByName["A"]]);
    });

    it("should allow two pianists to be scheduled", () => {
      const scheduler = new EventScheduler({
        ...config,
        scheduleUpdates: [
          {
            date: dayjs("2022-01-05"),
            changes: {},
            twoPianists: true,
          },
          {
            date: dayjs("2022-01-10"),
            changes: {
              description: "Special Service 1",
              host: hostsByName["A"],
            },
            twoPianists: true,
          },
          {
            date: dayjs("2022-01-11"),
            changes: {
              description: "Special Service 2",
            },
          },
        ],
      });

      expect(scheduler.schedule(dayjs("2022-01-02"))?.pianists).toEqual<
        Member[]
      >([pianistsByName["A"]]);

      expect(scheduler.schedule(dayjs("2022-01-05"))?.pianists).toEqual<
        Member[]
      >([pianistsByName["B"], pianistsByName["C"]]);

      expect(scheduler.schedule(dayjs("2022-01-09"))?.pianists).toEqual<
        Member[]
      >([pianistsByName["D"]]);

      expect(scheduler.schedule(dayjs("2022-01-10"))?.pianists).toEqual<
        Member[]
      >([pianistsByName["A"], pianistsByName["B"]]);

      expect(scheduler.schedule(dayjs("2022-01-11"))?.pianists).toEqual<
        Member[]
      >([pianistsByName["C"]]);

      expect(scheduler.schedule(dayjs("2022-01-12"))?.pianists).toEqual<
        Member[]
      >([pianistsByName["D"]]);
    });
  });
});
