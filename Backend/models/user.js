const db = require("../util/database");

module.exports = class User{
    constructor(Name,Email,Password){
     this.Name = Name;
    this.Email=Email;
    this.Password = Password;
    }

    static find(email){
        return db.execute(
            'SELECT * FROM User WHERE email = ?', [email]
        );
    }

    static save(user){
        return db.execute(
            'INSERT INTO User (name,email,password) VALUES (?, ?, ?)', [user.name,user.email,user.password]
        );
    }
    
};

