import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useParams } from 'react-router-dom';

interface VideoDetails {
    id: string;
    title: string;
    description: string | null;
    views: number;
    uploadDate: Date;
    uploaderId: string;
    uploaderName: string;
    uploaderAvatar: string;
    uploaderSubscribers: number;
}

const Video: FunctionalComponent = () => {
    const [video, setVideo] = useState<VideoDetails>({
        id: "",
        title: "Ukraine: Unexpected dead end in Chernihiv",
        description: null,
        views: 888795, // 0
        uploadDate: new Date(1646528723263),
        uploaderId: "",
        uploaderName: "Fluidstream",
        uploaderAvatar: "https://i.stack.imgur.com/frlIf.png",
        uploaderSubscribers: 5,
    });
    const params = useParams();
    useEffect(() => {
        console.log(`Video ID requested: ${params.id}`);
    }, [params]);
    const formatDate = (date: Date) => {
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return `${day} ${monthNames[monthIndex]} ${year}`;
    }
    const formatNumberShort = (n: number) => {
        if (n < 1000) {
            return n.toString();
        } else if (n < 1000000) {
            return `${Math.floor(n / 1000)}K`;
        } else {
            return `${Math.floor(n / 1000000)}M`;
        }
    }
    const formatNumber = (n: number) => {
        const str = n.toString();
        return str.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    return (
        <div className="text-white border border-gray-800 rounded-md bg-black bg-opacity-50 backdrop-blur-lg flex flex-col px-5 py-2 my-5">
            <div class="video border-b py-5">
                <video class="rounded-md" src="https://files.catbox.moe/xtpvss.mp4" controls /> {/* w-1/2 */}
                <h1 class="text-4xl my-2">{video.title}</h1>
                <p>{formatNumber(video.views)} views | {formatDate(video.uploadDate)}</p>
            </div>
            <div class="py-5 border-b flex space-x-5">
                <img class="w-14 h-14 avatar rounded-md" src={video.uploaderAvatar} />
                <div class="flex flex-col">
                    <h1 class="text-2xl">
                        <a href="" class="text-white">{video.uploaderName}</a>
                    </h1>
                    <p>
                        {formatNumber(video.uploaderSubscribers)} subscribers
                    </p>
                </div>            
            </div>
            <p class="py-5 border-b mb-5">
                {video.description || "No description provided"}
            </p>
        </div>
    );
};

export default Video;
