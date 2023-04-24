/**
 * Model for the CalendarItem data to be sent and recieved
 * @author Zach East
 */
export interface CalendarItem{
    userId: Number,
    event: String,
    start: Date,
    end: Date
}