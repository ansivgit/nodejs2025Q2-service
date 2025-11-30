export interface Album extends Record<string, string | number | null> {
  readonly id: string; // uuid v4
  name: string;
  year: number;
  artistId?: string | null;
}
