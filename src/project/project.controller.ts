import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Project } from '../projects/project.entity';
import { User, UserRole } from '../users/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ENTREPRENEUR)
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() user: User,
  ): Promise<Project> {
    return this.projectService.create(createProjectDto, user.id);
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.projectService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @GetUser() user: User,
  ): Promise<Project> {
    return this.projectService.update(id, updateProjectDto, user.id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ENTREPRENEUR, UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.projectService.delete(id, user);
  }

  @Get('recommended')
  async findRecommended(@GetUser() user: User): Promise<Project[]> {
    return this.projectService.findRecommendedProjects(user.id);
  }
}
