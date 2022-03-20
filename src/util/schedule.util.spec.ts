import dayjs from "dayjs";
import { Member } from "../model/member";
import { hosts, hostsByName } from "../test/mock-data";
import { ScheduleUtil } from "./schedule.util";

describe("ScheduleUtil", () => {
  describe(ScheduleUtil.getNextActiveMember.name, () => {
    it("should return first member if null", () => {
      expect(
        ScheduleUtil.getNextActiveMember(null, hosts, dayjs("2022-01-02"))
      ).toEqual(hostsByName["A"]);
    });

    it("should return next member in the list", () => {
      expect(
        ScheduleUtil.getNextActiveMember(
          hostsByName["A"],
          hosts,
          dayjs("2022-01-02")
        )
      ).toEqual(hostsByName["B"]);
    });

    it("should return the first member if given the last member in the list", () => {
      expect(
        ScheduleUtil.getNextActiveMember(
          hostsByName["D"],
          hosts,
          dayjs("2022-01-02")
        )
      ).toEqual(hostsByName["A"]);
    });

    it("should skip members not active", () => {
      const members: Member[] = [
        {
          name: "A",
          active: dayjs("2022-01-01"),
        },
        {
          name: "B",
          active: dayjs("2022-01-02"),
          inactive: [
            {
              start: dayjs("2022-01-03"),
              end: dayjs("2022-01-04"),
            },
            {
              start: dayjs("2022-01-06"),
              end: dayjs("2022-01-12"),
            },
          ],
        },
        {
          name: "C",
          active: dayjs("2022-01-03"),
          inactive: [
            {
              start: dayjs("2022-01-07"),
              end: null,
            },
          ],
        },
      ];

      expect(
        ScheduleUtil.getNextActiveMember(
          members[0],
          members,
          dayjs("2022-01-01")
        )
      ).toEqual(members[0]);

      expect(
        ScheduleUtil.getNextActiveMember(
          members[0],
          members,
          dayjs("2022-01-02")
        )
      ).toEqual(members[1]);

      expect(
        ScheduleUtil.getNextActiveMember(
          members[1],
          members,
          dayjs("2022-01-02")
        )
      ).toEqual(members[0]);

      expect(
        ScheduleUtil.getNextActiveMember(
          members[0],
          members,
          dayjs("2022-01-03")
        )
      ).toEqual(members[2]);

      expect(
        ScheduleUtil.getNextActiveMember(
          members[1],
          members,
          dayjs("2022-01-03")
        )
      ).toEqual(members[2]);

      expect(
        ScheduleUtil.getNextActiveMember(
          members[2],
          members,
          dayjs("2022-01-03")
        )
      ).toEqual(members[0]);

      expect(
        ScheduleUtil.getNextActiveMember(
          members[0],
          members,
          dayjs("2022-01-04")
        )
      ).toEqual(members[2]);

      expect(
        ScheduleUtil.getNextActiveMember(
          members[0],
          members,
          dayjs("2022-01-05")
        )
      ).toEqual(members[1]);

      expect(
        ScheduleUtil.getNextActiveMember(
          members[0],
          members,
          dayjs("2022-01-06")
        )
      ).toEqual(members[2]);

      expect(
        ScheduleUtil.getNextActiveMember(
          members[0],
          members,
          dayjs("2022-01-07")
        )
      ).toEqual(members[0]);

      expect(
        ScheduleUtil.getNextActiveMember(
          members[0],
          members,
          dayjs("2022-01-13")
        )
      ).toEqual(members[1]);

      expect(
        ScheduleUtil.getNextActiveMember(
          members[1],
          members,
          dayjs("2022-01-13")
        )
      ).toEqual(members[0]);

      expect(
        ScheduleUtil.getNextActiveMember(
          members[2],
          members,
          dayjs("2022-01-13")
        )
      ).toEqual(members[0]);
    });
  });
});
