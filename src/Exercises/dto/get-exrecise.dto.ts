import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MaxLength,
  Max,
} from 'class-validator';
import { Type as ClassTransformerType } from 'class-transformer';

export enum MuscleGroup {
  BACK = 'back',
  CARDIO = 'cardio',
  CHEST = 'chest',
  LOWER_ARMS = 'lower arms',
  LOWER_LEGS = 'lower legs',
  NECK = 'neck',
  SHOULDERS = 'shoulders',
  UPPER_ARMS = 'upper arms',
  UPPER_LEGS = 'upper legs',
  WAIST = 'waist',
}

export class GetExercisesDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @ClassTransformerType(() => Number)
  offset?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @ClassTransformerType(() => Number)
  limit?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @IsOptional()
  @IsEnum(MuscleGroup)
  targetMuscle?: MuscleGroup;
}
