// // Import jQuery module (npm i jquery)
// import $ from 'jquery'
// window.jQuery = $
// window.$ = $

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

// Import Swiper slider bundle
import SwiperCore, { Navigation, Pagination, EffectFade, Autoplay, Swiper } from 'swiper/core'
SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay])

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

})