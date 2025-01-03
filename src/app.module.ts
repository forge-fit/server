import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from './shared/api.config';
import { ExercisesService } from './Exercises/Exercises.service';
import { ExercisesController } from './Exercises/Exercises.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env' : '.local.env',
      isGlobal: true,
    }),
  ],
  controllers: [ExercisesController],
  providers: [ApiConfigService, ExercisesService],
})
export class AppModule {}
