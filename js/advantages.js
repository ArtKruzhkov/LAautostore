$(document).ready(function () {
  $('.client-gallery').owlCarousel({
    loop: true,
    margin: 24,
    nav: true,
    dots: false,
    autoplay: false,
    responsive: {
      0: { items: 1 },
      640: { items: 2 },
      1024: { items: 3 },
      1280: { items: 4 },
    },
  });
});
