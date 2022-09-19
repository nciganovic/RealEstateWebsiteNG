import { Street } from "./street";

export interface Location
{
    street: Street,
    city: string,
    country: string
}

export interface LocationToSend
{
    streetName: string,
    streetNumber: number,
    cityId: number,
}