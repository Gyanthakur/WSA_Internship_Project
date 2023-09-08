import { useSelector } from 'react-redux';
import './FloatingCart.scss';
import { FiShoppingBag } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const FloatingCart = () => {
	const items = useSelector(state => state.cart.items);
	const navigate = useNavigate();
	return (
		items.length > 0 && (
			<div className="floating-cart-wrapper">
				<div className="floating-cart">
					<span className="left">
						{items.length} Items | ₹
						{(
							items?.reduce((acc, el) => {
								return el?.info?.price
									? acc + el?.info?.price * el?.quantity
									: el?.info?.defaultPrice
									? acc +
									  el?.info?.defaultPrice * el?.quantity
									: acc +
									  el?.info?.variantsV2?.pricingModels?.[0]
											?.price *
											el?.quantity;
							}, 0) / 100
						).toLocaleString()}
					</span>
					<span
						className="right"
						onClick={() => {
							navigate('/checkout');
						}}>
						<span>VIEW CART</span>{' '}
						<FiShoppingBag className="icon" />
					</span>
				</div>
			</div>
		)
	);
};

export default FloatingCart;
