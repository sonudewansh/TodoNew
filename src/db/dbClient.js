// import { MongoClient } from 'mongodb';

// const uri = "mongodb://localhost:27017";

// const client = new MongoClient(uri);

// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected to MongoDB");
//     } catch (err) {
//         console.error(err);
//     }
// }

// run().catch(console.dir);

// export default client;

import { MongoClient } from 'mongodb';

// const uri = "mongodb://localhost:27017";
const uri = "mongodb+srv://sonudew:Andal123@cluster0.gzgenq0.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("err.message");
    }
}

run()

export default client;
