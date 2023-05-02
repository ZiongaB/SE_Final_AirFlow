import { Car } from "./Car";
import { Flight } from "./Flight";
import { Hotel } from "./Hotel";
import { Trip } from "./Trip";


export interface Holder extends Trip,Car,Flight{
    tripinfo:{
        tripname:Pick<Trip,"tripname">,
        parking: Pick<Trip,"parking">
    },

    flightinfo: {
        flight: Pick<Flight,"flight">,
	    cost: Pick<Flight,"cost">,
	    time: Pick<Flight,"time">, //(These go to calendar as well)
        time2:Pick<Flight,"time2">,

    }
    /*8
    carinfo: {
        description: Pick<Car,"description">,
        rentalinfo: Pick<Car,"rentalinfo">,
        pickup: Pick<Car,"pickup">,
        returntime: Pick<Car,"returntime">,
        cost: Pick<Car,"cost">
    },
    hotelinfo:{
        hotel: Pick<Hotel,"hotel">,
        checkin: Pick<Hotel,"checkin">,
        checkout: Pick<Hotel,"checkout">,
        cost: Pick<Hotel,"cost">
    }*/


}