const AuthForm = () => {
  return (
    <form className="flex flex-col items-center justify-center h-screen">
      <input
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
        name="nickname"
        type="text"
        placeholder="값을 입력하세요"
      />
      <button type="submit">로그인</button>
    </form>
  );
};

export default AuthForm;
