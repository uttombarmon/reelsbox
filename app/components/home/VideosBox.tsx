"use client"
import { useEffect, useState } from "react";
import {VideoInterface} from "@/models/Video";
import { apiClient } from "@/lib/ClientApi";
import { IKVideo } from "imagekitio-next";
function VideosBox() {
    const [videos, setVideos] = useState<VideoInterface[]>([])

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await apiClient.GetVideos()
                console.log(data);
                setVideos(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchVideos()
    }, [])
    return (
        <div className=" w-full mx-10 my-4">
            {
                videos ?
                    <div>
                        {
                            videos.map(e => <IKVideo key={e.title} path={e.url}
                                transformation={[{ height: "200", width: "200" }]}
                                controls={true}></IKVideo>)
                        }
                    </div> : <p>Data load failed!</p>
            }

        </div>
    )
}

export default VideosBox