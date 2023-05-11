/**
 * This models the functions and data format to be
 * used by the packinglist controller and route files
 * @author Zach East
 */
const db = require('../util/database');

//Export all functions of this class 
module.exports = class Packinglist {

    //Constructor for object
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

    //Function to pass pull specific entries in database by user
    static fetchAll(user)
    {
        return db.execute(
            `SELECT * FROM Airflow.packinglists WHERE user = ${user}`
        );
    }

    //Function to change the boolean values of the Packinglist table
    static edit(post){
        return db.execute(
            `update Airflow.packinglists SET checked1=?,checked2=?,checked3=?,checked4=?,checked5=?,checked6=?,checked7=?,checked8=?,checked9=?,checked10=?  where tripid=${post.tripid}`,
            [post.checked1,post.checked2,post.checked3,post.checked4,post.checked5,post.checked6,post.checked7,post.checked8,post.checked9,post.checked10]
        )
    }

    //Function to insert new entry into database using values from passed objects
    static save(post){
        return db.execute(
            'INSERT INTO Airflow.packinglists (user, tripname,item1,item2,item3,item4,item5,item6,item7,item8,item9,item10,tripid,checked1,checked2,checked3,checked4,checked5,checked6,checked7,checked8,checked9,checked10) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,0,0,0,0,0,0,0,0,0,0)',
            [post.user, post.tripname,post.item1,post.item2,post.item3,post.item4,post.item5,post.item6,post.item7,post.item8,post.item9,post.item10,post.tripid]
        );
    }


}