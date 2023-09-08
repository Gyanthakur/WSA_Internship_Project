import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import RestaurantPage from './pages/RestaurantPage/RestaurantPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import Offers from './pages/Offers/Offers';
import Search from './pages/Search/Search';
import { useEffect } from 'react';
import { updateCart, updateRest } from './redux/slice/cartSlice';
import Profile from './pages/Profile/Profile';
import axios from 'axios';
import { LOGIN_WITH_TOKEN_API_LINK } from './utils/config';
import { login } from './redux/slice/authSlice';
import VerifyAccountPage from './pages/VerifyAccountPage/VerifyAccountPage';
import { updateSigninSideVisible } from './redux/slice/loginSlice';

const AppLayout = () => {
  const cart = useSelector(state => state.cart.items);
  const restaurant = useSelector(state => state.cart.restaurant);
  const dispatch = useDispatch();
  const setCartToLocalStorage = () => {
    window.localStorage.setItem('sw_cart_data', JSON.stringify(cart));
    window.localStorage.setItem('sw_res_data', JSON.stringify(restaurant));
  };
  const getCartToLocalStorage = () => {
    const cartData = window.localStorage.getItem('sw_cart_data')
      ? JSON.parse(window.localStorage.getItem('sw_cart_data'))
      : [];
    const resDetails = window.localStorage.getItem('sw_res_data')
      ? JSON.parse(window.localStorage.getItem('sw_res_data'))
      : {
          restaurantId: '',
          details: {},
        };

    dispatch(updateCart(cartData));
    dispatch(updateRest(resDetails));
  };
  const loginWithToken = async () => {
    const token = window.localStorage.getItem('token') || '';
    try {
      const { data } = await axios.post(LOGIN_WITH_TOKEN_API_LINK, { token });
      dispatch(login(data?.data?.user));
      dispatch(updateSigninSideVisible(false));
    } catch (error) {
      // dispatch(updateSigninSideVisible(true));
      // console.log(error);
    }
  };
  useEffect(() => {
    getCartToLocalStorage();
    loginWithToken();
  }, []);
  useEffect(() => {
    setCartToLocalStorage();
  }, [cart]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <div
        style={{
          fontSize: '1.5rem',
        }}></div>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: (
      <>
        <Header />
        <Error />
        <Footer />
      </>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/offers',
        element: <Offers />,
      },
      {
        path: '/checkout',
        element: <CheckoutPage />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/account',
        element: <Profile />,
      },
      {
        path: '/restaurants/:slug',
        element: <RestaurantPage />,
      },
      {
        path: '/user/verify-account-link/:id/:token',
        element: <VerifyAccountPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
};
export default App;
