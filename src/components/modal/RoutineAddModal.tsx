import { useAuthStore } from '@/store/auth.store';

import RoutineForm from '../routine/RoutineForm';

const RoutineAddModal = () => {
  const user = useAuthStore((state) => state.user);
  const mateNickname = user === 'yunji' ? 'moon' : 'yunji';

  return <RoutineForm nickname={user} mateNickname={mateNickname} />;
};

export default RoutineAddModal;
