const test = require('tape')
const Model = require('../model')
const model = new Model()
const nock = require('nock')

test('should properly fetch from the trimet api and return geojson', t => {
  nock('https://developer.trimet.org')
  .get('/ws/v2/vehicles/onRouteOnly/false/appid/8A0EBB788E8205888807BAC97')
  .reply(200, require('./fixtures/input.json'))

  model.getData({}, (err, geojson) => {
    t.plan(3)
    t.error(err)
    t.equal(geojson.type, 'FeatureCollection', 'create a proper feature collection')
    t.ok(geojson.features, 'geojson has features')
  })
})
