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

type ScheduleUpdateResponse =
  | null
  | Record<string, SerializedScheduleUpdate>
  | Array<SerializedScheduleUpdate>;

const API = "https://llcuv-calendar-default-rtdb.firebaseio.com";

export class AdminService {
  constructor(private httpService: HttpService) {}

  getHosts(): Promise<Member[]> {
    return (
      Promise.resolve([
        { active: "2022-11-01", name: "Nate & Kate" },
        { active: "2022-11-01", name: "Jon & Hanna" },
        { active: "2022-11-01", name: "Eric & Janell" },
        {
          active: "2022-11-01",
          name: "Maria / Lauren / Kyleigh / Taryn / Julia",
        },
        { active: "2022-11-01", name: "Sean & Mandy" },
        { active: "2022-11-01", name: "Cody & Briana" },
        { active: "2022-11-01", name: "Joel & Rebecca" },
        { active: "2022-11-01", name: "Jake & Suzanne" },
        { active: "2022-11-01", name: "Wyatt & Kendra" },
        {
          active: "2022-11-01",
          name: "Abby / Angela / Molly / Hannah / Avery / Karole",
        },
        { active: "2022-11-01", name: "Haps Guys" },
        { active: "2022-11-01", name: "Kristina / Brooke / Jodi / Adeline" },
        { active: "2022-11-01", name: "Quincy & Nora" },
        { active: "2022-11-01", name: "Trav & Hayley" },
        { active: "2022-11-01", name: "Jeremy & Brooke" },
        { active: "2022-11-01", name: "Kenton & Katie" },
        { active: "2022-11-01", name: "Chad & Sarah" },
        { active: "2022-11-01", name: "Bryce & Emily" },
      ])

        // return this.httpService
        //   .get<MemberResponse>(`${API}/hosts.json`)
        .then(this.transformMembersResponse)
    );
  }

  getPianists(): Promise<Member[]> {
    return (
      Promise.resolve([
        // { active: "2022-06-01", name: "Abby" },
        { active: "2023-10-01", name: "Rebecca" },
        { active: "2023-10-01", name: "Angela" },
        { active: "2023-10-01", name: "Nate" },
        { active: "2023-10-01", name: "Heidi" },
        { active: "2023-10-01", name: "Emily" },
        { active: "2023-10-01", name: "Hayley" },
        { active: "2023-10-01", name: "Kyleigh" },
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
        { active: "2022-06-01", name: "Quincy" },
        { active: "2022-06-01", name: "Sean" },
        { active: "2022-06-01", name: "Cody" },
        { active: "2022-06-01", name: "John" },
      ])
        // return this.httpService
        //   .get<MemberResponse>(`${API}/bibleClassLeaders.json`)
        .then(this.transformMembersResponse)
    );
  }

  getServiceDirectors(): Promise<Member[]> {
    return Promise.resolve([
      { active: "2023-10-01", name: "Alan" },
      { active: "2023-10-01", name: "Trent" },
      { active: "2023-10-01", name: "Ben" },
      { active: "2023-10-01", name: "Jake" },
      { active: "2023-10-01", name: "Quincy" },
      { active: "2023-10-01", name: "Joel" },
      { active: "2023-10-01", name: "Sean" },
    ]).then(this.transformMembersResponse);
  }

  getScheduleUpdates(): Promise<ScheduleUpdate[]> {
    return Promise.resolve([
      {
        date: "2024-07-31",
        changes: {
          description: "7pm Song Services",
          bibleClassLeader: "",
        },
        twoPianists: true,
      },
      {
        date: "2024-08-07",
        changes: {
          description: "7pm Bible Class",
        },
      },
      {
        date: "2024-08-17",
        changes: {
          description: "4pm Services/6:30 Discussion - Erkki Joensuu",
        },
      },
      {
        date: "2024-08-18",
        changes: {
          description: "10:30 Communion - Erkki Joensuu",
        },
        twoPianists: true,
      },
      {
        date: "2024-09-07",
        changes: {
          description: "6pm Discussion - Rick Nevela",
        },
      },
      {
        date: "2024-09-08",
        changes: {
          description: "10:30 Communion - Rick Nevela",
        },
        twoPianists: true,
      },
    ]).then(this.transformScheduleUpdatesResponse);
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

    const updates = Array.isArray(scheduleUpdates)
      ? scheduleUpdates
      : Object.values(scheduleUpdates);

    return updates
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
