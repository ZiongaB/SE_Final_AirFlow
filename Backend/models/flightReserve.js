//Zach East
const db = require('../util/database');

module.exports = class FlightReserve {
    constructor(user, tripname, flight1, cost1, time1, flight2, cost2, time2){
        this.user = user;
        this.tripname = tripname;
        this.flight1 = flight1;
        this.cost1 = cost1;
        this.time1 = time1;
        this.flight2 = flight2;
        this.cost2 = cost2;
        this.time2 = time2;
    }
    static fetchAll()
    {
        return db.execute('SELECT * FROM Airflow.flights');
    }

    static save(post){
        return db.execute(
            'INSERT INTO Airflow.flights (user, tripname, flight1, cost1, time1, flight2, cost2, time2) VALUES (?,?,?,?,?, ?,?,?)',
            [post.user, post.tripname, post.flight1, post.cost1, post.time1, post.flight2, post.cost2, post.time2]
        );
    }
}