const db = require("../util/database");

module.exports = class User{
    constructor(Name,Email,Password){
     this.Name = Name;
    this.Email=Email;
    this.Password = Password;
    }

    static find(email){
        return db.execute(
            'SELECT * FROM user WHERE email = ?', [email]
        );
    }

    static save(user){
        return db.execute(
            'INSERT INTO user (Username,Email,Password,Total_budget) VALUES (?, ?, ?,0)', [user.name,user.email,user.password]
        );
    }
    
};

