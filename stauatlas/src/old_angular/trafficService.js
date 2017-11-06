
angular.module('TrafficDataService', []).factory('TrafficDataFactory', ['$http', function($http) {
  
      var traffic = {};
  
  //routes
      //get current Jam-Infos from the API
      traffic.getCurrentTrafficInfos = function(top10, filter) {
          return $http.get('/api/all/null/'+top10+'/'+filter);
  
      };
  
      traffic.getTrafficInfosTop10 = function(top10) {
          return $http.get('/api/all/null/'+top10+'/null');
          //.map(res => res.json());
      };
  
      traffic.getTrafficInfos = function(option,top10,filter) {
         return $http.get('/api/all/'+option+'/'+top10+'/'+filter);
      };
  
      traffic.getDailyTrafficProgress = function(date, precision) {
        date = moment(date).add(1, "hours").toISOString();
          console.log("Datum: "+ date);
          return $http.get('/api/change/'+date+'/'+precision);
      };
  
      traffic.getRangeInfos = function(time, range, days) {
          console.log('/api/range/'+time+'/'+range+'/'+days);
           return $http.get('/api/range/'+time+'/'+range+'/'+days);
      };
      traffic.getDailyTrafficProgressDur = function(startdate, duration) {
          return $http.get('/api/change/'+startdate+'/'+duration+'/null');
      };
  
      return traffic;
  
  
  }]);
  