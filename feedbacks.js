const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	// Create an instance of the ApiService with the module's config
	self.setFeedbackDefinitions({
		componentState: {
			name: 'State of component',
			type: 'boolean',
			label: 'State of component',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'component',
					type: 'dropdown',
					label: 'Select component',
					choices: [
						{ id: 'status', label: 'Status' },
						{ id: 'batter', label: 'Batter' },
						{ id: 'lowerThird', label: 'Lower Third' },
						{ id: 'boxScore', label: 'Box Score' },
						{ id: 'intro', label: 'Intro' },
						{ id: 'awayLineup', label: 'Away Lineup' },
						{ id: 'homeLineup', label: 'Home Lineup' },
						{ id: 'awayDefence', label: 'Away Defence' },
						{ id: 'homeDefence', label: 'Home Defence' },
						{ id: 'customTable', label: 'Custom Table' },
					],
					default: 'status'
				},
			],
			callback: async (feedback) => {
				try {
					const result = await self.apiService.getComponent(feedback.options.component)
					console.log(result);
					return result.action === 'on'
				} catch (error) {
					return false
				}
			},
		},
	})
}
