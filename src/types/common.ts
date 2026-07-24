export interface ProjectHeaderProps {
  onSave?: () => void;
  onExport?: (type: 'pdf' | 'png') => void;
}

export type HeaderProps =
  | {
      variant?: 'default';
      logoSrc?: string;
      userId?: string;
      onLogoClick?: () => void;
      onProfileClick?: () => void;
    }
  | {
      variant: 'project';
      onSave?: () => void;
      onExport?: (type: 'pdf' | 'png') => void;
      onProfileClick?: () => void;
    };

export interface ExportDropdownProps {
  onExport?: (type: 'pdf' | 'png') => void;
  viewMode?: 'storyboard' | 'canvas';
}
