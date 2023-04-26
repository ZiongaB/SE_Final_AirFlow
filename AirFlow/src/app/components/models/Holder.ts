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
        flight1: Pick<Flight,"flight1">,
	    cost1: Pick<Flight,"cost1">,
	    time1: Pick<Flight,"time1">, //(These go to calendar as well)
        time12:Pick<Flight,"time12">,
	
	    flight2: Pick<Flight,"flight2">,
	    cost2:Pick<Flight,"cost2">,
	    time2:Pick<Flight,"time2">,// (These go to calendar as well)
        time22:Pick<Flight,"time22">

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