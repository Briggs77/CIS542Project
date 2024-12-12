import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import TokenInspector from '../components/TokenInspector';
import Navbar from '../components/Navbar';
import TestForm from '../components/TestForm';

const AuthPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h1>Login</h1>
        <LoginForm />
        <p>Need an account? Register below.</p>
        <h1>Register</h1>
        <RegisterForm />
        <p>Already have an account? Login above.</p>
      </div>
      <div>
        <TokenInspector />
      </div>
      <div>
        <h2>Test Form</h2>
        <TestForm collection="test3" />
      </div>
    </div>
  );
};

export default AuthPage;
