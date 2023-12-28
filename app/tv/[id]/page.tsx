"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { findById } from "@utils/requests";
import { useParams } from "next/navigation";

type TvPageProps = {

    id: number;
    original_name: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    number_of_seasons: number;
    number_of_episodes: number;
    genres: { id: number; name: string }[];

};

const MoviePage = () => {
  const params = useParams<any>(); 
const qid = parseInt(params.id.toString());
  const [show, setShow] = useState<TvPageProps>({} as TvPageProps);

  useEffect(() => {
    findById(qid, "tv")
      .then((res: TvPageProps) => {
        setShow(res);
      })
      .catch((err: Error) => console.error("error:" + err));
  }, [qid]);

  const {
    id,
    original_name,
    overview,
    poster_path,
    vote_average,
    genres,
    number_of_seasons,
    number_of_episodes,
  } = show;

  return (
    <div className="movie-card mt-20 bg-gray-800 rounded-lg shadow-lg p-8 text-gray-300">
      <div className="lg:flex">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={original_name}
          className="max-w-xs rounded-lg mr-8"
        />
        <div>
          <h1 className=" text-2xl mt-2 md:text-4xl sm:font-bold font-bold playfair-display mb-4 text-teal-400">
            {original_name}
          </h1>
          <p className="mb-4 text-gray-300">{overview}</p>
          <div className="flex mb-4">
            <span className="mr-4 text-gray-200">
              Genre: {genres?.map((genre) => genre.name).join(", ")}
            </span>
          </div>
          <div className="flex mb-4">
            <span className="mr-4 text-gray-200 font-medium">
              Seasons: {number_of_seasons}
            </span>
            <span className="mr-4 text-gray-200 font-medium">
              Episodes: {number_of_episodes}
            </span>
          </div>

          <div className="flex items-center mb-4">
            <span className="text-gray-200 font-medium">Rating:</span>
            <span className="text-gray-300 p-2"> ⭐️ {vote_average}</span>
          </div>
          <div className="p-5 flex space-x-4 text-xs sm:text-base">
            <Link
              href={`/TvPlayer?id=${id}&name=${original_name}`}
              passHref
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 text-indigo-200 border-indigo-600 border-2 rounded-xl hover:border-indigo-900"
            >
              ▶️ Watch Now
            </Link>
            <Link
              href={`/TvPlayerTwo?id=${id}&name=${original_name}`}
              passHref
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 text-indigo-200 border-indigo-600 border-2 rounded-xl hover:border-indigo-900"
            >
              ▶️ Watch Now{" "}
              <span className="ml-2 text-xs text-green-700 mb-4 ">
                SERVER 2
              </span>
            </Link>
            <Link
              href={"/player"}
              className="ml-2 px-4 py-2 text-indigo-200 border-indigo-600 border-2 rounded-xl hover:border-indigo-900"
            >
              🏷️ Watch Later
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;