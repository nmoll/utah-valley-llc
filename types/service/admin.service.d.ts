import { Member } from "../model/member";
import { ScheduleUpdate } from "../model/schedule-update.model";
import { HttpService } from "./http.service";
export declare class AdminService {
    private httpService;
    constructor(httpService: HttpService);
    getHosts(): Promise<Member[]>;
    getPianists(): Promise<Member[]>;
    getBibleClassLeaders(): Promise<Member[]>;
    getScheduleUpdates(): Promise<ScheduleUpdate[]>;
    saveScheduleUpdate(update: ScheduleUpdate): Promise<ScheduleUpdate[]>;
    private transformMembersResponse;
    private transformScheduleUpdatesResponse;
    private transformScheduleUpdateRequest;
}
