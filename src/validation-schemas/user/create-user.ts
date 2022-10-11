import Joi from 'joi';
import {
  UserValidationMessage,
  UserValidationRule,
} from '../../common/enums/enums';
import { CreateUserDTO } from '../../common/types/types';

export const createUser = Joi.object<CreateUserDTO>({
  name: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-z]+$/)
    .messages({
      'string.empty': UserValidationMessage.NAME_REQUIRED,
      'string.pattern': UserValidationMessage.NAME_PATTERN,
    }),
  password: Joi.string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.NAME_REQUIRED,
    }),
  age: Joi.number()
    .integer()
    .min(UserValidationRule.AGE_MIN)
    .required()
    .messages({ 'number.min': UserValidationMessage.AGE_MIN }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': UserValidationMessage.EMAIL_INVALID,
      'string.empty': UserValidationMessage.EMAIL_REQUIRED,
    }),
});
