import { useBarikoiMapContext } from '../BarikoiMapProvider';

export const useAutocomplete = () => {
  return useBarikoiMapContext().autocomplete;
};