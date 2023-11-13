import Seo from '@/components/Seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
export default function Home() {


  const [movies, setMovies] = useState();


  useEffect(() => {
    (async () => {
      const { results } = await (await fetch(`/api/movies`)).json();
      setMovies(results);
    })();
  }, [])

  const router = useRouter();
  const onClick = (id, title, img) => {
    router.push(
      `/movies/${title}/${id}`
    );
  }

  return (
    <div className="container">
      <Seo title="Home" />

      {!movies && <h4>Loading...</h4>}

      {movies?.map((movie) => (

        <div
          className="movie"
          key={movie.id}
          onClick={() => onClick(movie.id, movie.original_title, movie.poster_path)}
        >

          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />

          <Link href={`/movies/${movie.original_title}/${movie.id}`}
            as={`/movies/${movie.original_title}`}
            legacyBehavior>

            <a>{movie.original_title}</a>

          </Link>

        </div>

      ))
      }
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie{
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie a{
          font-size: 18px;
          text-align: center;
          color:#000;
          text-decoration: none;
        }
       

      `}</style>
    </div >
  );
}
