'use strict'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import SmoothScroll from 'smooth-scroll'
import katex from 'katex'
import TableOfContents from './TableOfContents'

import './scss/style.scss'
import 'katex/dist/katex.min.css'

const navHeight = 60

const scroll = new SmoothScroll('a[href*="#"]', {
	offset: anchor =>
		parseInt(
			document.defaultView.getComputedStyle(anchor).marginTop.replace('px', '')
		) + navHeight
})

document.addEventListener('scrollStop', () => {
	document.body.classList.remove('show-menu')
})

const toc = document.querySelector('.table-of-contents')
const isDocumentation = document.querySelector('.table-of-contents__title')

let tableOfContents = null

if (toc && isDocumentation) {
	tableOfContents = new TableOfContents({
		headers: [].slice.call(
			document.querySelectorAll('section.post-content h2')
		),
		items: document.querySelectorAll('.table-of-contents__item--sub'),
		sub: true
	})
} else if (toc) {
	tableOfContents = new TableOfContents({
		headers: [].slice.call(
			document.querySelectorAll(
				'section.post-content h2, section.post-content h3'
			)
		),
		items: document.querySelectorAll('.table-of-contents__item')
	})
}

if (tableOfContents) {
	const { hash } = window.location

	if (hash) {
		scroll.animateScroll(document.getElementById(hash.slice(1)))
	}

	window.addEventListener('scroll', () => {
		tableOfContents.manage()
	})
}

const menuButton = document.querySelector('.sp-header__button')
const closeArea = document.querySelector('.sp-close-area')

const toggleMenu = e => {
	e.stopPropagation()
	document.body.classList.toggle('show-menu')
}

menuButton.addEventListener('click', toggleMenu)
closeArea.addEventListener('click', toggleMenu)

let ticking = false
window.addEventListener('scroll', () => {
	if (window.innerWidth < 932 || !toc || ticking) return

	ticking = true
	const footerRect = document
		.querySelector('.global-footer')
		.getBoundingClientRect()

	const bottom =
		footerRect.y < window.innerHeight
			? window.innerHeight - footerRect.y + 'px'
			: ''

	window.requestAnimationFrame(() => {
		toc.style.bottom = bottom
		ticking = false
	})
})

// render math equations
Array.from(document.querySelectorAll('.tex'), element => {
	katex.render(element.getAttribute('data-expr'), element)
})