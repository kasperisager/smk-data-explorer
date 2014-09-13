'use strict';

/**
 * @ngdoc service
 * @name smkApp.Query
 * @description
 * # Query
 * Factory in the smkApp.
 */
angular.module('smkApp')
  .factory('Query', function (_) {
    return function (query, fields, extras) {
      if (_.isObject(query)) {
        return query;
      }
      else if (_.isString(query)) {
        var terms = '';

        // Search all these fields by default
        var defaultFields = [
          'artist_name'
        , 'artist_natio'
        , 'title_eng'
        , 'title_dk'
        , 'title_first'
        , 'prod_technique_en'
        , 'prod_technique_dk'
        ];

        if (!_.isArray(fields)) {
          fields = defaultFields;
        }

        if (!_.isObject(extras)) {
          extras = {};
        }

        _.forEach(fields, function (field) {
          terms += field + ':\"' + query + '\" ';
        });

        return _.merge({ q: terms }, extras);
      }
      else {
        throw new Error('The first argument must be either a term or a query object');
      }
    };
  });
