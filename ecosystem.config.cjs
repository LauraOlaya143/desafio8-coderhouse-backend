module.exports = {
  apps : [
    {
      name: 'app1',
      script: './dist/index.js',
      watch: true,
      autorestart: true,
      exec_mode: 'cluster',
      instances: 'max',
    },
    {
      name: 'app2',
      script: './dist/index.js',
      watch: true,
      autorestart: true,
      args: '--p 8082',
    },
    {
      name: 'app3',
      script: './dist/index.js',
      watch: true,
      autorestart: true,
      exec_mode: 'cluster',
      args: '--p 8083',
    },
    {
      name: 'app4',
      script: './dist/index.js',
      watch: true,
      autorestart: true,
      args: '--p 8084',
    },
    {
      name: 'app5',
      script: './dist/index.js',
      watch: true,
      autorestart: true,
      exec_mode: 'cluster',
      args: '--p 8085',
    }
  ]
}
