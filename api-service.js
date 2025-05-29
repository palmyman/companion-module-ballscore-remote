const axios = require('axios')

class ApiService {
	constructor(config) {
		this.broadcastUid = config.broadcastUid
		switch (config.environment) {
			case 'prod':
				this.baseUrl = 'https://www.ballscore.app/api/v1'
				break
			case 'test':
				this.baseUrl = 'https://test.ballscore.app/api/v1'
				break
			case 'dev':
				this.baseUrl = 'https://dev.ballscore.app/api/v1'
				break
			case 'local':
				this.baseUrl = 'http://localhost:4200/api/v1'
		}
	}

	async getBroadcast() {
		const url = `${this.baseUrl}/broadcasts/${this.broadcastUid}`
		console.log(url);
		const response = await axios.get(url)
		return response.data
	}

	async getComponent(component) {
		const url = `${this.baseUrl}/broadcasts/${this.broadcastUid}/controls/${component}`
		const response = await axios.get(url)
		return response.data
	}

	async toggleComponent(component) {
		const url = `${this.baseUrl}/broadcasts/${this.broadcastUid}/controls/${component}/toggle`
		const response = await axios.put(url)
		return response.data
	}

	async selectLowerThird(player) {
        const url = `${this.baseUrl}/broadcasts/${this.broadcastUid}/lower`
    }
}

// Export a function that creates and returns an instance of the ApiService
module.exports = function (config) {
	return new ApiService(config)
}