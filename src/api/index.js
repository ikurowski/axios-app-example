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
    const response = await axios.get('https://swapi.dev/api/films/');
    const transformedData = response.data.results.map(movieData => ({
      id: movieData.episode_id,
      title: movieData.title,
      openingCrawl: movieData.opening_crawl,
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
    console.error(error);
  }
}

// check me
export async function postMovies({ movie, setMovies }) {
  setMovies({
    status: status.pending,
    data: [],
  });
  try {
    const response = await axios.post('https://swapi.dev/api/films/', movie);
    const transformedData = response.data.results.map(movieData => ({
      id: movieData.episode_id,
      title: movieData.title,
      openingCrawl: movieData.opening_crawl,
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
    console.error(error);
  }
}
