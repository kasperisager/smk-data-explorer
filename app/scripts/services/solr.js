'use strict';

/**
 * @ngdoc service
 * @name smkApp.Solr
 * @description
 * # Solr
 * Service in the smkApp.
 */
angular.module('smkApp')
  .service('Solr', function API($resource) {
    var base = 'http://solr.smk.dk:8080/solr/prod_all_dk';

    // Solr query endpoint
    return $resource(base + '/select', {
      'indent': 'on'
    , 'wt': 'json'
    , 'json.wrf': 'JSON_CALLBACK'
    }, {
      query: { method: 'JSONP' }
    });
  });
