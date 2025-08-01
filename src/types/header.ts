export interface HeaderMeta {
  title: string;
  description?: string;
  enabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  onTitleChange?: (title: string) => void;
}