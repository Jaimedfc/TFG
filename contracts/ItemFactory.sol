pragma solidity ^0.5.0;
import './Item.sol';


contract ItemFactory {
  

  Item[] public items;
 
  //********************CONSTRUCTOR************

  function createItem(string memory _name, uint _itemType, int _expirationDate) public{

  	Item newItem = new Item(_name, _itemType, _expirationDate);
  	
  	bool pushed=false;

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

  //****************ENDGETTERS***************
  


  //*********CONTRACTDESTRUCTION****************

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



