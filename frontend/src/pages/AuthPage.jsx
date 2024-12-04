import React , { useState } from 'react';
import { User } from 'lucide-react';
import { handleSignUp, handleConfirmSignUp, handleSignIn } from '../services/auth';
import { mongoCreateUser } from '../services/mongo/user';

const AuthPage = ({onLogin}) => {
    const [mode, setMode] = useState('login');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (mode === 'signup') {
            signUp(email, password);
        }
        else if (mode === 'confirm') {
            confirmSignUp(email, confirmationCode);
        }
        else {
            signIn(email, password);
        }
        setLoading(false);
    };
    
    const signUp = async (email, password) => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const {success, error} = await handleSignUp(email, password);
        if (success) {
            setMode('confirm');
        }
        else {
            setError(error);
        }
    };

    const confirmSignUp = async (email, confirmationCode) => {        
        const { success, error } = await handleConfirmSignUp(email, confirmationCode);
        if (success) {
            setMode('login');
            mongoCreateUser(email);
        } 
        else {
            setError(error);
        }
    };

    const signIn = async (email, password) => {
        const { success, error } = await handleSignIn(email, password);
        if (success) {
            onLogin(email, password);
        } 
        else {
            setError(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
            <div className="text-center">
              
              <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>

              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                {mode === 'login' ? 'Sign in to your account' : 
                 mode === 'signup' ? 'Create your account' : 'Verify your email'}
              </h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {mode !== 'confirm' && (
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {mode === 'signup' && (
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  )}
                </>
              )}

              {mode === 'confirm' && (
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                    Confirmation Code
                  </label>
                  <input
                    id="code"
                    type="text"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Please check your email for the confirmation code.
                  </p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Please wait...' : 
                   mode === 'login' ? 'Sign in' :
                   mode === 'signup' ? 'Sign up' :
                   'Verify Email'}
                </button>
              </div>
            </form>

            {mode !== 'confirm' && (
              <div className="text-center">
                <button
                  onClick={() => setMode(mode == 'login' ? 'signup' : 'login')}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
                </button>
              </div>
            )}
          </div>
        </div>
  );
}

export default AuthPage;