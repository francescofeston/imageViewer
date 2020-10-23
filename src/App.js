import React, { useState } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from './common/Header/Header';
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import Profile from './screens/Profile/Profile';
import dp from './assets/sample_pic.jpg';
import { constants } from './common/utils';

const history = createBrowserHistory();

function App() {
	const [userInfo, setUserInfo] = useState(null);
	const [userMedia, setUserMedia] = useState(null);
	const [filteredMedia, setFilteredMedia] = useState([]);

	const getInstaUser = async () => {
		const instaAccessToken = localStorage.getItem('insta-access-token');

		if (!instaAccessToken) {
			alert('no token found');
		}
		try {
			const userRes = await fetch(
				`${constants.userInfoUrl}&access_token=${instaAccessToken}`
			);
			let userData = await userRes.json();

			userData = { ...userData, profile_pic: dp };

			const mediaRes = await fetch(
				`${constants.userMediaUrl}&access_token=${instaAccessToken}`
			);
			let mediaData = await mediaRes.json();
			mediaData.data = mediaData.data.map((media) => {
				return {
					...media,
					likes: Math.floor(Math.random() * 30 + 12),
					liked: false,
					allComments: [],
				};
			});
			setUserInfo(userData);
			setUserMedia(mediaData);
			history.push('/');
		} catch (error) {
			alert('something went wrong');
			console.log(error);
		}
	};

	const filterMedia = (text) => {
		if (text === '') {
			setFilteredMedia([]);
			return;
		}
		let searchQuery = text.toLowerCase();
		let foundMedia = userMedia.data.filter((media) => {
			let caption = media.caption.toLowerCase();
			return caption.indexOf(searchQuery) !== -1;
		});
		if (foundMedia.length === 0) {
			setFilteredMedia(null);
		} else {
			setFilteredMedia(foundMedia);
		}
	};

	return (
		<>
			<Router history={history}>
				<Header filterMedia={filterMedia} userInfo={userInfo} />
				<main>
					<Switch>
						<Route
							exact
							path='/login'
							component={(props) => (
								<Login {...props} getInstaUser={getInstaUser} />
							)}
						/>
						<Route
							exact
							path='/profile'
							component={(props) => (
								<Profile {...props} userInfo={userInfo} userMedia={userMedia} />
							)}
						/>
						<Route
							exact
							path='/'
							component={(props) => (
								<Home
									{...props}
									userInfo={userInfo}
									userMedia={userMedia}
									filteredMedia={filteredMedia}
								/>
							)}
						/>
					</Switch>
				</main>
			</Router>
		</>
	);
}

export default App;