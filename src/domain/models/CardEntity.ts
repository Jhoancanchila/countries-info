export interface CardEntity {
  id: number | string;
  title: string;
  subTitle?: string;
  threeTitle: string;
  point: string | number;
  subPoint: string | number;
  image: string;
  category?: string;
}