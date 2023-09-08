import { useState } from 'react';
import './SignUpBox.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../auth/firebase';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slice/authSlice';
import { updateSigninSideVisible } from '../../redux/slice/loginSlice';
import Swal from 'sweetalert2';
import { ReactComponent as LoadingIcon } from './../../assets/loading.svg';
import { LOGIN_API_LINK, REGISTER_API_LINK } from '../../utils/config';
import axios from 'axios';

const SignUpBox = ({}) => {
  const initialState = {
    name: '',
    email: '',
    password: '',
  };
  const [state, setState] = useState(initialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorIn, setErrorIn] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const changeHandler = e => {
    setErrorIn('');
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  const signupHandler = async () => {
    if (state.name.trim().length < 5) {
      return setErrorIn('name');
    }
    if (!validator.isEmail(state.email.trim())) {
      return setErrorIn('email');
    }
    if (state.password.trim().length < 8) {
      return setErrorIn('password');
    }
    setIsLoggingIn(true);

    try {
      const { data: res } = await axios.post(REGISTER_API_LINK, state);
      dispatch(updateSigninSideVisible(false));
      setState(initialState);
      const result = await Swal.fire({
        title: 'Success!',
        text: 'Account created successfully. Dou you want to login?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Login!',
      });
      if (result.isConfirmed) {
        dispatch(updateSigninSideVisible(true));
        setIsLoggingIn(false);
      } else {
        setIsLoggingIn(false);
      }
    } catch (error) {
      Swal.fire('Failed!', error?.response?.data?.message, 'error');
      setIsLoggingIn(false);
    }

    // createUserWithEmailAndPassword(auth, state.email, state.password)
    // 	.then(result => {
    // 		// Signed in
    // 		const user = result.user;
    // 		// ...
    // 		updateProfile(auth.currentUser, {
    // 			displayName: state.name,
    // 		})
    // 			.then(() => {
    // 				dispatch(updateSigninSideVisible(false));
    // 				setState(initialState);
    // 				Swal.fire({
    // 					title: 'Success!',
    // 					text: 'Account created successfully. Dou you want to login?',
    // 					icon: 'success',
    // 					showCancelButton: true,
    // 					confirmButtonColor: '#3085d6',
    // 					cancelButtonColor: '#d33',
    // 					confirmButtonText: 'Yes, Login!',
    // 				}).then(result => {
    // 					if (result.isConfirmed) {
    // 						dispatch(
    // 							login({
    // 								displayName: user?.displayName,
    // 								email: user?.email,
    // 								emailVerified: user?.emailVerified,
    // 								providerId: result?.providerId,
    // 							})
    // 						);
    // 					}
    // 				});
    // 				setIsLoggingIn(false);
    // 			})
    // 			.catch(error => {
    // 				Swal.fire('Failed!', error.message, 'error');
    // 				setIsLoggingIn(false);
    // 			});
    // 	})
    // 	.catch(error => {
    // 		Swal.fire('Failed!', error.message, 'error');
    // 		setIsLoggingIn(false);
    // 	});
  };

  return (
    <div className="signup-box">
      {errorIn && (
        <div className="err-text">
          {errorIn === 'email'
            ? 'Please enter a valid email!'
            : errorIn === 'name'
            ? 'Full Name should atleast 5 character long!'
            : 'Password should atleast 8 character long!'}
        </div>
      )}
      <input
        type="text"
        value={state.name}
        onChange={changeHandler}
        name="name"
        placeholder="Full Name"
        className={`${errorIn === 'name' ? 'err' : ''}`}
      />
      <input
        type="email"
        value={state.email}
        onChange={changeHandler}
        name="email"
        placeholder="Email"
        className={`${errorIn === 'email' ? 'err' : ''}`}
      />
      <div>
        <input
          type={`${isPasswordVisible ? 'text' : 'password'}`}
          value={state.password}
          onChange={changeHandler}
          name="password"
          placeholder="Password"
          className={`${errorIn === 'password' ? 'err' : ''}`}
        />
        {isPasswordVisible ? (
          <AiOutlineEyeInvisible
            onClick={() => setIsPasswordVisible(prev => !prev)}
            className="eye"
          />
        ) : (
          <AiOutlineEye
            onClick={() => setIsPasswordVisible(prev => !prev)}
            className="eye"
          />
        )}
      </div>
      <button disabled={isLoggingIn} onClick={signupHandler}>
        {isLoggingIn ? <LoadingIcon className="loading-icon" /> : 'Signup'}
      </button>
    </div>
  );
};

export default SignUpBox;
