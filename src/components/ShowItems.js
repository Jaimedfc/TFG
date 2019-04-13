import React from "react";
import Item from "./Item";

class ShowItems extends React.Component {



	state = {   manipulatorsKey: [],
                itemsKey: [] };

	componentDidUpdate(prevProps, prevState, snapshot) {
		
        const l1 = prevProps.manipLength || 0;
        const l2 = +this.props.manipLength;

        const l3 = prevProps.itemsLength || 0;
        const l4 = +this.props.itemsLength;

        const { drizzle } = this.props;
        const ManipFactory = drizzle.contracts.ManipFactory;
        const ItemFactory = drizzle.contracts.ItemFactory;

        var manipulatorsKey = [...this.state.manipulatorsKey];
        var itemsKey = [...this.state.itemsKey];

        let changed = false;
            for (var i=0; i<l2; i++){

                if (manipulatorsKey[i]) continue;

                changed = true;
                manipulatorsKey[i] = ManipFactory.methods["manipulators"].cacheCall(i);
            }

            for (var i=0; i<l4; i++){

                if (itemsKey[i]) continue;

                changed = true;
                itemsKey[i] = ItemFactory.methods["items"].cacheCall(i);
            }
            changed && this.setState({ manipulatorsKey, itemsKey });
    	
    
	}

    


	render() {
    	// get the contract state from drizzleState
    	const { ManipFactory, ItemFactory } = this.props.drizzleState.contracts;
    	// using the saved `dataKey`, get the variable we're interested in
    	var myManipulators = [];
        var myItems = [];
    	for (let i = 0; i < this.props.manipLength; i++) {
            if (this.state.manipulatorsKey) {


    		  myManipulators[i] = ManipFactory.manipulators[this.state.manipulatorsKey[i]];
            }
    	}

        for (let i = 0; i < this.props.itemsLength; i++) {
            if (this.state.itemsKey) {


              myItems[i] = ItemFactory.items[this.state.itemsKey[i]];
            }
        }
   
    	var components = myItems.map((item, index) => {
            if (((item && item.value) !== undefined) && item.value != 0x0000000000000000000000000000000000000000){
                
    		  return (<Item key={index} 
                address={item.value}
                index={index} 
                drizzle={this.props.drizzle} 
                drizzleState={this.props.drizzleState}
                manipulators={myManipulators}
                isManipulator={this.props.isManipulator}/>);
            }else return null;
    	});

    	return (components) ;
    	
		}
}

export default ShowItems;