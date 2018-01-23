var MongoClient = require('mongodb').MongoClient;
var settings = require('../settings');

function User(user){
    this.name = user.name;
    this.password = user.password;
}

module.exports = User;

User.prototype.save = function save(callback) {
    var user = {
        name: this.name,
        password: this.password
    };

    MongoClient.connect(settings.url, function (err,database) {
        if(err){
            return callback(err);
        }
        database.db(settings.db).collection('users',function(err, collection){
            if(err){
                database.close();
                return callback(err);
            }
            collection.ensureIndex('name',{unique:true});
            collection.insert( user, {safe:true}, function(err, user){
                database.close();
                callback(err,user);
            })
        });
    });
}

User.get = function(username, callback){
    MongoClient.connect(settings.url, function(err,database){
        if(err){
            return callback(err);
        }
        database.db(settings.db).collection('users',function(err, collection){
            if(err){
                database.close();
                return callback(err);
            }
            collection.findOne({name: username}, function (err, doc) {
                database.close();
                if(doc){
                    var user = new User(doc);
                    callback(err, user);
                }else{
                    callback(err,null);
                }
            });
        });
    });
}

User.getCurrentUser = function(req){
    return req.session.user;
}

User.setCurrentUser = function(req,user){
    req.session.user = user;
}