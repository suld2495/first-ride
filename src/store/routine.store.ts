import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  routineId: number;
}

interface Action {
  setRoutineId: (id: number) => void;
}

const initialState: State = {
  routineId: 0,
};

export const useRoutineStore = create<State & Action>()(
  devtools((set) => ({
    ...initialState,

    setRoutineId: (id: number) => set({ routineId: id }),
  })),
);
