import { getGate } from './getGate';

export function getNodes(sample, cells) {
  const sampleNode = sample.SampleNode;
  let subPopulation = sampleNode.Subpopulations.Population;
  let nbCells = cells;
  const nodes = [];

  do {
    const count = subPopulation._attr.count;
    nodes.push({
      name: subPopulation._attr.name,
      gate: getGate(subPopulation.Gate),
      nbCells: count,
      statistic: (count / nbCells) * 100,
    });
    nbCells = count;
    subPopulation = subPopulation.Subpopulations.Population;
  } while (subPopulation.Subpopulations);

  const count = subPopulation._attr.count;
  nodes.push({
    name: subPopulation._attr.name,
    gate: getGate(subPopulation.Gate),
    nbCells: count,
    statistic: (count / nbCells) * 100,
  });
  return nodes;
}
