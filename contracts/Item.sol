pragma solidity ^0.5.0;
import './Manipulator.sol';


contract Item {

	enum itemType { Animal, Greens, Other}
	enum trspType { Land, Sea, Air}

	//Una visita se corresponde con un hito en la ruta
	//En la primera Visit, dateIn en la fecha de nacimiento/plantación
	//En la ultima Visit, dateOut y trspOut son ignorados
	struct Visit {                

		Manipulator manipulator;
		uint dateIn;              //timestamp
		uint dateOut;             //timestamp
		trspType trspOut;
	}



	string public name;
	itemType public itType;
	Visit[] public route;
	uint public expirationDate; 
	bool public isDelivered;   //True if it has been delivered to the last manipulator
	address payable owner;
	

	constructor(string memory _name, uint _itemType, uint _expirationDate) public {
		name = _name;
		if (_itemType == 1){

			itType = itemType.Animal;
		}else if(_itemType == 2){

			itType = itemType.Greens;
		}else{

			itType = itemType.Other;
		}
		
		expirationDate = _expirationDate;
		isDelivered = bool(false);
		owner = msg.sender;
		
	}

	//***********GETTERS*****************

	function routeLength() view public returns (uint){

  		return route.length;
  	}


	//***********SETTERS*****************


 	function addVisit(address _manipulator, uint _dateIn, uint _dateOut, uint _trspType, bool _isDelivered) public {

 		trspType trsp;
 		if (_trspType == 1){

			trsp = trspType.Land;
		}else if(_trspType == 2){

			trsp = trspType.Sea;
		}else{

			trsp = trspType.Air;
		}


  		Visit memory visit = Visit(Manipulator(_manipulator), _dateIn, _dateOut, trsp);		
  		route.push(visit);
  		isDelivered = _isDelivered;
  		

 	}


 	//*********DESTRUCTION****************

 	function destroyContract() public{

 		if ( owner == msg.sender){

        	selfdestruct(owner);
        }
	}
} 