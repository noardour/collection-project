import { IItem } from "./IItems";
import { IUser } from "./IUser";

export type CollectionCategory = "MOVEIS" | "MUSICAL_ALBUMS" | "BOOKS" | "PAINTINGS" | "MONETS" | "CARS" | "COINS" | "OTHER";

export interface ICollection {
  id: string;
  title: string;
  description: string;
  category: CollectionCategory;
  image: string | null;

  items: IItem[];

  User?: IUser;
}
