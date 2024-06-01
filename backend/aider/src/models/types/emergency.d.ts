import { Document } from "mongoose";
import { Coordinate } from "../../utils/types";

export interface EmergencySchema extends Document{
    name: string
    description: string
    coord: Coord
    active: boolean
    remark: string
}

type Coord = Document & Coordinate