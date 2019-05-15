var Manipulator = artifacts.require("./Manipulator.sol");

contract('Usamos un manipulator:', accounts => {

	it("Establecemos su campo name con NOMBRE", async () => {
    const manipulator = await Manipulator.deployed();
		const name = await manipulator.name.call();
		const expectedName = "NOMBRE";
    assert.equal(name,expectedName,"Su nombre es NOMBRE");	
    });

    it("Establecemos su campo locationName con MADRID",async () => {
      const manipulator = await Manipulator.deployed();
      const location = await manipulator.locationName.call();
      const expectedLocation = "MADRID";
      assert.equal(location,expectedLocation,"Su locationName es MADRID");
    });
    
    it("Establecemos su campo info con INFO",async () => {

      const manipulator = await Manipulator.deployed();
      const info = await manipulator.info.call();
      const expectedInfo = "INFO";
      assert.equal(info,expectedInfo,"Su campo info es INFO");
	});

});