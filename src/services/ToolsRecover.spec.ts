import ToolsRecover from './ToolsRecover';
import IToolsRepository from '../repositories/IToolsRepository';
import { IToolsRepository as IToolsRepositoryProvider } from '../repositories/provider';

const notion = {
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
};
const jsonServer = {
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
};
const fastify = {
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
};

let repository: IToolsRepository;
let service: ToolsRecover;

describe('Tools Recover', () => {
  beforeEach(() => {
    repository = IToolsRepositoryProvider.mock;
    service = new ToolsRecover(repository);
  });

  it('should be able to list tools in the repository', async () => {
    await Promise.all([
      repository.save(notion),
      repository.save(jsonServer),
      repository.save(fastify),
    ]);

    const found = await service.recover();
    expect(found).toEqual(
      expect.arrayContaining([
        expect.objectContaining(notion),
        expect.objectContaining(jsonServer),
        expect.objectContaining(fastify),
      ])
    );
  });

  it('should be able to list only tools with given tag', async () => {
    await Promise.all([
      repository.save(notion),
      repository.save(jsonServer),
      repository.save(fastify),
    ]);

    const found = await service.recover('node');
    expect(found).toEqual(
      expect.arrayContaining([
        expect.not.objectContaining(notion),
        expect.objectContaining(jsonServer),
        expect.objectContaining(fastify),
      ])
    );
  });

  it('should be able to list no tool when there is no tool with given tag', async () => {
    await Promise.all([
      repository.save(notion),
      repository.save(jsonServer),
      repository.save(fastify),
    ]);

    const found = await service.recover('ux');
    expect(found).toEqual([]);
  });
});
