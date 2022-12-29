import axios from 'axios';

export const status = {
  rejected: 0,
  resolved: 1,
  pending: 2,
};

export async function getMovies(setMovies) {
  setMovies({
    status: status.pending,
    data: [],
  });
  try {
    const response = await axios.get(
      'https://axios-app-126c4-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
    );

    if (!response.data) {
      setMovies({
        status: status.resolved,
        data: [],
      });
      return;
    }
    const transformedData = Object.keys(response.data).map(movieId => ({
      id: movieId,
      title: response.data[movieId].title,
      openingText: response.data[movieId].openingText,
      releaseDate: response.data[movieId].releaseDate,
    }));

    setMovies({
      status: status.resolved,
      data: transformedData,
    });
  } catch (error) {
    setMovies({
      status: status.rejected,
      data: [],
    });
  }
}

export async function postMovie(movie, setPostStatus) {
  try {
    await axios.post(
      'https://axios-app-126c4-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
      movie,
    );
    setPostStatus({
      status: status.resolved,
    });
  } catch (error) {
    setPostStatus({
      status: status.rejected,
    });
  }
}

export async function deleteMovie(movieId, setDeleteStatus) {
  try {
    await axios.delete(
      `https://axios-app-126c4-default-rtdb.europe-west1.firebasedatabase.app/movies/${movieId}.json`,
    );
    setDeleteStatus({
      status: status.resolved,
    });
  } catch (error) {
    setDeleteStatus({
      status: status.rejected,
    });
  }
}
