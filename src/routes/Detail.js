import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const GET_MOVIE = gql`
	query getMovieById($id: Int!) {
		movie(id: $id) {
			title
			description_intro
			rating
			language
			medium_cover_image
		}
	}
`;

const Container = styled.div`
	background-image: linear-gradient(-45deg, #d754ab, #fb723a);
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: space-around;
	align-items: center;
	color: #ffffff;
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
	width: 30%;
	background-image: url(${(props) => props.bg});
	background-size: cover;
	background-position: center center;
	height: 60%;
`;

const Detail = () => {
	const { id } = useParams();

	const { loading, data } = useQuery(GET_MOVIE, {
		variables: { id: +id },
	});

	return (
		<Container>
			<Column>
				<Title>{loading ? "Loading..." : data.movie.title}</Title>
				{data && (
					<SubTitle>
						{data?.movie.language} · {data?.movie.rating}
					</SubTitle>
				)}
				<Description>{data?.movie.description_intro}</Description>
			</Column>
			<Poster bg={data?.movie.medium_cover_image} />
		</Container>
	);
};

export default Detail;
