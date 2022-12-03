import dayjs from "dayjs";
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
  twoPianists?: boolean;
  cancelled?: boolean;
}

type ScheduleUpdateResponse = null | Array<SerializedScheduleUpdate | null>;

const API = "https://llcuv-calendar-default-rtdb.firebaseio.com";

export class AdminService {
  constructor(private httpService: HttpService) {}

  getHosts(): Promise<Member[]> {
    return (
      Promise.resolve([
        { active: "2022-11-01", name: "Trav & Hayley" },
        { active: "2022-11-01", name: "Bryce & Emily" },
        { active: "2022-11-01", name: "Nate & Kate" },
        { active: "2022-11-01", name: "Eric & Janell" },
        { active: "2022-11-01", name: "Kenton & Katie" },
        { active: "2022-11-01", name: "Wyatt & Kendra" },
        { active: "2022-11-01", name: "Jake & Suzanne" },
        { active: "2022-11-01", name: "Jeremy & Brooke" },
        { active: "2022-11-01", name: "Girls Place" },
        { active: "2022-11-01", name: "Draper Guys" },
        { active: "2022-11-01", name: "Matt, Chad, Alan, Sam" },
        { active: "2022-11-01", name: "Quincy & Nora" },
        { active: "2022-11-01", name: "Cody & Briana" },
      ])

        // return this.httpService
        //   .get<MemberResponse>(`${API}/hosts.json`)
        .then(this.transformMembersResponse)
    );
  }

  getPianists(): Promise<Member[]> {
    return (
      Promise.resolve([
        { active: "2022-06-01", name: "Hayley S" },
        { active: "2022-10-01", name: "Heidi" },
        { active: "2022-10-01", name: "Kyleigh" },
        { active: "2022-06-01", name: "Nate" },
        { active: "2022-06-01", name: "Emily" },
      ])
        // return this.httpService
        //   .get<MemberResponse>(`${API}/pianists.json`)
        .then(this.transformMembersResponse)
    );
  }

  getBibleClassLeaders(): Promise<Member[]> {
    return (
      Promise.resolve([
        { active: "2022-06-01", name: "Eric" },
        { active: "2022-06-01", name: "Matt" },
        { active: "2022-06-01", name: "Chad" },
        { active: "2022-06-01", name: "Kenton" },
        { active: "2022-06-01", name: "Trav" },
        { active: "2022-06-01", name: "John" },
        { active: "2022-06-01", name: "Cody" },
        { active: "2022-06-01", name: "Quincy" },
      ])
        // return this.httpService
        //   .get<MemberResponse>(`${API}/bibleClassLeaders.json`)
        .then(this.transformMembersResponse)
    );
  }

  getScheduleUpdates(): Promise<ScheduleUpdate[]> {
    return (
      Promise.resolve([
        {
          date: "2022-11-09",
          changes: {
            description: "Home Services",
            host: "TBD",
            bibleClassLeader: "none",
            pianists: "N/A",
          },
        },
        {
          date: "2022-11-12",
          changes: {
            description: "7pm Rory Sorvala",
          },
        },
        {
          date: "2022-11-13",
          changes: {
            description: "10:30 Communion - Rory Sorvala",
            pianists: "Emily, Kyleigh",
          },
          twoPianists: true,
        },
        {
          date: "2022-11-16",
          cancelled: true,
        },
        {
          date: "2022-11-23",
          changes: {
            bibleClassLeader: "Kenton",
          },
        },
        {
          date: "2022-11-30",
          changes: {
            bibleClassLeader: "Kenton",
          },
        },
        {
          date: "2022-12-03",
          changes: {
            description: "6:30pm Christmas Program",
            pianists: "Nate",
          },
        },
        {
          date: "2022-12-04",
          changes: {
            description: "10:30am Communion - Terry Ruonavaara",
          },
          twoPianists: true,
        },
        {
          date: "2022-12-07",
          cancelled: true,
        },
        {
          date: "2022-12-11",
          changes: {
            pianists: "Hayley S",
          },
        },
        {
          date: "2022-12-14",
          cancelled: true,
        },
        {
          date: "2022-12-15",
          changes: {
            description: "7pm Xmas Song Services",
            pianists: "Nate",
          },
        },
        {
          date: "2022-12-18",
          changes: {
            pianists: "Emily",
          },
        },
        {
          date: "2022-12-21",
          changes: {
            bibleClassLeader: "Trav",
          },
        },
        {
          date: "2022-12-24",
          changes: {
            description: "4pm Christmas Eve",
            host: "Wyatt & Kendra",
          },
        },
        {
          date: "2022-12-25",
          changes: {
            description: "11am Christmas Day",
          },
        },
        {
          date: "2022-12-28",
          cancelled: true,
        },
        {
          date: "2022-12-29",
          changes: {
            description: "7pm Bible Class",
            bibleClassLeader: "Cody",
          },
        },
        {
          date: "2023-01-11",
          changes: {
            bibleClassLeader: "John",
          },
        },
        {
          date: "2023-01-18",
          changes: {
            bibleClassLeader: "Quincy",
          },
        },
      ])
        // return this.httpService
        //   .get<ScheduleUpdateResponse>(`${API}/scheduleUpdates.json`)
        .then(this.transformScheduleUpdatesResponse)
    );
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
