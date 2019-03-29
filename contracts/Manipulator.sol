pragma solidity ^0.5.0;


contract Manipulator {

	struct Location {
		int lat;
		int long;
	}

	string public name;
	string public locationName;
	Location public location;	
	string public info;
	address payable owner;
	
  constructor(string memory _name,string memory _locationName, int _latitude, int _longitude, string memory _info) public {

  	name = _name;
  	locationName = _locationName;
  	location.lat = _latitude;
  	location.long = _longitude;
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
