const Input = ({ ...rest }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="border-[1px] border-gray-300 rounded-md p-2 text-[15px] outline-0 focus:border-gray-500 focus:ring-0 transition-colors duration-300"
      {...rest}
    />
  );
};

export default Input;
