// Application routes
const userRoutes = require('./routes/userRoutes');

const routes = app => {
  app.use('/auth', userRoutes);
};

module.exports = routes;