import mongoose from "mongoose";

const Schema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const Remider = mongoose.model('kkk', Schema)