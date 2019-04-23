pragma solidity ^0.5.0;


contract Manipulator {

	struct Location { // latitude = integer + (decimal*10^(-exp))
		int latInt;  //integer
		uint latDec; //decimal
		uint latExp; //exponential
		int longInt; //integer
		uint longDec;//decimal
		uint longExp;//exponential
	}


	string public name;
	string public locationName;
	Location public location;	
	string public info;
	address payable owner;
	
  constructor(string memory _name,string memory _locationName, int _latitudeInt, uint _latitudeDec, uint _latitudeExp, int _longitudeInt, uint _longitudeDec, uint _longitudeExp, string memory _info) public {

  	name = _name;
  	locationName = _locationName;
  	location.latInt = _latitudeInt;
  	location.latDec = _latitudeDec;
  	location.latExp = _latitudeExp;
  	location.longInt = _longitudeInt;
  	location.longDec = _longitudeDec;
  	location.longExp = _longitudeExp;
  	info = _info;
  	owner = msg.sender;
  }


  //*********DESTRUCTION****************

 	function destroyContract() public{

 		if (msg.sender == owner){

 			selfdestruct(owner);
 		}
        
	}
}
