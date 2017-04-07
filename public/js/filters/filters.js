var app = angular.module('myApp');

app.filter('youtubeEmbedUrl', function ($sce) {
  return function (trailerKey) {
    return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + trailerKey + '?vq=hd720?rel=0&amp;controls=0&amp;showinfo=0');
  };
});
