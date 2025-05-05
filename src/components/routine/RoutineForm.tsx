import { RoutineForm as RoutineFormType } from '@/api/routine.api';
import { useCreateRoutineMutation } from '@/hooks/useRoutine';
import { useModalStore } from '@/store/modal.store';

import Form from '../common/form/Form';
import { FormItem } from '../common/form/FormItem';
import Input from '../common/Input';

interface RoutineFormProps {
  nickname: string;
  mateNickname: string;
}

const routineForm = {
  nickname: '',
  routineName: '',
  routineDetail: '',
  penalty: 0,
  routineCount: 1,
  startDate: '',
  endDate: '',
  mateNickname: '',
};

const RoutineForm = ({ nickname, mateNickname }: RoutineFormProps) => {
  const closeModal = useModalStore((state) => state.close);
  const form: RoutineFormType = {
    ...routineForm,
    nickname,
    mateNickname,
  };
  const saveMutation = useCreateRoutineMutation(nickname);

  const enable = Object.entries(form)
    .filter(([key]) => key !== 'name' && key !== 'endDate' && key !== 'penalty')
    .every(([, value]) => value);

  // const handleChange = (e: React.ChangeEvent) => {
  //   const target = e.target as HTMLInputElement;

  //   if (target.name === 'endDate') {
  //     const startDate = new Date(form.startDate);
  //     const endDate = new Date(target.value);

  //     if (form.startDate && endDate < startDate) {
  //       setForm((prev) => ({
  //         ...prev,
  //         startDate: target.value,
  //       }));
  //     }
  //   }

  //   if (target.name === 'startDate') {
  //     const startDate = new Date(target.value);
  //     const endDate = new Date(form.endDate);

  //     if (form.endDate && endDate < startDate) {
  //       setForm((prev) => ({
  //         ...prev,
  //         endDate: target.value,
  //       }));
  //     }
  //   }

  //   setForm((prev) => ({
  //     ...prev,
  //     [target.name]: ['penalty', 'routineCount'].includes(target.name)
  //       ? Number(target.value)
  //       : target.value,
  //   }));
  // };

  const handleSubmit = async (data: RoutineFormType) => {
    if (!enable) return;

    try {
      await saveMutation.mutateAsync(data);
      alert('루틴이 생성되었습니다.');
      closeModal();
    } catch {
      alert('루틴 생성에 실패했습니다.');
    }
  };

  return (
    <Form data={form} onSubmit={handleSubmit}>
      <FormItem
        name="routineName"
        className="flex flex-col gap-2 mt-5"
        label="루틴 이름"
        rule={{ required: true }}
        render={({ value, name, onChange }) => (
          <Input
            name={name}
            value={value}
            placeholder="루틴 이름을 입력하세요."
            onChange={onChange}
          />
        )}
      />
      <FormItem
        name="routineDetail"
        className="flex flex-col gap-2 mt-5"
        label="루틴 설명"
        rule={{ required: true }}
        render={({ value, name, onChange }) => (
          <Input
            name={name}
            value={value}
            placeholder="루틴을 설명해주세요."
            onChange={onChange}
          />
        )}
      />
      <FormItem
        name="penalty"
        className="flex flex-col gap-2 mt-5"
        label="벌금"
        rule={{ required: true, min: 0 }}
        render={({ value, name, onChange }) => (
          <Input
            type="number"
            name={name}
            value={value}
            min={0}
            placeholder="벌금을 입력하세요."
            onChange={onChange}
          />
        )}
      />
      <FormItem
        name="routineCount"
        className="flex flex-col gap-2 mt-5"
        label="루틴 횟수"
        rule={{ required: true, min: 1, max: 7 }}
        render={({ value, name, onChange }) => (
          <Input
            type="number"
            name={name}
            value={value}
            max={7}
            min={1}
            placeholder="루틴 횟수를 입력하세요."
            onChange={onChange}
          />
        )}
      />
      <FormItem
        name="startDate"
        className="flex flex-col gap-2 mt-5"
        label="루틴 시작 날짜"
        rule={{ required: true }}
        render={({ value, name, onChange }) => (
          <Input
            type="date"
            name={name}
            value={value}
            placeholder="루틴 시작 날짜를 입력하세요."
            onChange={onChange}
          />
        )}
      />
      <FormItem
        name="startDate"
        className="flex flex-col gap-2 mt-5"
        label="루틴 종료 날짜"
        render={({ value, name, onChange }) => (
          <Input
            type="date"
            name={name}
            value={value}
            placeholder="루틴 종료 날짜를 입력하세요."
            onChange={onChange}
          />
        )}
      />
      <div className="flex justify-end mt-5">
        <button
          type="button"
          className="mr-2 text-sm text-gray-500 flex items-center cursor-pointer"
          onClick={closeModal}
        >
          취소
        </button>
        <button
          type="submit"
          className="text-sm text-white bg-gray-500 rounded-md px-4 py-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={!enable}
        >
          추가
        </button>
      </div>
    </Form>
  );
};

export default RoutineForm;
