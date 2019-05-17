import React from "react";
import ItemManager from "./ItemManager";

class ManipView extends React.Component {


  state = { manipulatorCounterKey:null,
            itemCounterKey:null};


    componentDidMount() {
    const { drizzle } = this.props;
    const ManipFactory = drizzle.contracts.ManipFactory;
    const ItemFactory = drizzle.contracts.ItemFactory;

    var manipulatorCounterKey;
    var itemCounterKey;
      
    manipulatorCounterKey = ManipFactory.methods["getManipLength"].cacheCall();
    itemCounterKey = ItemFactory.methods["getItemsLength"].cacheCall();
      

    this.setState({ manipulatorCounterKey, itemCounterKey });

    }



    render() {

      const { drizzleState } = this.props;
      const ItemFactory = drizzleState.contracts.ItemFactory;
      const ManipFactory = drizzleState.contracts.ManipFactory;

      var manipulatorsLength = ManipFactory.getManipLength[this.state.manipulatorCounterKey];
      var itemsLength = ItemFactory.getItemsLength[this.state.itemCounterKey];


        return (
          <div>
            <ItemManager drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              isManipulator={true}
              isAdmin={false}
              itemsLength={(itemsLength && itemsLength.value) || 0}
              manipLength={(manipulatorsLength && manipulatorsLength.value) || 0}
              />
          </div>
        );
    }
};

export default ManipView;