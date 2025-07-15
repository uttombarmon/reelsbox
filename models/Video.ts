import { VideoInterface } from "@/types/VTypes";
import mongoose, { Model, Schema } from "mongoose";

const VideoSchema: Schema<VideoInterface> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Video title is required."],
      maxlength: [100, "Title cannot be more than 100 characters."],
      trim: true, // Remove whitespace from both ends of a string
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot be more than 500 characters."],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "Video URL is required."],
      unique: true, // Ensure each video has a unique URL
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail URL is required."],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // This creates a reference to a 'User' model (assuming you have one)
      required: [true, "User ID is required."],
      index: true, // Index for faster lookups by user
    },
    category: {
      type: String,
      enum: ["showcase", "tutorial", "promo", "personal", "other"],
      default: "showcase",
      index: true, // Index for faster filtering by category
    },
    tags: {
      type: [String], // Array of strings
      default: [],
      index: true, // Index for faster search/filtering by tags
    },
    duration: {
      type: Number, // Stored in seconds
      min: 0,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
      index: true, // Index for sorting by views
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User", // References users who liked the video
      default: [],
    },
    commentsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    transformation: {
      width: { type: Number },
      height: { type: Number },
      quality: { type: Number, min: 0, max: 100 },
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Video: Model<VideoInterface> =
  mongoose.models.Video || mongoose.model<VideoInterface>("Video", VideoSchema);

export default Video;
