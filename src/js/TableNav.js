'use strict'

class TableNav {
	constructor(object){
		if(!(typeof object === "object" && object.element && object.li_list && object.headers_list)) throw 'invalid argument'
		this.ticking = false
		this.navHeight = 61
		this.element = object.element
		this.li_list = object.li_list
		this.headers = {
			position: [],
			position_reverse: [],
			list: object.headers_list
		}

		this.headers.list.forEach(header => {
			const id = header.getAttribute("id")
			const innerHTML = header.innerHTML
			const marginTop = document.defaultView.getComputedStyle(header).marginTop.replace('px', '')
			this.headers.position.push
			(header.getBoundingClientRect().top + window.scrollY - marginTop - this.navHeight)
			header.innerHTML = `<a href="#${id}">${innerHTML}</a>`
		})

		this.headers.position_reverse = this.headers.position.reverse()
	}
	async manage(){
		if(!this.ticking){
			this.ticking = true
			this.ticking = await this.requestAnimation()
		}
	}
	requestAnimation(){
		return new Promise((resolve, reject) => {
			const self = this
			window.requestAnimationFrame(function(){
				self.change()
				resolve(false)
			})
		})
	}
	change(){
		if(!this.element) return

		const index = this.headers.position.length - 1 - this.headers.position_reverse.findIndex(item => item <= window.scrollY)	
		if(this.li_list[index] && this.li_list[index].classList.contains("on")) return
	
		for(const li of this.li_list){
			li.firstChild.classList.remove("on")
		}
	
		if(0 <= index && index < this.li_list.length){
			this.li_list[index].firstChild.classList.add("on")
		}
	}
}

export default TableNav
