import { Member } from "../model/member";
import { ScheduleUpdate } from "../model/schedule-update.model";

export interface ScheduleConfig {
  hosts: Member[];
  pianists: Member[];
  bibleClassLeaders: Member[];
  serviceDirectors: Member[];
  scheduleUpdates: ScheduleUpdate[];
}
