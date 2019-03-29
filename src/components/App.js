import React from 'react';

import {DrizzleContext} from 'drizzle-react';

import ContractOrch from "./ContractOrch";

class App extends React.Component {



 	render() {
    return (

      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) return "Loading Drizzle...";

          return (
            <div className="App">
              <ContractOrch  drizzle={drizzle} drizzleState={drizzleState}/>
            </div>
            );
        }}
        </DrizzleContext.Consumer>
      );
 		
 	}
}

export default App;