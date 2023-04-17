//Zach East
const db = require('../util/database');

module.exports = class Checklist {
    constructor(user, tripname, item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, checked1, checked2, checked3, checked4, checked5, checked6, checked7, checked8, checked9, checked10) {
        this.user = user;
        this.description = description;
        this.tripname = tripname;

        this.item1 = item1;
        this.item2 = item2;
        this.item3 = item3;
        this.item4 = item4;
        this.item5 = item5;
        this.item6 = item6;
        this.item7 = item7;
        this.item8 = item8;
        this.item9 = item9;
        this.item10 = item10;

        this.checked1 = checked1;
        this.checked2 = checked2;
        this.checked3 = checked3;
        this.checked4 = checked4;
        this.checked5 = checked5;
        this.checked6 = checked6;
        this.checked7 = checked7;
        this.checked8 = checked8;
        this.checked9 = checked9;
        this.checked10 = checked10;
        
    }

    static fetchAll()
    {
        return db.execute('SELECT * FROM Airflow.checklists');
    }

    static save(post){
        return db.execute(
            'INSERT INTO Airflow.checklists (user, tripname, item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, checked1, checked2, checked3, checked4, checked5, checked6, checked7, checked8, checked9, checked10) VALUES (?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?)',
            [post.user, post.tripname, post.item1, post.item2, post.item3, post.item4, post.item5, post.item6, post.item7, post.item8, post.item9, post.item10, post.checked1, post.checked2, post.checked3, post.checked4, post.checked5, post.checked6, post.checked7, post.checked8, post.checked9, post.checked10]
        );
    }
}
