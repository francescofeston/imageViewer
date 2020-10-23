import React, { useEffect } from 'react';
import InstaPost from '../components/InstaPost.component';

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
				filteredMedia.map((post) => <InstaPost post={post} key={post.id} />)
			) : (
				userMedia &&
				userMedia.data.map((post) => <InstaPost post={post} key={post.id} />)
			)}
		</div>
	);
};

export default Home;
