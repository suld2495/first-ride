import { afterWeek, beforeWeek, getDisplayFormatDate, getWeekMonday, getWeekSunday } from "@/utils/date-utils";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Link from "next/link";

interface RoutineDateProps {
  date?: string;
}

const RoutineDate = ({ date }: RoutineDateProps) => {
  const startDate = new Date(getWeekMonday(date ? new Date(date) : new Date()));
  const endDate = new Date(getWeekSunday(startDate));

  return (
    <div className="flex justify-between items-center mb-3">
      <div className="text-sm">
        <span>{getDisplayFormatDate(startDate)}</span>
        <span className="mx-2">~</span>
        <span>{getDisplayFormatDate(endDate)}</span>
      </div>
      <div className="flex">
        <Link href={`/routine?date=${beforeWeek(startDate)}`}><IconChevronLeft stroke={2} /></Link>
        <Link href={`/routine?date=${afterWeek(startDate)}`}><IconChevronRight stroke={2} /></Link>
      </div>
    </div>
  )
};

export default RoutineDate;
