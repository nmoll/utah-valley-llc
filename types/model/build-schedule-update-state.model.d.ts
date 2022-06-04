export declare const ScheduleUpdateActionType: {
    readonly SwapHosts: "Swap hosts";
    readonly "Swap pianists": "Swap pianists";
    readonly "Swap bible class": "Swap bible class";
    readonly "Add new service": "Add new service";
    readonly "Cancel service": "Cancel service";
    readonly "Add me to rotation": "Add me to rotation";
    readonly "Remove me temporarily": "Remove me temporarily";
    readonly "Remove me permanently": "Remove me permanently";
};
export declare const scheduleUpdateActions: ("Swap hosts" | "Swap pianists" | "Swap bible class" | "Add new service" | "Cancel service" | "Add me to rotation" | "Remove me temporarily" | "Remove me permanently")[];
export declare type ScheduleUpdateAction = typeof ScheduleUpdateActionType[keyof typeof ScheduleUpdateActionType];
interface ChooseAction {
    type: "Choose Action";
}
export declare type BuildScheduleUpdateState = ChooseAction;
export {};
