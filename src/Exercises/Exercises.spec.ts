import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesService } from './Exercises.service';
import { ApiConfigService } from '../shared/api.config';
import { ExercisesApi } from '@fit-track/exercises-api';
import { externalExercisesBuilder } from '../../test/builders';

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
});
