import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDocument } from './models/user.schema';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver(() => UserDocument)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserDocument)
  createUser(@Args('currentUserInput') currentUserInput: CreateUserDto) {
    return this.usersService.create(currentUserInput);
  }

  @Query(() => [UserDocument], { name: 'users' })
  findAll() {
    return this.usersService.getUsers();
  }
}
