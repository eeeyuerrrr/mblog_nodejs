var MongoClient = require('mongodb').MongoClient;
var settings = require('../settings');

function Post(username, post, time ){
    this.username = username;
    this.post = post;
    this.time = time ? time : new Date();
}

module.exports = Post;

Post.prototype.save = function save(callback){
    var post = {
        username : this.username,
        post: this.post,
        time: this.time
    };
    MongoClient.connect( settings.url, function (err, database) {
       if(err){
           return callback(err);
       }
       database.db(settings.db).collection(settings.post_collection, function(error, collection){
           if(error){
               database.close();
               return callback(error);
           }
           // 为 user 属性添加索引
           collection.ensureIndex('username');
           collection.insert(post, {safe:true}, function(error, post){
               database.close();
               callback(error,post);
           });
       });
    });
}

Post.get = function(username, callback){
    MongoClient.connect( settings.url, function (err, database) {
        if(err){
            return callback(err);
        }
        database.db( settings.db ).collection( settings.post_collection, function(error, collection){
            if(error){
                database.close();
                callback(error);
            }
            var query = username ? {'username': username} : {};
            collection.find(query).sort({time: -1}).toArray(function (error, docs) {
                mongodb.close();
                if(error){
                    callback(error,null);
                }
                var posts = [];
                docs.forEach(function (doc, index) {
                    var post = new Post(doc.username, doc.post, doc.time);
                    posts.push( post );
                });
                callback(null, posts);
            });
        });
    });
}
