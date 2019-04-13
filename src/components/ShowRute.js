import React from "react";
import Visit from "./Visit";


class ShowRute extends React.Component {


  state = { visitsKey:[] };


    constructor(props) {

        super(props);
        
    } 

    componentDidMount() {

        
    }


    componentDidUpdate(prevProps, prevState, snapshoot) {

        const l1 = prevProps.ruteLength || 0;
        const l2 = +this.props.ruteLength;

        const { drizzle } = this.props;
        const instance = drizzle.contracts[this.props.address];

        if (!instance) return null;

        var visitsKey = [...this.state.visitsKey];
        

        let changed = false;
            for (var i=0; i<l2; i++){

                if (visitsKey[i]) continue;

                changed = true;
                visitsKey[i] = instance.methods["rute"].cacheCall(i);
            }

            changed && this.setState({ visitsKey });
    }




    render() {

      const instance = this.props.drizzleState.contracts[this.props.address]
      
      var myVisits = [];
        
      for (let i = 0; i < this.props.ruteLength; i++) {
            if (this.state.visitsKey) {


          myVisits[i] = instance.rute[this.state.visitsKey[i]];
            }
      }
   
      var components = myVisits.map((visit, index) => {
            if (((visit && visit.value) !== undefined)){
                
          return (<Visit key={index} 
                manipulator={visit.value.manipulator.address}
                dateIn={visit.value.dateIn}
                dateOut={visit.value.dateOut}
                trsp={visit.value.trsp}
                index={index} 
                drizzle={this.props.drizzle} 
                drizzleState={this.props.drizzleState}
                manipulators={this.props.manipulators}
                isManipulator={this.props.isManipulator}/>);
            }else return null;
      });

      return (components) ;
      
    }
};

export default ShowRute;