import { Controller, Get, Query } from '@nestjs/common';
import { ExercisesService } from './Exercises.service';
import { GetExercisesDto } from './dto/get-exrecise.dto';
import { ExerciseDto } from './dto/exrecise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  getExercises(@Query() query: GetExercisesDto): Promise<ExerciseDto[]> {
    return this.exercisesService.getExercises(query);
  }
}
