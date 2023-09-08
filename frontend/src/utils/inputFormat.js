export const num_format = value => {
	var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
	var matches = v.match(/\d{4,16}/g);
	var match = (matches && matches[0]) || '';
	var parts = [];

	for (let i = 0, len = match.length; i < len; i += 4) {
		parts.push(match.substring(i, i + 4));
	}

	if (parts.length) {
		return parts.join(' ');
	} else {
		return value;
	}
};
export const cvv_format = value => {
	const v = value.replace(/[^0-9]/gi, '');

	return v;
};
export const name_format = value => {
	const v = value.replace(/[^a-zA-Z_ ]/gi, '');

	return v;
};
export const cc_format = value => {
	const v = value
		.replace(/[^0-9]/gi, '')
		.replace(/\s+/g, '')
		.substr(0, 16);
	const parts = [];

	for (let i = 0; i < v.length; i += 4) {
		parts.push(v.substr(i, 4));
	}

	return parts.length > 1 ? parts.join(' ') : value;
};
export const expiry_format = string => {
	return string
		.replace(
			/[^0-9]/g,
			'' // To allow only numbers
		)
		.replace(
			/^([2-9])$/g,
			'0$1' // To handle 3 > 03
		)
		.replace(
			/^(1{1})([3-9]{1})$/g,
			'0$1/$2' // 13 > 01/3
		)
		.replace(
			/^0{1,}/g,
			'0' // To handle 00 > 0
		)
		.replace(
			/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
			'$1/$2' // To handle 113 > 11/3
		);
};
