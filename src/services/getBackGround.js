const getBackGround = (url) => {
  return {
    backgroundImage: `var(--liner-gradient), url(https://image.tmdb.org/t/p/w500${url}.jpg)`,
    backgroundSize: "cover",
  };
};

export default getBackGround;
