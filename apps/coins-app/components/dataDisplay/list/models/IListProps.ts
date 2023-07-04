export interface IListProps {
  data: any[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onItemClick?: (item?: any) => void;
}
