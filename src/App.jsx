import React, { useState } from 'react';
import styled from 'styled-components';
import { deleteMovie, postMovie, getMovies, status } from './api';
import AddMovieForm from './form/AddMovieForm';

function App() {
  const [movies, setMovies] = useState({
    status: null,
    data: [],
  });
  const [deleteStatus, setDeleteStatus] = useState({
    status: null,
  });
  const [addMovieVisible, setAddMovieVisible] = useState(false);
  const [postStatus, setPostStatus] = useState({
    status: null,
  });

  function fetchMovies() {
    setAddMovieVisible(false);
    getMovies(setMovies);
  }

  function showAddMovieForm() {
    if (postStatus.status === status.resolved) {
      setPostStatus({
        status: null,
      });
    }
    setAddMovieVisible(true);
  }

  function deleteMovieHandler(movieId) {
    deleteMovie(movieId, setDeleteStatus);
    if (deleteStatus.status === status.resolved) {
      setMovies(prevMovies => ({
        ...prevMovies,
        data: prevMovies.data.filter(movie => movie.id !== movieId),
      }));
    }
  }

  function postMovieHandler(movie) {
    postMovie(movie, setPostStatus);
  }

  const resolvedContent =
    movies.data.length === 0 ? (
      <H2>Sorry, no movies found :(</H2>
    ) : (
      movies.data.map(movie => (
        <Element key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.openingText}</p>
          <Delete type="button" onClick={() => deleteMovieHandler(movie.id)}>
            X
          </Delete>
        </Element>
      ))
    );

  function renderContent() {
    switch (movies.status) {
      case status.pending:
        return <H2>Loading...</H2>;
      case status.resolved:
        return resolvedContent;
      case status.rejected:
        return <H2>Sorry, I think resource API is dead : (</H2>;
      default:
        return <Element />;
    }
  }

  return (
    <Container>
      <Header>
        <h1>Movies</h1>
      </Header>
      <ButtonContainer>
        <button type="button" onClick={fetchMovies}>
          Click to fetch movies
        </button>
        <button type="button" onClick={showAddMovieForm}>
          Click to add movie
        </button>
      </ButtonContainer>
      <ContentBox>
        {addMovieVisible ? (
          <AddMovieForm
            postStatus={postStatus}
            postMovieHandler={postMovieHandler}
          />
        ) : (
          renderContent()
        )}
      </ContentBox>
      <Footer>
        <a href="https://github.com/ikurowski">ikurowski</a>
      </Footer>
    </Container>
  );
}

export default App;

const flexCenter = `
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: grid;
  height: 100vh;
  background-color: #041000;
  color: white;
  grid-template-rows: 0.2fr 0.4fr 1fr 0.03fr;
  grid-template-areas:
    'nav nav nav'
    'button button button'
    'content content content'
    'footer footer footer';
  text-align: center;
`;

const Header = styled.header`
  ${flexCenter}
  background: #3a3a55;
  grid-area: nav;
  padding: 0.25rem;
  & h1 {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const ButtonContainer = styled.div`
  ${flexCenter}
  background: #1f2128;
  grid-area: button;
  gap: 2rem;

  & button {
    flex: 1;
    max-width: 250px;
    background-color: #54c471;
    border: none;
    color: #fff;
    padding: 1rem 2rem;
    font-size: 1rem;
    margin: 4px 2px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: scale(1);
    &:hover {
      background-color: #3cb371;
      transform: scale(1.1);
    }
    &:active {
      background-color: #47d285;
      transform: scale(1);
    }
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: content;
  background: #3a3a55;
  overflow-y: auto;
  overflow-wrap: break-word;
`;

const Element = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 0 1.25rem;
  &:not(:last-child) {
    border-bottom: 1px solid #ffffff98;
  }

  & p {
    padding-bottom: 2rem;
    font-size: 1rem;
    font-weight: 400;
    text-align: left;
  }

  h2 {
    padding: 1rem 0;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const Footer = styled.footer`
  ${flexCenter}
  background: #101010;
  grid-area: footer;
  padding: 0.25rem;

  & a {
    color: #ffffff40;
    text-decoration: none;
  }
`;

const H2 = styled.h2`
  ${flexCenter}
  background: #3a3a55;
  height: 100%;
  font-size: 1.4rem;
`;

const Delete = styled.button`
  position: absolute;
  top: 5px;
  right: 0;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: #ffffff73;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: scale(1);
  &:hover {
    transform: scale(1.3);
  }
  &:active {
    transform: scale(0.9);
  }
`;
