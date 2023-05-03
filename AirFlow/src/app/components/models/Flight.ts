/**
 * Model for the Flight data to be sent and recieved
 * @author Zach East
 */
export interface Flight{
    tripid:Number,
    id:Number,
    userid: Number,
    tripname: String,

    flight: String,
    cost: Number,
    time: Date,
    time2:String,
}