import { BASE_URL } from '.';

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
  const response = await fetch(
    `${BASE_URL}/routine/list?date=${date}&nickname=${nickname}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch routines');
  }
  return response.json();
};

export const fetchRoutineDetail = async (id: number): Promise<Routine> => {
  const params = new URLSearchParams();

  params.append('routineId', id.toString());

  const response = await fetch(
    `${BASE_URL}/routine/details?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch routines');
  }
  return response.json();
};

export const createRoutine = async (form: RoutineForm): Promise<void> => {
  const response = await fetch(`${BASE_URL}/routine`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch routines');
  }
};
