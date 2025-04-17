import { BASE_URL } from '.';

export enum CheckStatus {
  PASS = 'PASS',
  DENIED = 'DENY',
}

export interface RoutineRequest {
  id: number;
  routineId: number;
  requesterNickname: string;
  routineName: string;
  createdAt: string;
}

export interface RoutineRequestDetail {
  id: number;
  nickname: string;
  requesterNickname: string;
  routineName: string;
  routineDetail: string;
  imagePath: string;
  createdAt: string;
}

export interface RoutineRequestCheckForm {
  confirmId: number;
  checkStatus: CheckStatus;
  checkComment: string;
}

export const fetchRoutineRequests = async (
  nickname: string,
): Promise<RoutineRequest[]> => {
  const response = await fetch(
    `${BASE_URL}/routine/confirm/list?nickname=${nickname}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch routines');
  }

  return response.json();
};

export const fetchRoutineRequestDetail = async (
  id: number,
): Promise<RoutineRequestDetail> => {
  const response = await fetch(`${BASE_URL}/routine/confirm/detail?id=${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch routines');
  }

  return response.json();
};

export const createRequest = async (data: FormData): Promise<void> => {
  const response = await fetch(`${BASE_URL}/routine/confirm`, {
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    throw new Error('Failed to create request');
  }
};

export const completeRequest = async (
  data: RoutineRequestCheckForm,
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/routine/check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to complete request');
  }
};
