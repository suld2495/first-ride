import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useCreateRoutineMutation = (nickname: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: routineApi.RoutineForm) =>
      routineApi.createRoutine(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...routineKey.list(nickname)],
      });
    },
  });
};

export const useRoutineDetailQuery = (routineId: number) => {
  return useQuery({
    queryKey: routineKey.detail(routineId),
    queryFn: () => routineApi.fetchRoutineDetail(routineId),
    enabled: !!routineId,
  });
};
