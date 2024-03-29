const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: timestamp => new Date(timestamp).toLocaleString(),
    },
    reactions: [reactionSchema],
   
  },
  {
    toJSON: {
      getters: true, 
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function(){
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
