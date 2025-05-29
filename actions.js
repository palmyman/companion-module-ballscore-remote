const ApiService = require('./api-service');

module.exports = function (self) {
	// Create an instance of the ApiService with the module's config
	const apiService = ApiService(self.config);

	self.setActionDefinitions({
		toggle_component: {
			name: 'Toggle component',
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
			callback: async (event) => {
				try {
					const result = await apiService.performAction('toggle_component', {
						component: event.options.component
					});
					self.log('debug', `Toggle component result: ${JSON.stringify(result)}`);
				} catch (error) {
					self.log('error', `Error toggling component: ${error.message}`);
				}
			},
		},
		select_from_lineup: {
			name: 'Select from lineup',
			options: [
				{
					id: 'team',
					type: 'dropdown',
					label: 'Select team',
					choices: [
						{ id: 'away', label: 'Away' },
						{ id: 'home', label: 'Home' },
					],
					default: 'away'
				},
				{
					id: 'num',
					type: 'number',
					label: 'Test',
					default: 1,
					min: 0,
					max: 9,
				},
			],
			callback: async (event) => {
				try {
					const result = await apiService.performAction('select_from_lineup', {
						team: event.options.team,
						num: event.options.num
					});
					self.log('debug', `Select from lineup result: ${JSON.stringify(result)}`);
				} catch (error) {
					self.log('error', `Error selecting from lineup: ${error.message}`);
				}
			},
		},
	})
}
