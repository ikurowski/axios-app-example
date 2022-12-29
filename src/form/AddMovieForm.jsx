import React, { useRef } from 'react';
import styled from 'styled-components';
import { status } from '../api';

export default function AddMovieForm({ postStatus, postMovieHandler }) {
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    postMovieHandler(movie);
  }
  function renderContent() {
    switch (postStatus.status) {
      case status.pending:
        return <H2>Sending...</H2>;
      case status.resolved:
        return <H2>Movie added!</H2>;
      case status.rejected:
        return <H2>Something went wrong : ( </H2>;
      default:
        return (
          <Form onSubmit={submitHandler}>
            <label htmlFor="title">
              Title
              <input
                minLength="2"
                maxLength="50"
                required
                type="text"
                id="title"
                ref={titleRef}
              />
            </label>
            <label htmlFor="opening-text">
              Opening Text
              <textarea
                minLength="20"
                maxLength="1000"
                required
                rows="5"
                id="opening-text"
                ref={openingTextRef}
              />
            </label>

            <label htmlFor="date">
              Release Date
              <input required type="date" id="date" ref={releaseDateRef} />
            </label>

            <Button type="submit">Add Movie</Button>
          </Form>
        );
    }
  }

  return renderContent();
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 2rem;
  margin: 0 auto;

  & input,
  textarea {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }

  & label {
    display: flex;
    flex-direction: column;
  }
`;

export const Button = styled.button`
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
`;

const H2 = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3a3a55;
  height: 100%;
  font-size: 1.4rem;
`;
