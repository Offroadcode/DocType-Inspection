angular.module('umbraco.services').config([
   '$httpProvider',
   function ($httpProvider) {

       $httpProvider.interceptors.push(function ($q) {
           return {
               'request': function (request) {
                   console.info("Request URL", request.url);
                   var requestUrl = request.url.split('?')[0];
                   // Redirect any requests for the listview to our custom list view UI
                   if (requestUrl === "views/components/application/umb-contextmenu.html")
                       request.url = '/App_Plugins/DocTypeInspection/views/ContextMenuView.html';

                   return request || $q.when(request);
               }
           };
       });

   }]);