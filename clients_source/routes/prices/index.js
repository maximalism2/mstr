import PricesContainer from './container';

module.exports = {
  path: 'prices/',
  component: PricesContainer,
  childRoutes: [
    require('./routes/new/')
  ]
}
