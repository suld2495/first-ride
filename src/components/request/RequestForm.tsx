import { useActionState, useRef, useState } from 'react';
import { Link } from 'react-router';

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
  const imageRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>('');
  const [state, action] = useActionState(createRequestAction, {
    payload: new FormData(),
    error: false,
    message: '',
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [enable, setEnable] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setEnable(true);
  };

  return (
    <form ref={formRef} action={action}>
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
              className="w-full h-auto rounded-lg"
              src={preview}
              alt="Preview"
            />
          </div>
        )}
      </div>
      {state.error && (
        <div className="text-red-500 text-sm mt-2">
          {state.message || '문제가 발생하였습니다.'}
        </div>
      )}
      <div className="flex justify-end mt-5">
        <Link
          className="mr-2 text-sm text-gray-500 flex items-center"
          to="/routine"
        >
          취소
        </Link>
        <button
          type="submit"
          className="text-sm text-white bg-gray-500 rounded-md px-4 py-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={!enable}
        >
          요청
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
