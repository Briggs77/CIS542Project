import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      {isLogin ? (
        <>
          <LoginForm />
          <p>
            Need an account?{' '}
            <button onClick={toggleForm}>Register</button>
          </p>
        </>
      ) : (
        <>
          <RegisterForm />
          <p>
            Have an account already?{' '}
            <button onClick={toggleForm}>Login</button>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthPage;
