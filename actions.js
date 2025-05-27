module.exports = function (self) {
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
				console.log('Hello world!', event.options.num);
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
				console.log('Hello world!', event.options.num);
			},
		},
	})
}
