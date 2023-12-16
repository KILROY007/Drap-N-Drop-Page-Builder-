export interface Element {
  id: number;
  icon: string;
  label: string;
  fontSize: string;
  fontWeight: string;
}

export interface PositionalBlocks extends Element {
  x: number;
  y: number;
}
