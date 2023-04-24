/**
 * Model for the Checklist data to be sent and recieved
 * @author Zach East
 */
export interface Checklist{
    userId: Number,
    tripname: String,

    item1: String,
    item2: String,
    item3: String,
    item4: String,
    item5: String,

    item6: String,
    item7: String,
    item8: String,
    item9: String,
    item10: String,
    
    checked1: Boolean,
    checked2: Boolean,
    checked3: Boolean,
    checked4: Boolean,
    checked5: Boolean,

    checked6: Boolean,
    checked7: Boolean,
    checked8: Boolean,
    checked9: Boolean,
    checked10: Boolean,
}