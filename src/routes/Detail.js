import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Movie from "../components/Movie";

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

const Container = styled.div`
	background-image: linear-gradient(-45deg, #d754ab, #fb723a);
	width: 100%;
	height: 120vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	color: #ffffff;
	padding-bottom: 100px;
`;

const Column = styled.div`
	width: 50%;
`;

const Title = styled.h1`
	font-size: 65px;
	margin-bottom: 15px;
`;

const SubTitle = styled.h3`
	font-size: 35px;
	margin-bottom: 10px;
`;

const Description = styled.p`
	font-size: 28px;
`;

const Poster = styled.div`
	width: 300px;
	background-image: url(${(props) => props.bg});
	background-size: cover;
	background-position: center center;
	height: 450px;
`;

const Row = styled.div`
	width: 100%;
	height: 50%;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;
const Suggestions = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Movies = styled.div`
	width: 80%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 30px;
`;

const Detail = () => {
	const { id } = useParams();

	const { loading, data } = useQuery(GET_MOVIE, {
		variables: { id: +id },
	});
	return (
		<Container>
			<Row>
				<Column>
					<Title>
						{loading
							? "Loading..."
							: `${data.movie.title} ${
									data.movie.isLiked ? "❤️" : "😭"
							  }`}
					</Title>
					<SubTitle>
						{data?.movie?.language} · {data?.movie?.rating}
					</SubTitle>
					<Description>{data?.movie.description_intro}</Description>
				</Column>
				<Poster bg={data?.movie.medium_cover_image} />
			</Row>
			<Suggestions>
				<SubTitle>Suggestions</SubTitle>
				<Movies>
					{data?.suggestions?.map((suggestion) => (
						<Movie key={suggestion.id} {...suggestion}></Movie>
					))}
				</Movies>
			</Suggestions>
		</Container>
	);
};

export default Detail;
