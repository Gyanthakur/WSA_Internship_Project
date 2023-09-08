import { useDispatch, useSelector } from 'react-redux';
import { IMG_LINK } from '../../utils/config';
import './DishCard.scss';
import { AiOutlineArrowRight, AiFillStar } from 'react-icons/ai';
import { ReactComponent as VegIcon } from './../../assets/icons/veg.svg';
import { ReactComponent as NonVegIcon } from './../../assets/icons/nonveg.svg';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  clearCart,
} from '../../redux/slice/cartSlice';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { BiMinus, BiPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const DishCard = ({ dishItem }) => {
  const navigate = useNavigate();
  const { info, restaurant } = dishItem?.card?.card;
  const items = useSelector(state => state.cart.items);
  const cartRestaurant = useSelector(state => state.cart.restaurant);
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    const isPresentAt = items.findIndex(el => el.info.id === info.id);
    setIsAdded(isPresentAt >= 0);
    setQuantity(items?.[isPresentAt]?.quantity);
  }, [items]);
  return (
    <div className="dishcard-wrapper">
      <div className="dishcard">
        <div className="top">
          <div className="left">
            <div className="title">By {restaurant?.info?.name}</div>
            <div className="rating">
              <div>
                <AiFillStar /> <span>{restaurant?.info?.avgRatingString}</span>
              </div>
              <span>{restaurant?.info?.sla?.slaString}</span>
            </div>
          </div>
          <div
            onClick={() => {
              navigate(
                `/restaurants/${restaurant?.info?.slugs?.restaurant}-${restaurant?.info?.id}`
              );
            }}
            className="right">
            <AiOutlineArrowRight className="icon" />
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="info">
              <span className="tag">
                {info?.isVeg ? (
                  <VegIcon className="veg-nonveg-icon" />
                ) : (
                  <NonVegIcon className="veg-nonveg-icon" />
                )}
                {info?.ribbon?.text && <AiFillStar className="icon" />}
                <span>{info?.ribbon?.text}</span>
              </span>

              <span className="title">{info?.name}</span>
              <span className="price">
                {info?.price
                  ? info?.price / 100
                  : info?.variantsV2?.pricingModels?.[0]?.price / 100}{' '}
                ₹
              </span>
              <span className="desc">{info?.description}</span>
            </div>
          </div>
          <div className="right">
            <div className="img">
              {info?.imageId ? (
                <img src={IMG_LINK + info?.imageId} alt="" />
              ) : (
                <div className="img-dummy">NO IMG</div>
              )}

              {!isAdded || quantity <= 0 ? (
                <div className="add-btn">
                  <div
                    onClick={() => {
                      if (cartRestaurant.restaurantId === '') {
                        // console.log('not same restaurant');
                        dispatch(
                          addToCart({
                            info,
                            quantity: 1,
                            restaurant: {
                              restaurantId: restaurant.info.id,
                              details: {
                                name: restaurant.info.name,
                                place: restaurant.info.address,
                                img: restaurant.info.cloudinaryImageId,
                              },
                            },
                          })
                        );
                      } else {
                        if (cartRestaurant.restaurantId != restaurant.info.id) {
                          // console.log('not same restaurant');
                          return Swal.fire({
                            title: 'Change restaurant?',
                            text: 'Clear cart and fresh add!',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, Fresh start!',
                          }).then(result => {
                            if (result.isConfirmed) {
                              dispatch(clearCart());
                              dispatch(
                                addToCart({
                                  info,
                                  quantity: 1,
                                  restaurant: {
                                    restaurantId: restaurant.info.id,
                                    details: {
                                      name: restaurant.info.name,
                                      place: restaurant.info.address,
                                      img: restaurant.info.cloudinaryImageId,
                                    },
                                  },
                                })
                              );
                            }
                          });
                        } else {
                          // console.log('same restaurant');
                          dispatch(
                            addToCart({
                              info,
                              quantity: 1,
                              restaurant: {
                                restaurantId: restaurant.info.id,
                                details: {
                                  name: restaurant.info.name,
                                  place: restaurant.info.address,
                                  img: restaurant.info.cloudinaryImageId,
                                },
                              },
                            })
                          );
                        }
                      }
                    }}>
                    ADD
                  </div>
                </div>
              ) : (
                <div className="controls">
                  <div>
                    <span
                      onClick={() => {
                        if (
                          items.find(el => el.info.id === info.id)?.quantity > 1
                        ) {
                          dispatch(decreaseQuantity(info.id));
                        } else {
                          dispatch(removeFromCart(info.id));
                        }
                      }}
                      className="btns">
                      <BiMinus />
                    </span>
                    <span>{quantity}</span>
                    <span
                      onClick={() => {
                        dispatch(increaseQuantity(info.id));
                      }}
                      className="btns">
                      <BiPlus />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
