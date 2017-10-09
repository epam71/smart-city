export interface News {
  author: string,
  title: string,
  image: string,
  imageKey?: string,
  desc: any,
  date: any,
  approved: boolean,
  rating?: number,
  status: string,
  currentRating?: number;
}
