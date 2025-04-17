import { useState } from 'react';

const AuthForm = () => {
  const [nickname, setNickname] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    localStorage.setItem('nickname', nickname);
  };

  return (
    <form
      className="flex flex-col items-center justify-center h-screen"
      onSubmit={handleSubmit}
    >
      <input
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
        name="nickname"
        type="text"
        placeholder="값을 입력하세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
      />
      <button type="submit">로그인</button>
    </form>
  );
};

export default AuthForm;
