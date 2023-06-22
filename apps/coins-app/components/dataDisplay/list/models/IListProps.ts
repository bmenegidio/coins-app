export interface IListProps {
  data: any[];
  itemKeyId: string;
  itemKeyLabel: string;
  itemKeyDescription?: string;
  itemKeyAvatar?: string;
  isLoading?: boolean;
  onRefresh?: () => void;
}
