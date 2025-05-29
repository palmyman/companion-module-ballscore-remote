const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const ApiService = require('./api-service')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Connecting)
		this.apiService = ApiService(config);
		this.log('debug', 'init')
		this.apiService.getBroadcast().then(broadcast => {
			this.broadcast = broadcast
			this.log('debug', `Broadcast: ${broadcast.config.homeConfig.fullName} - ${broadcast.config.awayConfig.fullName}`)
			this.updateStatus(InstanceStatus.Ok)
		}).catch(error => {
			this.log('error', `Error connecting to broadcast: ${error.message}`)
			this.updateStatus(InstanceStatus.ConnectionFailure)
		})

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Connecting)
		this.apiService = ApiService(config);
		this.apiService.getBroadcast().then(broadcast => {
			this.broadcast = broadcast
			this.updateStatus(InstanceStatus.Ok)
		}).catch(error => {
			this.updateStatus(InstanceStatus.ConnectionFailure)
		})
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				id: 'broadcastUid',
				type: 'textinput',
				label: 'Broadcast UID',
				width: 8,
				regex: '^[\w]{20}$',
				required: true,
			},
			{
				id: 'environment',
				type: 'dropdown',
				label: 'Environment',
				choices: [
					{ id: 'prod', label: 'Production' },
					{ id: 'test', label: 'Test' },
					{ id: 'dev', label: 'Development' },
					{ id: 'local', label: 'Local' },
				],
				default: 'prod',
			},
		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
