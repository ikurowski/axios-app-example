import React from 'react';
import styled from 'styled-components';

function App() {
  return (
    <Container>
      <NavBar>NavBar</NavBar>
      <Main>Main</Main>
      <ContentBox>
        <Content1>Content1</Content1>
        <Content2>Content2</Content2>
        <Content3>Content3</Content3>
      </ContentBox>
      <Footer>Footer</Footer>
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

  grid-template-rows: 0.2fr 1fr 0.5fr 0.1fr;
  grid-template-areas:
    'nav nav nav'
    'main main main'
    'content content content'
    'footer footer footer';
  text-align: center;
`;

const NavBar = styled.nav`
  background: #3a3a55;
  grid-area: nav;
  padding: 0.25rem;
  ${flexCenter}
`;
const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1f2128;
  color: white;
  grid-area: main;
  padding: 0.25rem;
`;

const ContentBox = styled.div`
  display: flex;
  align-items: center;
  grid-area: content;
  justify-content: center;
`;
const Content1 = styled.div`
  ${flexCenter}
  background: #a6b8b9;
  padding: 0.25rem;
  width: 100%;
  height: 100%;
`;
const Content2 = styled(Content1)``;
const Content3 = styled(Content1)``;
const Footer = styled.footer`
  ${flexCenter}
  background: #ff9637;
  grid-area: footer;
  padding: 0.25rem;
`;
