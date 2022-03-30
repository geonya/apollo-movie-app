import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIES = gql`
	query {
		movies {
			id
			title
			medium_cover_image
		}
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const Header = styled.header`
	background-image: linear-gradient(-45deg, #d754ab, #fb723a);
	height: 45vh;
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const Title = styled.h1`
	font-size: 60px;
	font-weight: 600;
	margin-bottom: 20px;
`;
const SubTitle = styled.h3`
	font-size: 35px;
`;

const Loading = styled.div`
	font-size: 18px;
	opacity: 0.5;
	font-weight: 500;
	margin-top: 10px;
`;

const Movies = styled.div`
	width: 80%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 30px;
	position: relative;
	top: -80px;
`;

const Home = () => {
	const { loading, data } = useQuery(GET_MOVIES);

	return (
		<Container>
			<Header>
				<Title>Apollo Movies</Title>
				<SubTitle>I Love GraphQL</SubTitle>
			</Header>
			{loading ? (
				<Loading>Loading</Loading>
			) : (
				<Movies>
					{data?.movies?.map((movie) => (
						<Movie key={movie.id} {...movie} />
					))}
				</Movies>
			)}
		</Container>
	);
};

export default Home;
