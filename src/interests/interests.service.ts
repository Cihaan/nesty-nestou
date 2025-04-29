import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service'; // Import UserService

@Injectable()
export class InterestsService {
  constructor(private userService: UserService) {} // Inject UserService

  findAll(): string[] {
    return this.userService.getAvailableInterests();
  }
}
