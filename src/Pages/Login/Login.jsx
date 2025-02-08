import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { DarkModeProvider } from '../../contexts/DarkModeContext';

const Login = () => {
    const { SignInUser, googleSignIn } = useContext(AuthProvider);
    const { theme } = useContext(DarkModeProvider);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        SignInUser(email, password)
            .then(res => {
                const user = res.user;
                console.log(user);
                toast.success('Successfully Login');
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error)
                toast.error(error.message);
            });
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                const user = res.user;
                console.log(user);
                toast.success('Successfully Registered');
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message);
            })
    }

    return (
        <div className='flex justify-center items-center mt-10 mb-10 text-start' data-aos="fade-up" data-aos-duration="2000">
            <div className="w-full max-w-md">
                <div className={`${theme === 'light' ? '' : 'bg-darkBlack'} rounded shadow-2xl p-6 sm:p-8 border-t-4 border-violet-500`}>
                    <h2 className={`mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl ${theme === 'light' ? 'text-violet-500' : 'text-white'} `}>
                        Login
                    </h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-1 sm:mb-2">
                            <label
                                htmlFor="email"
                                className="inline-block mb-1 font-medium"
                            >
                                E-mail
                            </label>
                            <input
                                placeholder="john.doe@example.org"
                                required
                                type="text"
                                className={`flex-grow ${theme === 'light' ? 'border border-gray-300' : 'bg-lightDark text-white'} w-full h-10 px-4 mb-2 transition duration-200 rounded shadow-sm`}
                                id="email"
                                name="email"
                            />
                        </div>

                        <div className="mb-1">
                            <label
                                htmlFor="lastName"
                                className="inline-block mb-1 font-medium"
                            >
                                Password
                            </label>
                            <input
                                placeholder="**********"
                                required
                                type="password"
                                className={`flex-grow ${theme === 'light' ? 'border border-gray-300' : 'bg-lightDark text-white'} w-full h-10 px-4 mb-3 transition duration-200 rounded shadow-sm`}
                                id="password"
                                name="password"
                            />
                        </div>

                        <div className="mt-2 mb-2">
                            <button
                                type="submit"
                                className={`inline-flex items-center justify-center w-full h-11 px-6 mb-2 rounded ${theme === 'light' ? 'bg-violet-500' : 'bg-gray-700'} font-medium tracking-wide text-white`}
                            >
                                Login
                            </button>
                        </div>

                        <div className="mt-3 mb-4">
                            <button onClick={handleGoogleSignIn}
                                className={`flex items-center gap-2 justify-center w-full h-11 px-6 font-medium shadow-xl border-t-2 border-gray-100 rounded tracking-wide ${theme === 'light' ? 'text-black' : 'text-white bg-gray-700'} `}
                            >
                                <FcGoogle size={25}></FcGoogle>
                                <span>Sign in with Google</span>
                            </button>
                        </div>
                        <p className={`text-xs ${theme === 'light' ? 'text-gray-600 ' : 'text-white'} sm:text-sm`}>
                            <span>Doesn't have an account? Please<Link className='ml-1 text-violet-500 font-bold' to='/register'>Register</Link></span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;