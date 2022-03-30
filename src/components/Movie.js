import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GET_MOVIE = gql`
	query getMovieById($id: Int!) {
		movie(id: $id) {
			id
			title
			description_intro
			rating
			language
			medium_cover_image
			isLiked @client
		}
		suggestions(id: $id) {
			id
			medium_cover_image
		}
	}
`;

const LIKE_MOVIE = gql`
	mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
		toggleLikeMovie(id: $id, isLiked: $isLiked) @client
	}
`;

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
	const [toggleLikeMovie] = useMutation(LIKE_MOVIE, {
		variables: { id: parseInt(id), isLiked },
	});
	useQuery(GET_MOVIE, {
		variables: { id: +id },
	});
	return (
		<Container>
			<Link to={`/${id}`}>
				<Poster bg={medium_cover_image} />
			</Link>
			<button
				style={{ color: "red", position: "absolute" }}
				onClick={toggleLikeMovie}
			>
				{isLiked ? "UnLike" : "Like"}
			</button>
		</Container>
	);
};

export default Movie;
