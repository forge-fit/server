import { Exercise } from '@fit-track/exercises-api';
import { chance } from './chance';

export const externalExercisesBuilder = (
  partial: Partial<Exercise>,
): Exercise => {
  return {
    id: chance.string(),
    name: chance.string(),
    instructions: chance.string(),
    equipment: chance.string(),
    bodyPart: chance.string(),
    gifUrl: chance.url(),
    secondaryMuscles: Array.from({ length: 3 }, () => chance.string()),
    target: chance.string(),
    ...partial,
  };
};
