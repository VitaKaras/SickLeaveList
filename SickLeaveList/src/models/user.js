var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var uniqueValidator = require('mongoose-unique-validator');

//define a schema
var UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true, // Tells Mongoose to ensure a unique index is created for this path. The following are equivalent:
    required: true, // If true, creates a validation rule requiring this path be set before saving occurs.
    trim: true
  },
  telephone: {
    type: Number,
    required: true,
  },
  login: {
    type: String,
    unique: true,
    required: true,
    trim: true // Creates a setter which calls .trim() on the value
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  }
});

//authenticate input against database
//assign a function to the "statics" object of our UserSchema
UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10,  function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

//UserSchema.plugin(uniqueValidator);
//convert UserSchema to User model
var User = mongoose.model('User', UserSchema);
module.exports = User;
