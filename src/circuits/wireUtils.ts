export type WirePoint = { x: number; y: number };

/**
 * Apply the same bend insertion used by double-clicking a wire segment.
 * Returns null when the selected segment is an endpoint or does not exist.
 */
export function insertWireBend(
  points: WirePoint[],
  index: number,
  isVertical: boolean,
): WirePoint[] | null {
  if (index === 0 || index === points.length - 2) return null;

  const p1 = points[index];
  const p2 = points[index + 1];
  if (!p1 || !p2) return null;

  const nextPoints = [...points];

  if (!isVertical) {
    const midX = (p1.x + p2.x) / 2;
    const dirX = Math.sign(p2.x - p1.x) || 1;
    const offset = 15;

    nextPoints.splice(
      index + 1,
      0,
      { x: midX - dirX * offset, y: p1.y },
      { x: midX - dirX * offset, y: p1.y + 20 },
      { x: midX + dirX * offset, y: p1.y + 20 },
      { x: midX + dirX * offset, y: p1.y },
    );
  } else {
    const midY = (p1.y + p2.y) / 2;
    const dirY = Math.sign(p2.y - p1.y) || 1;
    const offset = 15;

    nextPoints.splice(
      index + 1,
      0,
      { x: p1.x, y: midY - dirY * offset },
      { x: p1.x + 20, y: midY - dirY * offset },
      { x: p1.x + 20, y: midY + dirY * offset },
      { x: p1.x, y: midY + dirY * offset },
    );
  }

  return nextPoints;
}
