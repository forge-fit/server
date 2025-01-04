import { Exercise } from '@forge-fit/exercises-api';
import { ApiProperty } from '@nestjs/swagger';
import { MuscleGroup } from './get-exercise.dto';

export class ExerciseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({
    enum: MuscleGroup,
    description: 'body part enum of the exercise',
  })
  bodyPart: MuscleGroup;

  @ApiProperty({
    description: 'equipment used for the exercise',
  })
  equipment: string;

  @ApiProperty({
    description: 'gif url of the exercise',
  })
  gifUrl: string;

  @ApiProperty({
    description: 'target muscle group of the exercise',
  })
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
