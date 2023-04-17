const db = require('../util/database');

module.exports = class Trip {
    constructor(user, tripname, parking){
        this.user = user;
        this.tripname = tripname;
        this.parking = parking;
    }

    static fetchAll()
    {
        return db.execute('SELECT * FROM Airflow.trip');
    }

    static save(post){
        return db.execute(
            'INSERT INTO Airflow.trip (user, tripname, parking) VALUES (?,?,?)',
            [post.user, post.tripname, post.parking]
        );
    }
}