//Zach East
const db = require('../util/database');

module.exports = class CalendarItem {
    constructor(user, event, start, end) {
        this.user = user;
        this.event = event;
        this.start = start;
        this.end = end;
    }

    static fetchAll()
    {
        return db.execute('SELECT * FROM Airflow.calendar');
    }
    
    
    static fetchUserEvents(specficUser)
    {
        return db.execute('SELECT * FROM Airflow.calendar WHERE user = ${specificUser}', [specficUser.user]);
    }

    static save(post){
        return db.execute(
            'INSERT INTO Airflow.calendar (user, event, start, end) VALUES (?, ?, ?, ?)',
            [post.user, post.event, post.start, post.end]
        );
    }
}