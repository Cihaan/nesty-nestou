import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private availableInterests: string[] = [
    'Technologie',
    'Écologie',
    'Finance',
    'Santé',
    'Éducation',
    'Art & Culture',
    'Social',
    'Autre',
  ];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  getAvailableInterests(): string[] {
    return this.availableInterests;
  }

  async setUserInterests(userId: string, interests: string[]): Promise<User> {
    const user = await this.findById(userId);

    const invalidInterests = interests.filter(
      (interest) => !this.availableInterests.includes(interest),
    );
    if (invalidInterests.length > 0) {
      throw new BadRequestException(
        `Invalid interests: ${invalidInterests.join(', ')}`,
      );
    }

    user.interests = interests;
    return this.usersRepository.save(user);
  }

  async getUserInterests(userId: string): Promise<string[]> {
    const user = await this.findById(userId);
    return user.interests || [];
  }
}
