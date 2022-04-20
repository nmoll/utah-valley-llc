export const ScheduleUpdateActionType = {
  SwapHosts: "Swap hosts",
  "Swap pianists": "Swap pianists",
  "Swap bible class": "Swap bible class",
  "Add new service": "Add new service",
  "Cancel service": "Cancel service",
  "Add me to rotation": "Add me to rotation",
  "Remove me temporarily": "Remove me temporarily",
  "Remove me permanently": "Remove me permanently",
} as const;

export const scheduleUpdateActions = Object.values(ScheduleUpdateActionType);

export type ScheduleUpdateAction =
  typeof ScheduleUpdateActionType[keyof typeof ScheduleUpdateActionType];

interface ChooseAction {
  type: "Choose Action";
}

export type BuildScheduleUpdateState = ChooseAction;
