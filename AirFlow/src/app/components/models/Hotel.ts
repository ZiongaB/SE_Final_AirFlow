/**
 * Model for the Hotel data to be sent and recieved
 * @author Zach East
 */
export interface Hotel{
    id: Number;
    userId: Number,
    tripname: String,
    hotel: String,
    checkin: Date,
    checkin2: String,
    checkout: Date,
    checkout2: String,
    cost: Number
}