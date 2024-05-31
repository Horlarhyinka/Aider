import { Coordinate } from "../../../utils/factory"
export interface Emergency{
    name: string
    description: string
    coord: Coordinate
    active: boolean
    remark?: string
    _id: string
}

