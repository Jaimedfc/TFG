import React from 'react';

import {DrizzleContext} from 'drizzle-react';

import ViewOrchest from "./ViewOrchest";

class App extends React.Component {



 	render() {
    return (

      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) return "Loading Drizzle...";

          return (
            <div className="App">
              <ViewOrchest  drizzle={drizzle} drizzleState={drizzleState}/>
            </div>
            );
        }}
        </DrizzleContext.Consumer>
      );
 		
 	}
}

export default App;