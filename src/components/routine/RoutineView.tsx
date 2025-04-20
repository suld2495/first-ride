import { Routine } from '@/api/routine.api';
import { useDeleteRoutineMutation } from '@/hooks/useRoutine';
import { useModalStore } from '@/store/modal.store';
import { getDisplayFormatDate } from '@/utils/date-utils';

const RoutineView = ({
  id,
  nickname,
  routineName,
  routineDetail,
  penalty,
  routineCount,
  startDate,
  endDate,
}: Routine) => {
  const closeModal = useModalStore((state) => state.close);
  const deleteRoutine = useDeleteRoutineMutation(nickname);

  const handleDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteRoutine.mutateAsync(id);
        alert('삭제되었습니다.');
        closeModal();
      } catch {
        alert('삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div>
      <div className="py-4">
        <div className="font-semibold text-[18px] mb-2">
          <p>{routineName}</p>
        </div>
        <div className="text-[15px] text-gray-600">
          <p>{routineDetail}</p>
        </div>
      </div>
      <div className="py-4">
        <div className="font-semibold">루틴 횟수</div>
        <div className="relative w-full">
          <p>{routineCount}</p>
        </div>
      </div>
      <div className="py-4">
        <div className="font-semibold">벌금</div>
        <div className="relative w-full">
          <p>{penalty}</p>
        </div>
      </div>
      <div className="py-4">
        <div className="font-semibold">루틴 날짜</div>
        <div className="relative w-full">
          <p>
            {getDisplayFormatDate(new Date(startDate))} ~
            {endDate && <span> {getDisplayFormatDate(new Date(endDate))}</span>}
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <button
          className="mr-2 text-sm text-white bg-gray-500 rounded-md px-4 py-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={closeModal}
        >
          확인
        </button>
        <button
          className="mr-2 text-sm text-white bg-red-400 rounded-md px-4 py-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

/* 
nickname: 'yunji',
      routineName: '퇴근 후 공부 루틴',
      endDate: '2025-04-30',
      routineDetail: '일주일 3회 이상 퇴근 후 공부하고 인증사진 보내기',
      penalty: 5000,
      routineCount: 3,
      mateNickname: 'moon',

*/

export default RoutineView;
