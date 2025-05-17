import { Link } from 'react-router';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

import {
  afterWeek,
  beforeWeek,
  getDisplayFormatDate,
  getWeekMonday,
  getWeekSunday,
} from '@/utils/date-utils';

interface RoutineDateProps {
  date?: string;
}

const RoutineDate = ({ date }: RoutineDateProps) => {
  const startDate = new Date(getWeekMonday(date ? new Date(date) : new Date()));
  const endDate = new Date(getWeekSunday(startDate));

  return (
    <div className="flex justify-between items-center mb-3 text-gray-main dark:text-white">
      <div className="text-sm">
        <span>{getDisplayFormatDate(startDate)}</span>
        <span className="mx-2">~</span>
        <span>{getDisplayFormatDate(endDate)}</span>
      </div>
      <div className="flex">
        <Link to={`/routine?date=${beforeWeek(startDate)}`}>
          <IconChevronLeft stroke={2} />
        </Link>
        <Link to={`/routine?date=${afterWeek(startDate)}`}>
          <IconChevronRight stroke={2} />
        </Link>
      </div>
    </div>
  );
};

export default RoutineDate;
