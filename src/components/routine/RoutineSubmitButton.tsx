import { useContext } from 'react';

import { FormContext } from '../common/form/FormProvider';

const RoutineSubmitButton = () => {
  const { enabled } = useContext(FormContext);

  return (
    <button
      type="submit"
      className="text-sm text-white bg-gray-500 rounded-md px-4 py-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      disabled={!enabled}
    >
      추가
    </button>
  );
};

export default RoutineSubmitButton;
