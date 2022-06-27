$(document).ready(function () {
  $('.carousel__inner').slick({
    speed: 1000,
    adaptiveHeight: false,
    prevArrow:
      '<button type"button" class="prev"><img src="icons/arrow_left.png"></button>',
    nextArrow:
      '<button type"button" class="next"><img src="icons/arrow_right.png"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  });

  $('ul.catalog__tabs').on(
    'click',
    'li:not(.catalog__tab_active)',
    function () {
      $(this)
        .addClass('catalog__tab_active')
        .siblings()
        .removeClass('catalog__tab_active')
        .closest('div.container')
        .find('div.catalog__content')
        .removeClass('catalog__content_active')
        .eq($(this).index())
        .addClass('catalog__content_active');
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content')
          .eq(i)
          .toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  }

  toggleSlide(`.catalog-item__link`);
  toggleSlide(`.catalog-item__back`);

  //Modal

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
  });

  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: 'required',
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: 'Пожалуйста, введите свое имя',
          minlength: jQuery.validator.format('Введите {0} символа'),
        },
        phone: 'Пожалуйста, введите свой номер телефона',
        email: {
          required: 'Пожалуйта, введите свою почту',
          email: 'Неверный формат адреса почты',
        },
      },
    });
  }

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  $('input[name=phone]').mask('+7 (999) 999-99-99');

  $('form').submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize(),
    }).done(function () {
      $(this).find('input').val('');

      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn();

      $('form').trigger('reset');
    });

    return false;
  });

  // Smooth scroll and pageup
  const targetSection = document.querySelector('.feed');

  const obsCallback = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });
  };

  const obsOptions = {
    root: null,
    threshold: 0.1,
  };
  const observer = new IntersectionObserver(obsCallback, obsOptions);
  observer.observe(targetSection);

  $("a[href='#up']").click(function () {
    const _href = $(this).attr('href');
    $('html, body').animate({ scrollTop: $(_href).offset().top + 'px' });
    return false;
  });

  new WOW().init();
});
