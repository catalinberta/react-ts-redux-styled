import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import styled from 'styled-components';
import { connect } from 'react-redux';
import InputField from '../../components/InputField';
import schema from './schema';
import useStyles from './makeStyles';
import { RootState } from '../../store/store';
import { AppThunkDispatch } from '../../types.d';
import { MapStateToProps, RegisterProps } from './types';
import { register as registerAction } from '../../store/user/actions';
import { RegisterRequestModel } from '../../store/user/types';

const Register = (props: RegisterProps) => {
	const classes = useStyles();
	const { handleSubmit, register, errors } = useForm({
		resolver: yupResolver(schema),
		mode: 'onTouched'
	});

	const onSubmit = () => {
		props.register({
			email: ''
		});
	};

	return (
		<RegisterWrapper>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={`${classes.paper} registerScreen`}>
					<Avatar className={classes.avatar} component="div" />
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<br />
					<form className="row" onSubmit={handleSubmit(onSubmit)}>
						<Grid container spacing={2} component="div">
							<Grid item xs={12} sm={6} component="div">
								<InputField
									autoComplete="firstName"
									name="firstName"
									id="firstName"
									label="First Name"
									autoFocus
									error={!!errors.firstName}
									helperText={errors.firstName?.message}
									inputRef={register()}
								/>
							</Grid>
							<Grid item xs={12} sm={6} component="div">
								<InputField
									autoComplete="lastName"
									name="lastName"
									id="lastName"
									label="Last Name"
									error={!!errors.lastName}
									helperText={errors.lastName?.message}
									inputRef={register()}
								/>
							</Grid>
							<Grid item xs={12} component="div">
								<InputField
									autoComplete="email"
									id="email"
									label="Email Address"
									name="email"
									error={!!errors.email}
									helperText={errors.email?.message}
									inputRef={register()}
								/>
							</Grid>
							<Grid item xs={12} component="div">
								<InputField
									autoComplete="password"
									name="password"
									label="Password"
									type="password"
									id="password"
									error={!!errors.password}
									helperText={errors.password?.message}
									inputRef={register()}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							href=""
							disabled={!!Object.keys(errors).length}
						>
							Sign Up
						</Button>
					</form>
				</div>
			</Container>
		</RegisterWrapper>
	);
};

const RegisterWrapper = styled.div`
	padding: 20px;
`;

const mapStateToProps = (state: RootState): MapStateToProps => ({
	user: state.user
});

const mapDispatchToProps = (dispatch: AppThunkDispatch) => ({
	register: (userObj: RegisterRequestModel): void =>
		dispatch(registerAction(userObj))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
