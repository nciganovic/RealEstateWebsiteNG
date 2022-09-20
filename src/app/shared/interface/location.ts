import { Street } from "./street";

export interface Location
{
    id: number,
    street: Street,
    city: string,
    country: string
}

export interface LocationToSend
{
    streetName: string,
    streetNumber: string,
    cityId: number,
}