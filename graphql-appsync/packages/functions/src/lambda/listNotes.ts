import { DynamoDB } from "aws-sdk";
import Note from "src/types/Note";
import { Table } from "sst/node/table";

const dynamoDB = new DynamoDB.DocumentClient()

export async function listNotes(): Promise<
    Note[] | undefined
> {
    const params = {
        TableName: Table.Notes.tableName
    }
    const data = await dynamoDB.scan(params).promise()

    return data.Items as Note[]
}