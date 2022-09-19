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

export interface PropertyRecive
{
    id: number,
    city: string,
    country: string,
    date: Date,
    email: string,
    ownerId: number,
    firstName: string,
    img: string,
    lastName: string,
    phoneNumber: string,
    price: number,
    rooms: number,
    status: string,
    streetName: string,
    streetNumber: number,
    type: string
}

export interface PropertyToSend
{
    id?: number,
    locationId: number,
    statusId: number,
    price: number,
    typeId: number,
    rooms: number,
    ownerId: number,
    date: Date,
    img: string
}