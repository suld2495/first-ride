import { useRoutineDetailQuery } from '@/hooks/useRoutine';
import { useRoutineStore } from '@/store/routine.store';

import RequestForm from '../request/RequestForm';

const RoutineRequestModal = () => {
  const nickname = localStorage.getItem('nickname') || '';
  const routineId = useRoutineStore((state) => state.routineId);
  const { data: detail, isLoading } = useRoutineDetailQuery(routineId);

  if (isLoading || !detail) {
    return null;
  }

  return <RequestForm {...detail} nickname={nickname} />;
};

export default RoutineRequestModal;
