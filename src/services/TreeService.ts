import type { Tree } from '@/types/Tree';
import london from '@/data/london.json';
import glasgow from '@/data/glasgow.json';
import falkirk from '@/data/falkirk.json';
import edimburgh from '@/data/edinburgh.json';
import dublin from '@/data/dublin.json';

class TreeService {
  static async getCity(urlApi: string): Promise<Tree[]> {
    try {
      const res = await fetch(urlApi);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch.');
      return [];
    }
  }

  static async getAllGroups(): Promise<Tree[]> {
    // let treeGroup: Tree[][] = [];
    // treeGroup = await Promise.all([
    //   TreeService.getCity(import.meta.env.VITE_API_URL_GLASGOW),
    //   TreeService.getCity(import.meta.env.VITE_API_URL_EDIMBURGH),
    //   TreeService.getCity(import.meta.env.VITE_API_URL_EDIMBURGH),
    // ]);
    // const flattenedGroup: Tree[] = treeGroup.reduce(
    //   (acc, curr) => [...acc, ...curr],
    //   [],
    //);
    // return flattenedGroup;

    let treeGroup: Tree[] = [];
    treeGroup = [...london, ...glasgow, ...edimburgh, ...falkirk, ...dublin];
    return treeGroup;
  }
}

export default TreeService;
