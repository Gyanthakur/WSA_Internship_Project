import { useEffect, useRef, useState } from 'react';
import './Search.scss';
import { FaSearch, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { IMG_LINK } from '../../utils/config';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import SearchItemCard from '../../components/SearchItemCard/SearchItemCard';
import DishCard from '../../components/DishCard/DishCard';
import LoadingFullRound from '../../utils/LoadingFullRound';
import FloatingCart from '../../components/FloatingCart/FloatingCart';
import { useSelector } from 'react-redux';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [cuisines, setCuisines] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const timer = useRef(null);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDish, setIsLoadingDish] = useState(false);
  const [isLoadingRestaurant, setIsLoadingRestaurant] = useState(false);
  const [dishItems, setDishItems] = useState([]);

  const locationData = useSelector(state => state.location.location);

  const getSuggestedItems = async (metaData, type, dishName) => {
    setIsLoading(true);
    if (type === 'DISH') {
      setIsLoadingDish(true);
    }
    setDishItems([]);
    try {
      if (type === 'DISH') {
        setIsLoadingDish(true);
        const { data } = await axios(
          `https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/search/v3?lat=${locationData.lat}&lng=${locationData.lng}&str=${dishName}&submitAction=SUGGESTION&metaData=${metaData}`
        );
        setDishItems(
          data?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.[type]?.cards
        );
        setIsLoadingDish(false);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  window.scrollTo(0, 0);
  const getCuisines = async () => {
    const { data } = await axios(
      `https://swiggy-clone-wjqx.onrender.com/api/v1/restaurant/pre-search`
    );
    setCuisines(data.data);
  };

  const getSearchResults = async searchText => {
    setIsLoading(true);
    try {
      const { data } = await axios(
        `https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${locationData?.lat}&lng=${locationData?.lng}&trackingId=undefined&str=${searchText}`
      );
      setSearchResults(data?.data?.suggestions);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    clearTimeout(timer.current);
    if (searchText.trim() === '') {
      setSearchResults([]);
    }
    timer.current = setTimeout(() => {
      if (searchText.trim() !== '') {
        getSearchResults(searchText);
        navigate(`/search?query=${searchText}`);
      } else {
        navigate(`/search`);
      }
    }, 1000);
  }, [searchText]);

  useEffect(() => {
    getCuisines();
  }, []);

  useEffect(() => {
    if (params.get('query')) {
      setSearchText(params.get('query'));
    }
  }, [params.get('query')]);
  return (
    <div className="search-wrapper">
      <div className="search">
        <div className="input-box">
          <input
            className="input"
            value={searchText}
            onChange={e => {
              setSearchText(e.target.value);
              setDishItems([]);
            }}
            type="text"
            placeholder="Search restaurants and food"
          />
          <div className="search-btn">
            {searchText?.trim() === '' ? (
              <FaSearch
                onClick={() => getSearchResults(searchText)}
                className="icon"
              />
            ) : (
              <FaTimes
                onClick={() => {
                  setSearchText('');
                  navigate('/search');
                  setDishItems([]);
                }}
                className="icon"
              />
            )}
          </div>
        </div>
        {!isLoadingRestaurant && !isLoadingDish ? (
          dishItems?.length === 0 ? (
            <>
              {cuisines?.length > 0 && (
                <div className="pre-search">
                  <div className="heading">Popular Cuisines</div>
                  <div className="cuisines">
                    {cuisines?.map(el => (
                      <img
                        onClick={() => {
                          navigate(
                            `/search?query=${el?.action?.link
                              ?.split('=')
                              ?.at(-1)}`
                          );
                        }}
                        className="item"
                        key={el.id}
                        src={IMG_LINK + el?.imageId}
                        alt={el?.imageId}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="search-results">
                {isLoading
                  ? new Array(10).fill(0).map((_, idx) => (
                      <div key={idx} className="loading-wrapper-item">
                        <div className="item loading-item">
                          <div className="img-item"></div>
                          <div className="info">
                            <div className="name"></div>
                          </div>
                        </div>
                        <div className="sine-rod"></div>
                      </div>
                    ))
                  : searchResults?.map(el => (
                      <SearchItemCard
                        key={uuidv4()}
                        getSuggestedItems={getSuggestedItems}
                        searchItem={el}
                        setIsLoadingRestaurant={setIsLoadingRestaurant}
                      />
                    ))}
              </div>
            </>
          ) : (
            <div className="dish-results">
              <button
                onClick={() => {
                  setDishItems([]);
                }}>
                Back
              </button>
              {dishItems?.slice(1, dishItems.length - 1)?.map(el => (
                <DishCard key={uuidv4()} dishItem={el} />
              ))}
            </div>
          )
        ) : (
          <LoadingFullRound />
        )}
      </div>
      {/* <FloatingCart /> */}
    </div>
  );
};

export default Search;
