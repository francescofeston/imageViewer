import React, { useEffect } from 'react';
import InstaPost from '../../common/InstaPost/InstaPost';
import './Home.css';
const Home = ({ history, userInfo, userMedia, filteredMedia }) => {
	useEffect(() => {
		if (!userInfo || !userMedia) {
			history.push('/login');
		}
	}, [history, userInfo, userMedia]);

	return (
		<div className='container'>
			{!filteredMedia ? (
				<h3>No Media found matching the caption</h3>
			) : filteredMedia.length !== 0 ? (
				filteredMedia.map((post) => (
					<InstaPost
						post={post}
						key={post.id}
						profilePic={userInfo.profile_pic}
					/>
				))
			) : (
				userMedia &&
				userMedia.data.map((post) => (
					<InstaPost
						post={post}
						key={post.id}
						profilePic={userInfo.profile_pic}
					/>
				))
			)}
		</div>
	);
};

export default Home;
