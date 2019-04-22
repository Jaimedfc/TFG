import React from "react";
import Item from "./Item";

class ShowItems extends React.Component {



	state = {   manipulatorsKey: [],
                itemsKey: [],
                createItemId:null };


    constructor(props) {

        super(props);
        
        this.createItem = this.createItem.bind(this);
        this.parseDate = this.parseDate.bind(this);
    } 

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

            for (var j=0; j<l4; j++){

                if (itemsKey[j]) continue;

                changed = true;
                itemsKey[j] = ItemFactory.methods["items"].cacheCall(j);
            }
            changed && this.setState({ manipulatorsKey, itemsKey });
    	
    
	}

    parseDate(input) {
      var parts = input.match(/(\d+)/g);
      // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
      return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
    }

    createItem = e => {
    if(e) e.preventDefault();
    const { drizzle, drizzleState } = this.props;
    
    const contract = drizzle.contracts.ItemFactory;
    const itemName = String(document.getElementById("itemName").value);
    const itemType = Number(document.getElementById("itemType").value);
    let itemExpirationDate = this.parseDate(document.getElementById("itemExpirationDate").value);
    itemExpirationDate = (itemExpirationDate.getTime())/1000;
    

   
    const createItemId = contract.methods["createItem"].cacheSend(itemName,itemType,itemExpirationDate, {
      from: drizzleState.accounts[0], gas: 4712388,
        gasPrice: 100000000000
    });

  
    // save the `createConId` for later reference
    this.setState({ createItemId});
     
   };

    


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
            if (((item && item.value) !== undefined) && item.value !== "0x0000000000000000000000000000000000000000"){
                
    		  return (<Item key={index} 
                address={item.value}
                index={index} 
                drizzle={this.props.drizzle} 
                drizzleState={this.props.drizzleState}
                manipulators={myManipulators}
                isManipulator={this.props.isManipulator}
                isAdmin={this.props.isAdmin}/>);
            }else return null;
    	});

        if (!this.props.isManipulator){
            return components; 
        }else{


        	return (<div>
                {components}

                <form onSubmit={this.createItem}>
                  <h3>Crear nuevo producto</h3>
                  <p><input id={"itemName"} type="text" style={{width:"200px"}} ref={(element) => { this.input = element }} placeholder="Nombre del producto" required/></p>
                  <p>Fecha de Caducidad: <input id={"itemExpirationDate"} type="date" style={{width:"200px"}} ref={(element) => { this.input = element }} required/></p>
                  <p>Tipo de producto:</p>
                    <select name="itemType" id="itemType">
                      <option value={1}> Animal </option>
                      <option value={2}> Vegetal </option>
                      <option value={3}> Otro </option>
                    </select>
                  <input type="submit" value="Crear nuevo Item"/> 
                </form>
                </div>) ;
        	
		}
    }
}

export default ShowItems;