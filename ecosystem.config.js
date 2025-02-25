module.exports = {
  apps: [
    {
      name: 'my-nest-app',
      script: 'npm',
      args: 'run start',
      watch: false,  // Set to true for auto-restart on file changes (dev mode)
      autorestart: true,
      instances: 1,   // Use 'max' for all CPU cores
      exec_mode: 'fork', // 'cluster' for multiple instances
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
