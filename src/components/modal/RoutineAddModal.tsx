import RoutineForm from '../routine/RoutineForm';

const RoutineAddModal = () => {
  const nickname = localStorage.getItem('nickname') || '';
  const mateNickname = nickname === 'yunji' ? 'moon' : 'yunji';

  return <RoutineForm nickname={nickname} mateNickname={mateNickname} />;
};

export default RoutineAddModal;
