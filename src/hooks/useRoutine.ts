import { useQuery } from '@tanstack/react-query';

import * as routineApi from '@/api/routine.api';
import { routineKey } from '@/types/query-keys/routine';

export const useRoutinesQuery = (nickname: string, date: string) => {
  return useQuery({
    queryKey: [...routineKey.list(nickname), { date }],
    queryFn: () => routineApi.fetchRoutines(nickname, date),
    initialData: [],
    enabled: !!nickname && !!date,
  });
};
