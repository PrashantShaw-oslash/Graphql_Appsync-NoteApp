import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";

import Note from "../types/Note"

const dynamoDB = new DynamoDB.DocumentClient()

export default async function createNote(note: Note): Promise<Note> {
    const params = {
        TableName: Table.Notes.tableName,
        Item: note
    }

    const response  = await dynamoDB.put(params).promise()

    return params.Item as Note
}