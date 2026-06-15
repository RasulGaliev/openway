export type ActivityType = 'tournament' | 'lecture' | 'volunteer' | 'other';

export interface Activity {
  id: string;
  title: string;
  description: string;
  points: number;
  date: string;
  type: ActivityType;
  createdBy: string;
}
