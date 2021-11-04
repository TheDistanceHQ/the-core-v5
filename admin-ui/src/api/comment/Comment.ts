import { User } from "../user/User";

export type Comment = {
  content: string | null;
  createdAt: Date;
  createdBy?: User | null;
  id: string;
  updatedAt: Date;
};
