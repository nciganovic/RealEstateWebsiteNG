import { Owner } from "./owner";
import { Location } from "./location";

export interface Property
{
    id: number,
    location: Location,
    status: string,
    price: number,
    type: string,
    rooms: number,
    owner: Owner,
    date: Date,
    img: string
}