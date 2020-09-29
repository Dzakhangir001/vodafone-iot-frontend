const SKIP = Symbol('skip timer tick');
type Skip = typeof SKIP;

type ArgumentFactory<A> = (skip: Skip) => A | Skip;
const EMPTY_ARG = (): any => undefined;

type Callback<A> = (arg: A) => void;
type Unschedule = () => void;

export default class Ticker<A> {
  private registry = new Set<Callback<A>>();
  private handle?: number;

  public constructor(public readonly interval: number, private arg: ArgumentFactory<A> = EMPTY_ARG) {}

  public get suspended(): boolean {
    return !this.handle && this.registry.size > 0;
  }

  public schedule(callback: Callback<A>): Unschedule {
    this.registry.add(callback);

    if (!this.handle) {
      this.start();
    }

    return () => {
      this.registry.delete(callback);
      if (!this.registry.size) {
        this.stop();
      }
    };
  }

  public clear(): void {
    this.registry.clear();
    this.stop();
  }

  public suspend(): void {
    this.stop();
  }

  public resume(): void {
    if (this.suspended) {
      this.start();
    }
  }

  private start(): void {
    this.handle = (setTimeout(this.run, this.interval) as unknown) as number;
  }

  private stop(): void {
    clearTimeout(this.handle);
    this.handle = undefined;
  }

  private run = () => {
    try {
      const arg = this.arg(SKIP);

      if (arg === SKIP) {
        return;
      }

      this.notify(arg);
    } finally {
      this.start();
    }
  };

  private notify(arg: A): void {
    for (const callback of this.registry) {
      try {
        callback(arg);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
