import { VideoInterface } from "./VTypes";

export interface GetVideosInterface {
  videos: VideoInterface;
  pagination: {
    skip: number;
    hasMore: boolean;
  };
}
