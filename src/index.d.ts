export interface TToolParams {
  includeHeaders?: boolean;
  fillSymbol?: string;
  expression?: string;
  startFrom?: number;
  startRows?: number;
  startCols?: number;
  removeTabulation?: boolean;
  delimeter?: string;
}

export default function tabletip(width: number, height: number, params?: TToolParams): string;
