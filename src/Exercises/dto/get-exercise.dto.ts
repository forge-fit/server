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
import { ApiProperty } from '@nestjs/swagger';

export enum BodyPart {
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
  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @ClassTransformerType(() => Number)
  offset?: number;

  @ApiProperty({ required: false, default: 20 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @ClassTransformerType(() => Number)
  limit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(BodyPart)
  bodyPart?: BodyPart;
}
