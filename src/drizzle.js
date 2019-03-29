import { Drizzle, generateStore } from "drizzle";

import ItemFactory from './contracts/ItemFactory.json';
import ManipFactory from './contracts/ManipFactory.json';


const options = {

	contracts: [ ItemFactory, ManipFactory ],
	web3: {
		fallback: {
			type: "ws",
			url: "ws://127.0.0.1:7545"
		}
	}
};

const drizzleStore = generateStore(options);

const drizzle = new Drizzle(options, drizzleStore);

export default drizzle;