import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        stockList: {
            type: [String],  
            default: [], 
        },
    },
);

export const User = mongoose.model('User', userSchema);
