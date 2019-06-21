pragma solidity ^0.5.0;
import './Manipulator.sol';


contract ManipFactory {

	Manipulator[] public manipulators;


  //********************CONSTRUCTOR************

  function createManipulator(string memory name, string memory locationName, int latitudeNum, uint latitudeExp, int longitudeNum, uint longitudeExp, string memory info) public{

  	Manipulator newManip = new Manipulator(name, locationName, latitudeNum, latitudeExp, longitudeNum, longitudeExp, info);
  	bool pushed=false;

	//Si hay un Manipulator con address 0x0, lo sobreescribimos
	//Si no hay, se pushea al final del array

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

	//El Manipulator a destruir pasa a ser un Manipulator con address 0x0 en el array

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
