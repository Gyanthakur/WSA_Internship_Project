import React from 'react';

const Loading = () => {
	return (
		<div
			style={{
				position: 'fixed',
				top: '0',
				left: '0',
				right: '0',
				bottom: '0',
				background: '#22222268',
				zIndex: '98',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: '2rem',
				color: '#fff',
			}}>
			<div
				style={{
					height: '100px',
					width: '100px',
					borderRadius: '100%',
					background: 'transparent',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				id="__loading-w">
				<div
					style={{
						borderTop: '5px solid #fff',
						height: '110px',
						width: '110px',
						borderRadius: '100%',
						background: '#fc8019',
					}}>
					<div
						style={{
							borderTop: '5px solid #fff',
							height: '90px',
							width: '90px',
							borderRadius: '100%',
							background: '#fff',
						}}></div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
