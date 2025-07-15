import mongoose, { Document } from "mongoose";

export interface VideoInterface extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  url: string;
  thumbnail: string;
  userId: mongoose.Types.ObjectId;
  category?: "showcase" | "tutorial" | "promo" | "personal" | "other";
  tags?: string[];
  duration?: number;
  views: number;
  likes: mongoose.Types.ObjectId[];
  commentsCount: number;
  transformation?: {
    width?: number;
    height?: number;
    quality?: number;
  };
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}
