import http from '.';

export interface Routine {
  id: number;
  nickname: string;
  routineName: string;
  endDate: string;
  routineDetail: string;
  penalty: number;
  count: number;
  routineCount: number;
  mateNickname: string;
}

export interface RoutineForm {
  nickname: string;
  routineName: string;
  startDate: string;
  endDate: string;
  routineDetail: string;
  penalty: number;
  routineCount: number;
  mateNickname: string;
}

export const fetchRoutines = async (
  nickname: string,
  date: string,
): Promise<Routine[]> => {
  return http.get(`/routine/list?date=${date}&nickname=${nickname}`);
};

export const fetchRoutineDetail = async (id: number): Promise<Routine> => {
  const params = new URLSearchParams();

  params.append('routineId', id.toString());

  return http.get(`/routine/details?${params.toString()}`);
};

export const createRoutine = async (form: RoutineForm): Promise<void> => {
  return http.post('/routine', form);
};
