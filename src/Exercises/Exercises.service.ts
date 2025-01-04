import {
  Injectable,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { ApiConfigService } from '../shared/api.config';
import { ExerciseDto } from './dto/exercise.dto';
import { BodyPart, GetExercisesDto } from './dto/get-exercise.dto';
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
      const { offset = 0, limit = 20, search, bodyPart } = getExercisesDto;

      const { data } = await this.exercisesApi.getExercises(offset, limit);

      let exercises = data;

      if (search) {
        exercises = exercises.filter((exercise) =>
          exercise.name.toLowerCase().includes(search.toLowerCase()),
        );
      }

      if (bodyPart) {
        exercises = exercises.filter(
          (exercise) =>
            exercise.bodyPart.toLowerCase() === bodyPart.toLowerCase(),
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
