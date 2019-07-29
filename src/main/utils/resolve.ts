import * as path from 'path';

export function resolve(...pathSegments: string[]) {
  return path.resolve(__dirname, ...pathSegments);
}
