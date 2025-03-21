import {VideoInterface} from "@/models/Video";

type fetchOptions = {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown,
    headers?: Record<string, string>
}
type VideoFormData = Omit<VideoInterface, "_id">

class ApiClient {
    private async myFetch<T>(
        endpoint : string,
        options: fetchOptions = {}
    ): Promise<T>{
        const { method = "GET", body, headers = {}} = options
        const defaultHeaders = {
            "Content-Type": "appliction/json",
            ...headers
        }
        const response = await fetch(`/api${endpoint}`,{
            method,
            headers:defaultHeaders,
            body: body? JSON.stringify(body) : undefined
        })

        if(!response.ok){
            throw new Error( await response.text());
        }
        return response.json()
    }
    async GetVideos(){
        return this.myFetch<VideoInterface[]>("/videos")
    }
    async GetAVideo(id:string){
        return this.myFetch<VideoInterface>(`/videos/${id}`)
    }
    async CreateAVideo(videoData:VideoFormData){
        return this.myFetch("/videos",{
            method: "POST",
            body: videoData
        })
    }
}
export const apiClient = new ApiClient();