import dayjs from "dayjs";
import { Member } from "../model/member";
import { ScheduleUpdate } from "../model/schedule-update.model";
import { AdminService } from "./admin.service";
import { HttpService } from "./http.service";

describe("AdminService", () => {
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

      const hosts: Member[] = [
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

      const result = await adminService.getHosts();
      expect(result).toEqual(hosts);
      expect(httpService.get).toHaveBeenCalledWith(
        "https://llcuv-calendar-default-rtdb.firebaseio.com/hosts.json"
      );
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
