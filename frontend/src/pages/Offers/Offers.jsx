import './Offers.scss';
import PaddingTop from '../../utils/PaddingTop';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { v4 as uuidv4 } from 'uuid';
import Error from '../Error/Error';
import Main from '../../components/Main/Main';
import FloatingCart from '../../components/FloatingCart/FloatingCart';
import { useSelector } from 'react-redux';

const Offers = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filterAllRestaurants, setFilterAllRestaurants] = useState([]);
  const [activeFilter, setActiveFilter] = useState('relevance');
  const [apiFailed, setApiFaildes] = useState('');
  document.title = `Food Ordering - GPS`;
  const locationData = useSelector(state => state.location.location);
  const getAllRestaurants = async () => {
    try {
      const { data } = await axios.get(
        `https://swiggy-clone-wjqx.onrender.com/api/v1/restaurant?location=${locationData.location}&&page=0`
      );
      setAllRestaurants(data?.data);
      setFilterAllRestaurants(data?.data);
    } catch (err) {
      setApiFaildes(err);
    }
    window.scrollTo(0, 0);
  };

  const filterRestaurantWithActiveFilter = activeFilter => {
    switch (activeFilter) {
      case 'relevance':
        setFilterAllRestaurants(allRestaurants.slice());
        break;
      case 'delivery-time':
        setFilterAllRestaurants(
          allRestaurants
            .slice()
            .sort((a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime)
        );
        break;
      case 'rating':
        setFilterAllRestaurants(
          allRestaurants
            .slice()
            .sort((a, b) => b.info.avgRating - a.info.avgRating)
        );
        break;
      case 'lowtohigh':
        setFilterAllRestaurants(
          allRestaurants
            .slice()
            .sort(
              (a, b) =>
                a.info.costForTwo.split(' ')[0].slice(1) -
                b.info.costForTwo.split(' ')[0].slice(1)
            )
        );
        break;
      case 'hightolow':
        setFilterAllRestaurants(
          allRestaurants
            .slice()
            .sort(
              (a, b) =>
                b.info.costForTwo.split(' ')[0].slice(1) -
                a.info.costForTwo.split(' ')[0].slice(1)
            )
        );
        break;
    }
  };

  useEffect(() => {
    getAllRestaurants();
  }, []);

  useEffect(() => {
    filterRestaurantWithActiveFilter(activeFilter);
  }, [activeFilter]);

  if (apiFailed) {
    return <Error {...apiFailed} />;
  }

  return filterAllRestaurants?.length === 0 ? (
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
      <div className="offers-wrapper">
        <div className="offers">
          <div className="left">
            <div className="top">Offers for you</div>
            <div className="bottom">
              Explore top deals and offers exclusively for you!
            </div>
          </div>
          <img
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/KHu24Gqw_md3ham"
            alt="offers"
          />
        </div>
      </div>
      <Main
        topHeading={'All offers'}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        allRestaurants={allRestaurants}
        filterAllRestaurants={filterAllRestaurants}
        setFilterAllRestaurants={setFilterAllRestaurants}
      />
      <FloatingCart />
    </PaddingTop>
  );
};

export default Offers;
