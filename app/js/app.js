// // Import jQuery module (npm i jquery)
import $ from 'jquery'
window.jQuery = $
window.$ = $

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

// Import Swiper slider bundle
import SwiperCore, { Navigation, Pagination, EffectFade, Autoplay, Swiper } from 'swiper/core'
SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay])

// Import Popper.js
import { createPopper } from '@popperjs/core'

// Import vendor jQuery plugin example (not module)
require('../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js') // Popper lib
require('../../node_modules/jquery-mask-plugin/dist/jquery.mask.min.js') // jQuery Mask input

document.addEventListener('DOMContentLoaded', () => {
	/**
	 * jQuery input mask
	 */
	$('input[type="tel"]').mask('+38 099 999 99 99').attr('autocomplete', 'off')


	/**
	 * Smooth scroll
	 */
	$('a[data-anchor]').bind('click.smoothscroll', function(){
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

	if(window.matchMedia('(max-width: 767.98px)').matches) {
		popperInstance.setOptions({
			placement: 'bottom',
			modifiers: [{ name: 'eventListeners', enabled: false }],
		})
	}

	map.addEventListener('mousemove', (e) => {
		const mouseX = e.clientX
		const mouseY = e.clientY

		virtualElement.getBoundingClientRect = generateGetBoundingClientRect(mouseX, mouseY)

		// Show the tooltip
		if( e.target.getAttribute('data-region') != null ) {
			tooltip.setAttribute('data-show', '')
			tooltip.querySelector('.tooltip-title').textContent = e.target.getAttribute('data-region')
			tooltip.querySelector('.tooltip-info .farmers-count').textContent = e.target.getAttribute('data-farmers')
			tooltip.querySelector('.tooltip-info .farmers-area > em').textContent = e.target.getAttribute('data-farmers-area')
			tooltip.querySelector('.tooltip-info .procurers-count').textContent = e.target.getAttribute('data-procurers')
		} else {
			tooltip.removeAttribute('data-show');
		}

		// Update position
		popperInstance.update()
	})

	map.addEventListener('mouseleave', () => {
		// Hide the tooltip
		tooltip.removeAttribute('data-show');

		// Disable the event listeners
		popperInstance.setOptions({
			modifiers: [{ name: 'eventListeners', enabled: false }],
		})
	})

})