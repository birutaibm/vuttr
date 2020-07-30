import mongoose from 'mongoose';

import ITool from '../ITool';

const ToolSchema = new mongoose.Schema({
  title: String,
  link: String,
  description: String,
  tags: [String]
});

type DocumentTool = ITool & mongoose.Document;

export function extractInfo(registry: DocumentTool | null) : ITool | undefined {
  if (registry) {
    const normalized = {
      id: registry._id,
      description: registry.description,
      title: registry.title,
      link: registry.link,
      tags: registry.tags,
    };
    if (registry.link === undefined) {
      delete normalized.link;
    }
    return normalized;
  }
  return undefined;
}

export default mongoose.model<DocumentTool>('Tool', ToolSchema);
