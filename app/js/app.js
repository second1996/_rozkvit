// // Import jQuery module (npm i jquery)
import $ from 'jquery'
window.jQuery = $
window.$ = $

// Import vendor jQuery plugin example (not module)
require('../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js') // Bootstrap bundle
require('../../node_modules/jquery-mask-plugin/dist/jquery.mask.min.js') // jQuery Mask input
require('../../node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js') // Fancybox gallery

// Import Swiper slider bundle
import SwiperCore, { Navigation, Pagination, EffectFade, Autoplay, Swiper } from 'swiper/core'
SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay])

// Import Popper.js
import { createPopper } from '@popperjs/core'

// Import AOS library
import AOS from 'aos'

document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Preloader
	 */
	if( document.querySelector('#preloader') ) {
		function loadbar() {
			let overlay  = document.querySelector('#preloader'),
					status   = document.querySelector('#preloader-status'),
					img      = document.images,
					counter  = 0,
					total    = img.length;

			function imgLoaded() {
				counter += 1
				const percent = ((100/total*counter) << 0) + '%'

				status.innerHTML = percent

				if (counter === total) return doneLoading()
			}
			function doneLoading() {
				setTimeout(() => {
					overlay.setAttribute('data-aos', 'zoom-out')
				}, 600)
				setTimeout(() => {
					overlay.remove()
				}, 2000)
			}
			for(let i = 0; i < total; i++) {
				let tImg = new Image()

				tImg.onload  = imgLoaded
				tImg.onerror = imgLoaded
				tImg.src     = img[i].src
			}
		}
		loadbar()
	}


	/**
	 * Animate on scroll
	 */
	AOS.init({
		once: true,
		duration: 1000,
		disable: function () {
			var maxWidth = 1240;
			return window.innerWidth < maxWidth;
		}
	})


	/**
	 * jQuery input mask
	 */
	$('input[type="tel"]').mask('+38 (099) 999-99-99').attr('autocomplete', 'off')
	$('input[type="tel"]').on('change', function() {
		const maxLength = $(this).attr('maxlength'),
					submitBtn = $(this).parent('form').find('button[type="submit"]');

		if ($(this).val().length != maxLength) {
			submitBtn.attr('disabled', true)
			$(this).addClass('form-error')
			$(this).parent('form').find('.form-error-notice').addClass('_is-shown')
		} else {
			submitBtn.removeAttr('disabled')
			$(this).removeClass('form-error')
			$(this).parent('form').find('.form-error-notice').removeClass('_is-shown')
		}
	})


	/**
	 * Fancybox config
	 */
	$.fancybox.defaults.buttons = ['zoom', 'thumbs', 'close'];


	/**
	 * Smooth scroll
	 */
	$('a[data-anchor]').bind('click.smoothscroll', function() {
		const headerHeight = $('.header').outerHeight() - 1
		const target = $(this).attr('href')
		const bl_top = $(target).offset().top - headerHeight

		$('body, html').animate({scrollTop: bl_top}, 1000)

		return false
	})


	/**
	 * Sticky header
	 */
	const heroesHeight = $('.h-heroes').outerHeight() || 500

	$(window).on('scroll load', function() {
		if ($(window).scrollTop() > heroesHeight) {
			$('.header').addClass('_is-sticky')
		} else {
			$('.header').removeClass('_is-sticky')
		}
	})


	/**
	 * Mobile menu
	 */
	$('.header-burger .burger-btn').on('click', function() {
		$(this).toggleClass('_is-toggled')
		$('.m-menu').toggleClass('_is-shown')
		$('.m-menu-navigation nav a, .m-menu-links a').on('click', function() {
			$('.header-burger .burger-btn').removeClass('_is-toggled')
			$('.m-menu').removeClass('_is-shown')
		})
	})


	/**
	 * Advantages slideshow slider
	 */
	new Swiper('.h-advantages-slider .swiper-container', {
		slidesPerView: 1,
		autoplay: {
			delay: 3000
		},
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		navigation: {
			prevEl: '.h-advantages-slider .swiper-button-prev',
			nextEl: '.h-advantages-slider .swiper-button-next'
		},
	})


	/**
	 * Testimonials slider
	 */
	new Swiper('.h-testimonials-slider .swiper-container', {
		slidesPerView: 1,
		spaceBetween: 40,
		navigation: {
			prevEl: '.h-testimonials-slider .swiper-button-prev',
			nextEl: '.h-testimonials-slider .swiper-button-next'
		},
		breakpoints: {
			992: {
				slidesPerView: 2,
			}
		}
	})


	/**
	 * Genplan Tooltip
	 */
	if( document.querySelector('#h-map') ) {
		const map = document.querySelector('#ukraine-map .regions')
		const tooltip = document.querySelector('#tooltip')

		function generateGetBoundingClientRect(x = 0, y = 0) {
			return () => ({
				width: 0,
				height: 0,
				top: y,
				right: x,
				bottom: y,
				left: x,
			})
		}

		const virtualElement = {
			getBoundingClientRect: generateGetBoundingClientRect(),
		}

		const popperInstance = createPopper(virtualElement, tooltip, {
			placement: 'right',
		})

		if (window.matchMedia('(max-width: 767.98px)').matches) {
			popperInstance.setOptions({
				placement: 'bottom',
				modifiers: [{ name: 'eventListeners', enabled: false }],
			})
		}

		map.addEventListener('mousemove', (e) => {
			const mouseX = e.clientX
			const mouseY = e.clientY

			const ttTitle = tooltip.querySelector('.tooltip-title')
			const ttFarmers = tooltip.querySelector('.tooltip-info .farmers-count')
			const ttFarmersArea = tooltip.querySelector('.tooltip-info .farmers-area > em')
			const ttProcurers = tooltip.querySelector('.tooltip-info .procurers-count')

			virtualElement.getBoundingClientRect = generateGetBoundingClientRect(mouseX, mouseY)

			// Show the tooltip
			if (e.target.getAttribute('data-region') != null) {

				if (map.querySelector('[data-show-mobile]')) {
					map.querySelector('[data-show-mobile]').removeAttribute('data-show-mobile')
				}

				tooltip.setAttribute('data-show', '')
				ttTitle.textContent = e.target.getAttribute('data-region')
				ttFarmers.textContent = e.target.getAttribute('data-farmers')
				ttFarmersArea.textContent = e.target.getAttribute('data-farmers-area')
				ttProcurers.textContent = e.target.getAttribute('data-procurers')
			} else {
				tooltip.removeAttribute('data-show')
			}

			// Update tooltip position
			popperInstance.update()
		})

		map.addEventListener('mouseleave', () => {
			// Hide the tooltip
			tooltip.removeAttribute('data-show')

			// Disable the event listeners
			popperInstance.setOptions({
				modifiers: [{ name: 'eventListeners', enabled: false }],
			})
		})
	}

})