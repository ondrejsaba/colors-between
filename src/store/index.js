import { createStore } from 'vuex'
import Messages from '../json/messages.json'

export default createStore({
 	state: {
 		// color data
  		colors: [],
  		colorCount: 5,

  		// color picker
  		colorPicker: {
  			show: false,
  			input: "",
  			pickedColor: ""
  		},

  		// menu
  		showMenu: false,

		// dialog
		dialog: {
			show: false,
			width: 400,
			height: 200,
			component: null,

			title: {
				show: false,
				message: ""
			},
			error: false,

			data: null
		},

  		// localStorage options to vuex state
  		options: {
  			colorMode: "light",
  			language: "en",
			favourites: []
  		},

  		// messages loaded from a json config file
  		messages: Messages
  	},
  	mutations: {
  		// colors data manipulation
  		setDefaultColors: (state, payload) => {
  			const Color = require('color')

  			state.colors = payload.map(color => {
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
  		},
		setColorCount: (state, payload) => {
			const {count} = payload

			state.colorCount = count
		},

  		// color picker
  		setShowColorPicker: (state, payload) => {
  			if ('showInput' in payload) {
  				if ((['first', 'last'].includes(payload.showInput)
  					&& state.colorPicker.input == '')
  					|| payload.showInput == '') {
  					state.colorPicker = {
						  input: payload.showInput,
						  show: !state.colorPicker.show,
						  pickedColor: state.colors[payload.showInput == "first" ? 0 : state.colors.length-1].hex
					}
  				}
  			}

			if (state.dialog.show) {
				state.dialog.show = !state.dialog.show
			}
  		},

  		// menu
  		setShowMenu: (state) => {
  			state.showMenu = !state.showMenu
  			state.colorPicker = {
  				...state.colorPicker,
  				show: false,
  				input: ""
  			}
			
			if (state.dialog.show) {
				  state.dialog.show = !state.dialog.show
			}
  		},

		// dialog
		setShowDialog: (state) => {
			state.dialog.show = !state.dialog.show
		},
		setDialog: (state, payload) => {
			const {show, width, height, component, title, error, data} = payload

			state.dialog = {
				...state.dialog,
				show: show ? show : state.dialog.show,
				width: width ? width : state.dialog.width,
				height: height ? height : state.dialog.height,
				component: component ? component : state.dialog.component,
				title: title ? title : {
					show: false,
					message: ""
				},
				error: error ? error : false,
				data: data ? data : state.dialog.data
			}
		},

		// favourites
		savePalette: (state, payload) => {
			const {name} = payload

			let canSave = true
			const currentPalette = state.colors.map(color => color.hex)
			state.options.favourites.forEach(favourite => {
				if (favourite.name == name || JSON.stringify(favourite.colors) == JSON.stringify(currentPalette)) {
					canSave = false
				}
			})

			if (canSave) {
				state.options.favourites = [
					...state.options.favourites,
					{name: name, colors: currentPalette}
				]

				localStorage.setItem('options', JSON.stringify(state.options))
				state.dialog.show = false
			} else {
				state.dialog.title = {
					show: true,
					message: "This palette already exists."
				}

				state.dialog.error = true
			}
		},
		deletePalette: (state, payload) => {
			const {name} = payload
			console.log(name)

			state.options.favourites = state.options.favourites.filter(favourite => favourite.name != name)

			localStorage.setItem('options', JSON.stringify(state.options))
		},

  		// localStorage and options
  		syncOptions: (state) => {
  			state.options = JSON.parse(localStorage.getItem('options'))
  		}
  	},
  	getters: {
  		// colors getters
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
  		},
  		canAddColor: (state) => {
  			return state.colorCount < 12
  		},
  		canRemoveColor: (state) => {
  			return state.colorCount > 5
  		},

  		// color picker getters
  		colorPicker: (state) => {
  			return state.colorPicker
  		},
  		colorEditFirst: (state) => {
  			return state.colorPicker.input == 'first'
  		},
  		colorEditLast: (state) => {
  			return state.colorPicker.input == 'last'
  		},

  		// menu getters
  		showMenu: (state) => {
  			return state.showMenu
  		},

		// dialog getters
		dialogState: (state) => {
			return state.dialog
		},

  		// localStorage options
  		options: (state) => {
  			return state.options
  		},
  		darkMode: (state) => {
  			return state.options.colorMode == 'dark'
  		},
		favourites: (state) => {
			return state.options.favourites
		},

  		// messages loaded from a json config file
  		messages: (state) => {
  			return state.messages[state.options.language]
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
  			if (context.getters.canAddColor) {
  				context.state.colorCount += 1
  				context.commit('generateColorsInbetween')
  			}
  		},
  		removeColor: (context) => {
  			if (context.getters.canRemoveColor) {
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

			if (context.state.showMenu) {
				context.commit('setShowMenu')
			}

			if (context.state.colorPicker.show) {
				context.state.colorPicker = {
					show: false,
					input: "",
					pickedColor: ""
				}
			}

			if (context.state.dialog.show) {
				context.commit('setShowDialog')
			}
  		}
  	}
})
