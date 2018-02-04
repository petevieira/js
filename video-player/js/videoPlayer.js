(function(window, document) {

  var video                  = document.getElementsByTagName("video")[0];
  var videoControls          = document.getElementById("video_controls");
  var play                   = document.getElementById("play");
  var progressContainer      = document.getElementById("progress");
  var progressHolder         = document.getElementById("progress_box");
  var playProgressBar        = document.getElementById("play_progress");
  var fullScreenToggleButton = document.getElementById("full_screen");

  var videoPlayer = {
    init : function() {
      // this is equal to the videoPlayer object.
      var that = this;

      // Helpful CSS trigger for JS.
      document.documentElement.className = "js";

      // Get rid of the default controls, because we'll use our own.
      video.removeAttribute("controls");

      // When meta data is ready, show the controls
      video.addEventListener("loadeddata", this.initializeControls, false);
    },

    initializeControls : function() {
      // When all meta information has loaded, show controls
      videoPlayer.showHideControls();
    },

    showHideControls : function() {
      video.addEventListener("mouseover", function() {
        videoControls.style.opacity = 1;
      }, false);

      videoControls.addEventListener("mouseover", function() {
        videoControls.style.opacity = 1;
      }, false);

      video.addEventListener("mouseout", function() {
        videoControls.style.opacity = 0;
      }, false);

      videoControls.addEventListener("mouseout", function() {
        videoControls.style.opacity = 0;
      }, false);
    },

  };

  // Call init when page loads
  videoPlayer.init();

})(window, document);