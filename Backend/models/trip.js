/**
 * This models the functions and data format to be
 * used by the trip controller and route files
 * @author Zach East
 */
const db = require('../util/database');

//Export all functions of this class 
module.exports = class Trip {

    //Constructor for object
    constructor(user, tripname, parking){
        this.user = user;
        this.tripname = tripname;
        this.parking = parking;
    }

    //Function to pass pull specific entries in database by user
    static fetchAll(user)
    {
        return db.execute(
            `SELECT * FROM Airflow.trip WHERE user = ${user}`
        );
    }

    //Function to insert new entry into database using values from passed objects
    static save(post){
        return db.execute(
            'INSERT INTO Airflow.trip (user, tripname, parking) VALUES (?,?,?)',
            [post.user, post.tripname, post.parking]
        );
    }
}