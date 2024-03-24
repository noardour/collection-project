import { ICollection } from "./ICollection";

export interface IItem {
  id: string;
  title: string;
  image: string;

  collection?: ICollection;
}
