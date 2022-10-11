import Joi from 'joi';
import {
  UserValidationMessage,
  UserValidationRule,
} from '../../common/enums/enums';
import { LoginUserDTO } from '../../common/types/types';

export const loginUser = Joi.object<LoginUserDTO>({
  password: Joi.string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.NAME_REQUIRED,
    }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': UserValidationMessage.EMAIL_INVALID,
      'string.empty': UserValidationMessage.EMAIL_REQUIRED,
    }),
});
