import { Exercise } from '@fit-track/exercises-api';

export class ExerciseDto {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];

  constructor(exercise: Exercise) {
    this.id = exercise.id;
    this.name = exercise.name;
    this.bodyPart = exercise.bodyPart;
    this.equipment = exercise.equipment;
    this.gifUrl = exercise.gifUrl;
    this.target = exercise.target;
    this.secondaryMuscles = exercise.secondaryMuscles;
    this.instructions = exercise.instructions;
  }
}
