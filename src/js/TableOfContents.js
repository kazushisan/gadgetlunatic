const navHeight = 60

class TableOfContents {
	constructor({ headers, items, sub }) {
		this.headers = headers
		this.items = items
		this.ticking = false
		this.currentIndex = 0
		this.className = sub
			? 'table-of-contents__link--sub-on'
			: 'table-of-contents__link--on'

		this.positions = headers.map(header => {
			const id = header.getAttribute('id')
			const { innerHTML } = header
			const marginTop = document.defaultView
				.getComputedStyle(header)
				.marginTop.replace('px', '')

			const { top } = header.getBoundingClientRect()

			header.id = encodeURI(header.id).toLowerCase()

			// add a link to each header
			header.innerHTML = `<a href="#${id}">${innerHTML}</a>`

			return window.scrollY + top - marginTop - navHeight
		})

		this.positionsReversed = [...this.positions].reverse()
	}

	async manage() {
		if (!this.ticking) {
			this.ticking = true
			await this.requestAnimation()
			this.ticking = false
		}
	}

	async requestAnimation() {
		return new Promise(resolve => {
			const self = this
			window.requestAnimationFrame(() => {
				self.change()
				resolve()
			})
		})
	}

	change() {
		const length = this.positions.length
		const index =
			length -
			1 -
			this.positionsReversed.findIndex(item => item <= window.scrollY)

		if (index === this.currentIndex) {
			return
		}

		this.items.forEach((item, i) => {
			if (index === i) {
				this.items[index].firstElementChild.classList.add(this.className)

				return
			}
			item.firstElementChild.classList.remove(this.className)
		})

		this.currentIndex = index
	}
}

export default TableOfContents
