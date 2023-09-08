import { useEffect, useState } from 'react';
import './PlaceBox.scss';
import { RxCross1 } from 'react-icons/rx';
import { CiLocationOn } from 'react-icons/ci';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation } from '../../redux/slice/locationSlice';
import { USER_ADDRESS_API_LINK } from '../../utils/config';
import { login } from '../../redux/slice/authSlice';

const PlaceBox = ({ setIsPlaceBoxVisible, isCheckoutPage }) => {
  const locationData = useSelector(state => state.location.location);
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (location === '') return;
    (function () {
      axios
        .get(
          `https://corsproxy.io/?https://www.swiggy.com/dapi/misc/place-autocomplete?input=${location}`
        )
        .then(({ data }) => {
          axios
            .get(
              `https://corsproxy.io/?https://www.swiggy.com/dapi/misc/address-recommend?place_id=${data.data[0].place_id}`
            )
            .then(({ data }) => {
              const { lat, lng } = data?.data?.[0]?.geometry?.location;
              dispatch(changeLocation({ location, lat, lng }));
            });
        });
    })();
  }, [location]);

  return (
    <div className="place-box">
      <RxCross1 className="icon" onClick={() => setIsPlaceBoxVisible(false)} />
      <select
        className="location"
        name="location"
        id="location"
        value={location || locationData.location}
        onChange={e => {
          setLocation(e.target.value);
        }}>
        <option value="patna">Patna</option>
        <option value="banglore">Banglore</option>
        <option value="delhi">Delhi</option>
        <option value="chennai">Chennai</option>
      </select>
    </div>
  );
};

export default PlaceBox;
