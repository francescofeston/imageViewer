import React, { useState } from 'react';

const InstaPost = ({ post }) => {
	const {
		id,
		media_url,
		timestamp,
		username,
		caption,
		likes,
		liked,
		allComments,
	} = post;

	const [postLiked, setPostLiked] = useState(liked);
	const [noOfLikes, setNoOfLikes] = useState(likes);

	const [comments, setComments] = useState(allComments);

	const [newComment, setNewComment] = useState('');

	const likePost = () => {
		if (!postLiked) {
			setNoOfLikes(noOfLikes + 1);
			setPostLiked(true);
		} else {
			setNoOfLikes(noOfLikes - 1);
			setPostLiked(false);
		}
	};

	const addNewComment = (e) => {
		e.preventDefault();
		if (newComment === '') {
			return;
		}

		setComments((oldComments) => [
			{ text: newComment, date: new Date() },
			...oldComments,
		]);

		setNewComment('');
	};

	return (
		<div className='card' style={styles.postItem}>
			<div style={styles.userDetails}>
				<div>
					<img
						style={styles.profilePic}
						src='https://lh3.googleusercontent.com/proxy/vOcfOfHYPAKQgLHePMiu8CCD1yx_K9AmcAN0dZt0dA1Xm-UKN4gvppLcwE-fKxByLmzkPfKEY_Qzp9yBcV0VG6ijNJhWYI1JrLU_b3roVtopjIsdgq0'
						alt={username}
					/>
				</div>
				<div>
					<h4 style={styles.username}>{username}</h4>
					<small style={styles.timestamp}>{timestamp}</small>
				</div>
			</div>
			<img src={media_url} alt={caption} style={styles.postImg} />
			<hr />

			<p style={styles.caption}>{caption}</p>

			<div style={styles.likeContainer}>
				{postLiked ? (
					<i
						className='fa fa-lg fa-heart'
						style={{ color: 'red' }}
						onClick={likePost}
					></i>
				) : (
					<i className='far fa-lg fa-heart' onClick={likePost}></i>
				)}
				<span style={{ marginLeft: '10px' }}>{noOfLikes} likes</span>
			</div>

			<div>
				<form onSubmit={addNewComment} style={styles.commentContainer}>
					<input
						type='text'
						value={newComment}
						placeholder='Add a comment'
						onChange={(e) => setNewComment(e.target.value)}
						style={styles.commentBox}
					/>
					<button type='submit'>ADD</button>
				</form>
			</div>
			<div>
				{comments.map((comment, i) => (
					<div key={i}>
						<div style={styles.userDetails}>
							<div>
								<img
									style={styles.profilePic}
									src='https://lh3.googleusercontent.com/proxy/vOcfOfHYPAKQgLHePMiu8CCD1yx_K9AmcAN0dZt0dA1Xm-UKN4gvppLcwE-fKxByLmzkPfKEY_Qzp9yBcV0VG6ijNJhWYI1JrLU_b3roVtopjIsdgq0'
									alt={username}
								/>
							</div>
							<div>
								<h4 style={styles.username}>{username}</h4>
								<small style={styles.timestamp}>
									{comment.date.toString().substring(0, 15)}
								</small>
							</div>
						</div>
						<p>{comment.text}</p>
					</div>
				))}
			</div>
		</div>
	);
};

const styles = {
	postItem: {
		margin: '50px auto',
		maxWidth: '400px',
	},
	profilePic: {
		height: '50px',
		width: '50px',
		borderRadius: '50%',
		marginRight: '20px',
	},
	userDetails: {
		display: 'flex',
		alignItems: 'center',
	},
	postImg: {
		width: '100%',
		marginTop: '30px',
	},
	username: {
		margin: '0',
	},
	timestamp: {
		color: '#777',
	},
	caption: {},
	likeContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	commentContainer: {
		margin: '32px auto',
		display: 'flex',
		justifyContent: 'space-between',
	},
	commentBox: {
		width: '80%',
		outline: 'none',
		border: 'none',
		borderBottom: '1px solid #ccc',
	},
};

export default InstaPost;
