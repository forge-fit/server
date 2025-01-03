import { Exercise } from '@fit-track/exercises-api';
import { ApiProperty } from '@nestjs/swagger';
import { MuscleGroup } from './get-exrecise.dto';

export class ExerciseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({
    enum: MuscleGroup,
    description: 'MuscleGroup enum',
  })
  bodyPart: MuscleGroup;

  @ApiProperty()
  equipment: string;

  @ApiProperty()
  gifUrl: string;

  @ApiProperty()
  target: string;

  @ApiProperty()
  secondaryMuscles: string[];

  @ApiProperty()
  instructions: string[];

  constructor(exercise: Exercise) {
    this.id = exercise.id;
    this.name = exercise.name;
    this.bodyPart = exercise.bodyPart as MuscleGroup;
    this.equipment = exercise.equipment;
    this.gifUrl = exercise.gifUrl;
    this.target = exercise.target;
    this.secondaryMuscles = exercise.secondaryMuscles;
    this.instructions = exercise.instructions;
  }
}
