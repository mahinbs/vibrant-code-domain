
import { FormData } from './types';

export const useFormSteps = () => {
  const getStepFields = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1:
        return ['first_name', 'last_name', 'email', 'phone'];
      case 2:
        return ['service_interest', 'budget_range', 'project_timeline'];
      case 3:
        return ['message'];
      default:
        return [];
    }
  };

  return { getStepFields };
};
