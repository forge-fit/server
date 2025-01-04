import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesService } from './Exercises.service';
import { ApiConfigService } from '../shared/api.config';
import { ExercisesApi } from '@forge-fit/exercises-api';
import { externalExercisesBuilder } from '../../test/builders';
import { MuscleGroup } from './dto/get-exercise.dto';

describe('ExercisesService', () => {
  let service: ExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExercisesService,
        {
          provide: ApiConfigService,
          useValue: {
            getConfiguration: jest.fn().mockReturnValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get exercises', async () => {
    jest
      .spyOn(ExercisesApi.prototype as any, 'getExercises')
      .mockResolvedValue({
        data: [],
      });

    const exercises = await service.getExercises({});
    expect(exercises).toBeDefined();
    expect(exercises.length).toBe(0);
  });

  it('should get exercises with search', async () => {
    const mockExercises = [
      externalExercisesBuilder({ name: 'test' }),
      externalExercisesBuilder({ name: 'test2' }),
      externalExercisesBuilder({ name: 'not included' }),
    ];

    jest
      .spyOn(ExercisesApi.prototype as any, 'getExercises')
      .mockResolvedValueOnce({ data: mockExercises });

    const exercises = await service.getExercises({ search: 'test' });
    expect(exercises).toBeDefined();
    expect(exercises.length).toBe(2);
  });

  it('should get exercises with limit and offset', async () => {
    const mockExercises = [
      externalExercisesBuilder({ name: 'test' }),
      externalExercisesBuilder({ name: 'test2' }),
    ];

    jest
      .spyOn(ExercisesApi.prototype as any, 'getExercises')
      .mockResolvedValueOnce({ data: mockExercises });

    const exercises = await service.getExercises({ limit: 1, offset: 1 });
    expect(exercises).toBeDefined();
    expect(exercises.length).toBe(1);
  });

  it('should throw error if the api returns an error', async () => {
    jest
      .spyOn(ExercisesApi.prototype as any, 'getExercises')
      .mockRejectedValueOnce(new Error('test'));

    await expect(service.getExercises({})).rejects.toThrow(
      'Error fetching exercises',
    );
  });

  it('should get exercises with target muscle', async () => {
    const mockExercises = [
      externalExercisesBuilder({
        name: 'shoulders incline',
        target: 'shoulders',
      }),
      externalExercisesBuilder({
        name: 'shoulders with dumbbells',
        target: 'shoulders',
      }),
      externalExercisesBuilder({
        name: 'shoulders with barbell',
        target: 'shoulders',
      }),
      externalExercisesBuilder({
        name: 'shoulders with dumbbells',
        secondaryMuscles: ['shoulders'],
      }),
    ];

    jest
      .spyOn(ExercisesApi.prototype as any, 'getExercises')
      .mockResolvedValueOnce({ data: mockExercises });

    const exercises = await service.getExercises({
      targetMuscle: MuscleGroup.SHOULDERS,
    });

    expect(exercises).toBeDefined();
    expect(exercises.length).toBe(4);
  });
});
