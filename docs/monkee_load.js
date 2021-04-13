// Generated by Haxe 4.1.5
(function ($global) { "use strict";
class MonkeeLoad {
	constructor() {
		this.timeEnd = .0;
		this.timeStart = .0;
		this.loadingId = 0;
		this.loadingArr = [];
		this.dataAtr = "data-load";
		this.req = new XMLHttpRequest();
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("🐵 [MonkeeLoad] template loading");
			_gthis.init();
		});
	}
	init() {
		let arr = window.document.querySelectorAll("[" + this.dataAtr + "]");
		let _g = 0;
		let _g1 = arr.length;
		while(_g < _g1) {
			let i = _g++;
			let wrapper = arr[i];
			let url = wrapper.getAttribute(this.dataAtr);
			$global.console.log("templates url: " + url);
			this.loadingArr.push({ el : wrapper, url : url});
		}
		this.timeStart = new Date().getTime();
		this.startLoading(this.loadingId);
	}
	getCurrentTime() {
		this.timeEnd = new Date().getTime();
		$global.console.log(this.timeEnd - this.timeStart + "ms");
	}
	startLoading(nr) {
		if(nr >= this.loadingArr.length) {
			return;
		}
		let obj = this.loadingArr[nr];
		$global.console.log("start loading: " + obj.url + " into element");
		this.loadHTML(obj.url,obj.el);
		this.loadingId++;
	}
	loadHTML(url,el) {
		let _gthis = this;
		this.req.open("GET",url);
		this.req.onload = function() {
			let body = _gthis.getBody(_gthis.req.response);
			if(body == "") {
				body = _gthis.req.response;
			}
			_gthis.processHTML(body,el);
			$global.console.log("- end loading and parsing url: " + url + " into element");
			_gthis.getCurrentTime();
			_gthis.startLoading(_gthis.loadingId);
		};
		this.req.onerror = function(error) {
			$global.console.error("[JS] error: " + error);
		};
		this.req.send();
	}
	getBody(html) {
		let test = html.toLowerCase();
		let x = test.indexOf("<body");
		if(x == -1) {
			return "";
		}
		x = test.indexOf(">",x);
		if(x == -1) {
			return "";
		}
		let y = test.lastIndexOf("</body>");
		if(y == -1) {
			y = test.lastIndexOf("</html>");
		}
		if(y == -1) {
			y = html.length;
		}
		return html.slice(x + 1,y);
	}
	processHTML(content,target) {
		target.outerHTML = content;
	}
	static main() {
		let app = new MonkeeLoad();
	}
}
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
MonkeeLoad.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);