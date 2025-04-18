import { Outlet } from 'react-router';

import { useFetchReceivedRequestsQuery } from '@/hooks/useRequest';

import RoutineHeader from './RoutineHeader';

const RoutineLayout = () => {
  const nickname = localStorage.getItem('nickname') || '';

  const { data: requests } = useFetchReceivedRequestsQuery(nickname);

  return (
    <div className="flex flex-col w-full h-full">
      <RoutineHeader list={requests} nickname={nickname} />
      <div className="flex-1 pb-[var(--footer-height)]">
        <Outlet />
      </div>
    </div>
  );
};

export default RoutineLayout;
