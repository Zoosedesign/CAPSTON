import { Plants } from "./plants.interface";

export interface Pagination {
  current_page: number,
  data: Plants[],
  from: number,
  last_page: number,
  per_page: number,
  to: number,
  total: number
}
