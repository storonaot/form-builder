export interface FieldSettingsData {
  label: string;
  hint?: string;
  required: boolean;
  errorMessage?: string;
  defaultValue?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  fullWidth: boolean;
}
