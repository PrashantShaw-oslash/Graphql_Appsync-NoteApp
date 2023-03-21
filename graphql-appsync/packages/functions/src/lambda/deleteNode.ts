import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";

const dynamodb = new DynamoDB.DocumentClient()

export const deleteNote = async (noteId: string): Promise<
    string | undefined
> => {
    const params = {
        TableName: Table.Notes.tableName,
        Key: { id: noteId},
    }

    const response = await dynamodb.delete(params).promise()
    console.log('delete response', response)
    return noteId
}