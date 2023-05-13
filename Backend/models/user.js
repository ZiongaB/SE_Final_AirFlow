/**
 * This models the functions and data format to be
 * used for updating/retrieving user information
 * @author Zach East
 */
const db = require("../util/database");

//Export all functions of this class 
module.exports = class User{

    //Constructor for object
    constructor(Name,Email,Password,Total_budget){
     this.Name = Name;
     this.Email=Email;
     this.Password = Password;
     this.Total_budget = Total_budget;
    }

    //Retrive user information based on email
    static find(email){
        return db.execute(
            'SELECT * FROM user WHERE email = ?', [email]
        );
    }

    //Save new user in database
    static save(user){
        return db.execute(
            'INSERT INTO user (Username,Email,Password,Total_budget) VALUES (?, ?, ?,0)', [user.name,user.email,user.password]
        );
    }

    //Update the budget field of a specific user
    static budget(userDetails){
        return db.execute(
            'UPDATE user SET Total_budget = ?  WHERE ID = ?', [userDetails.budget ,userDetails.id]
        );
    }

    //Retrive only the budget from a specific user
    static fetchBudget(userId)
    {
        return db.execute(
            `SELECT Total_budget FROM user WHERE ID = ${userId}`
        );
    }
    
};
