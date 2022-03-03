export interface CalendarEvent {
  description: string;
  host: string;
  bibleClass?: string;
  pianists: string[];
}

export type CalendarEvents = Record<string, CalendarEvent>;
