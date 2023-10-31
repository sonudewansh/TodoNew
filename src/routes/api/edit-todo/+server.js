import { json } from '@sveltejs/kit';
import dbClient from '../../../db/dbClient.js';
import { ObjectId } from 'mongodb';

export async function POST({request}) {
    const client = await dbClient
    const db = client.db("sveltekit_db")
    const collection = db.collection("todos")

    const {id, title} = await request.json()
    console.log("Id: ", id);

    const find_todo_by_id = await collection.findOne({"_id":new ObjectId(id)})
    console.log("Find_todo_by_id: ", find_todo_by_id);
    if (!find_todo_by_id) {
        return json({
            "error":"Todo Not Found !"
        })
    }
    await collection.updateOne({_id: new ObjectId(id)}, {
        $set: {
            title:title
        }
    })
    return json({
        "message": "Todo is Updated",
        "id":id,
        "title":title
    })
}