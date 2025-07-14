import mongoose from "mongoose";

export interface UserInterface {
  name?: string;
  email: string;
  password: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
