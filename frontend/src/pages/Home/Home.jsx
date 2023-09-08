import './Home.scss';
import PaddingTop from '../../utils/PaddingTop';
import CarouselCard from '../../components/CarouselCard/CarouselCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ALL_RESTAURANTS_API_LINK } from '../../utils/config';
import Loading from '../../components/Loading/Loading';
import { v4 as uuidv4 } from 'uuid';
import Error from '../Error/Error';
import staticRestaurant, { restaurantList } from './../../utils/restaurantList';
import Main from '../../components/Main/Main';
import { useSelector } from 'react-redux';
import FloatingCart from '../../components/FloatingCart/FloatingCart';

const Home = () => {
  const [carousels, setCarousels] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filterAllRestaurants, setFilterAllRestaurants] = useState([]);
  const [activeFilter, setActiveFilter] = useState('relevance');
  const [apiFailed, setApiFaildes] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [isAllDataEnd, setIsAllDataEnd] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalOpenRestaurants, setTotalOpenRestaurants] = useState(0);


  const locationData = useSelector(state => state.location.location);
  const searchText = useSelector(state => state.search.text);

  const getRestaurantMore = async () => {
    if (isAllDataEnd) return;

    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://swiggy-clone-wjqx.onrender.com/api/v1/restaurant?location=${locationData.location}&page=${page}`
      );
      if (page === 0) {
        setAllRestaurants(data?.data);
        setFilterAllRestaurants(data?.data);
        setTotalOpenRestaurants(data?.total);
      } else {
        setAllRestaurants(prev => [...prev, ...data?.data]);
        setFilterAllRestaurants(prev => [...prev, ...data?.data]);
      }
      if (data?.data?.length === 0) {
        setIsAllDataEnd(true);
      }
      setIsLoading(false);
    } catch (err) {
      setApiFaildes(err);
      setIsLoading(false);
    }
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

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    axios
      .get('https://swiggy-clone-wjqx.onrender.com/api/v1/restaurant/carousel')
      .then(({ data }) => {
        setCarousels(data.data.carousel);
      });
  }, []);

  useEffect(() => {
    getRestaurantMore();
  }, [page]);

  useEffect(() => {
    setIsAllDataEnd(false);
    setPage(0);
    getRestaurantMore();
  }, [locationData]);

  useEffect(() => {
    filterRestaurantWithActiveFilter(activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilterAllRestaurants(allRestaurants);
      setNotFound(false);
      return;
    }
    const newList = allRestaurants.filter(el =>
      el?.data?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
    );
    if (newList.length === 0) {
      setNotFound(true);
      return;
    }
    setFilterAllRestaurants(newList);
  }, [searchText]);

  if (apiFailed) {
    return <Error {...apiFailed} />;
  }

  return isLoading ? (
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
          className="sckelton"
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
      <CarouselCard carousels={carousels} />
      {!notFound ? (
        <Main
          topHeading={'restaurants'}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          allRestaurants={allRestaurants}
          filterAllRestaurants={filterAllRestaurants}
          setFilterAllRestaurants={setFilterAllRestaurants}
          isLoading={isLoading}
          totalOpenRestaurants={totalOpenRestaurants}
        />
      ) : (
        <div className="not-found">
          <h1>Uh-oh!</h1>
          <p>
            Sorry! No restaurant found with <strong>{searchText}</strong> name.
          </p>
        </div>
      )}
      {/* <FloatingCart /> */}
    </PaddingTop>
  );
};

export default Home;
