import { VideoInterface } from "./VTypes";

export interface GetVideosInterface {
  videos: VideoInterface;
  hasMore: boolean;
  nextCursor: string | null;
}
