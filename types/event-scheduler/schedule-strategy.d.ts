import { Dayjs } from "dayjs";
import { Member } from "../model/member";
import { ScheduleUpdate } from "../model/schedule-update.model";
export declare class ScheduleEventStrategyFactory {
    private scheduleUpdates;
    constructor(scheduleUpdates: ScheduleUpdate[]);
    getAll(): ScheduleEventStrategy[];
    getStrategy(date: Dayjs, options?: {
        exclude?: ScheduleEventStrategy;
    }): ScheduleEventStrategy | null;
}
export interface ScheduleStrategy {
    matches(date: Dayjs): boolean;
}
export interface ScheduleEventStrategy extends ScheduleStrategy {
    getDescription(date: Dayjs): string;
    getScheduleHostStrategy(date: Dayjs): ScheduleHostStrategy;
}
export declare class UpdatedEventStrategy implements ScheduleEventStrategy {
    private updates;
    constructor(updates: ScheduleUpdate[]);
    matches(date: Dayjs): boolean;
    getDescription(date: Dayjs): string;
    getScheduleHostStrategy(date: Dayjs): ScheduleHostStrategy;
    private getDefaultStrategy;
    private getUpdate;
}
export declare class BibleClassStrategy implements ScheduleEventStrategy {
    matches(date: Dayjs): boolean;
    getDescription(): string;
    getScheduleHostStrategy(): ScheduleHostStrategy;
}
export declare class SongServicesStrategy implements ScheduleEventStrategy {
    matches(date: Dayjs): boolean;
    getDescription(): string;
    getScheduleHostStrategy(): ScheduleHostStrategy;
}
export declare class SundayMorningServiceStrategy implements ScheduleEventStrategy {
    matches(date: Dayjs): boolean;
    getScheduleHostStrategy(): ScheduleHostStrategy;
    getDescription(): string;
}
export interface ScheduleHostStrategy extends ScheduleStrategy {
    offsetInitialHost(): boolean;
    getRotationOffset(hosts: Member[]): Member | null;
}
export declare class ScheduleMorningHostStrategy implements ScheduleHostStrategy {
    matches(date: Dayjs): boolean;
    offsetInitialHost(): boolean;
    getRotationOffset(): Member | null;
}
export declare class ScheduleEveningHostStrategy implements ScheduleHostStrategy {
    matches(date: Dayjs): boolean;
    offsetInitialHost(): boolean;
    /**
     * Offsets the rotation to the middle host so morning
     * and evening rotations are different
     */
    getRotationOffset(hosts: Member[]): Member | null;
}
export declare class ScheduleMultiplePianistsStrategy implements ScheduleStrategy {
    private updates;
    constructor(updates: ScheduleUpdate[]);
    matches(date: Dayjs): boolean;
}
