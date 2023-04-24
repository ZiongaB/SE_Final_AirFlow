/**
 * Model for the Hotel data to be sent and recieved
 * @author Zach East
 */
export interface Hotel{
    userId: Number,
    tripname: String,
    hotel: String,
    checkin: Date,
    checkout: Date,
    cost: Number
}