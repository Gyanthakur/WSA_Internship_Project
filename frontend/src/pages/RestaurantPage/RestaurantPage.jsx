import axios from 'axios';
import './RestaurantPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { RESTAURANT_DETAILS_API } from '../../utils/config';
import { useEffect, useState } from 'react';
import PaddingTop from '../../utils/PaddingTop';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import { IoIosArrowDown } from 'react-icons/io';
import { AiFillStar } from 'react-icons/ai';
import { ReactComponent as CircleIcon } from './../../assets/icons/circle.svg';
import { ReactComponent as RsIcon } from './../../assets/icons/rs.svg';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../../components/Loading/Loading';
import Error from '../Error/Error';
import menuItems from '../../utils/menuItems';
import FloatingCart from '../../components/FloatingCart/FloatingCart';

const RestaurantPage = () => {
  const { slug } = useParams();
  const id = slug.split('-').at(-1);
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [apiFailed, setApiFaildes] = useState('');
  let idx = restaurantDetails?.findIndex(el => el.groupedCard !== undefined);
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({});
  // console.log(
  //   restaurantDetails?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards
  // );

  const getRestaurantDetails = async () => {
    try {
      const { data } = await axios.get(RESTAURANT_DETAILS_API + id);
      const { name, areaName, locality, cloudinaryImageId } =
        data?.data?.cards?.[0]?.card?.card?.info;
      setRestaurant({
        restaurantId: id,
        details: {
          name,
          place: `${locality || ''}, ${areaName || ''}`,
          img: cloudinaryImageId,
        },
      });
      setRestaurantDetails(data?.data?.cards);
      document.title = `${data?.data?.cards?.[0]?.card?.card?.info?.name} - Food Ordering - GPS`;
    } catch (err) {
      try {
        setRestaurantDetails(menuItems[`dataOf${id}`]?.data?.cards);
      } catch (err) {
        setApiFaildes(err);
      }
    }
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    getRestaurantDetails();
  }, []);

  if (apiFailed) {
    return <Error {...apiFailed} />;
  }

  return restaurantDetails?.length === 0 ? (
    <PaddingTop>
      <div className="carousel-loading-wrapper">
        <div className="carousel-loading">
          <div>
            <div className="animate"></div>
            <img
              src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
              alt="ice-cream"
            />
          </div>
          <div>Looking for great food near you...</div>
        </div>
        <div
          style={{
            width: '70%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '1rem auto',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
          {new Array(12).fill(0).map(() => (
            <Loading key={uuidv4()} />
          ))}
        </div>
      </div>
    </PaddingTop>
  ) : (
    <PaddingTop>
      <div className="restaurant-details-wrapper">
        <div className="restaurant-details">
          <button
            className="bck"
            onClick={() => {
              navigate(-1);
            }}>
            Back
          </button>
          <div className="restaurant-info">
            <div>
              <div className="left">
                <span className="title">
                  {restaurantDetails?.[0]?.card?.card?.info?.name}
                </span>
                <span className="cus">
                  {restaurantDetails?.[0]?.card?.card?.info?.cuisines?.join(
                    ', '
                  )}
                </span>
                <span className="area">
                  {restaurantDetails?.[0]?.card?.card?.info?.areaName},{' '}
                  {
                    restaurantDetails?.[0]?.card?.card?.info?.sla
                      ?.lastMileTravelString
                  }
                </span>
                <span className="high">
                  <img
                    src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_18,h_18/SurgeAssets/stressSurge"
                    alt="high"
                  />
                  <span>
                    High demand. Additional ₹15 delivery fee will apply to
                    ensure better delivery
                  </span>
                </span>
              </div>
              <div className="right">
                <span>
                  <AiFillStar className="icon" />
                  <span>
                    {restaurantDetails?.[0]?.card?.card?.info?.avgRating}
                  </span>
                </span>
                <span>
                  {restaurantDetails?.[0]?.card?.card?.info?.totalRatingsString}
                </span>
              </div>
            </div>
            <div className="offers">
              <div className="top">
                <span>
                  <CircleIcon className="icon" />
                  <span>
                    {restaurantDetails?.[0]?.card?.card?.info?.sla?.slaString}
                  </span>
                </span>
                <span>
                  <RsIcon className="icon" />
                  <span>
                    {
                      restaurantDetails?.[0]?.card?.card?.info
                        ?.costForTwoMessage
                    }
                  </span>
                </span>
              </div>
              <div className="bottom">
                {restaurantDetails?.[1]?.card?.card?.gridElements?.infoWithStyle?.offers?.map(
                  el => (
                    <div className="offer-card" key={uuidv4()}>
                      <div className="header">{el?.info?.header}</div>
                      <span className="desc">
                        {el?.info?.couponCode} | {el?.info?.description}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="items">
            {restaurantDetails?.[idx]?.groupedCard?.cardGroupMap?.REGULAR?.cards
              ?.slice(1, -1)
              ?.map(el => (
                <div key={uuidv4()}>
                  {el?.card?.card?.itemCards?.length > 0 && (
                    <>
                      <div key={uuidv4()} className="title">
                        <span id={el?.card?.card?.type}>
                          {el?.card?.card?.title}(
                          {el?.card?.card?.itemCards?.length})
                        </span>
                        <span>
                          <IoIosArrowDown />
                        </span>
                      </div>

                      <div key={uuidv4()}>
                        {el?.card?.card?.itemCards?.map(el => (
                          <RestaurantItem
                            key={uuidv4()}
                            {...el}
                            restaurant={restaurant}
                          />
                        ))}
                      </div>

                      <div className="style"></div>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      <FloatingCart />
    </PaddingTop>
  );
};

export default RestaurantPage;
