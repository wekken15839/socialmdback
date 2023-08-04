import mongoose from "mongoose";


const postSchema = new mongoose.Schema(
  {
    "user": {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
    ,
    "description": {
      type: String,
    },
    "image": {
      type: String
    },
    "visible": {
      type: Boolean,
      default: true,
    },
    "likes": [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"
        },
        date: {
          type: Date, default: Date.now
        }
      }
    ],
    "comments": [
      {
        comment: String,
        date: {
          type: Date,
          default: Date.now
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        }
      },
    ],
  }, { timestamps: true }
)

postSchema.index({ "likes.user": 1, _id: 1 }, { unique: true });


export default mongoose.model('Post', postSchema);