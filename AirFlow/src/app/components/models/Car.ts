/**
 * Model for the Car data to be sent and recieved
 * @author Zach East
 */
export interface Car{
    userId: Number,
    tripname: String,
    description: String,
    rentalinfo: String,
    pickup: Date,
    pickup2: String,
    returntime: Date,
    returntime2: String,
    cost: Number
}