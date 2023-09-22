module.exports = {
  apps: [
    {
      name: 'api',
      script: 'dist/main.js',
      watch: true,
      exec_mode: 'cluster',
      instances: 0,
    },
  ],
};
