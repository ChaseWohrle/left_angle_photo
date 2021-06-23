'use strict';


/*------- NAV BAR FUNCTIONS -------*/

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

/*------- AWS FUNCTIONS -------*/

var albumBucketName = 'lap-main-gallery';
var AWS = require('aws-sdk');
const {S3} = require('@aws-sdk/client-s3');

const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const {
  fromCognitoIdentityPool,
} = require("@aws-sdk/credential-provider-cognito-identity");
const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");

// **DO THIS**:
//   Replace this block of code with the sample code located at:
//   Cognito -- Manage Identity Pools -- [identity_pool_name] -- Sample Code -- JavaScript
//
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:f02d3e3c-b634-4acb-afbb-b29c7e5adda8',
});

// Create a new service object
var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: albumBucketName}
  });
  
  // A utility function to create HTML.
  function getHtml(template) {
    return template.join('\n');
  }


  //
// Functions
//

// List the photo albums that exist in the bucket.
function listAlbums() {
    s3.listObjects({Delimiter: '/'}, function(err, data) {
      if (err) {
        return alert('There was an error listing your albums: ' + err.message);
      } else {
        var albums = data.CommonPrefixes.map(function(commonPrefix) {
          var prefix = commonPrefix.Prefix;
          var albumName = decodeURIComponent(prefix.replace('/', ''));
          return getHtml([
            '<li>',
              '<button style="margin:5px;" onclick="viewAlbum(\'' + albumName + '\')">',
                albumName,
              '</button>',
            '</li>'
          ]);
        });
        var message = albums.length ?
          getHtml([
            '<p>Click on an album name to view it.</p>',
          ]) :
          '<p>You do not have any albums. Please Create album.';
        var htmlTemplate = [
          '<h2>Albums</h2>',
          message,
          '<ul>',
            getHtml(albums),
          '</ul>',
        ]
        document.getElementById('viewer').innerHTML = getHtml(htmlTemplate);
      }
    });
  }
  
  // Show the photos that exist in an album.
  function viewAlbum(albumName) {
    var albumPhotosKey = encodeURIComponent(albumName) + '/';
    s3.listObjects({Prefix: albumPhotosKey}, function(err, data) {
      if (err) {
        return alert('There was an error viewing your album: ' + err.message);
      }
      // 'this' references the AWS.Request instance that represents the response
      var href = this.request.httpRequest.endpoint.href;
      var bucketUrl = href + albumBucketName + '/';
  
      var photos = data.Contents.map(function(photo) {
        var photoKey = photo.Key;
        var photoUrl = bucketUrl + encodeURIComponent(photoKey);
        return getHtml([
          '<span>',
            '<div>',
              '<br/>',
              '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
            '</div>',
            '<div>',
              '<span>',
                photoKey.replace(albumPhotosKey, ''),
              '</span>',
            '</div>',
          '</span>',
        ]);
      });
      var message = photos.length ?
        '<p>The following photos are present.</p>' :
        '<p>There are no photos in this album.</p>';
      var htmlTemplate = [
        '<div>',
          '<button onclick="listAlbums()">',
            'Back To Albums',
          '</button>',
        '</div>',
        '<h2>',
          'Album: ' + albumName,
        '</h2>',
        message,
        '<div>',
          getHtml(photos),
        '</div>',
        '<h2>',
          'End of Album: ' + albumName,
        '</h2>',
        '<div>',
          '<button onclick="listAlbums()">',
            'Back To Albums',
          '</button>',
        '</div>',
      ]
      document.getElementById('viewer').innerHTML = getHtml(htmlTemplate);
      document.getElementsByTagName('img')[0].setAttribute('style', 'display:none;');
    });
  }