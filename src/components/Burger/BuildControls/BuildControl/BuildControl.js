import React from 'react';

import './BuildControl.css';

const buildControl = (props) => (
	<div className={'BuildControl'}>
		<div className={'Label'}>{props.label} * {props.num}</div>
		<div className="button-group">
			<button
				className={'Less'}
				onClick={props.removed}
				disabled={props.disabled}>Less</button>
			<button
				className={'More'}
				onClick={props.added}>More</button>
		</div>
	</div>
);

export default buildControl;