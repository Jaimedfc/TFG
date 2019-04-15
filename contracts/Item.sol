pragma solidity ^0.5.0;
import './Manipulator.sol';


contract Item {

	enum itemType { Animal, Greens, Other}
	enum trspType { Land, Sea, Air}

	struct Visit {

		Manipulator manipulator;
		MyDate dateIn;             
		MyDate dateOut;            
		trspType trspOut;
	}

	struct MyDate{
		uint day;
		uint month;
		uint year;
	}

	string public name;
	itemType public itType;
	Visit[] public rute;
	MyDate public expirationDate; 
	bool public isDelivered;   //True if it has been delivered to the last manipulator
	address payable owner;
	

	constructor(string memory _name, uint _itemType, uint _expirationDateDay, uint _expirationDateMonth, uint _expirationDateYear) public {
		name = _name;
		if (_itemType == 1){

			itType = itemType.Animal;
		}else if(_itemType == 2){

			itType = itemType.Greens;
		}else{

			itType = itemType.Other;
		}
		
		MyDate memory myDate = MyDate(_expirationDateDay,_expirationDateMonth,_expirationDateYear);
		expirationDate = myDate;
		isDelivered = bool(false);
		owner = msg.sender;
		
	}

	//***********GETTERS*****************

	function ruteLength() view public returns (uint){

  		return rute.length;
  	}


	//***********SETTERS*****************


 	function addVisit(address _manipulator, uint _dateInDay, uint _dateInMonth, uint _dateInYear, uint _dateOutDay, uint _dateOutMonth, uint _dateOutYear, uint _trspType, bool _isDelivered) public {

 		trspType trsp;
 		if (_trspType == 1){

			trsp = trspType.Land;
		}else if(_trspType == 2){

			trsp = trspType.Sea;
		}else{

			trsp = trspType.Air;
		}

		MyDate memory myDateIn = MyDate(_dateInDay,_dateInMonth,_dateInYear);
		MyDate memory myDateOut = MyDate(_dateOutDay,_dateOutMonth,_dateOutYear);

  		Visit memory visit = Visit(Manipulator(_manipulator), myDateIn, myDateOut, trsp);		
  		rute.push(visit);
  		isDelivered = _isDelivered;
  		

 	}


 	//*********DESTRUCTION****************

 	function destroyContract() public{

 		if ( owner == msg.sender){

        	selfdestruct(owner);
        }
	}
} 