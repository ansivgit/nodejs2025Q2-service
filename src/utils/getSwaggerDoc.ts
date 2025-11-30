import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';

const docPath = join(__dirname, '../../doc/api.yaml');

export const getSwaggerDoc = async () => {
  try {
    const apiDocFile = await readFile(docPath, 'utf-8');
    const swaggerDocument = parse(apiDocFile);

    return swaggerDocument;
  } catch (error) {
    console.error(error.message);
  }
};
