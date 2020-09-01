import { OutlinedTextFieldProps } from '@material-ui/core';
import * as React from 'react';

export interface InputFieldProps extends Partial<OutlinedTextFieldProps> {
	label?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
