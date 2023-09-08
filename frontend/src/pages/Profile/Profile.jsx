import { useDispatch, useSelector } from 'react-redux';
import './Profile.scss';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { login, logout } from '../../redux/slice/authSlice';
import Swal from 'sweetalert2';
import { updateSigninSideVisible } from '../../redux/slice/loginSlice';
import axios from 'axios';
import {
  CURR_USER_API_LINK,
  LOGOUT_API_LINK,
  SEND_VERIFY_ACC_API_LINK,
} from '../../utils/config';
import { BsHandbag } from 'react-icons/bs';
import { AiFillCreditCard } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { v4 as uuidv4 } from 'uuid';

const Profile = () => {
  const authData = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, _] = useSearchParams();
  const tab = query.get('tab');
  const verifyAccount = async () => {
    try {
      await axios.post(SEND_VERIFY_ACC_API_LINK, {
        token: window.localStorage.getItem('token'),
      });
      Swal.fire('Check email!', `Verification send to email!`, 'success');
    } catch (error) {
      Swal.fire('Failed!', error.message, 'error');
    }
  };
  const logoutFunc = async () => {
    try {
      await axios.get(LOGOUT_API_LINK);
      navigate('/');
      dispatch(logout());
      dispatch(updateSigninSideVisible(true));
      window.localStorage.removeItem('token');
    } catch (error) {
      Swal.fire('Failed!', error.message, 'error');
    }
  };

  const getUserData = async () => {
    const { data } = await axios.post(CURR_USER_API_LINK, {
      token: window.localStorage.getItem('token'),
    });
    dispatch(login(data?.data?.user));
  };

  useEffect(() => {
    if (!authData.isAuth) {
      navigate('/');
      dispatch(updateSigninSideVisible(true));
    }
  }, [authData.isAuth]);
  useEffect(() => {
    if (!authData.isAuth) {
      navigate('/');
      dispatch(updateSigninSideVisible(true));
    }
    getUserData();
    navigate('/account?tab=orders');
  }, []);
  return (
    <div className="profile-wrapper">
      <div className="profile">
        <div className="upper-sec">
          <div>
            <div className="name">{authData?.user?.name}</div>
            <div className="email">
              {authData?.user?.email}{' '}
              {!authData?.user?.isVerified ? (
                <button onClick={verifyAccount} className="verify-btn">
                  Not Verify
                </button>
              ) : (
                <button className="verifed-btn">Verified</button>
              )}
            </div>
          </div>
          <button
            className="logout-btn"
            onClick={() => {
              Swal.fire({
                title: 'Are you sure?',
                text: 'Dou you want to log out?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Logout!',
              }).then(result => {
                if (result.isConfirmed) {
                  logoutFunc();
                }
              });
            }}>
            Logout
          </button>
        </div>
        <div className="lower-sec">
          <div className="left">
            <Link
              to={'/account?tab=orders'}
              className={`link ${tab === 'orders' ? 'bg-white' : ''}`}>
              <span className="i">
                <BsHandbag className="icon" />
              </span>
              <span>Orders</span>
            </Link>
            <Link
              to={'/account?tab=swiggy-one'}
              className={`link ${tab === 'swiggy-one' ? 'bg-white' : ''}`}>
              <span className="i">
                <BsHandbag className="icon" />
              </span>
              <span>Swiggy One</span>
            </Link>
            <Link
              to={'/account?tab=payments'}
              className={`link ${tab === 'payments' ? 'bg-white' : ''}`}>
              <span className="i">
                <AiFillCreditCard className="icon" />
              </span>
              <span>Payments</span>
            </Link>
            <Link
              to={'/account?tab=addresses'}
              className={`link ${tab === 'addresses' ? 'bg-white' : ''}`}>
              <span className="i">
                <GoLocation className="icon" />
              </span>
              <span>Addresses</span>
            </Link>
          </div>
          <div className="right">
            {tab === 'orders' && (
              <div className="order-wrapper">
                {authData?.user?.orderList
                  ?.slice()
                  ?.reverse()
                  .map(or => (
                    <div key={uuidv4()}>
                      <div className="order-no">
                        Order #{or?.orderNo} -{' '}
                        {new Date(or?.date).toDateString()}
                      </div>
                      <ol className="list">
                        {or?.list?.slice(0, -3).map(el => (
                          <li className="order-list" key={uuidv4()}>
                            {el?.name} X {el?.quantity} = ₹
                            {el?.price?.slice(1) * el?.quantity}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
