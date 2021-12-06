export function getKeyWords(sample) {
  const keyWords = sample.Keywords.Keyword;
  const result = {};
  for (const keyWord of keyWords) {
    result[keyWord._attr.name] = keyWord._attr.value;
  }
  return result;
}
