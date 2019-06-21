pragma solidity ^0.5.0;


contract Manipulator {

	// latitude = Num * 10 ^ (-Exp)
	struct Location {
		int latNum;  
		uint latExp; 
		int longNum; 
		uint longExp;
	}


	string public name;
	string public locationName;
	Location public location;	
	string public info;
	address payable owner;
	
  constructor(string memory _name,string memory _locationName, int _latitudeNum, uint _latitudeExp, int _longitudeNum, uint _longitudeExp, string memory _info) public {

  	name = _name;
  	locationName = _locationName;
  	location.latNum = _latitudeNum;
  	location.latExp = _latitudeExp;
  	location.longNum = _longitudeNum;
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
