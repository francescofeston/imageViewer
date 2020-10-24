import React, { useState, useEffect } from 'react';
import './Login.css';
const Login = ({ history, getInstaUser }) => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (localStorage.getItem('insta-access-token')) {
			getInstaUser();
		}
	}, [getInstaUser]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (!userName || !password) {
			return;
		}
		if (userName === 'admin' && password === 'admin') {
			localStorage.setItem(
				'insta-access-token',
				'IGQVJWaVluZAW5JSzJQWnJJN1ZAJaVI3U3VEZAVp1N0g5U3dMeUlPYXZATRHRERWJpbFpJTjQzR3A2WTR0S2RyQzRvM18xZAEE4T2o1ckU3eGt3YUVYOC1rVHI4V0R2VXYxbkZACcmNrZAEZA3'
			);
			await getInstaUser();
			history.push('/');
			//login the user
		} else {
			alert('Wrong credentials');
		}
	};

	return (
		<div className='card login-card'>
			<h2>LOGIN</h2>
			<form onSubmit={submitHandler}>
				<input
					type='text'
					placeholder='username'
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<input
					type='password'
					placeholder='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default Login;
