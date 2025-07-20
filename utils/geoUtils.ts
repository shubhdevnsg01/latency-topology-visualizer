// utils/geoUtils.ts
export function latLonToVector3(lat: number, lon: number, radius: number = 2): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

export function getArcMidpoint(start: [number, number, number], end: [number, number, number], height = 0.5) {
  const mx = (start[0] + end[0]) / 2;
  const my = (start[1] + end[1]) / 2;
  const mz = (start[2] + end[2]) / 2;

  const len = Math.sqrt(mx * mx + my * my + mz * mz);
  const factor = 1 + height / len;

  return [mx * factor, my * factor, mz * factor];
}
