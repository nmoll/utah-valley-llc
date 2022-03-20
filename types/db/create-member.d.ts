import { Member } from "../model/member";
export declare const createMember: (name: string, active: string, extra?: {
    inactive?: [{
        start: string;
        end: string | null;
    }] | undefined;
} | undefined) => Member;
