import dayjs from "dayjs";
import { Member } from "../model/member";
import { ScheduleUpdate } from "../model/schedule-update.model";
import { AdminService } from "./admin.service";
import { HttpService } from "./http.service";

xdescribe("AdminService", () => {
  let adminService: AdminService;
  let httpService: HttpService;

  beforeEach(() => {
    httpService = new HttpService();
    adminService = new AdminService(httpService);
  });

  describe("getHosts", () => {
    it("should fetch and transform hosts", async () => {
      const httpResponse = [
        {
          name: "Test Host",
          active: "2022-01-01",
        },
        null,
        {
          name: "Foo",
        },
        {
          active: "2022-01-03",
        },
        {
          name: "Bar",
          active: "2022-01-03",
        },
      ];

      const expected: Member[] = [
        {
          name: "Test Host",
          active: dayjs("2022-01-01"),
        },
        {
          name: "Bar",
          active: dayjs("2022-01-03"),
        },
      ];

      jest
        .spyOn(httpService, "get")
        .mockReturnValue(Promise.resolve(httpResponse));

      const actual = await adminService.getHosts();
      expect(actual).toEqual(expected);
      expect(httpService.get).toHaveBeenCalledWith(
        "https://llcuv-calendar-default-rtdb.firebaseio.com/hosts.json"
      );
    });
  });

  describe("getScheduleUpdates", () => {
    it("should fetch schedule update", async () => {
      const httpResponse = [
        {
          date: "2022-01-01",
        },
        {
          date: "2022-01-02",
          changes: {
            description: "Updated description",
          },
          twoPianists: true,
        },
        {
          date: "2022-01-03",
          changes: {
            description: "New Event",
            host: "New host",
            pianists: "Pianist 1",
            bibleClassLeader: "BCL 1",
          },
        },
        {
          date: "2022-01-04",
          changes: {
            pianists: "Pianist 1, Pianist 2",
          },
        },
        {
          date: "2022-01-05",
          cancelled: true,
        },
      ];

      const expected: ScheduleUpdate[] = [
        {
          date: dayjs("2022-01-01"),
          changes: {},
        },
        {
          date: dayjs("2022-01-02"),
          changes: {
            description: "Updated description",
          },
          twoPianists: true,
        },
        {
          date: dayjs("2022-01-03"),
          changes: {
            description: "New Event",
            host: {
              name: "New host",
              active: dayjs("2021-01-01"),
            },
            pianists: [
              {
                name: "Pianist 1",
                active: dayjs("2021-01-01"),
              },
            ],
            bibleClassLeader: {
              name: "BCL 1",
              active: dayjs("2021-01-01"),
            },
          },
        },
        {
          date: dayjs("2022-01-04"),
          changes: {
            pianists: [
              { name: "Pianist 1", active: dayjs("2021-01-01") },
              { name: "Pianist 2", active: dayjs("2021-01-01") },
            ],
          },
        },
        {
          date: dayjs("2022-01-05"),
          changes: {},
          cancelled: true,
        },
      ];

      jest
        .spyOn(httpService, "get")
        .mockReturnValue(Promise.resolve(httpResponse));

      const actual = await adminService.getScheduleUpdates();
      expect(actual).toEqual(expected);
    });
  });

  describe("saveScheduleUpdate", () => {
    it("should add update to list if none exists for date", async () => {
      const httpResponse = [
        {
          date: "2022-01-01",
          changes: {
            description: "Update 1",
          },
        },
      ];

      jest
        .spyOn(httpService, "get")
        .mockReturnValue(Promise.resolve(httpResponse));

      jest.spyOn(httpService, "post").mockReturnValue(Promise.resolve({}));

      const result = await adminService.saveScheduleUpdate({
        date: dayjs("2022-01-02"),
        changes: {
          description: "Update 2",
        },
      });

      expect(result).toEqual<ScheduleUpdate[]>([
        {
          date: dayjs("2022-01-01"),
          changes: {
            description: "Update 1",
          },
        },
        {
          date: dayjs("2022-01-02"),
          changes: {
            description: "Update 2",
          },
        },
      ]);

      expect(httpService.post).toHaveBeenCalledWith(
        "https://llcuv-calendar-default-rtdb.firebaseio.com/scheduleUpdates.json",
        {
          date: "2022-01-02",
          changes: {
            description: "Update 2",
          },
        }
      );
    });

    it("should update existing update if one exists for date", async () => {
      const httpResponse = [
        {
          date: "2022-01-01",
          changes: {
            description: "Update 1",
          },
        },
        {
          date: "2022-01-02",
          changes: {
            description: "Update 2",
          },
        },
      ];

      jest
        .spyOn(httpService, "get")
        .mockReturnValue(Promise.resolve(httpResponse));

      jest.spyOn(httpService, "put").mockReturnValue(Promise.resolve({}));

      const result = await adminService.saveScheduleUpdate({
        date: dayjs("2022-01-02"),
        changes: {
          description: "Update XX",
        },
      });

      expect(result).toEqual<ScheduleUpdate[]>([
        {
          date: dayjs("2022-01-01"),
          changes: {
            description: "Update 1",
          },
        },
        {
          date: dayjs("2022-01-02"),
          changes: {
            description: "Update XX",
          },
        },
      ]);

      expect(httpService.put).toHaveBeenCalledWith(
        "https://llcuv-calendar-default-rtdb.firebaseio.com/scheduleUpdates/1.json",
        {
          date: "2022-01-02",
          changes: {
            description: "Update XX",
          },
        }
      );
    });
  });
});
