import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
	width: 100%;
	height: 400px;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Poster = styled.div`
	background-image: url(${(props) => props.bg});
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center center;
`;

const Movie = ({ id, medium_cover_image, isLiked }) => {
	return (
		<Container>
			<Link to={`/${id}`}>
				<Poster bg={medium_cover_image} />
			</Link>
			<button>{isLiked ? "UnLike" : "Like"}</button>
		</Container>
	);
};

export default Movie;
