import dayjs from "dayjs";
import { EventScheduler } from "../../event-scheduler/event-scheduler";
import { CalendarEvent } from "../../model/calendar-event.model";
import { AdminService } from "../../service/admin.service";
import { HttpService } from "../../service/http.service";

export class CalendarStore {
  private static INSTANCE: CalendarStore = new CalendarStore();

  calendarEvents$!: Promise<CalendarEvent[]>;

  private constructor() {
    this.calendarEvents$ = this.load();
  }

  static getInstance() {
    return CalendarStore.INSTANCE;
  }

  reload() {
    const instance = CalendarStore.getInstance();
    instance.calendarEvents$ = instance.load();
    return instance.calendarEvents$;
  }

  private load() {
    const adminService = new AdminService(new HttpService());

    return Promise.all([
      adminService.getHosts(),
      adminService.getPianists(),
      adminService.getBibleClassLeaders(),
      adminService.getScheduleUpdates(),
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
}
