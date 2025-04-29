import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Project } from '../projects/project.entity';
import { UserService } from '../user/user.service'; // Import UserService
import { User, UserRole } from '../users/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private userService: UserService, // Inject UserService
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    ownerId: string,
  ): Promise<Project> {
    const project = this.projectsRepository.create({
      ...createProjectDto,
      ownerId,
    });
    return this.projectsRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
  ): Promise<Project> {
    const project = await this.findById(id);

    if (project.ownerId !== userId) {
      throw new UnauthorizedException('You do not own this project');
    }

    this.projectsRepository.merge(project, updateProjectDto);
    return this.projectsRepository.save(project);
  }

  async delete(id: string, user: User): Promise<void> {
    const project = await this.findById(id);

    if (project.ownerId !== user.id && user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        'You do not have permission to delete this project',
      );
    }

    await this.projectsRepository.delete(id);
  }

  async findRecommendedProjects(userId: string): Promise<Project[]> {
    const userInterests = await this.userService.getUserInterests(userId);

    if (!userInterests || userInterests.length === 0) {
      return []; // No interests, no recommendations
    }

    // Find projects where the category matches any of the user's interests
    const recommendedProjects = await this.projectsRepository.find({
      where: {
        category: In(userInterests),
      },
    });

    return recommendedProjects;
  }
}
