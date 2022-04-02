import dayjs from "dayjs";
import { Member } from "../model/member";
import { ScheduleUpdate } from "../model/schedule-update.model";
import { HttpService } from "./http.service";

type MemberResponse = null | Array<{
  name?: string;
  active?: string;
} | null>;

interface SerializedScheduleUpdate {
  date: string;
  changes?: {
    description?: string;
  };
  twoPianists?: true;
}

type ScheduleUpdateResponse = null | Array<SerializedScheduleUpdate | null>;

const API = "https://llcuv-calendar-default-rtdb.firebaseio.com";

export class AdminService {
  constructor(private httpService: HttpService) {}

  getHosts(): Promise<Member[]> {
    return this.httpService
      .get<MemberResponse>(`${API}/hosts.json`)
      .then(this.transformMembersResponse);
  }

  getPianists(): Promise<Member[]> {
    return this.httpService
      .get<MemberResponse>(`${API}/pianists.json`)
      .then(this.transformMembersResponse);
  }

  getBibleClassLeaders(): Promise<Member[]> {
    return this.httpService
      .get<MemberResponse>(`${API}/bibleCLassLeaders.json`)
      .then(this.transformMembersResponse);
  }

  getScheduleUpdates(): Promise<ScheduleUpdate[]> {
    return this.httpService
      .get<ScheduleUpdateResponse>(`${API}/scheduleUpdates.json`)
      .then(this.transformScheduleUpdatesResponse);
  }

  saveScheduleUpdate(update: ScheduleUpdate): Promise<ScheduleUpdate[]> {
    return this.getScheduleUpdates().then((updates) => {
      const existingIdx = updates.findIndex(
        (u) => u.date.isSame(update.date),
        "day"
      );

      if (existingIdx > -1) {
        return this.httpService
          .put(
            `${API}/scheduleUpdates/${existingIdx}.json`,
            this.transformScheduleUpdateRequest(update)
          )
          .then(() =>
            updates.map((u, idx) => (idx === existingIdx ? update : u))
          );
      } else {
        return this.httpService
          .post(
            `${API}/scheduleUpdates.json`,
            this.transformScheduleUpdateRequest(update)
          )
          .then(() => [...updates, update]);
      }
    });
  }

  private transformMembersResponse(members: MemberResponse): Member[] {
    if (!members) {
      return [];
    }

    return members
      .map((member) => ({
        name: member?.name ?? null,
        active: member?.active ? dayjs(member.active) : null,
      }))
      .filter(
        (member): member is Member =>
          member.name !== null && member.active !== null
      );
  }

  private transformScheduleUpdatesResponse(
    scheduleUpdates: ScheduleUpdateResponse
  ): ScheduleUpdate[] {
    if (!scheduleUpdates) {
      return [];
    }

    return scheduleUpdates
      .filter((update) => !!update)
      .map((update) => ({
        date: update?.date ? dayjs(update?.date) : dayjs(),
        changes: {
          ...(update?.changes?.description
            ? { description: update?.changes?.description }
            : {}),
        },
        ...(update?.twoPianists === true ? { twoPianists: true } : {}),
      }));
  }

  private transformScheduleUpdateRequest(
    update: ScheduleUpdate
  ): SerializedScheduleUpdate {
    return {
      date: update.date.format("YYYY-MM-DD"),
      changes: update.changes,
      twoPianists: update.twoPianists,
    };
  }
}
