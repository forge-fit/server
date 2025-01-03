import { Injectable } from '@nestjs/common';
import { ExercisesApi } from '@fit-track/exercises-api';
import { ApiConfigService } from '../shared/api.config';
import { ExerciseDto } from './dto/exrecise.dto';
import { GetExercisesDto } from './dto/get-exrecise.dto';

@Injectable()
export class ExercisesService {
  private readonly exercisesApi: ExercisesApi;

  constructor(private readonly apiConfigService: ApiConfigService) {
    this.exercisesApi = new ExercisesApi(
      this.apiConfigService.getConfiguration(),
    );
  }

  async getExercises(getExercisesDto: GetExercisesDto): Promise<ExerciseDto[]> {
    try {
      const { offset = 0, limit = 20, search } = getExercisesDto;

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

      const paginatedExercises = exercises.slice(offset, offset + limit);

      return paginatedExercises.map((exercise) => new ExerciseDto(exercise));
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw error;
    }
  }
}
