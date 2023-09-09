import React, { useState } from 'react';
import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as CartIcon } from './../../assets/icons/cart.svg';
import { ReactComponent as LogoIcon } from './../../assets/icons/logo.svg';
import Logo from "./../../assets/icons/logo2.webp"
import { ReactComponent as LogoIconBW } from './../../assets/icons/logoBW.svg';
import { ReactComponent as SearchIcon } from './../../assets/icons/search.svg';
import { ReactComponent as OffersIcon } from './../../assets/icons/offers.svg';
import { ReactComponent as SigninIcon } from './../../assets/icons/signin.svg';
import { VscChevronDown } from 'react-icons/vsc';
import { CiLocationOn } from 'react-icons/ci';
import { GoThreeBars } from 'react-icons/go';
import { BsBag } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import SignInBox from '../SignInBox/SignInBox';
import SignUpBox from '../SignUpBox/SignUpBox';
import { updateSigninSideVisible } from '../../redux/slice/loginSlice';
import PlaceBox from '../PlaceBox/PlaceBox';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  // NOTE: I am subscribing to store
  const cartItems = useSelector(state => state.cart.items);
  const isSigninSideVisible = useSelector(
    state => state.loginBools.isSigninSideVisible
  );
  const dispatch = useDispatch();
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [isPlaceBoxVisible, setIsPlaceBoxVisible] = useState(false);
  const userAuth = useSelector(state => state.auth);
  const { location } = useSelector(state => state.location.location);

  return (
    <>
      <div className="header-wrapper">
        <div className="header">
          <div className="logo">
            <Link className="logo-link" to={'/'}>
              <img src={Logo} className='logoImg' alt="logo"/>
            </Link>
            {/* <div onClick={() => setIsPlaceBoxVisible(true)} className="__left">
              <span className="type">
                <CiLocationOn className="icon" />
                {location
                  ?.split('')
                  .map((el, i) => (i === 0 ? el.toUpperCase() : el))
                  .join('')}
              </span>
              <div className="__left-location">
                <span>
                  <VscChevronDown className="icon" />
                </span>
              </div>
            </div> */}
          </div>

          <div className="nav-links">
            <div className="search">
              <NavLink to={'/search'} className="link">
                <SearchIcon className="icon" />
                <span>Search</span>
              </NavLink>
            </div>
            <NavLink to="/offers" className="link" id="offers">
              <OffersIcon className="icon" />
              <span>Offers</span>
            </NavLink>
            <div className="name">
              {!userAuth.isAuth ? (
                <span
                  onClick={() => {
                    dispatch(updateSigninSideVisible(true));
                  }}
                  className="link">
                  <SigninIcon className="icon" />
                  <span>Sign In</span>
                </span>
              ) : (
                <NavLink to={'/account'} className="link">
                  {userAuth?.user?.photoURL ? (
                    <img
                      src={userAuth?.user?.photoURL}
                      className="profile-img"
                    />
                  ) : (
                    <SigninIcon className="icon" />
                  )}
                  <span className="truncate">{userAuth?.user?.name}</span>
                </NavLink>
              )}
            </div>
            <div className="cart">
              <NavLink to="/checkout" className="link">
                <div>
                  <CartIcon
                    className={
                      cartItems?.length === 0 ? 'cart-empty' : 'cart-nonempty'
                    }
                  />
                  <span
                    className={
                      cartItems?.length === 0 ? 'item' : 'item color-white'
                    }>
                    {cartItems?.length}
                  </span>
                </div>
                <span>Cart</span>
              </NavLink>
            </div>
          </div>
          {/* <div
            onClick={() => {
              setIsMobileNavVisible(prev => !prev);
            }}
            className={`mobile-nav`}>
            {!isMobileNavVisible ? (
              <GoThreeBars className="bars" />
            ) : (
              <RxCross1 className="bars" />
            )}
          </div> */}
          {/* Mobile Nav */}
        </div>
      </div>

      {/* <div
        className={`mobile-nav-menu ${
          !isMobileNavVisible ? 'bottom-to-top' : 'top-to-bottom'
        }`}>
        <div className="nav-links">
          <div className="search">
            <NavLink
              onClick={() => setIsMobileNavVisible(false)}
              to={'/search'}
              className="link">
              <SearchIcon className="icon" />
              <span>Search</span>
            </NavLink>
          </div>
          <NavLink
            to="/offers"
            onClick={() => setIsMobileNavVisible(false)}
            className="link"
            id="offers">
            <OffersIcon className="icon" />
            <span>Offers</span>
          </NavLink>
          <div className="name">
            {!userAuth.isAuth ? (
              <span
                onClick={() => {
                  dispatch(updateSigninSideVisible(true));
                  setIsMobileNavVisible(false);
                }}
                className="link">
                <SigninIcon className="icon" />
                <span>Sign In</span>
              </span>
            ) : (
              <NavLink
                to={'/account'}
                onClick={() => setIsMobileNavVisible(false)}
                className="link">
                {userAuth?.user?.photoURL ? (
                  <img src={userAuth?.user?.photoURL} className="profile-img" />
                ) : (
                  <SigninIcon className="icon" />
                )}
                <div>
                  <span className="truncate2">
                    {userAuth?.user?.name?.split(' ')?.[0]}
                  </span>
                </div>
              </NavLink>
            )}
          </div>
          <div className="cart">
            <NavLink
              to="/checkout"
              onClick={() => setIsMobileNavVisible(false)}
              className="link">
              <div>
                <CartIcon
                  className={
                    cartItems?.length === 0 ? 'cart-empty' : 'cart-nonempty'
                  }
                />
                <span
                  className={
                    cartItems?.length === 0 ? 'item' : 'item color-white'
                  }>
                  {cartItems?.length}
                </span>
              </div>
              <span>Cart</span>
            </NavLink>
          </div>
        </div>
      </div> */}

      {/* Mobile Bottom Nav */}

      <div className="mobile-bottom-nav">
        <div className="nav">
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? 'nav-bottom-btn active-nav' : 'nav-bottom-btn'
            }>
            {/* <LogoIconBW className="icon-btm" /> */}
            <img src={Logo} className='logoImg' alt="logo"/>
            <div className="text">Food Ordering</div>
          </NavLink>
          <NavLink
            to={'/search'}
            className={({ isActive }) =>
              isActive ? 'nav-bottom-btn active-nav' : 'nav-bottom-btn'
            }>
            <SearchIcon className="icon-btm" />
            <div className="text">Search</div>
          </NavLink>
          <NavLink
            to={'/checkout'}
            className={({ isActive }) =>
              isActive ? 'nav-bottom-btn active-nav' : 'nav-bottom-btn'
            }>
            <BsBag className="icon-btm" />
            {cartItems?.length !== 0 && (
              <span className="tag">{cartItems?.length}</span>
            )}
            <div className="text">Cart</div>
          </NavLink>
          <NavLink
            to={'/account'}
            className={({ isActive }) =>
              isActive ? 'nav-bottom-btn active-nav' : 'nav-bottom-btn'
            }>
            <SigninIcon className="icon-btm" />
            <div className="text">Account</div>
          </NavLink>
        </div>
      </div>

      {(isSigninSideVisible || isPlaceBoxVisible) && (
        <div
          onClick={() => {
            setIsPlaceBoxVisible(false);
            dispatch(updateSigninSideVisible(false));
          }}
          className="black-mask"></div>
      )}
      <div className={`signin-side-wrapper`}>
        <div
          className={`signin-side ${
            isSigninSideVisible ? 'visible-side' : ''
          }`}>
          <div className="top">
            <div className="left">
              <RxCross1
                onClick={() => dispatch(updateSigninSideVisible(false))}
                className="icon"
              />
              <div className="login-box">
                <div className="login">
                  {isLoginScreen ? 'Login' : 'Sign up'}
                </div>
                <div className="create">
                  <span>or</span>
                  <span onClick={() => setIsLoginScreen(prev => !prev)}>
                    {isLoginScreen
                      ? 'create an account'
                      : 'login to your account'}
                  </span>
                </div>
              </div>
              <div className="style"></div>
            </div>
            <div className="right">
              <img
                src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                alt=""
              />
            </div>
          </div>
          <div className="bottom">
            {isLoginScreen ? <SignInBox /> : <SignUpBox />}
          </div>
        </div>
      </div>
      <div>
        <AnimatePresence onExitComplete={() => true}>
          {isPlaceBoxVisible && (
            <motion.div
              initial={{
                x: '-100vw',
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  type: 'just',
                },
              }}
              exit={{
                x: '-100vw',
                opacity: 0,
                transition: {
                  ease: 'easeInOut',
                },
              }}
              className={`place_box_side`}>
              <PlaceBox setIsPlaceBoxVisible={setIsPlaceBoxVisible} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Header;
