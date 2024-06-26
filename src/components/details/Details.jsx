import { Link, useParams } from "react-router-dom"
import "./Details.css"
import { useEffect, useState } from "react"
import backButton from "../../assets/left-arrows-white.png"
import { GenreList } from "../genreList/GenreList"

export const Details = () => {
  const movie = useParams()
  const [results, setResults] = useState()
  const API_KEY = import.meta.env.VITE_DBAPI_KEY
  const API_LANG = "en-US"
  const POSTER_URL = "https://image.tmdb.org/t/p"

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.slug}?api_key=${API_KEY}&language=${API_LANG}`
        )
        if (!response.ok) {
          throw Error("Something wrong with the fetch")
        }
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error("Error", error)
        setResults([])
      }
    }

    fetchDetails()
  }, [])

  return (
    <>
      {results && (
        <section
          className="details-container"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0) 20%, rgb(0, 0, 0) 100%), url(${POSTER_URL}/original${results.backdrop_path}) center/cover no-repeat`,
          }}>
          <div className="details">
            <div className="back-btn-wrapper">
              <Link to={"/"}>
                <img
                  className="back-button"
                  src={backButton}
                  alt="white arrow button pointing left"
                />
              </Link>
            </div>
            <img
              className="poster"
              src={`${POSTER_URL}/w500${results.poster_path}`}
              alt={results.title}
            />
            <div className="summary">
              <h1 className="title">{results.title}</h1>
              <div className="rank-time-container">
                <p className="ranking">
                  {Math.round(results.vote_average * 100) / 100}
                </p>
                <p className="runtime">{results.runtime} minutes</p>
              </div>
              <p className="desc">{results.overview}</p>
              <div className="genre-container">
                <GenreList
                  genreArray={results.genres}
                  n={false}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
