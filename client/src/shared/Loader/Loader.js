import React from 'react';

import './Loader.css';

const Loader = ({className}) => {
	return (
		<div className={"spinner " + className}></div>
	);
};

export default Loader;