import mongoose, {Schema,model,models} from "mongoose";

export interface VideoInterface {
    title : string;
    description : string;
    url : string;
    thumbnail : string;
    control? : boolean;
    transformation? : {
        height : number;
        width : number;
        quality? : number;
    }
    _id? : mongoose.Schema.Types.ObjectId;
    createDate? : Date;
    updateDate? : Date;
}

const VideoSchema = new Schema<VideoInterface>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true,
    },
    control: {
        type: Boolean,
        default: false,
    },
    transformation: {
        height: {
            type: Number,
            required: true,
        },
        width: {
            type: Number,
            required: true,
        },
        quality: {
            type: Number,
            default: 100,
            min : 1,
            max : 100,
        },
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    updateDate: {
        type: Date,
        default: Date.now,
    },
});

const Video = models.Video || model<VideoInterface>("Video", VideoSchema);
export default Video;