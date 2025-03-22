import mongoose from "mongoose"
import { Coord, EmergencySchema } from "./types/emergency"


const coordSchema = new mongoose.Schema<Coord>({
    lng: { type: Number, required: true},
    lat: { type: Number, required: true},
})

const emergencySchema = new mongoose.Schema<EmergencySchema>({
    name: { type: String, required: true },
    description: {type: String, required: true},
    coord: {type: coordSchema, required: true},
    active: { type: Boolean, default: true},
    remark: { type: String, },
    address: { type: String, },
    image: { type: String, },
    audio: { type: String }

}, {timestamps: true})

export const EmergencyModel = mongoose.model("emergency", emergencySchema)