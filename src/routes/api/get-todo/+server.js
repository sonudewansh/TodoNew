import { json } from '@sveltejs/kit';
import dbClient from '../../../db/dbClient.js';



export async function GET() {
    const client = await dbClient
    const db = client.db("sveltekit_db")
    const collection = db.collection("todos")

    let todo = await collection.find({}).toArray()
    return json(todo)

}