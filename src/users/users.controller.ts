import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class UsersController extends BaseController<User> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }
}
