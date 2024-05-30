import { Coordinate } from "../../utils/factory";
import { ResponderProp } from "./responderProp";

export interface MapProp{
    curr: Coordinate
    points: (any & {coord: Coordinate})[],
    target?: Coordinate
}