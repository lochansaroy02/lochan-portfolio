module.exports = {
    apps: [{
        name: "my-app",        // Change this to your app's name
        script: "npm",
        args: "start",
        // MASTER SETTING: Use all 4 CPU cores
        instances: "max",
        exec_mode: "cluster",

        // Safety Valve: Restart if an instance eats > 2GB RAM
        max_memory_restart: "2G",

        env: {
            NODE_ENV: "production",
            PORT: 3000 // Ensure this matches your app's port
        }
    }]
}