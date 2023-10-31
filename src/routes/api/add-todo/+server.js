// import { json } from '@sveltejs/kit';
// import dbClient from '../../../db/dbClient.js';



// export async function POST({request}) {

//     const client = await dbClient
//     const db = client.db("sveltekit_db")
//     console.log(client,"amit")
//     const collection = db.collection("todos")

//     const {title} = await request.json()
//     console.log("title--->", title);
    
//     const todo = await collection.insertOne({"title": title})
//     console.log("todo---->", todo);

//     return json({
//         "message":"OK"
//     })
// }

import { json } from '@sveltejs/kit';
import dbClient from '../../../db/dbClient.js';



export async function POST({request}) {

    const client = await dbClient
    const db = client.db("sveltekit_db")
    // console.log(client,"amit")
    const collection = db.collection("todos")

    const {title} = await request.json()
    console.log("Title: ", title);
    
    const todo = await collection.insertOne({"title": title})
    const find_todo = await collection.findOne({"_id":todo.insertedId})
    return json(find_todo)
}





