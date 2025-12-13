import * as path from 'node:path';
import * as fs from 'node:fs';
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

// const docPath = path.join(__dirname, '../../doc/api.yaml');
const docPath = path.join(process.cwd(), 'doc', 'api.yaml');

if (!fs.existsSync(docPath)) {
  throw new Error(`Swagger file not found: ${docPath}`);
}

export const getSwaggerDoc = async () => {
  try {
    const apiDocFile = await readFile(docPath, 'utf-8');
    const swaggerDocument = parse(apiDocFile);

    return swaggerDocument;
  } catch (error) {
    console.error(error.message);
  }
};
