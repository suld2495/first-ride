import React from 'react';
import { Link } from 'react-router';
import { IconSquareCheckFilled } from '@tabler/icons-react';

import { Routine } from '@/api/routine.api';

interface RoutineHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const RoutineHeader = ({ className, children }: RoutineHeaderProps) => {
  return (
    <li
      className={`${className || ''} flex-1 text-sm py-2 flex justify-center`}
    >
      {children}
    </li>
  );
};

interface RoutineListProps {
  routines: Routine[];
}

const RoutineList = ({ routines }: RoutineListProps) => {
  return (
    <div>
      <ul className="flex w-full text-center text-gray-700 font-bold border-b border-gray-300">
        <li className="text-sm truncate py-2 px-1 w-[100px]">이름</li>
        {Array.from({ length: 7 }, (_, index) => index + 1).map((index) => (
          <RoutineHeader key={index}>{`${index}회`}</RoutineHeader>
        ))}
        <RoutineHeader>성공률</RoutineHeader>
        <RoutineHeader>인증</RoutineHeader>
      </ul>
      {!routines.length && (
        <div className="py-4 text-center text-[15px] text-gray-700">
          루틴을 추가해보세요.
        </div>
      )}
      {routines.map(({ id, routineName, count = 0, routineCount }) => (
        <ul className="flex w-full text-center" key={id}>
          <li className="text-sm truncate py-2 px-1 w-[100px] text-[var(--primary-color)]">
            {routineName}
          </li>
          {Array(~~count)
            .fill(0)
            .map((_, index) => (
              <RoutineHeader
                className="text-[var(--primary-color)]"
                key={index}
              >
                <IconSquareCheckFilled stroke={2} />
              </RoutineHeader>
            ))}

          {Array(Math.max(routineCount - ~~count, 0))
            .fill(0)
            .map((_, index) => (
              <RoutineHeader key={index} className="text-gray-400">
                미인증
              </RoutineHeader>
            ))}

          {Array(7 - Math.max(routineCount, ~~count))
            .fill(0)
            .map((_, index) => (
              <RoutineHeader key={index} className="text-gray-400">
                -
              </RoutineHeader>
            ))}

          <RoutineHeader>
            <div className="text-[var(--gray-main-color)] font-bold">
              {Math.floor((~~count / routineCount) * 100)}%
            </div>
          </RoutineHeader>
          <RoutineHeader>
            <Link
              to={`/routine/${id}/request`}
              className="px-2 py-1 bg-gray-400 rounded-sm text-white text-[11px] cursor-pointer transition-color duration-300 hover:bg-gray-500"
            >
              인증
            </Link>
          </RoutineHeader>
        </ul>
      ))}
    </div>
  );
};

export default RoutineList;
