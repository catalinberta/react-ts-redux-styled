import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputField from '../../components/InputField';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import schema from "./schema";
import useStyles from "./style";
import {InputAdornment} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import API from "../../services/API";

const Register = () => {
	const [showCheckingEmail, setShowCheckingEmail] = useState(false);
	const [showEmailVerified, setShowEmailVerified] = useState(false);
	const classes = useStyles();
	const { handleSubmit, register, errors, getValues, setError, clearErrors } = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange'
	});

	const onEmailChange = async () => {
		if(!errors.email) {
			setShowCheckingEmail(true);
			setShowEmailVerified(false);
			const checkResponse = await API.post('/check-user', {
					campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
					data: {
						email: getValues("email")
					}
				},
				{
					requestId: 'email'
				});
			setShowCheckingEmail(false);
			if(checkResponse.data.data.status === 'EXISTS') {
				setError(
					'email', {
						type: 'email',
						message: "E-mail is already in use."
					});
			} else if(checkResponse.data.data.status === 'OK') {
				clearErrors('email');
				setShowEmailVerified(true);
			}
		}
	};

	const onSubmit = () => {
		console.log('Success');
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar} component='div' />
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<br/>
				<form className="row" onSubmit={handleSubmit(onSubmit)}>
						<Grid container spacing={2} component='div'>
							<Grid item xs={12} sm={6} component='div'>
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
							<Grid item xs={12} sm={6} component='div'>
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
							<Grid item xs={12} component='div'>
								<InputField
									autoComplete="email"
									id="email"
									label="Email Address"
									name="email"
									onChange={onEmailChange}
									error={!!errors.email}
									helperText={errors.email?.message}
									inputRef={register()}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end" component='div'>
												{ showCheckingEmail && <CircularProgress color="primary" size={20}/> }
												{ showEmailVerified && <CheckIcon component="svg" color="primary"/> }
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12} component='div'>
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
							href=''
							disabled={!!Object.keys(errors).length || showCheckingEmail}
						>
							Sign Up
						</Button>
					</form>
			</div>
		</Container>
	);
};

export default Register;