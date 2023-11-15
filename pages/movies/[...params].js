import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { useRouter } from "next/router";

export default function Detail({ params }) {
    const router = useRouter();
    const [title, id] = params || [];

    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState();
    useEffect(() => {
        (async () => {
            const { results } = await (await fetch(`/api/movies`)).json();
            setMovies(results);
        })();
    }, []);

    useEffect(() => {
        const getMovie = async () => {
            const pickMovie = await movies.filter(movie => movie.id == id);
            setMovie(pickMovie);
        }
        getMovie();
        console.log(movie);
    }, [id, movies]);





    return (
        <>
            <div>
                <Seo title={title} />
                <h4>{title}</h4>
                {movie && movie.length > 0 ?
                    <div className="movie_info">
                        <img src={`https://image.tmdb.org/t/p/w500/${movie[0].poster_path}`} />
                        <div>
                            <h5>개봉일</h5>
                            <p>{movie[0].release_date}</p>
                        </div>
                        <div>
                            <h5>줄거리</h5>
                            <p>{movie[0].overview}</p>
                        </div>
                        <div>
                            <h5>평점</h5>
                            <p>{movie[0].vote_average}</p>
                        </div>
                    </div>
                    :
                    <span>:Loading...</span>
                }

            </div>
            <style jsx>{`
                h4{
                    font-size:32px;
                    margin:20px 0;
                }
                .movie_info{
                    border: 2px solid #c0c0c0;
                    border-radius: 20px;
                    padding: 30px;
                    box-sizing: border-box;
                    background: rgba(245,245,220,0.3);
                }
                .movie_info>img{
                    display: block;
                    width: 300px;
                    height:500px;
                    margin-bottom: 20px;
                }

                h5{
                    font-size:16px;
                    margin: 5px 0;
                }
                p{
                    font-size: 12px;
                }

        `}
            </style>
        </>
    );
}

export function getServerSideProps({ params: { params } }) {
    return {
        props: {
            params,
        },
    };
}