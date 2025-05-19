import { useState } from 'react';
import { loginHospital, Hospital } from '../api';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (hospital: Hospital) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('citygen@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const hospital = await loginHospital(email, password);
    setLoading(false);
    if (hospital) {
      onLogin(hospital);
      navigate('/');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
        <h1 className="text-2xl font-bold text-gray-100 mb-6 text-center">Hospital Login</h1>
        {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="mt-6 text-gray-400 text-xs text-center">
          <div>Demo credentials:</div>
          <div>citygen@example.com / password123</div>
          <div>metrohealth@example.com / secure456</div>
        </div>
      </div>
    </div>
  );
};

export default Login; 