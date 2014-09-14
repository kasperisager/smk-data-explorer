'use strict';

/**
 * @ngdoc function
 * @name smkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smkApp
 */
angular.module('smkApp')
  .controller('MainCtrl', function ($scope, $location, Solr, Query) {
    // Search term (bound to form)
    $scope.term = $location.search().q;

    // Current search term (updates on form submission)
    $scope.currentTerm = '';

    // Pagination data
    $scope.pager = {
      total: 0
    , perPage: 50
    , current: $location.search().p
    };

    // Search results
    $scope.results = [];

    // Advanced search options toggling
    $scope.toggleAdvanced = false;

    /**
     * Perform a search against the SMK Solr API.
     *
     * @param {Object}   query    Optional query parameters to search against.
     * @param {Function} callback Optional callback function.
     */
    $scope.search = function (query, callback) {
      query = query || {};
      callback = callback || Function;

      query.rows = $scope.pager.perPage;

      if (!$scope.term) {
        // Reset query parameters
        $location.search('q', null);
        $location.search('p', null);

        $scope.results = [];
        $scope.pager.total = 0;
        $scope.currentTerm = '';
      }
      else {
        Solr.query(new Query($scope.term, false, query), function (data) {
          callback();

          // Update query parameters
          $location.search('q', $scope.term);
          $location.search('p', $scope.pager.current);

          $scope.results = data.response.docs;
          $scope.pager.total = data.response.numFound;
          $scope.currentTerm = $scope.term;
        });
      }
    };

    /**
     * Perform a search and reset the pager.
     */
    $scope.performSearch = function () {
      $scope.search({
        start: 0
      }, function () {
        $scope.pager.current = 1;
      });
    };

    /**
     * Change page and grab new results.
     */
    $scope.changePage = function () {
      $scope.search({
        start: ($scope.pager.current - 1) * $scope.pager.perPage
      });
    };

    // If there's a search term defined in the query parameter, perform a
    // search right away.
    if ($scope.term) {
      $scope.changePage();
    }
  });
