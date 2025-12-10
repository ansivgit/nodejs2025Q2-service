export interface Artist extends Record<string, string | boolean> {
  readonly id: string; // uuid v4
  name: string;
  grammy?: boolean;
}
