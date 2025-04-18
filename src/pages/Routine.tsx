import { Link, useNavigate, useSearchParams } from 'react-router';

import RoutineDate from '@/components/routine/RoutineDate';
import RoutineList from '@/components/routine/RoutineList';
import { useRoutinesQuery } from '@/hooks/useRoutine';
import { getWeekMonday } from '@/utils/date-utils';

const RoutinePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date') || getWeekMonday(new Date());
  const nickname = localStorage.getItem('nickname') as string;

  const { data: routines, isLoading } = useRoutinesQuery(nickname, date);

  if (!nickname) {
    navigate('/');
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className="px-5">
      <h1 className="mb-5 relative">
        <span className="text-lg font-bold">루틴 리스트</span>
        <Link
          className="absolute text-sm right-0 top-[50%] translate-y-[-50%] p-2 rounded-md text-white bg-gray-700 cursor-pointer"
          to="/routine/add"
        >
          루틴 추가
        </Link>
      </h1>
      <RoutineDate date={date} />
      <RoutineList routines={routines} />
    </div>
  );
};

export default RoutinePage;
