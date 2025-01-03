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

enum MuscleGroup {
  ABDOMINALS = 'abdominals',
  BICEPS = 'biceps',
  TRICEPS = 'triceps',
  CHEST = 'chest',
  BACK = 'back',
  LEGS = 'legs',
  SHOULDERS = 'shoulders',
}

enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  EXPERT = 'expert',
}

enum Type {
  STRENGTH = 'strength',
  CARDIO = 'cardio',
  STRETCHING = 'stretching',
  PLYOMETRICS = 'plyometrics',
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
  muscle?: MuscleGroup;

  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @IsOptional()
  @IsEnum(Type)
  type?: Type;
}
