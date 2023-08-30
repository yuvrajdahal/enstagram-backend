import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  caption: string;
  file: string;
  user: Schema.Types.ObjectId;
}

const postSchema = new mongoose.Schema<IPost>({
  caption: {
    type: String,
    required: [true, "Need caption"],
  },
  file: {
    type: String,
    required: [true, "Need a file"],
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
