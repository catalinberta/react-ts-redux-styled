import React from 'react';
import { TextField } from '@material-ui/core';
import { InputFieldProps } from './types';

const CustomTextField: React.FC<InputFieldProps> = props => {

	const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		props.onChange?.(e);
	};

	return (
		<TextField
			className={`${props.className !== undefined ? props.className : ''}`}
			label={props.label}
			type={props.type}
			placeholder={props.placeholder}
			onChange={onChange}
			variant="outlined"
			required
			fullWidth
			{...props}
		/>
	);
};

export default CustomTextField;
