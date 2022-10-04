import dayjs from "dayjs";
import { EventScheduler } from "../../event-scheduler/event-scheduler";
import { CalendarEvent } from "../../model/calendar-event.model";
import { AdminService } from "../../service/admin.service";
import { HttpService } from "../../service/http.service";

export class CalendarStore {
  private static INSTANCE: CalendarStore = new CalendarStore();

  calendarEvents$: Promise<CalendarEvent[]>;

  private adminService = new AdminService(new HttpService());

  private constructor() {
    this.calendarEvents$ = Promise.all([
      this.adminService.getHosts(),
      this.adminService.getPianists(),
      this.adminService.getBibleClassLeaders(),
      this.adminService.getScheduleUpdates(),
    ]).then(([hosts, pianists, bibleClassLeaders, scheduleUpdates]) => {
      const scheduler = new EventScheduler({
        hosts,
        pianists,
        bibleClassLeaders,
        scheduleUpdates,
      });

      return scheduler.scheduleAll(
        dayjs().startOf("month"),
        dayjs().add(2, "month").endOf("month")
      );
    });
  }

  static getInstance() {
    return CalendarStore.INSTANCE;
  }
}
