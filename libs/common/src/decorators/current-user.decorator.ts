import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from 'apps/auth/src/users/models/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  // if return type is http  return from request
  //else for graphQL we return from args
  if (context.getType() === 'http')
    return context.switchToHttp().getRequest().user;

  const user = context.getArgs()[2]?.req.headers?.user;
  if (user) {
    return JSON.parse(user);
  }
};

export const currentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
