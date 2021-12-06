import { parse } from 'fast-xml-parser';

import { getKeyWords } from './utilities/getKeyWords';
import { getNodes } from './utilities/getNodes';

/**
 * My module
 * @returns A very important number
 */
export function parseWSP(raw) {
  raw = ensureText(raw);
  const parsed = parse(raw, {
    textNodeName: '_data',
    attributeNamePrefix: '',
    parseAttributeValue: true,
    attrNodeName: '_attr',
    ignoreAttributes: false,
  });

  const columns = parsed.Workspace.Columns.TColumn;
  const columnNames = [];
  for (const column of columns) {
    const keys = column.Property._attr.key.split('.');
    const key = keys[keys.length - 1];
    columnNames.push(key.charAt(0).toUpperCase() + key.slice(1));
  }

  const sampleList = parsed.Workspace.SampleList.Sample;
  const data = [];
  const summary = [];
  for (const sample of sampleList) {
    const keyWords = getKeyWords(sample);
    const cells = keyWords.$TOT;
    const nodes = getNodes(sample, cells);
    const gates = [];
    for (const node of nodes) {
      gates.push({
        name: node.name,
        nbCells: node.nbCells,
        statistic: node.statistic,
      });
    }

    data.push({
      name: sample.SampleNode._attr.name,
      keyWords,
      nodes,
    });

    summary.push({
      sample: sample.SampleNode._attr.name,
      nbCells: cells,
      gates,
    });
  }

  return { data, summary, columnNames };
}

/*
  https://github.com/cheminfo/mzData/blob/master/src/util/ensureText.js
  */
export function ensureText(data, options = {}) {
  const { encoding = 'utf8' } = options;
  // eslint-disable-next-line no-undef
  if (typeof Buffer !== 'undefined' && data instanceof Buffer) {
    return data.toString(encoding);
  }
  if (typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer) {
    return new TextDecoder(encoding).decode(data);
  }
  return data;
}
