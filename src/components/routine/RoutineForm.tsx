"use client";

import Link from "next/link";
import Input from "../common/Input";
import { useRef, useState, useActionState } from "react";
import { createRoutineAction } from "@/actions/routine.action";

interface RoutineFormLabelProps {
  children: React.ReactNode;
}

const RoutineFormLabel = ({ children }: RoutineFormLabelProps) => {
  return <label htmlFor="name" className="text-sm text-gray-500 font-bold">{children}</label>;
};

interface RoutineFormProps {
  name: string;
}

const RoutineForm = ({ name }: RoutineFormProps) => {
  const [state, action] = useActionState(createRoutineAction, {
    payload: new FormData(),
    error: false,
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [enable, setEnable] = useState(false);

  const handleChange = () => {
    const formData = new FormData(formRef.current as HTMLFormElement);

    setEnable([...formData]
      .filter(([key]) => key !== 'name' && key !== 'end_date')
      .every(([, value]) => value));
  }

  return (
    <form ref={formRef} action={action} onChange={handleChange}>
      <input className="hidden" name="name" defaultValue={name} />
      <div className="flex flex-col gap-2 mt-5">
        <RoutineFormLabel>루틴 이름</RoutineFormLabel>
        <Input 
          name="routine_name"
          defaultValue={state.payload.get("routine_name") as string}
          placeholder="루틴 이름을 입력하세요."
        />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <RoutineFormLabel>루틴 설명</RoutineFormLabel>
        <Input 
          name="routine_detail"
          defaultValue={state.payload.get("routine_detail") as string}
          placeholder="루틴을 설명해주세요."
        />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <RoutineFormLabel>벌금</RoutineFormLabel>
        <Input 
          type="number" 
          name="penalty"
          defaultValue={state.payload.get("penalty") as string}
          placeholder="벌금을 입력하세요."
        />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <RoutineFormLabel>루틴 횟수</RoutineFormLabel>
        <Input 
          type="number" 
          name="routine_count"
          defaultValue={state.payload.get("routine_count") as string}
          placeholder="루틴 횟수를 입력하세요."
        />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <RoutineFormLabel>루틴 시작 날짜</RoutineFormLabel>
        <Input 
          type="date" 
          name="start_date"
          defaultValue={state.payload.get("start_date") as string}
          placeholder="루틴 시작 날짜를 입력하세요."
        />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <RoutineFormLabel>루틴 종료 날짜</RoutineFormLabel>
        <Input 
          type="date" 
          name="end_date"
          defaultValue={state.payload.get("end_date") as string}
          placeholder="루틴 종료 날짜를 입력하세요."
        />
      </div>
      {state.error && <div className="text-red-500 text-sm mt-2">{state.message || '문제가 발생하였습니다.'}</div>}
      <div className="flex justify-end mt-5">
        <Link 
          className="mr-2 text-sm text-gray-500 flex items-center"
          href="/routine"
        >
          취소
        </Link>
        <button 
          type="submit" 
          className="text-sm text-white bg-gray-500 rounded-md px-4 py-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={!enable}
        >
          추가
        </button>
      </div>
    </form>
  )
};

export default RoutineForm;