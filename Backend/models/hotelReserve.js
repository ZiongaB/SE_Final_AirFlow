//Zach East
const db = require('../util/database');

module.exports = class HotelReserve {
    constructor(user, tripname, hotel, checkin, checkout, cost){
        this.user = user;
        this.tripname = tripname;
        this.flight1 = flight1;
        this.hotel = hotel;
        this.checkin = checkin;
        this.checkout = checkout;
        this.cost = cost;
    }
    static fetchAll()
    {
        return db.execute('SELECT * FROM Airflow.hotels');
    }

    static save(post){
        return db.execute(
            'INSERT INTO Airflow.hotels (user, tripname, hotel, checkin, checkout, cost) VALUES (?,?,?,?,?,?)',
            [post.user, post.tripname, post.hotel, post.checkin, post.checkout, post.cost]
        );
    }
}