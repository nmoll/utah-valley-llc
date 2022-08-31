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
        { active: "2022-06-01", name: "Bryce & Emily" },
        { active: "2022-06-01", name: "Eric & Janell" },
        { active: "2022-06-01", name: "Nate & Kate" },
        { active: "2022-06-01", name: "Kenton & Katie" },
        { active: "2022-06-01", name: "Jeremy & Brooke" },
        { active: "2022-06-01", name: "Girls Place" },
        { active: "2022-06-01", name: "Draper Guys" },
        { active: "2022-06-01", name: "Matt, Chad, Alan, Sam" },
        { active: "2022-06-01", name: "Quincy & Nora" },
        { active: "2022-06-01", name: "Cody & Briana" },
        { active: "2022-06-01", name: "Trav & Hayley" },
      ])

        // return this.httpService
        //   .get<MemberResponse>(`${API}/hosts.json`)
        .then(this.transformMembersResponse)
    );
  }

  getPianists(): Promise<Member[]> {
    return (
      Promise.resolve([
        { active: "2022-06-01", name: "Tristan" },
        { active: "2022-06-01", name: "Emily" },
        { active: "2022-06-01", name: "Nate" },
        { active: "2022-06-01", name: "Hayley S" },
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
        { active: "2022-06-01", name: "John" },
        { active: "2022-06-01", name: "Kenton" },
        { active: "2022-06-01", name: "Chad" },
        { active: "2022-06-01", name: "Trav" },
        { active: "2022-06-01", name: "Cody" },
        { active: "2022-06-01", name: "Quincy" },
        { active: "2022-06-01", name: "Tristan" },
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
          changes: { description: "10am Sunday School Picnic" },
          date: "2022-06-05",
        },
        { changes: { description: "7pm - Mike Kumpula" }, date: "2022-06-11" },
        {
          changes: { description: "10:30 Communion - Mike Kumpula" },
          date: "2022-06-12",
          twoPianists: true,
        },
        {
          date: "2022-07-13",
          changes: { host: "Hayley & Trav" },
        },
        {
          date: "2022-07-24",
          changes: { host: "Kenton & Katie" },
        },
        {
          date: "2022-08-03",
          changes: { host: "Nate & Kate" },
        },
        {
          date: "2022-08-07",
          changes: { host: "Nate & Kate", description: "10:30 Service" },
        },
        {
          date: "2022-08-10",
          cancelled: true,
        },
        {
          date: "2022-08-11",
          changes: {
            description: "7pm Bible Class",
            bibleClassLeader: "Trav",
          },
        },
        {
          date: "2022-08-14",
          changes: {
            host: "Bryce & Emily",
          },
        },
        {
          date: "2022-08-17",
          cancelled: true,
        },
        {
          date: "2022-08-18",
          changes: {
            description: "7pm Bible Class",
            bibleClassLeader: "Cody",
          },
        },
        {
          date: "2022-08-21",
          changes: {
            description: "10am Annual Meeting",
            host: "Trav & Hayley",
          },
        },
        {
          date: "2022-08-27",
          changes: {
            description: "7pm Dale Johnson",
          },
        },
        {
          date: "2022-08-31",
          changes: {
            host: "Bryce & Emily", // Swapped with Trav & Hayley
          },
        },
        {
          date: "2022-08-28",
          changes: {
            description: "10am Dale Johnson",
          },
        },
        {
          date: "2022-09-04",
          changes: {
            host: "Cody & Briana", // Swapped with Nate & Kate
          },
        },
        {
          date: "2022-09-07",
          changes: {
            host: "Trav & Hayley", // Swapped with Bryce & Emily
          },
        },
        {
          date: "2022-09-21",
          cancelled: true,
        },
        {
          date: "2022-09-22",
          changes: {
            description: "7pm Bible Class",
            bibleClassLeader: "Matt",
          },
        },
        {
          date: "2022-09-24",
          changes: {
            description: "7pm Art Harju",
          },
        },
        {
          date: "2022-09-25",
          changes: {
            description: "10:30 Art Harju",
          },
        },
        {
          date: "2022-09-28",
          cancelled: true,
        },
        {
          date: "2022-10-12",
          changes: {
            bibleClassLeader: "TBD",
          },
        },
        {
          date: "2022-10-19",
          changes: {
            bibleClassLeader: "TBD",
          },
        },
        {
          date: "2022-10-26",
          changes: {
            bibleClassLeader: "TBD",
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
