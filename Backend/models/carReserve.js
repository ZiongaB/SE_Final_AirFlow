/**
 * This models the functions and data format to be
 * used by the carReserve controller and route files
 * @author Zach East
 */
const db = require('../util/database');

//Export all functions of this class 
module.exports = class CarReserve {

    //Constructor for object
    constructor(user, tripname, description, rentalinfo, pickup, returntime, cost) {
        this.user = user;
        this.description = description;
        this.tripname = tripname;
        this.rentalinfo = rentalinfo; 
        this.pickup = pickup;
        this.returntime = returntime;
        this.cost = cost;
    }

    //Function to pass pull specific entries in database by user
    static fetchAll(user)
    {
        return db.execute(
            `SELECT * FROM Airflow.cars WHERE user = ${user}`
        );
    }

    //Function to insert new entry into database using values from passed objects
    static save(post){
        return db.execute(
            'INSERT INTO Airflow.cars (user, tripname, description, rentalinfo, pickup, returntime, cost) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [post.user, post.tripname, post.description, post.rentalinfo, post.pickup, post.returntime, post.cost]
        );
    }

    static deleteid(id){
        return db.execute('DELETE FROM Airflow.hotels WHERE tripid = ?',[id]);
    } 
    static delete(id){
        return db.execute('DELETE FROM Airflow.cars WHERE id = ?',[id]);
    } 


}