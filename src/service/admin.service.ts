import dayjs from "dayjs";
import { AsyncResult } from "../model/async-result.model";
import { Member } from "../model/member";
import { ScheduleUpdate } from "../model/schedule-update.model";
import { HttpService } from "./http.service";

type MemberResponse = null | Array<{
  name?: string;
  active?: string;
  inactive?: {
    start: string;
    end?: string;
  }[];
} | null>;

interface SerializedScheduleUpdateChanges {
  description?: string;
  host?: string;
  pianists?: string;
  bibleClassLeader?: string;
}

interface SerializedScheduleUpdate {
  date: string;
  changes?: SerializedScheduleUpdateChanges;
  twoPianists?: true;
  cancelled?: true;
}

type ScheduleUpdateResponse =
  | null
  | Array<SerializedScheduleUpdate | null>
  | Record<string, SerializedScheduleUpdate>;

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
      .get<MemberResponse>(`${API}/bibleClassLeaders.json`)
      .then(this.transformMembersResponse);
  }

  getScheduleUpdates(): Promise<ScheduleUpdate[]> {
    return this.httpService
      .get<ScheduleUpdateResponse>(`${API}/scheduleUpdates.json`)
      .then(this.transformScheduleUpdatesResponse);
  }

  async saveScheduleUpdate(
    update: ScheduleUpdate
  ): Promise<AsyncResult<ScheduleUpdate[]>> {
    const updates = await this.getScheduleUpdates();
    const existingIdx = updates.findIndex(
      (u) => u.date.isSame(update.date),
      "day"
    );

    if (existingIdx > -1) {
      const resp = await this.httpService.put(
        `${API}/scheduleUpdates/${existingIdx}.json`,
        this.transformScheduleUpdateRequest(update)
      );
      if ("error" in resp) {
        return {
          type: "error",
        };
      }

      return {
        type: "success",
        data: updates.map((u, idx) => (idx === existingIdx ? update : u)),
      };
    } else {
      const resp = await this.httpService.post(
        `${API}/scheduleUpdates.json`,
        this.transformScheduleUpdateRequest(update)
      );
      if ("error" in resp) {
        return {
          type: "error",
        };
      }

      return {
        type: "success",
        data: [...updates, update],
      };
    }
  }

  async saveScheduleUpdates(
    updates: ScheduleUpdate[]
  ): Promise<AsyncResult<ScheduleUpdate[]>> {
    let result = [] as ScheduleUpdate[];
    for (let update of updates) {
      const resp = await this.saveScheduleUpdate(update);
      if (resp.type === "error") {
        return {
          type: "error",
        };
      }
    }

    return {
      type: "success",
      data: result,
    };
  }

  private transformMembersResponse(members: MemberResponse): Member[] {
    if (!members) {
      return [];
    }

    return members
      .map(
        (member) =>
          ({
            name: member?.name ?? null,
            active: member?.active ? dayjs(member.active) : null,
            inactive:
              member?.inactive?.map((inactive) => ({
                start: dayjs(inactive.start),
                end: inactive.end ? dayjs(inactive.end) : null,
              })) ?? [],
          } as Member)
      )
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
    if (!Array.isArray(scheduleUpdates)) {
      scheduleUpdates = Object.values(scheduleUpdates);
    }

    return scheduleUpdates
      .filter((update) => !!update)
      .map((update) => {
        const result: ScheduleUpdate = {
          date: update?.date ? dayjs(update?.date) : dayjs(),
          changes: {},
        };

        if (update?.changes?.description) {
          result.changes.description = update.changes.description;
        }

        if (update?.changes?.host) {
          result.changes.host = {
            active: dayjs("2021-01-01"),
            name: update?.changes?.host,
          };
        }

        if (update?.changes?.bibleClassLeader) {
          result.changes.bibleClassLeader = {
            active: dayjs("2021-01-01"),
            name: update.changes.bibleClassLeader,
          };
        }

        if (update?.changes?.pianists) {
          result.changes.pianists = update.changes.pianists
            .split(",")
            .map((name) => ({
              active: dayjs("2021-01-01"),
              name: name.trim(),
            }));
        }

        if (update?.twoPianists) {
          result.twoPianists = true;
        }

        if (update?.cancelled) {
          result.cancelled = true;
        }

        return result;
      });
  }

  private transformScheduleUpdateRequest(
    update: ScheduleUpdate
  ): SerializedScheduleUpdate {
    const changes: SerializedScheduleUpdateChanges = {};

    if (update.changes.description) {
      changes.description = update.changes.description;
    }

    if (update.changes.host) {
      changes.host = update.changes.host.name;
    }

    if (update.changes.pianists) {
      changes.pianists = update.changes.pianists
        .map((pianist) => pianist.name)
        .join(", ");
    }

    if (update.changes.bibleClassLeader) {
      changes.bibleClassLeader = update.changes.bibleClassLeader.name;
    }

    return {
      date: update.date.format("YYYY-MM-DD"),
      changes,
      twoPianists: update.twoPianists,
    };
  }
}
