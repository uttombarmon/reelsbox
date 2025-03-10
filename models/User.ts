import bcrypt from 'bcryptjs';
import mongoose, { Schema, model, models } from 'mongoose';

export interface UserInterface {
    name : string;
    email : string;
    password : string;
    _id? : mongoose.Types.ObjectId;
    createDate? : Date;
    updateDate? : Date;
}

const UserSchema = new Schema<UserInterface>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
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

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = models.User || model<UserInterface>('User', UserSchema);
export default User;