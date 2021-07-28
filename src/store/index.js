import { createStore } from 'vuex'

export default createStore({
 	state: {
  		colors: [],
  		colorCount: 5
  	},
  	mutations: {
  		setDefaultColors: (state, payload) => {
  			const Color = require('color')

  			state.colors = payload.map((color, index) => {
  				return {
  					hex: color,
  					rgb: Color(color).rgb().color
  				}
  			})
  		},
  		generateColorsInbetween: (state) => {
  			const Color = require('color')

  			const endpoints = {
  				first: state.colors[0],
  				last: state.colors[state.colors.length-1]
  			}

  			const differences = [...Array(3).keys()].map(index => {
  				return Math.abs(endpoints.first.rgb[index]-endpoints.last.rgb[index])
  			})

  			const percentage_step = 1/(state.colorCount-1)

  			const colorsInbetween = [...Array(state.colorCount-2).keys()].map(index => {
  				return {
  					rgb: [...Array(3).keys()].map(shadeIndex => {
  						const step = (differences[shadeIndex] * (percentage_step * (index+1)))

  						if (endpoints.last.rgb[shadeIndex] > endpoints.first.rgb[shadeIndex]) {
  							return endpoints.first.rgb[shadeIndex] + step
  						} else {
  							return endpoints.first.rgb[shadeIndex] - step
  						}
  					})
  				}
  			}).map(color => {
  				return {
  					rgb: color.rgb,
  					hex: Color.rgb(color.rgb).hex()
  				}
  			})

  			state.colors = [state.colors[0], ...colorsInbetween, state.colors[state.colors.length-1]]

  			// assign id to every color
  			state.colors = state.colors.map((color, index) => {
  				return {
  					...color,
  					id: index
  				}
  			})
  		},
  		setColorAtPosition: (state, payload) => {
  			const Color = require('color')
  			const {position, value} = payload

  			state.colors[position] = {
  				hex: value,
  				rgb: Color(value).rgb().color,
  				id: position
  			}
  		}
  	},
  	getters: {
  		generateColor() {
      		const hexKeys = [...Array(10).keys(), "A", "B", "C", "D", "E", "F"]

      		return '#' + [...Array(6).keys()].map(() => hexKeys[Math.floor(Math.random() * hexKeys.length)]).join("")
    	},
  		colorsList: (state) => {
  			return state.colors
  		},
  		colorCount: (state) => {
  			return state.colorCount
  		},
  		firstColor: (state) => {
  			return state.colors[0]
  		},
  		lastColor: (state) => {
  			return state.colors[state.colors.length-1]
  		}
  	},
  	actions: {
  		setDefaultColors: (context) => {
  			const Color = require('color')

  			let generatedColors = []
  			for (let i = 0; i < 2; i++) {
  				generatedColors.push(context.getters.generateColor)
  			}

  			context.commit('setDefaultColors', generatedColors)
  			context.commit('generateColorsInbetween')
  		},
  		addColor: (context) => {
  			if (context.state.colorCount < 12) {
  				context.state.colorCount += 1
  				context.commit('generateColorsInbetween')
  			}
  		},
  		removeColor: (context) => {
  			if (context.state.colorCount > 3) {
  				context.state.colorCount -= 1
  				context.commit('generateColorsInbetween')
  			}
  		},
  		shuffleColors: (context) => {
  			const Color = require('color')

  			context.state.colors = [...Array(2).keys()].map(() => {
  				return {
  					hex: context.getters.generateColor
  				}
  			}).map(color => {
  				return {
  					...color,
  					rgb: Color(color.hex).rgb().color
  				}
  			})

  			context.commit('generateColorsInbetween')
  		}
  	}
})
