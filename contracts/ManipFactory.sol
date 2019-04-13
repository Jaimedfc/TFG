pragma solidity ^0.5.0;
import './Manipulator.sol';


contract ManipFactory {

	Manipulator[] public manipulators;
	//lista con manipuladores "legales"


  //********************CONSTRUCTOR************

  function createManipulator(string memory name, string memory locationName, int latitude, int longitude, string memory info) public{

  	Manipulator newManip = new Manipulator(name, locationName, latitude, longitude, info);
  	bool pushed=false;

  	for (uint i = 0; i < manipulators.length; i++){

  		if(manipulators[i] == Manipulator(address(0))){
  			manipulators[i] = newManip;
  			pushed = true;
        break;
  		}
  	}

  	if(!pushed){

  		manipulators.push(newManip);
  	}

  }

  //***************GETTERS*******************

  function getManipLength() view public returns (uint){

  	return manipulators.length;
  }


  //*********CONTRACTDESTRUCTION****************

  function destroyManipulator(address _manipulator) public{

  	Manipulator manipulatorToDestroy = Manipulator(_manipulator);
  	
  	for (uint i = 0; i < manipulators.length; i++){

  		if(manipulators[i] == manipulatorToDestroy){
  			manipulators[i] = Manipulator(address(0));
  		}
  	}

  	manipulatorToDestroy.destroyContract();
  }

}
