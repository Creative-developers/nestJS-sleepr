import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
// import { currentUser, UserDocument } from '@app/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() creatUserDto: CreateUserDto) {
    return this.userService.create(creatUserDto);
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // async getUser(@currentUser() user: UserDocument) {
  //   return user;
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.userService.getUsers();
  }
}
