import { celebrate, Segments, Joi } from 'celebrate';

function JoiObjectId() {
  return Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'valid MongoDB ObjectId');
}

export const listTools = celebrate({
  [Segments.QUERY]: {
    tag: Joi.string().optional(),
  }
});

export const createTool = celebrate({
  [Segments.BODY]: {
    title: Joi.string().required(),
    link: Joi.string().uri().required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
  }
});

export const deleteTool = celebrate({
  [Segments.PARAMS]: {
    id: JoiObjectId(),
  }
});

export const credentials = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
});
