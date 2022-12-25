import { dbCreateConnection } from './orm/dbCreateConnection';



async function initialise() {

    await dbCreateConnection();
}

export { initialise };