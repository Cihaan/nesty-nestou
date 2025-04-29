import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { Project } from './projects/project.entity';
import { UserModule } from './user/user.module';
import { User } from './users/user.entity';
import { InterestsModule } from './interests/interests.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [User, Project],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ProjectModule,
    InterestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
