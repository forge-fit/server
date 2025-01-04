import {
  Injectable,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { ApiConfigService } from '../shared/api.config';
import { ExerciseDto } from './dto/exercise.dto';
import { GetExercisesDto } from './dto/get-exercise.dto';
import { ExercisesApi } from '@forge-fit/exercises-api';
@Injectable()
export class ExercisesService {
  private readonly exercisesApi: ExercisesApi;

  constructor(private readonly apiConfigService: ApiConfigService) {
    this.exercisesApi = new ExercisesApi(
      this.apiConfigService.getConfiguration(),
    );
  }

  async getExercises(
    @Query() getExercisesDto: GetExercisesDto,
  ): Promise<ExerciseDto[]> {
    try {
      const { offset = 0, limit = 20, search, targetMuscle } = getExercisesDto;

      const { data } = await this.exercisesApi.getExercises(
        0,
        Number.MAX_SAFE_INTEGER,
      );

      let exercises = data;

      if (search) {
        exercises = exercises.filter((exercise) =>
          exercise.name.toLowerCase().includes(search.toLowerCase()),
        );
      }

      if (targetMuscle) {
        exercises = exercises.filter(
          (exercise) =>
            exercise.target ||
            exercise.secondaryMuscles
              .map((muscle) => muscle.toLowerCase())
              .includes(targetMuscle.toLowerCase()),
        );
      }

      const paginatedExercises = exercises.slice(offset, offset + limit);

      return paginatedExercises.map((exercise) => new ExerciseDto(exercise));
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw new InternalServerErrorException('Error fetching exercises');
    }
  }
}
