var Item = artifacts.require("./Item.sol");

contract('Usamos un item:', accounts => {
    it("Establecemos su nombre", async () =>{

        const item = await Item.deployed();
	    const name = await item.name.call();
        const expectedName = "NOMBRE";
        assert.equal(name,expectedName,"Su nombre es NOMBRE");
    });
    
    it("Establecemos su expirationDate", async () =>{
    
        const item = await Item.deployed();    
        const date = await item.expirationDate.call();
        const expectedDate = 12345;
        assert.equal(date,expectedDate,"Su fecha de caducidad es 12345");
    });

});