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
