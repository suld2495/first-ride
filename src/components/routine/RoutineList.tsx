import React from 'react';
import {
  IconCheck,
  IconSquare,
  IconSquareCheckFilled,
} from '@tabler/icons-react';

import { Routine } from '@/api/routine.api';
import { ModalName, useModalStore } from '@/store/modal.store';
import { useRoutineStore } from '@/store/routine.store';
import { getWeekMonday } from '@/utils/date-utils';

import IconButton from '../common/button/IconButton';
import Paragraph from '../common/paragraph/Paragraph';

interface RoutineHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const RoutineHeader = ({ className, children }: RoutineHeaderProps) => {
  return (
    <li
      className={`${className || ''} flex-1 text-sm py-2 flex justify-center dark:text-white`}
    >
      {children}
    </li>
  );
};

interface RoutineListProps {
  routines: Routine[];
  date: string;
}

const RoutineList = ({ routines, date }: RoutineListProps) => {
  const showModal = useModalStore((state) => state.show);
  const setRoutineId = useRoutineStore((state) => state.setRoutineId);

  const handleShowRequestModal = (id: number) => {
    showModal(ModalName.ROUTINE_REQUEST);
    setRoutineId(id);
  };

  const handleShowDetailModal = (id: number) => {
    showModal(ModalName.ROUTINE_DETAIL);
    setRoutineId(id);
  };

  return (
    <div>
      <ul className="flex w-full text-center text-gray-700 font-bold border-b border-gray-300">
        <li className="text-sm truncate py-2 px-1 w-[100px]">
          <Paragraph>이름</Paragraph>
        </li>
        {Array.from({ length: 7 }, (_, index) => index + 1).map((index) => (
          <RoutineHeader key={index}>{`${index}회`}</RoutineHeader>
        ))}
        <RoutineHeader>성공률</RoutineHeader>
        <RoutineHeader>인증</RoutineHeader>
      </ul>
      {!routines.length && (
        <Paragraph className="py-4 text-center">루틴을 추가해보세요.</Paragraph>
      )}
      {routines.map(
        ({ routineId, routineName, weeklyCount = 0, routineCount }) => (
          <ul className="flex w-full text-center" key={routineId}>
            <li className="text-sm truncate py-2 px-1 w-[100px] text-[var(--primary-color)]">
              <Paragraph
                className="cursor-pointer hover:underline hover:text-gray-500"
                onClick={() => handleShowDetailModal(routineId)}
              >
                {routineName}
              </Paragraph>
            </li>
            {Array(~~weeklyCount)
              .fill(0)
              .map((_, index) => (
                <RoutineHeader
                  className="text-[var(--primary-color)]"
                  key={index}
                >
                  <IconSquareCheckFilled stroke={2} />
                </RoutineHeader>
              ))}

            {Array(Math.max(routineCount - ~~weeklyCount, 0))
              .fill(0)
              .map((_, index) => (
                <RoutineHeader key={index} className="text-gray-400">
                  <IconSquare stroke={2} />
                </RoutineHeader>
              ))}

            {Array(7 - Math.max(routineCount, ~~weeklyCount))
              .fill(0)
              .map((_, index) => (
                <RoutineHeader key={index} className="text-gray-400">
                  -
                </RoutineHeader>
              ))}

            <RoutineHeader>
              <Paragraph variant='span' className="text-[var(--gray-main-color)] font-bold">
                {Math.floor((~~weeklyCount / routineCount) * 100)}%
              </Paragraph>
            </RoutineHeader>
            <RoutineHeader>
              {date === getWeekMonday(new Date()) && (
                <IconButton
                  className="px-2"
                  icon={<IconCheck height={15} stroke={2} />}
                  size="small"
                  onClick={() => handleShowRequestModal(routineId)}
                />
              )}
            </RoutineHeader>
          </ul>
        ),
      )}
    </div>
  );
};

export default RoutineList;
