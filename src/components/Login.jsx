import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Button from './Button';
import Input from './Input';
import { loginUser } from '../lib/api';
import { UserContext } from '../lib/UserContext';
import { AuthMenuStatus } from '../constants/AuthMenuStatus';

const Login = ({ setAuthMenu }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast('Please enter both email and password.')
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser(email, password); 
      setUser(data); 
      setAuthMenu(AuthMenuStatus.AUTHENTICATED);
      toast.success('Login successful!');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col justify-between items-center'>
      <span className="mb-4 mt-10 text-purple-600 text-[2rem] font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500">Login</span>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className='text-pink-600 -mt-2 font-medium text-xs cursor-pointer hover:scale-115 transition-all duration-500 hover:text-purple-800' onClick={() => setAuthMenu(AuthMenuStatus.REGISTER)} >Don't have a account? <span className='underline'>Register</span></p>

        <Button
          text={loading ? 'Logging in...' : 'Log In'}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default Login;