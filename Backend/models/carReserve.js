//Zach East
const db = require('../util/database');

module.exports = class CarReserve {
    constructor(user, tripname, description, rentalinfo, pickup, returntime, cost) {
        this.user = user;
        this.description = description;
        this.tripname = tripname;
        this.rentalinfo = rentalinfo; 
        this.pickup = pickup;
        this.returntime = returntime;
        this.cost = cost;
    }

    static fetchAll()
    {
        return db.execute('SELECT * FROM Airflow.cars');
    }

    static save(post){
        return db.execute(
            'INSERT INTO Airflow.cars (user, tripname, description, rentalinfo, pickup, returntime, cost) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [post.user, post.tripname, post.description, post.rentalinfo, post.pickup, post.returntime, post.cost]
        );
    }


}