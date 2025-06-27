export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiPaginatedResponse<T = any> extends ApiResponse<T> {
  meta: PageMetaDto;
  filterBy?: {
    name: string;
    typeof: string;
  }[];
}

export interface PageMetaDto {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
