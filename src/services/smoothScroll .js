const smoothScroll = (element) => {
  if (element.current) {
    let cardHeight = element.current.firstChild.getBoundingClientRect().height;
    window.scrollBy({
      bottom: cardHeight * 2,
      behavior: "smooth",
    });
  }
};
export default smoothScroll;
