import axios from 'axios';
import { IMG_LINK, SUGGESTION_ITEM_API } from '../../utils/config';
import './SearchItemCard.scss';
import { useNavigate } from 'react-router-dom';

const SearchItemCard = ({
	searchItem,
	getSuggestedItems,
	setIsLoadingRestaurant,
}) => {
	const navigate = useNavigate();
	const getRestInfo = async metaData => {
		setIsLoadingRestaurant(true);
		const { data } = await axios(SUGGESTION_ITEM_API + metaData);
		const { slugs, id } =
			data?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.RESTAURANT
				?.cards?.[0]?.card?.card?.info;
		navigate(`/restaurants/${slugs?.restaurant}-${id}`);
		setIsLoadingRestaurant(false);
	};
	return (
		<div
			className="item"
			onClick={() => {
				if (searchItem?.tagToDisplay === 'Restaurant') {
					getRestInfo(searchItem?.metadata);
				} else {
					getSuggestedItems(
						searchItem?.metadata,
						'DISH',
						searchItem?.text
					);
				}
			}}>
			<img
				className="img-item"
				src={IMG_LINK + searchItem?.cloudinaryId}
				alt={searchItem?.text}
			/>
			<div className="info">
				<div className="name">{searchItem?.text}</div>
				<div className="cat">{searchItem?.tagToDisplay}</div>
			</div>
		</div>
	);
};

export default SearchItemCard;
