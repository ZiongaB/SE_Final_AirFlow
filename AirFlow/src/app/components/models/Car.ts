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
    returntime: Date,
    cost: Number
}