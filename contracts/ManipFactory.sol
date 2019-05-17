pragma solidity ^0.5.0;
import './Manipulator.sol';


contract ManipFactory {

	Manipulator[] public manipulators;


  //********************CONSTRUCTOR************

  function createManipulator(string memory name, string memory locationName, int latitudeInt, uint latitudeDec, uint latitudeExp, int longitudeInt, uint longitudeDec, uint longitudeExp, string memory info) public{

  	Manipulator newManip = new Manipulator(name, locationName, latitudeInt, latitudeDec, latitudeExp, longitudeInt, longitudeDec, longitudeExp, info);
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
