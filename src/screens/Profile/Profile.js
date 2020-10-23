import React, { useEffect, useState } from 'react';
import InstaPost from '../../common/InstaPost/InstaPost';
import './Profile.css';

const Profile = ({ userMedia, userInfo, history }) => {
	useEffect(() => {
		if (!userInfo || !userMedia) {
			history.push('/login');
		}
	}, [history, userInfo, userMedia]);

	const [nameEditingMode, setNameEditingMode] = useState(false);
	const [profileName, setProfileName] = useState('John Doe');
	const [selectedPost, setSelectedPost] = useState(null);
	const [selectedPostIsOpen, setSelectedPostIsOpen] = useState(false);

	const editName = () => {
		setNameEditingMode(true);
	};

	const saveProfileName = () => {
		setNameEditingMode(false);
	};

	useEffect(() => {
		let modal = document.querySelector('.modal');
		window.onclick = function (event) {
			if (event.target == modal) {
				setSelectedPostIsOpen(false);
			}
		};

		return () => {
			window.onclick = null;
		};
	}, [selectedPostIsOpen]);

	return (
		userMedia &&
		userInfo && (
			<div className='container'>
				<div style={styles.profileBox}>
					<div>
						<img
							style={styles.profilePic}
							src={userInfo.profile_pic}
							alt={profileName}
						/>
					</div>
					<div style={styles.userDetail}>
						<h1>{userInfo.username}</h1>
						<div style={styles.statBox}>
							<span>Posts: {userInfo.media_count}</span>
							<span>Follows: 6</span>
							<span>Followed By: 8</span>
						</div>
						{nameEditingMode ? (
							<div style={{ display: 'flex' }}>
								<input
									type='text'
									value={profileName}
									onChange={(e) => {
										setProfileName(e.target.value);
									}}
									style={{
										outline: 'none',
										border: 'none',
										borderBottom: '1px solid #ccc',
										width: '100%',
									}}
								/>{' '}
								<button onClick={saveProfileName}>Save</button>
							</div>
						) : (
							<h2>
								{profileName}{' '}
								<button
									onClick={editName}
									style={{
										backgroundColor: 'magenta',
										width: '50px',
										height: '50px',
										borderRadius: '50%',
										padding: '0',
									}}
								>
									<div className='fa fa-pen'></div>
								</button>{' '}
							</h2>
						)}
					</div>
				</div>
				{selectedPost && selectedPostIsOpen && (
					<div className='modal'>
						<InstaPost post={selectedPost} profilePic={userInfo.profile_pic} />
					</div>
				)}
				<div className='img-grid'>
					{userMedia.data.map((media, i) => (
						<img
							onClick={() => {
								setSelectedPostIsOpen(true);
								setSelectedPost(media);
							}}
							src={media.media_url}
							alt={media.caption}
							key={media.id}
							style={{ width: '100%' }}
						/>
					))}
				</div>
			</div>
		)
	);
};

const styles = {
	profileBox: {
		display: 'flex',
		margin: '0 auto',
		marginBottom: '50px',
		maxWidth: '800px',
	},
	profilePic: {
		width: '180px',
		height: '180px',
		borderRadius: '50%',
	},
	userDetail: { width: '100%', marginLeft: '50px' },
	statBox: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '20px',
	},
};

export default Profile;
