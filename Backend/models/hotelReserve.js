/**
 * This models the functions and data format to be
 * used by the hotelReserve controller and route files
 * @author Zach East
 */
const db = require('../util/database');

//Export all functions of this class 
module.exports = class HotelReserve {

    //Constructor for object
    constructor(user, tripname, hotel, checkin, checkout, cost){
        this.user = user;
        this.tripname = tripname;
        this.hotel = hotel;
        this.checkin = checkin;
        this.checkout = checkout;
        this.cost = cost;
    }

    //Function to pull specific entries in database by user
    static fetchAll(user)
    {
        return db.execute(
            `SELECT * FROM Airflow.hotels WHERE user = ${user}`
        );
    }

    //Function to insert new entry into database using values from passed objects
    static save(post){
        return db.execute(
            'INSERT INTO Airflow.hotels (user, tripname, hotel, checkin, checkout, cost,tripid) VALUES (?,?,?,?,?,?,?)',
            [post.user, post.tripname, post.hotel, post.checkin, post.checkout, post.cost,post.tripid]
        );
    }

    //Function to delete specific entries in database by user
    static delete(id){
        return db.execute('delete from Airflow.hotels where id = ?',[id]);
    }

    //Function to delete specific entries in database by trip
    static deleteid(id){
        return db.execute('DELETE FROM Airflow.hotels WHERE tripid = ?',[id]);
    } 
}