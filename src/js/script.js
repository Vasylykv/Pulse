// $(document).ready(function () {
//   $('.carousel__inner').slick({
//     speed: 1000,
//     adaptiveHeight: false,
//     prevArrow:
//       '<button type"button" class="slick-prev"><img src="icons/arrow_left.png"></button>',
//     nextArrow:
//       '<button type"button" class="slick-next"><img src="icons/arrow_right.png"></button>',
//     responsive: [
//       {
//         breakpoint: 992,
//         settings: {
//           dots: true,
//           arrows: false,
//         },
//       },
//     ],
//   });
// });

const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  nav: false,
});

document.querySelector('.prev').addEventListener('click', () => {
  slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', () => {
  slider.goTo('next');
});
