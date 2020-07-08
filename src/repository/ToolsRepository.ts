export interface Tool {
  id: string,
  title: string,
  link: string,
  description: string,
  tags: string[]
}

const tools = [{
  id: '1',
  title: "Notion",
  link: "https://notion.so",
  description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
  tags: [
    "organization",
    "planning",
    "collaboration",
    "writing",
    "calendar"
  ]
}, {
  id: '2',
  title: "json-server",
  link: "https://github.com/typicode/json-server",
  description: "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.",
  tags: [
    "api",
    "json",
    "schema",
    "node",
    "github",
    "rest"
  ]
}, {
  id: '3',
  title: "fastify",
  link: "https://www.fastify.io/",
  description: "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
  tags: [
    "web",
    "framework",
    "node",
    "http2",
    "https",
    "localhost"
  ]
}];

export default class ToolsRepository {
  public async getAll(): Promise<Tool[]> {
    return [ ...tools ];
  }

  public async save(tool: Omit<Tool, 'id'>): Promise<Tool> {
    const lastIndex = tools.length - 1;
    const lastId = Number(tools[lastIndex].id);
    const id = (lastId + 1).toString();
    const newTool = { ...tool, id };
    tools.push(newTool);
    return newTool;
  }

  public async findById(id: string): Promise<Tool | undefined> {
    return tools.find(tool => tool.id === id);
  }

  public async deleteId(id: string): Promise<boolean> {
    const index = tools.findIndex(tool => tool.id === id);
    if (index !== -1) {
      tools.splice(index, 1);
      return true;
    }
    return false;
  }
}
