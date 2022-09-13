import { Dayjs } from "dayjs";
import { Member } from "../model/member";
import { ScheduleUpdate } from "../model/schedule-update.model";

export class ScheduleEventStrategyFactory {
  constructor(private scheduleUpdates: ScheduleUpdate[]) {}

  getAll(): ScheduleEventStrategy[] {
    return [
      new UpdatedEventStrategy(this.scheduleUpdates),
      new SundayMorningServiceStrategy(),
      new SongServicesStrategy(),
      new BibleClassStrategy(),
    ];
  }

  getStrategy(
    date: Dayjs,
    options: { exclude?: ScheduleEventStrategy } = {}
  ): ScheduleEventStrategy | null {
    const strategy = this.getAll().find((strategy) => {
      if (
        options.exclude &&
        options.exclude.constructor === strategy.constructor
      ) {
        return false;
      }
      return strategy.matches(date);
    });
    return strategy ?? null;
  }
}

export interface ScheduleStrategy {
  matches(date: Dayjs): boolean;
}

export interface ScheduleEventStrategy extends ScheduleStrategy {
  getDescription(date: Dayjs): string;
  getScheduleHostStrategy(date: Dayjs): ScheduleHostStrategy;
}

export class UpdatedEventStrategy implements ScheduleEventStrategy {
  constructor(private updates: ScheduleUpdate[]) {}

  matches(date: Dayjs): boolean {
    return !!this.getUpdate(date);
  }

  getDescription(date: Dayjs): string {
    const update = this.getUpdate(date);
    if (update?.changes?.description) {
      return update.changes.description;
    }
    const defaultStrategy = this.getDefaultStrategy(date);
    if (defaultStrategy) {
      return defaultStrategy.getDescription(date);
    }

    return "";
  }

  getScheduleHostStrategy(date: Dayjs): ScheduleHostStrategy {
    const defaultStrategy = this.getDefaultStrategy(date);
    if (defaultStrategy) {
      return defaultStrategy.getScheduleHostStrategy(date);
    }
    return new ScheduleEveningHostStrategy();
  }

  private getDefaultStrategy(date: Dayjs): ScheduleEventStrategy | null {
    return new ScheduleEventStrategyFactory(this.updates).getStrategy(date, {
      exclude: this,
    });
  }

  private getUpdate(date: Dayjs): ScheduleUpdate | undefined {
    return this.updates.find((update) => update.date.isSame(date, "day"));
  }
}

export class BibleClassStrategy implements ScheduleEventStrategy {
  matches(date: Dayjs): boolean {
    return date.day() === 3 && date.date() > 7;
  }
  getDescription() {
    return "7pm Bible Class";
  }
  getScheduleHostStrategy(): ScheduleHostStrategy {
    return new ScheduleEveningHostStrategy();
  }
}

export class SongServicesStrategy implements ScheduleEventStrategy {
  matches(date: Dayjs): boolean {
    return date.day() === 3 && date.date() <= 7;
  }
  getDescription(): string {
    return "7pm Song Services";
  }
  getScheduleHostStrategy(): ScheduleHostStrategy {
    return new ScheduleEveningHostStrategy();
  }
}

export class SundayMorningServiceStrategy implements ScheduleEventStrategy {
  matches(date: Dayjs): boolean {
    return date.day() === 0;
  }
  getScheduleHostStrategy(): ScheduleHostStrategy {
    return new ScheduleMorningHostStrategy();
  }
  getDescription(): string {
    return "10:30 Service";
  }
}

export interface ScheduleHostStrategy extends ScheduleStrategy {
  offsetInitialHost(): boolean;
  getRotationOffset(hosts: Member[]): Member | null;
}

export class ScheduleMorningHostStrategy implements ScheduleHostStrategy {
  matches(date: Dayjs): boolean {
    return date.day() === 0;
  }
  offsetInitialHost(): boolean {
    return false;
  }
  getRotationOffset(): Member | null {
    return null;
  }
}

export class ScheduleEveningHostStrategy implements ScheduleHostStrategy {
  matches(date: Dayjs): boolean {
    return date.day() !== 0;
  }
  offsetInitialHost(): boolean {
    return true;
  }

  /**
   * Offsets the rotation to the middle host so morning
   * and evening rotations are different
   */
  getRotationOffset(hosts: Member[]): Member | null {
    return hosts[Math.floor((hosts.length - 1) / 2)];
  }
}

export class ScheduleMultiplePianistsStrategy implements ScheduleStrategy {
  constructor(private updates: ScheduleUpdate[]) {}

  matches(date: Dayjs): boolean {
    return this.updates.some(
      (update) => update.date.isSame(date, "day") && update.twoPianists
    );
  }
}
