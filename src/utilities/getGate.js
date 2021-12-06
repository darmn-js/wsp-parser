export function getGate(gate) {
  const poligon = gate['gating:PolygonGate'];
  const gateDimensions = poligon['gating:dimension'];
  const dimensions = [];
  for (const gateDimension of gateDimensions) {
    const item =
      gateDimension['data-type:fcs-dimension']._attr['data-type:name'];
    dimensions.push(item);
  }
  const gateVertices = poligon['gating:vertex'];
  const vertices = [];
  for (const gateVertex of gateVertices) {
    const coordinates = gateVertex['gating:coordinate'];
    const vertex = [];
    for (const coordinate of coordinates) {
      vertex.push(coordinate._attr['data-type:value']);
    }
    vertices.push(vertex);
  }
  return {
    dimensions,
    vertices,
    offset: {
      x: poligon._attr.annoOffsetX,
      y: poligon._attr.annoOffsetY,
    },
  };
}
