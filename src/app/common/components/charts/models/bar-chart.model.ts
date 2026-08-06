export interface BarChartData {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
  colors?: string[];
}
