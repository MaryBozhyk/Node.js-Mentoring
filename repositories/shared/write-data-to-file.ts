import fs from 'fs';

export async function updateFileData<T>(fileName: string, context: T): Promise<void> {
    await fs.writeFile(fileName, JSON.stringify(context), 'utf8', (err: Error | null) => {
        if (err) {
            throw new Error(err.message);
        }
    });
}