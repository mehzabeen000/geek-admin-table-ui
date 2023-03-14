import { page_limit } from "./constant";

export const getTotalPages = (length: number) => {
  return Math.ceil(length / 10);
}

export const getRecordIndex = (page: number) => {
  return (page - 1) * page_limit;
}


