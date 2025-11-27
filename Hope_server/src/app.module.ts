import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { ProgramsModule } from './programs/programs.module';
import { SessionsModule } from './sessions/sessions.module';
import { SupportRequestsModule } from './support-requests/support-requests.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DonationsModule } from './donations/donations.module';
import { StoriesModule } from './stories/stories.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...(process.env.DISABLE_DATABASE !== 'true'
      ? [
          TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
              ...getDatabaseConfig(configService),
              autoLoadEntities: true,
            }),
            inject: [ConfigService],
          }),
        ]
      : []),
    AuthModule,
    UsersModule,
    StudentsModule,
    ProgramsModule,
    SessionsModule,
    SupportRequestsModule,
    DashboardModule,
    DonationsModule,
    StoriesModule,
    MessagesModule,
  ],
})
export class AppModule {}
