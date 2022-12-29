import React, { useState } from 'react';
import styled from 'styled-components';
import { getMovies, status } from './api';

function App() {
  const [movies, setMovies] = useState({
    status: null,
    data: [],
  });

  function renderContent() {
    switch (movies.status) {
      case status.pending:
        return <H2>Loading...</H2>;
      case status.resolved:
        return movies.data.map(movie => (
          <Element key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.openingCrawl}</p>
          </Element>
        ));
      case status.rejected:
        return <H2>Sorry, I think resource API is dead : (</H2>;
      default:
        return <Element />;
    }
  }

  return (
    <Container>
      <Header>
        <h1>Star Wars Movies</h1>
      </Header>
      <ButtonContainer>
        <button type="button" onClick={() => getMovies(setMovies)}>
          Click to fetch movies
        </button>
      </ButtonContainer>
      <ContentBox>{renderContent()}</ContentBox>
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

  & button {
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
  overflow: auto;
`;

const Element = styled.div`
  display: flex;
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
    color: #fff;
    text-decoration: none;
  }
`;

const H2 = styled.h2`
  ${flexCenter}
  background: #3a3a55;
  height: 100%;
  font-size: 1.4rem;
`;
