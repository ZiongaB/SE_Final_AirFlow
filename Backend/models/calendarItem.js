/**
 * This models the functions and data format to be
 * used by the calendar controller and route files
 * @author Zach East
 */
const db = require('../util/database');

//Export all functions of this class 
module.exports = class CalendarItem {

    //Constructor for object
    constructor(user, event, start, end) {
        this.user = user;
        this.event = event;
        this.start = start;
        this.end = end;
    }

    //Function to pass pull specific entries in database by user
    static fetchAll(user)
    {
        return db.execute(
            `SELECT * FROM Airflow.calendar WHERE user = ${user}`
        );
    }

    //Function to insert new entry into database using values from passed objects
    static save(post){
        return db.execute(
            'INSERT INTO Airflow.calendar (user, event, start, end) VALUES (?, ?, ?, ?)',
            [post.user, post.event, post.start, post.end]
        );
    }
}