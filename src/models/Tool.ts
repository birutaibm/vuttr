import mongoose from 'mongoose';

export interface ITool {
  id: string,
  title: string,
  link: string,
  description: string,
  tags: string[]
}

const ToolSchema = new mongoose.Schema({
  title: String,
  link: String,
  description: String,
  tags: [String]
});

type DocumentTool = ITool & mongoose.Document;

export function extractInfo(registry: DocumentTool | null) : ITool | undefined {
  if (registry) {
    return {
      id: registry._id,
      description: registry.description,
      title: registry.title,
      link: registry.link,
      tags: registry.tags,
    };
  }
  return undefined;
}

export default mongoose.model<DocumentTool>('Tool', ToolSchema);
