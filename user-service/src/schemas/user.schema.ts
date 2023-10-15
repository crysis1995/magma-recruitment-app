import mongoose from "mongoose";
import { UserDto } from "../dto/user.dto";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: Schema.Types.String,
    email: Schema.Types.String,
    createdAt: { type: Schema.Types.Date, default: Date.now },
});

export const UserModel = mongoose.model<UserDto>("Users", userSchema);
