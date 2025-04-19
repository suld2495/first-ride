import { useEffect, useState } from 'react';
import { IconBellPlus } from '@tabler/icons-react';

import { RoutineRequest } from '@/api/request.api';
import { ModalName, useModalStore } from '@/store/modal.store';
import { useRequestStore } from '@/store/request.store';
import { getFormatDate } from '@/utils/date-utils';

interface RoutineHeaderProps {
  list: RoutineRequest[];
  nickname: string;
}

const RoutineHeader = ({ list, nickname }: RoutineHeaderProps) => {
  const [show, setShow] = useState(false);
  const showModal = useModalStore((state) => state.show);
  const setRequestId = useRequestStore((state) => state.setRequestId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.matches('.alert')) return;

      setShow(false);
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [show, setShow]);

  const handleClick = (e: React.MouseEvent) => {
    setShow(true);
    e.stopPropagation();
  };

  const handleModalShow = (id: number) => {
    showModal(ModalName.REQUEST_DETAIL);
    setRequestId(id);
  };

  return (
    <header className="relative flex justify-between w-full h-[var(--header-height)] py-3 px-4">
      <div className="text-[15px] text-gray-500">
        <strong className="text-gray-600">{nickname}</strong>
      </div>
      <div
        className="relative text-[var(--gray-main-color)] cursor-pointer"
        onClick={handleClick}
      >
        <IconBellPlus stroke={2} />
        {list.length > 0 && (
          <span className="absolute -top-1 -right-1 w-[15px] h-[15px] leading-3 text-center rounded-full bg-red-400 text-[10px] text-white">
            {list.length}
          </span>
        )}
      </div>
      {show && list.length && (
        <div className="absolute z-10 top-10 right-2">
          <div className="fixed z-1 w-full h-full top-0 left-0"></div>
          <ul className="alert relative z-2 w-[200px] p-2 border-[1px] border-gray-300 rounded-sm bg-white shadow-lg">
            {list.map(
              ({ id, routineName, nickname: mateNickname, createdAt }) => (
                <li key={id}>
                  <div
                    className={`flex flex-col p-2 border-b-[1px] border-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer`}
                    onClick={() => handleModalShow(id)}
                  >
                    <p className="text-gray-600 font-semibold">{routineName}</p>
                    <div className="flex justify-between items-center mt-1 text-[12px] text-gray-500">
                      <span>{mateNickname}</span>
                      <span>{getFormatDate(new Date(createdAt))}</span>
                    </div>
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default RoutineHeader;
