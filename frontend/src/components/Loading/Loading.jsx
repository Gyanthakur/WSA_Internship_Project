import './Loading.scss';

const Loading = () => {
	return (
		<div className="loading-wrapper">
			<div className="sine-rod"></div>
			<div className="loading">
				<div className="img"></div>
				<div className="title">
					<span></span>
					<span></span>
				</div>
				<div className="rating"></div>

				<div className="offer"></div>
			</div>
		</div>
	);
};

export default Loading;
