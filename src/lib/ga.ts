export function sendGAEvent({
    event,
    value,
    ...params
  }: {
    event: string;
    value?: string | number;
    [key: string]: any;
  }) {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", event, {
        value,
        ...params,
      });
    }
  }
  