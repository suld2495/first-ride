import { useState } from 'react';

import { CheckStatus, RoutineRequestDetail } from '@/api/request.api';
import { useReplyRequestMutation } from '@/hooks/useRequest';
import { useAuthStore } from '@/store/auth.store';
import { useModalStore } from '@/store/modal.store';

const RequestView = ({
  id,
  routineName,
  routineDetail,
  imagePath,
}: RoutineRequestDetail) => {
  const user = useAuthStore((state) => state.user);
  const [commnet, setComment] = useState('');
  const closeModal = useModalStore((state) => state.close);
  const replyRequest = useReplyRequestMutation(user);

  const handleSubmit = async (status: CheckStatus) => {
    try {
      await replyRequest.mutateAsync({
        confirmId: id,
        checkStatus: status,
        checkComment: commnet,
      });

      closeModal();

      if (status === CheckStatus.PASS) {
        alert('승인되었습니다.');
      } else {
        alert('거절되었습니다.');
      }
    } catch {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
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
      <div className="py-5 border-t-[1px] border-gray-300">
        <div className="font-semibold">인증 내용</div>
        <div className="relative w-full">
          <img src={imagePath} alt="인증" />
        </div>
      </div>
      <div className="mt-5 border-t-[1px] border-gray-300 py-4">
        <form>
          <input className="hidden" name="id" defaultValue={id} />

          <div>
            <label
              htmlFor="comment"
              className="font-semibold text-[15px] mb-2 block"
            >
              응원의 한마디!
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={4}
              value={commnet}
              onChange={(e) => setComment(e.target.value)}
              className="w-full outline-none border-[1px] border-gray-300 rounded-md p-2 focus:border-gray-500 focus:ring-0 transition-colors duration-300"
              placeholder="코멘트를 입력하세요."
            />
          </div>

          <div className="flex justify-end mt-2">
            <button
              className="mr-2 text-sm text-gray-500 flex items-center cursor-pointer"
              onClick={closeModal}
            >
              취소
            </button>
            <button
              type="button"
              className="mr-2 text-sm text-white bg-gray-500 rounded-md px-4 py-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => handleSubmit(CheckStatus.PASS)}
            >
              승인
            </button>
            <button
              type="button"
              className="text-sm text-white bg-red-400 rounded-md px-4 py-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => handleSubmit(CheckStatus.DENIED)}
            >
              거절
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestView;
