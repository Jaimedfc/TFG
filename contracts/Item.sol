pragma solidity ^0.5.0;
import './Manipulator.sol';


contract Item {

	enum itemType { Animal, Greens, Other}
	enum trspType { Land, Sea, Air}

	struct Visit {

		Manipulator manipulator;
		uint dateIn;             //days from 1/1/2019 to dateIn
		uint dateOut;            //days from 1/1/2019 to dateOut
		trspType trspOut;
	}

	string public name;
	itemType public itType;
	Visit[] public rute;
	int public expirationDate; //days from 1/1/2019 to expirationDate
	address payable owner;
	

	constructor(string memory _name, itemType _itType, int _expirationDate) public {
		name = _name;
		itType = _itType;
		expirationDate = _expirationDate;
		owner = msg.sender;
		
	}

	//***********GETTERS*****************

	function ruteLength() view public returns (uint){

  		return rute.length;
  	}


	//***********SETTERS*****************


 	function addVisit(address _manipulator, uint _dateIn, uint _dateOut, trspType _trspType) public {

 		if ( owner == msg.sender){


  			Visit memory visit = Visit(Manipulator(_manipulator), _dateIn, _dateOut, _trspType);
  			rute.push(visit);
  		}

 	}


 	//*********DESTRUCTION****************

 	function destroyContract() public{

 		if ( owner == msg.sender){

        	selfdestruct(owner);
        }
	}
} 