pragma solidity ^0.5.0;
import './Item.sol';


contract ItemFactory {
  

  Item[] public items;
 
  //********************CONSTRUCTOR************

  function createItem(string memory _name, uint _itemType, uint _expirationDate) public{

  	Item newItem = new Item(_name, _itemType, _expirationDate);
  	
  	bool pushed=false;
	//Si hay un Item con address 0x0, lo sobreescribimos
	//Si no hay, se pushea al final del array
  	for (uint i = 0; i < items.length; i++){

  		if(items[i] == Item(address(0))){
  			items[i] = newItem;
  			pushed = true;
        break;
  		}
  	}

  	if(!pushed){

  		items.push(newItem);
  	}
  }

  //***************GETTERS*******************

  function getItemsLength() view public returns (uint){

  	return items.length;
  }

  
  


  //*********CONTRACTDESTRUCTION****************

  //El Item a destruir pasa a ser un Item con address 0x0 en el array
  function destroyItem(address _item) public{

  	Item itemToDestroy = Item(_item);
  	for (uint i = 0; i < items.length; i++){

  		if(items[i] == itemToDestroy){
  			items[i] = Item(address(0));
  		}
  	}

  	itemToDestroy.destroyContract();
  }


}



