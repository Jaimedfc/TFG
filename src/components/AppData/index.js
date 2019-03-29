import React from 'react';

import PropTypes from 'prop-types';
import Updating from '../Info';
import Error from '../Info';


class AppData extends React.Component {
	
	state = { dataKey: null};

	componentDidMount(){

		const {drizzle} = this.props;

		const instance = drizzle.contracts.Factory;
		const dataKey = instance.methods["items"].cacheCall();

		this.setSate({dataKey});
	}

	render(){

		const {Factory} = this.props.drizzleState.contracts;

		const items = Factory.items[this.state.dataKey];

		return (

			<div className="appFactory-data">
				<p>
					Items = <div className="appFactory-data-item">
								{items && items.items}
							</div>
				</p>
				<Updating className="appFactory-data-updating"
							msg={"pendiente"}
							visible={true} />

				<Error className="appFactory-data-error"
							msg={"pendiente"}
							visible={true} />

			</div>
		);
	}
};

export default AppData;