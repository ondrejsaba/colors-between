import { createStore } from 'vuex'

export default createStore({
 	state: {
  		colors: [],
  		colorCount: 5
  	},
  	mutations: {
  		setDefaultColors(state, payload) {
  			const Color = require('color')

  			state.colors = payload.map((color, index) => {

  				return {
  					hex: color,
  					rgb: Color(color).rgb().color,
  					id: index
  				}
  			})
  		},
  		generateColorsInbetween(state) {
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
  		}
  	},
  	getters: {
  		colorsList(state) {
  			return state.colors
  		},
  		colorCount(state) {
  			return state.colorCount
  		},
  		firstColor(state) {
  			return state.colors[0]
  		},
  		lastColor(state) {
  			return state.colors[state.colors.length-1]
  		}
  	},
  	actions: {
  	},
  	modules: {
  	}
})
