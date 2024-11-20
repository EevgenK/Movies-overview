const getBackGround = (url) => {
  return {
    backgroundImage: `linear-gradient(to right, rgba(31.5, 10.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 10.5, 10.5, 0.84) 50%, rgba(31.5, 10.5, 10.5, 0.84) 100%), url(https://image.tmdb.org/t/p/w500${url}.jpg)`,
    backgroundSize: "cover",
  };
};

export default getBackGround;
