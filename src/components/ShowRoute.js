import React from "react";
import Visit from "./Visit";


class ShowRoute extends React.Component {


  state = { visitsKey:[] };


    constructor(props) {

        super(props);
        
    } 

    componentDidMount() {

      const l2 = +this.props.routeLength;

        const { drizzle } = this.props;
        const instance = drizzle.contracts[this.props.address];

        if (!instance) return null;

        var visitsKey = [...this.state.visitsKey];
        

        let changed = false;
            for (var i=0; i<l2; i++){

                if (visitsKey[i]) continue;

                changed = true;
                visitsKey[i] = instance.methods["route"].cacheCall(i);
            }

            changed && this.setState({ visitsKey });

        
    }


    componentDidUpdate(prevProps, prevState, snapshoot) {

        const l1 = prevProps.routeLength || 0;
        const l2 = +this.props.routeLength;

        const { drizzle } = this.props;
        const instance = drizzle.contracts[this.props.address];

        if (!instance) return null;

        var visitsKey = [...this.state.visitsKey];
        

        let changed = false;
            for (var i=0; i<l2; i++){

                if (visitsKey[i]) continue;

                changed = true;
                visitsKey[i] = instance.methods["route"].cacheCall(i);
            }

            changed && this.setState({ visitsKey });
    }




    render() {

      const instance = this.props.drizzleState.contracts[this.props.address]
      
      var myVisits = [];
        
      for (let i = 0; i < this.props.routeLength; i++) {
            if (this.state.visitsKey) {


          myVisits[i] = instance.route[this.state.visitsKey[i]];
            }
      }
   
      var components = myVisits.map((visit, index) => {
            if (((visit && visit.value) !== undefined)){
  
          return (<Visit key={index} 
                manipulator={visit.value.manipulator}
                dateIn={visit.value.dateIn}
                dateOut={visit.value.dateOut}
                trsp={visit.value.trspOut}
                index={index} 
                drizzle={this.props.drizzle} 
                drizzleState={this.props.drizzleState}
                isManipulator={this.props.isManipulator}
                visitsLength={myVisits.length}/>);
            }else return null;
      });

      return (<div>
        <p>Se ha seguido la siguiente ruta:</p>
        {components}
        </div>) ;
      
    }
};

export default ShowRoute;