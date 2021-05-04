// // Import jQuery module (npm i jquery)
import $ from 'jquery'
window.jQuery = $
window.$ = $

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

// Import Swiper slider bundle
import SwiperCore, { Navigation, Pagination, EffectFade, Autoplay, Swiper } from 'swiper/core'
SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay])

// Import Bootstrap bundle
require('../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js') // Popper lib

document.addEventListener('DOMContentLoaded', () => {

	// Advantages slideshow slider
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

	// Testimonials slider
	new Swiper('.h-testimonials-slider .swiper-container', {
		slidesPerView: 2,
		spaceBetween: 40,
		navigation: {
			prevEl: '.h-testimonials-slider .swiper-button-prev',
			nextEl: '.h-testimonials-slider .swiper-button-next'
		},
	})

})