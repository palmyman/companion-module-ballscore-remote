class ApiService {
    constructor(config) {
        this.config = config;
        this.broadcastUid = config.broadcastUid;
        this.environment = config.environment;
    }

    /**
     * Dummy method that can be used by both actions and feedbacks
     * @param {string} action - The action to perform
     * @param {Object} params - Parameters for the action
     * @returns {Promise<Object>} - The result of the action
     */
    async performAction(action, params = {}) {
        console.log(`[API Service] Performing action: ${action}`);
        console.log(`[API Service] Broadcast UID: ${this.broadcastUid}`);
        console.log(`[API Service] Environment: ${this.environment}`);
        console.log(`[API Service] Params:`, params);

        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    action,
                    params,
                    timestamp: new Date().toISOString(),
                    message: `Successfully performed ${action}`
                });
            }, 500);
        });
    }
}

// Export a function that creates and returns an instance of the ApiService
module.exports = function(config) {
    return new ApiService(config);
};