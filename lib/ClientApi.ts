import { GetVideosInterface } from "@/types/GetVideosTypes";
import { VideoInterface } from "@/types/VTypes";

type fetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};
type VideoFormData = Omit<VideoInterface, "_id">;

class ApiClient {
  private async myFetch<T>(
    endpoint: string,
    limit?: string | number | null,
    options: fetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;
    const defaultHeaders = {
      "Content-Type": "appliction/json",
      ...headers,
    };
    let response;
    if (typeof limit == "string" || limit != null) {
      response = await fetch(`/api${endpoint}`, {
        method,
        headers: defaultHeaders,
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",
      });
    } else {
      response = await fetch(`/api${endpoint}`, {
        method,
        headers: defaultHeaders,
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",
      });
    }

    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  }
  async GetVideos(limit: number) {
    return this.myFetch<GetVideosInterface>("/videos", limit);
  }
  async GetAVideo(id: string) {
    return this.myFetch<VideoInterface>(`/videos/${id}`);
  }
  async CreateAVideo(videoData: VideoFormData) {
    return this.myFetch("/videos", null, {
      method: "POST",
      body: videoData,
    });
  }
}
export const apiClient = new ApiClient();
