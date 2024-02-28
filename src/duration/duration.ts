export const MILLISECOND = 1;
export const SECOND = 1000 * MILLISECOND;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;

export enum DurationUnit {
  MILLISECOND = 'MILLISECOND',
  SECOND = 'SECOND',
  MINUTE = 'MINUTE',
  HOUR = 'HOUR',
  DAY = 'DAY',
  WEEK = 'WEEK',
}

export class Duration {
  public static From(x: number, unit: DurationUnit): Duration {
    switch (unit) {
      case DurationUnit.MILLISECOND:
        return Duration.FromMS(x);
      case DurationUnit.SECOND:
        return Duration.FromSecond(x);
      case DurationUnit.MINUTE:
        return Duration.FromMinute(x);
      case DurationUnit.HOUR:
        return Duration.FromHour(x);
      case DurationUnit.DAY:
        return Duration.FromDay(x);
      case DurationUnit.WEEK:
        return Duration.FromWeek(x);
    }
  }

  public static FromMS(x: number): Duration {
    return new Duration(x);
  }

  public static FromSecond(x: number): Duration {
    return new Duration(x * SECOND);
  }

  public static FromMinute(x: number): Duration {
    return new Duration(x * MINUTE);
  }

  public static FromHour(x: number): Duration {
    return new Duration(x * HOUR);
  }

  public static FromDay(x: number): Duration {
    return new Duration(x * DAY);
  }

  public static FromWeek(x: number): Duration {
    return new Duration(x * WEEK);
  }

  constructor(private readonly underlyingMS: number) {}

  public ms(): number {
    return this.underlyingMS;
  }

  public second(): number {
    return this.underlyingMS / SECOND;
  }

  public minute(): number {
    return this.underlyingMS / MINUTE;
  }

  public hour(): number {
    return this.underlyingMS / HOUR;
  }

  public day(): number {
    return this.underlyingMS / DAY;
  }

  public week(): number {
    return this.underlyingMS / WEEK;
  }
}
