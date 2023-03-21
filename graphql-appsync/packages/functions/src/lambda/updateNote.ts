import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";
import Note from "src/types/Note";


const dynamoDB = new DynamoDB.DocumentClient()

export async function updateNote(note: Note): Promise<
    Note | undefined
    > {
    const params = {
        TableName: Table.Notes.tableName,
        Key: {id: note.id},
        UpdateExpression: "SET content = :content",
        ExpressionAttributeValues: {
            ":content": note.content
        },
        ReturnValues: "UPDATED_NEW",
        Item: note as Note
    }
    const updatedNote = await dynamoDB.update(params).promise()
    console.log("response", updatedNote.Attributes)
    return note
}