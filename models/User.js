const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    // Reference to thoughts
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought'
    }],
    // Reference to other users
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// Virtual called `friendCount` that retrieves the length of the user's `friends` array field
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);


module.exports = User;