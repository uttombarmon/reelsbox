import mongoose from "mongoose";

export interface VideoInterface {
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  control?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
  _id?: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
