export interface EventItem {
  id: number;
  title: string;
  coords: [number, number];
  imageUrl: string;
  description: string;
  offline: boolean;
  date: string;
  category: string;
  addres: string;
  organization: string,
  contacts: string,
  tags: string[],
  status: boolean
}