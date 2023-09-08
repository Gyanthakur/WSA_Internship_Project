import './Main.scss';
import HotelCard from '../HotelCard/HotelCard';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../Loading/Loading';

const Main = ({
	activeFilter,
	setActiveFilter,
	allRestaurants,
	filterAllRestaurants,
	setFilterAllRestaurants,
	topHeading,
	isLoading,
	totalOpenRestaurants,
}) => {
	return (
		<div className="main-wrapper">
			<div id="all-restaurants" className="filters">
				<span>
					{topHeading === 'restaurants'
						? `${totalOpenRestaurants} restaurants`
						: `${topHeading} (${filterAllRestaurants?.length})`}
				</span>
				<div>
					<span
						className={
							activeFilter === 'relevance' ? 'border-black' : ''
						}
						onClick={() => {
							setActiveFilter('relevance');
							setFilterAllRestaurants(allRestaurants);
						}}>
						Relevance
					</span>
					<span
						className={
							activeFilter === 'delivery-time'
								? 'border-black'
								: ''
						}
						onClick={() => {
							setActiveFilter('delivery-time');
							const arr = filterAllRestaurants
								.slice()
								.sort(
									(a, b) =>
										a?.data?.sla?.deliveryTime -
										b?.data?.sla?.deliveryTime
								)
								.slice();
							setFilterAllRestaurants(arr);
						}}>
						Delivery Time
					</span>
					<span
						className={
							activeFilter === 'rating' ? 'border-black' : ''
						}
						onClick={() => {
							setActiveFilter('rating');
							const arr = filterAllRestaurants
								.slice()
								.sort(
									(a, b) =>
										b?.data?.avgRating - a?.data?.avgRating
								)
								.slice();
							setFilterAllRestaurants(arr);
						}}>
						Rating
					</span>
					<span
						className={
							activeFilter === 'lowtohigh' ? 'border-black' : ''
						}
						onClick={() => {
							setActiveFilter('lowtohigh');
							const arr = filterAllRestaurants
								.slice()
								.sort(
									(a, b) =>
										a?.data?.costForTwo -
										b?.data?.costForTwo
								)
								.slice();
							setFilterAllRestaurants(arr);
						}}>
						Cost: Low To High
					</span>
					<span
						className={
							activeFilter === 'hightolow' ? 'border-black' : ''
						}
						onClick={() => {
							setActiveFilter('hightolow');
							const arr = filterAllRestaurants
								.slice()
								.sort(
									(a, b) =>
										b?.data?.costForTwo -
										a?.data?.costForTwo
								)
								.slice();
							setFilterAllRestaurants(arr);
						}}>
						Cost: High To Low
					</span>
				</div>
			</div>
			<div className="cards">
				{filterAllRestaurants.map(restaurant => (
					<HotelCard key={uuidv4()} hotel={restaurant} />
				))}
				{isLoading && (
					<div
						className="sckelton"
						style={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							margin: '1rem auto',
							gap: '2rem',
							flexWrap: 'wrap',
						}}>
						{new Array(12).fill(0).map(() => (
							<Loading key={uuidv4()} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Main;
