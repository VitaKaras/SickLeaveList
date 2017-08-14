const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


//define a schema
const UserSchema = new Schema({
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
  },
  // list: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'listElem'
  // }]
});

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  const user = this;
    bcrypt.hash(user.password, 10,  function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

//convert UserSchema to User model
const User = mongoose.model('User', UserSchema);
module.exports = User;
