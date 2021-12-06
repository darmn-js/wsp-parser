import fs from 'fs';
import { join } from 'path';

import { parseWSP } from '../index';

const readFileSync = fs.readFileSync;
const pathFiles = join(__dirname, '/../../data/');

const data = readFileSync(join(pathFiles, 'Analysis-61885-52 091021.wsp'));

describe('Parse WSP file', () => {
  it('should return data and summary', () => {
    const parsed = parseWSP(data);
    expect(parsed.data).toHaveLength(18);
    expect(parsed.summary).toHaveLength(18);
  });
});
