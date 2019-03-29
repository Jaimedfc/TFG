import React from "react";
import Manipulator from "./Manipulator";

class ShowManipulators extends React.Component {



	state = { manipulatorsKey: []};

	componentDidUpdate(prevProps, prevState, snapshot) {
		
        const l1 = prevProps.manipLength || 0;
        const l2 = +this.props.manipLength;
        const { drizzle } = this.props;
        const contract = drizzle.contracts.ManipFactory;
        var manipulatorsKey = [...this.state.manipulatorsKey];

        let changed = false;
        console.log(l1,l2);
            for (var i=0; i<l2; i++){

                if (manipulatorsKey[i]) continue;

                changed = true;
                manipulatorsKey[i] = contract.methods["manipulators"].cacheCall(i);
            }
            changed && this.setState({ manipulatorsKey });
    	
    
	}


	render() {
    	// get the contract state from drizzleState
    	const { ManipFactory } = this.props.drizzleState.contracts;
    	// using the saved `dataKey`, get the variable we're interested in
    	var myManipulators = [];
    	for (let i = 0; i < this.props.manipLength; i++) {
            if (this.state.manipulatorsKey) {


    		  myManipulators[i] = ManipFactory.manipulators[this.state.manipulatorsKey[i]];
            }
    	}
   
    	var components = myManipulators.map((manip, index) => {
            if ((manip && manip.value) !== undefined){
    		  return (<Manipulator key={index} address={manip.value} index={index} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>);
            }else return null;
    	});

    	return (components) ;
    	
		}
}

export default ShowManipulators;