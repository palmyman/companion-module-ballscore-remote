const { combineRgb } = require('@companion-module/base')
const ApiService = require('./api-service')

module.exports = async function (self) {
	// Create an instance of the ApiService with the module's config
	const apiService = ApiService(self.config);
	self.setFeedbackDefinitions({
		ChannelState: {
			name: 'Example Feedback',
			type: 'boolean',
			label: 'Channel State',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Test',
					default: 5,
					min: 0,
					max: 10,
				},
			],
			callback: (feedback) => {
				// Log the API call (but don't await it since feedbacks need to return immediately)
				try {
					apiService.performAction('check_channel_state', {
						num: feedback.options.num
					}).then(result => {
						self.log('debug', `Channel state check result: ${JSON.stringify(result)}`);
					}).catch(error => {
						self.log('error', `Error checking channel state: ${error.message}`);
					});
				} catch (error) {
					self.log('error', `Error initiating channel state check: ${error.message}`);
				}

				// Return the boolean result based on the num value
				return feedback.options.num > 5;
			},
		},
	})
}
