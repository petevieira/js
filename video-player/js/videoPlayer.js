(function(window, document) {

  var video                  = document.getElementsByTagName("video")[0];
  var videoControls          = document.getElementById("video_controls");
  var play_pause             = document.getElementById("play_pause");
  var progressContainer      = document.getElementById("progress");
  var progressHolder         = document.getElementById("progress_box");
  var playProgressBar        = document.getElementById("play_progress");
  var fullScreenToggleButton = document.getElementById("full_screen");
  var videoIsFullScreen      = false;

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

      this.handleButtonPresses();

      // If fullscreen button clicked either go fullscreen or unfullscreen.
      // Using 'that' because 'this' refers to button. 'that' refers to video
      fullScreenToggleButton.addEventListener('click', function() {
        that.toggleFullScreen(videoIsFullScreen);
      }, true);
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

    handleButtonPresses : function() {
      // When video or play_pause button is clicked call the playPause function
      video.addEventListener('click', this.playPause, false);
      play_pause.addEventListener('click', this.playPause, false);

      // When video starts playing, change play symbol to a pause symbol
      video.addEventListener('play', function() {
        play_pause.title = 'Pause';
        play_pause.innerHTML = '<span id="pauseButton">&#x2590;&#x2590;</span>';
      }, false);

      // When video starts playing, change play symbol to a pause symbol
      video.addEventListener('pause', function() {
        play_pause.title = 'Play';
        play_pause.innerHTML = '&#x25BA';
      }, false);

      // When video ends, pause it and move time to 0
      video.addEventListener('ended', function() {
        this.currentTime = 0;
        this.pause();
      }, false);


    },

    playPause : function() {
      if (video.paused || video.ended) {
        if (video.ended) {
          video.currentTime = 0;
        }
        video.play();
      } else {
        video.pause();
      }
    },

    toggleFullScreen : function(goFullScreen) {
      if (goFullScreen) {
        // Set new video width and height according to screen width and height
        video.style.cssText = 'position: fixed; width:' + window.innerWidth + 'px; height: ' + window.innerHeight + 'px;';
        // Apply a classname to the video and controls, if the designer needs it
        video.className = 'fullsizeVideo';
        videoControls.className = 'fs-control';
        fullScreenToggleButton.className = 'fs-active control';
        // Listen for escape key. If pressed, close full screen
        document.addEventListener('keydown', this.checkKeyCode, false);
      } else {
        video.style.cssText = 'static';
        video.className = '';
        fullScreenToggleButton.className = 'control';
        videoControls.className = '';
      }
      videoIsFullScreen = !videoIsFullScreen;
    },

    checkKeyCode : function(event) {
      event = event || window.event;
      if ((event.keyCode || event.which) === 27) {
        videoPlayer.toggleFullScreen(false);
      }
    }

  };

  // Call init when page loads
  videoPlayer.init();

})(window, document);