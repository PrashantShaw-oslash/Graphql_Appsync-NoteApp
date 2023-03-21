import { Table } from "sst/node/table";
import { DynamoDB } from "aws-sdk";
import Note from "src/types/Note";

const dynamodb = new DynamoDB.DocumentClient()

export async function getNoteById(noteId: string): Promise<
    Note | undefined
    > {
    const params = {
        Key: { id: noteId },
        TableName: Table.Notes.tableName,
    }
    const data = await dynamodb.get(params).promise();

    return data.Item as Note
}
