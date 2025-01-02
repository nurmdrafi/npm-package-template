import { useBarikoiMapContext } from '../BarikoiMapProvider';

export const useMap = () => {
  return useBarikoiMapContext().map;
};