import { Controller, Get, Query } from '@nestjs/common';
import { ExercisesService } from './Exercises.service';
import { GetExercisesDto } from './dto/get-exercise.dto';
import { ExerciseDto } from './dto/exercise.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('exercises')
@Controller('api/v1/exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @ApiOperation({ summary: 'Get all exercises' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ExerciseDto,
    isArray: true,
  })
  @Get()
  getExercises(@Query() query: GetExercisesDto): Promise<ExerciseDto[]> {
    return this.exercisesService.getExercises(query);
  }
}
