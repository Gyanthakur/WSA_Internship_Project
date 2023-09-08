import './CheckoutPage.scss';
import PaddingTop from '../../utils/PaddingTop';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  IMG_LINK,
  LOGIN_WITH_TOKEN_API_LINK,
  ORDER_API_LINK,
  RESTAURANT_DETAILS_API,
} from '../../utils/config';
import { BiMinus, BiPlus } from 'react-icons/bi';
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../redux/slice/cartSlice';
import {
  cc_format,
  expiry_format,
  cvv_format,
  name_format,
} from '../../utils/inputFormat';

import { ReactComponent as LoadingIcon } from './../../assets/loading.svg';
import Swal from 'sweetalert2';
import { updateSigninSideVisible } from '../../redux/slice/loginSlice';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../auth/firebase';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactComponent as OffersIcon } from './../../assets/icons/offers.svg';
import { CiLocationOn } from 'react-icons/ci';
import { MdPayment } from 'react-icons/md';
import PlaceBox from '../../components/PlaceBox/PlaceBox';
import { AnimatePresence, motion } from 'framer-motion';
import { login } from '../../redux/slice/authSlice';

const CheckoutPage = () => {
  const cart = useSelector(state => state.cart.items);
  const cartRestaurant = useSelector(state => state.cart.restaurant);
  const locationData = useSelector(state => state.location.location);
  const itemTotal =
    cart?.reduce((acc, el) => {
      return el?.info?.price
        ? acc + el?.info?.price * el?.quantity
        : el?.info?.defaultPrice
        ? acc + el?.info?.defaultPrice * el?.quantity
        : acc + el?.info?.variantsV2?.pricingModels?.[0]?.price * el?.quantity;
    }, 0) / 100;
  const delCharge = 50;
  const gstAndRestCharge = Math.round(itemTotal * 0.02);
  const userAuth = useSelector(state => state.auth.isAuth);
  const userData = useSelector(state => state.auth.user);
  const isVerified = useSelector(state => state.auth.user.isVerified);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isNoContactDel, setIsNoContactDel] = useState(false);
  const [isPlaceBoxVisible, setIsPlaceBoxVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialPaymentState = {
    card: '',
    expiry: '',
    cvv: '',
    name: '',
  };
  const [paymentInfo, setPaymentInfo] = useState(initialPaymentState);
  const initialSelectedAdd = {
    lat: '',
    lng: '',
    location: '',
    more_info: '',
  };
  const [selectedAddress, setSelectedAddress] = useState(initialSelectedAdd);

  const changeHandler = e => {
    setError('');
    let { name, value } = e.target;
    if (name === 'card') {
      value = value.split(' ').join('');
    }
    if (name === 'expiry') {
      value = value.split('/').join('');
    }
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };

  document.title = `Food Ordering - GPS`;
  const verifyAccount = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      Swal.fire('Check email!', `Verification send to email!`, 'success');
    } catch (error) {
      // Swal.fire('Failed!', error.message, 'error');
    }
  };
  const sendEmailHandler = async () => {
    setIsOrdering(true);
    try {
      const arr = cart?.map(el => {
        return {
          name: el?.info?.name,
          quantity: el?.quantity,
          price:
            (el?.info?.price ||
              el?.info?.defaultPrice ||
              el?.info?.variantsV2?.pricingModels?.[0]?.price) / 100,
        };
      });
      const quantity = arr.reduce((acc, cur) => {
        return (acc += cur?.quantity);
      }, 0);
      const subtotal = arr.reduce((acc, cur) => {
        return (acc += cur?.quantity * cur?.price);
      }, 0);
      arr.push({
        name: 'Sub Total',
        quantity: quantity,
        price: subtotal.toFixed(2),
      });
      arr.push({
        name: 'GST(3%)',
        quantity: '',
        price: (subtotal * 0.03).toFixed(2),
      });
      arr.push({
        name: '<b>Total</b>',
        quantity: `<b>${quantity}</b>`,
        price: `<b>${(subtotal * 1.03).toFixed(2)}</b>`,
      });

      setIsOrdering(false);
      Swal.fire({
        title: 'Order Successful!',
        text: 'Check your email for order details!',
        icon: 'success',
      }).then(result => {
        if (result.isConfirmed) {
          dispatch(clearCart());
          navigate('/');
        }
      });

      await axios.post(ORDER_API_LINK, {
        token: window.localStorage.getItem('token'),
        orderList: arr.map(el => {
          return {
            ...el,
            price: `₹${el.price.toLocaleString()}`,
          };
        }),
      });
    } catch (error) {
      setIsOrdering(false);
      // Swal.fire('Failed!', error.message, 'error');
    }
  };
  const paymentHandler = e => {
    e.preventDefault();
    if (paymentInfo.card.trim() === '' || paymentInfo.card.length < 16) {
      setError('card');
      return;
    }
    if (paymentInfo.expiry.trim() === '' || paymentInfo.expiry.length < 4) {
      setError('expiry');
      return;
    }
    if (paymentInfo.cvv.trim() === '' || paymentInfo.cvv.length < 3) {
      setError('cvv');
      return;
    }
    if (paymentInfo.name.trim() === '') {
      setError('name');
      return;
    }
    if (error !== '') return;
    setPaymentInfo(initialPaymentState);
    if (!userAuth) {
      return Swal.fire({
        title: 'Please login first!',
        text: 'After login you can order!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Login!',
      }).then(result => {
        if (result.isConfirmed) {
          dispatch(updateSigninSideVisible(true));
        }
      });
    }
    if (!isVerified) {
      return Swal.fire({
        title: 'Please verify email!',
        text: 'We will send order details to email!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Verify!',
        cancelButtonText: 'Order anyway!',
      }).then(result => {
        if (result.isConfirmed) {
          verifyAccount();
        } else {
          sendEmailHandler();
          return;
        }
      });
    }
    sendEmailHandler();
  };
  if (cart.length === 0) {
    return (
      <PaddingTop>
        <div className="error-wrapper">
          <div className="error">
            <img
              className="img"
              src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
              alt=""
            />
            <h1>Your cart is empty</h1>
            <p>You can go to home page to view more restaurants</p>
            <div className="links">
              <span
                onClick={() => {
                  navigate('/');
                }}
                className="retry">
                SEE RESTAURANTS NEAR YOU
              </span>
            </div>
          </div>
        </div>
      </PaddingTop>
    );
  }

  return (
    <div className="checkout-wrapper">
      <div className="checkout">
        <div className="nav">
          <button
            className="bck"
            onClick={() => {
              navigate(-1);
            }}>
            Back
          </button>
          <button
            className="clr"
            onClick={() => {
              Swal.fire({
                title: 'Clear cart?',
                text: 'Dou you want to clear cart?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Clear!',
              }).then(result => {
                if (result.isConfirmed) {
                  dispatch(clearCart());
                }
              });
            }}>
            Clear Cart
          </button>
        </div>
        {/* Left Location */}
        {/* {isPlaceBoxVisible && (
          <div
            onClick={() => {
              setIsPlaceBoxVisible(false);
            }}
            className="black-mask"></div>
        )} */}
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
                <PlaceBox
                  setIsPlaceBoxVisible={setIsPlaceBoxVisible}
                  isCheckoutPage={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="main">
          <div className="main-left">
            <div className="address">
              <div className="top">
                <CiLocationOn className="icon" />
                <div className="text">
                  <div>Select delivery address</div>
                  <div>You have a saved address in this location</div>
                </div>
              </div>
              <div className="bottom">
                {userData?.address?.map(addressData => (
                  <div
                    key={uuidv4()}
                    onClick={() => {
                      setSelectedAddress(addressData);
                    }}
                    className={`address-box ${
                      selectedAddress.lat === addressData.lat &&
                      selectedAddress.lng === addressData.lng
                        ? 'selected'
                        : ''
                    }`}>
                    <div className="top">
                      <CiLocationOn className="icon-ad" />
                      <div className="right">
                        <div>
                          {addressData?.location
                            ?.split('')
                            .map((el, i) => (i === 0 ? el.toUpperCase() : el))
                            .join('')}
                        </div>
                        <div>{addressData?.more_info}</div>
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="bg-green">DELIVER HERE</div>
                    </div>
                  </div>
                ))}
                <div
                  onClick={() => {
                    const token = window.localStorage.getItem('token') || '';
                    axios
                      .post(
                        `https://swiggy-clone-wjqx.onrender.com/api/v1/user/address`,
                        {
                          lat: locationData.lat,
                          lng: locationData.lng,
                          location: locationData.location,
                          token: token,
                        }
                      )
                      .then(({ data }) => {
                        axios
                          .post(LOGIN_WITH_TOKEN_API_LINK, { token })
                          .then(({ data }) => {
                            dispatch(login(data?.data?.user));
                          });
                        Swal.fire({
                          title: 'Address added',
                          text: 'Address added successfully!',
                          icon: 'success',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                        }).then(result => {
                          setSelectedAddress(initialSelectedAdd);
                        });
                      })
                      .catch(e => {
                        Swal.fire('Failed!', e.response.data.message, 'error');
                      });
                  }}
                  className="address-box">
                  <div className="top">
                    <CiLocationOn className="icon-ad" />
                    <div className="right">
                      <div>Add New Address</div>
                      <div>
                        {locationData?.location
                          ?.split('')
                          .map((el, i) => (i === 0 ? el.toUpperCase() : el))
                          .join('')}
                      </div>
                    </div>
                  </div>
                  <div className="bottom">
                    <div>ADD NEW</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="devider"></div>
            <div className="payments">
              <div className="top">
                <MdPayment className="icon" />
                <div className="text">
                  <div>Payments</div>
                  <div>Credit & Debit cards</div>
                </div>
              </div>
              {selectedAddress.lat !== '' && (
                <motion.div
                  initial={{
                    y: '-10%',
                  }}
                  animate={{
                    y: 0,
                  }}
                  className="bottom">
                  <div className="we-accept">
                    <span>We accept</span>
                    <img
                      src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,e_trim/Visa_lztyeu"
                      alt="visa"
                    />
                    <img
                      src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,e_trim/Mastercard_wqoea2"
                      alt="master-cart"
                    />
                    <img
                      src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,e_trim/Amex_ozga1w"
                      alt="american-express"
                    />
                    <img
                      src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,e_trim/Zeta_zybqrc"
                      alt="zeta"
                    />
                    <img
                      src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,e_trim/RuPayColoured_oyd73s_soebkd"
                      alt="Rupay"
                    />
                  </div>
                  <form onSubmit={paymentHandler} className="input-box">
                    <div className={`card-no ${error === 'card' ? 'err' : ''}`}>
                      <input
                        type="text"
                        name="card"
                        value={cc_format(paymentInfo.card)}
                        autoComplete="off"
                        onChange={changeHandler}
                        maxLength={19}
                        placeholder="Card number"
                      />
                      <label className={`${paymentInfo.card ? 'filled' : ''}`}>
                        Card number
                      </label>
                    </div>
                    <div className={`expiry-cvv`}>
                      <div className={`${error === 'expiry' ? 'err' : ''}`}>
                        <input
                          type="text"
                          name="expiry"
                          value={expiry_format(paymentInfo.expiry)}
                          autoComplete="off"
                          onChange={changeHandler}
                          maxLength={5}
                          placeholder={`Valid through(MM/YY)`}
                        />
                        <label
                          className={`${paymentInfo.expiry ? 'filled' : ''}`}>
                          Expirt
                        </label>
                      </div>
                      <div className={`${error === 'cvv' ? 'err' : ''}`}>
                        <input
                          type="text"
                          name="cvv"
                          value={cvv_format(paymentInfo.cvv)}
                          autoComplete="off"
                          onChange={changeHandler}
                          maxLength={3}
                          placeholder={`CVV`}
                        />
                        <label className={`${paymentInfo.cvv ? 'filled' : ''}`}>
                          CVV
                        </label>
                      </div>
                    </div>
                    <div className={`name ${error === 'name' ? 'err' : ''}`}>
                      <input
                        type="text"
                        name="name"
                        value={name_format(paymentInfo.name)}
                        autoComplete="off"
                        onChange={changeHandler}
                        placeholder={`Name on card`}
                      />
                      <label className={`${paymentInfo.name ? 'filled' : ''}`}>
                        Name
                      </label>
                    </div>
                    <button disabled={isOrdering}>
                      {isOrdering
                        ? 'Ordering...'
                        : `Pay ₹${itemTotal + delCharge + gstAndRestCharge}`}
                    </button>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
          <div className="main-right">
            <div className="hotel">
              <img
                className="hotel-img"
                src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/${cartRestaurant?.details?.img}`}
                alt={cartRestaurant?.details?.name}
              />
              <div className="hotel-info">
                <div className="top">
                  <div className="name">{cartRestaurant?.details?.name}</div>
                  <div className="address">
                    {cartRestaurant?.details?.place}
                  </div>
                </div>
                <div className="bottom"></div>
              </div>
            </div>
            <div className="cart-items">
              {cart?.map(item => (
                <div key={uuidv4()} className="item">
                  <div className="name">
                    <span>{item?.info?.name}</span>
                  </div>
                  <div className="controls">
                    <span className="btns">
                      <BiMinus
                        onClick={() => {
                          if (item?.quantity > 1) {
                            dispatch(decreaseQuantity(item?.info?.id));
                          } else if (item?.quantity === 1) {
                            dispatch(removeFromCart(item?.info?.id));
                          }
                        }}
                      />
                    </span>
                    <span>{item?.quantity}</span>
                    <span className="btns">
                      <BiPlus
                        onClick={() => {
                          dispatch(increaseQuantity(item?.info?.id));
                        }}
                      />
                    </span>
                  </div>
                  <div className="price">
                    ₹
                    {(item?.info?.price
                      ? (item?.info?.price * item?.quantity) / 100
                      : item?.info?.defaultPrice
                      ? (item?.info?.defaultPrice * item?.quantity) / 100
                      : item?.info?.variantsV2?.pricingModels?.[0]?.price / 100
                    ).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <input
              type="text"
              className="suggestion-box"
              placeholder={`Any suggestions? We will pass it on...`}
            />
            <div className="no-contact-del">
              <input
                type="checkbox"
                name="check"
                id="check"
                className="checkbox"
                checked={isNoContactDel}
                onChange={e => setIsNoContactDel(e.target.checked)}
              />
              <div className="text">
                <div className="heading-text">
                  Opt in for No-contact Delivery
                </div>
                {!isNoContactDel ? (
                  <div className="desc">
                    Unwell, or avoiding contact? Please select no-contact
                    delivery. Partner will safely place the order outside your
                    door (not for COD)
                  </div>
                ) : (
                  <div className="desc">
                    Our delivery partner will call to confirm. Please ensure
                    that your address has all the required details.
                  </div>
                )}
              </div>
            </div>
            <div className="apply-coupon">
              <OffersIcon className="icon" />
              <div className="text">Apply Coupon</div>
            </div>
            <div className="bill">
              <div className="top">Bill Details</div>
              <div className="bill-details">
                <div className="item-total">
                  <div>Item Total</div>
                  <div>₹ {itemTotal}</div>
                </div>
                <div className="del-charge">
                  <div>Delivery Fee</div>
                  <div>₹ {delCharge}</div>
                </div>
                <div className="gst-rest-charge">
                  <div>GST and Restaurant Charges</div>
                  <div>₹ {gstAndRestCharge}</div>
                </div>
                <div className="total">
                  <div>TO PAY</div>
                  <div>₹ {itemTotal + delCharge + gstAndRestCharge}</div>
                </div>
              </div>
            </div>
            <div className="devider"></div>
            <div className="cancletion-policy">
              <div className="heading">
                Review your order and address details to avoid cancellations
              </div>
              <div className="note">
                <span>Note: </span>If you cancel within 60 seconds of placing
                your order, a 100% refund will be issued. No refund for
                cancellations made after 60 seconds.
              </div>
              <div className="extra">
                Avoid cancellation as it leads to food wastage.
              </div>
              <div className="link">Read cancellation policy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
