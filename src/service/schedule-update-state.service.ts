export class ScheduleUpdateStateService {
  private constructor() {}

  private static instance: ScheduleUpdateStateService | null = null;

  static getInstance(): ScheduleUpdateStateService {
    if (!this.instance) {
      this.instance = new ScheduleUpdateStateService();
    }

    return this.instance;
  }
}
