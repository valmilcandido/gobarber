module.exports = {
  dialect: 'postgres',
  host: '192.168.99.100',
  username: 'postgres',
  passworld: 'docker',
  database: 'gobarber',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
