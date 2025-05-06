import { useRef, useState } from 'react';

import { useCreateRequestMutation } from '@/hooks/useRequest';
import { useModalStore } from '@/store/modal.store';

import Button from '../common/button/Button';

interface FormLabelProps {
  children: React.ReactNode;
}

const FormLabel = ({ children }: FormLabelProps) => {
  return (
    <label htmlFor="name" className="text-sm text-gray-500 font-bold">
      {children}
    </label>
  );
};

interface RequestFormProps {
  id: number;
  routineName: string;
  routineDetail: string;
  nickname: string;
}

const RequestForm = ({
  id,
  routineName,
  routineDetail,
  nickname,
}: RequestFormProps) => {
  const closeModal = useModalStore((state) => state.close);
  const imageRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const enable = image !== null;

  const saveRequest = useCreateRequestMutation();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) return;

    const formData = new FormData();

    formData.append('image', image);
    formData.append('routineId', id.toString());
    formData.append('nickname', nickname);

    try {
      await saveRequest.mutateAsync(formData);
      closeModal();
      alert('인증 요청이 완료되었습니다.');
    } catch {
      alert('인증 요청에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className="hidden" name="routineId" defaultValue={id} />
      <input className="hidden" name="nickname" defaultValue={nickname} />
      <div className="flex flex-col gap-2 mt-5">
        <FormLabel>루틴 이름</FormLabel>
        <p>{routineName}</p>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <FormLabel>루틴 설명</FormLabel>
        <p>{routineDetail}</p>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <FormLabel>인증 사진</FormLabel>
        <div>
          <button
            className="bg-gray-400 py-2 px-3 rounded-xl text-white cursor-pointer"
            onClick={() => imageRef.current?.click()}
          >
            업로드
          </button>
          <input
            ref={imageRef}
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            required
            onChange={handleFileUpload}
          />
        </div>
        {preview && (
          <div className="relative mt-2 h-[300px]">
            <img
              className="w-full h-full rounded-lg"
              src={preview}
              alt="Preview"
            />
          </div>
        )}
      </div>
      <div className="flex justify-end mt-5">
        <Button className="mr-2" variant="plain" onClick={closeModal}>
          취소
        </Button>
        <Button
          type="submit"
          className="disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={!enable}
        >
          요청
        </Button>
      </div>
    </form>
  );
};

export default RequestForm;
