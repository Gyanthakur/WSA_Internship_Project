import './HotelCard.scss';
import { IMG_LINK } from '../../utils/config';
import { BsDot } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { ReactComponent as OffersIcon } from './../../assets/icons/offers.svg';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  return (
    <Link
      to={`/${hotel?.cta?.link?.replace('https://www.swiggy.com/', '')}`}
      className="hotel-card-wrapper">
      {hotel?.data?.promoted && (
        <div className="promotion-tag">
          <div className="text">PROMOTED</div>
          <div className="style"></div>
        </div>
      )}
      <div className="hotel-card">
        {hotel?.info?.cloudinaryImageId ? (
          <img
            src={IMG_LINK + hotel?.info?.cloudinaryImageId}
            alt={hotel?.info?.name}
          />
        ) : (
          <div className="img-cover">NO COVER IMAGE</div>
        )}

        <div className="title">
          <span>{hotel?.info?.name}</span>
          <span>{hotel?.info?.cuisines?.join(', ')}</span>
        </div>
        <div className="rating">
          <span
            style={{
              background:
                hotel?.info?.avgRating >= 4
                  ? 'var(--color-green)'
                  : 'var(--color-yellow)',
            }}>
            <AiFillStar className="icon" />
            <span>{hotel?.info?.avgRating}</span>
          </span>
          <BsDot />
          <span>{hotel?.info?.sla?.slaString}</span>
          <BsDot />

          <span>{hotel?.info?.costForTwo}</span>
        </div>
        {hotel?.info?.aggregatedDiscountInfoV3?.header && (
          <div className="offer">
            <OffersIcon className="icon" />
            <span>{hotel?.info?.aggregatedDiscountInfoV3?.header}</span>
            <span>{hotel?.info?.aggregatedDiscountInfoV3?.subHeader}</span>
          </div>
        )}
        <div></div>
      </div>
    </Link>
  );
};

export default HotelCard;
