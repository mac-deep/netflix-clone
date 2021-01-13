import React from "react";
import Row from "./Row/Row";
import requests from "../../request";
import Banner from "../Banner/Banner";

function Home() {
  return (
    <div>
      <Banner />
      <Row title="TRENDING Now" fetchUrl={requests.fetchTrending} />
      <Row title="ACTION Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="COMEDY Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="ROMANCE movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="HORROR Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Documentraries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default Home;
