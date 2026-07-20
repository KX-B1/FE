export interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  inactive?: boolean;
}

export interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
}

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
}
