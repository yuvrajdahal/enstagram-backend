import mongoose, { Document, Schema } from "mongoose";

interface IStory extends Document {
  user: Schema.Types.ObjectId;
  story?: string[];
}

const storySchema = new mongoose.Schema<IStory>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  story: {
    type: [String],
    default: [],
  },
});

const Story = mongoose.model<IStory>("Story", storySchema);

export default Story;
