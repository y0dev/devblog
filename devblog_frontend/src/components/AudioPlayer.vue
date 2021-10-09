<template>
  <div class="audioPlayer">
    <audio class="audio"></audio>
    <div class="controls audio-controls">
    <!-- @click="goBack" -->
      <div id="previous" @click="prevAudio" class="icon">
         <Previous/>
      </div>
      <div id="play" v-show="!playing" @click="toggleAudio" class="icon">
         <Play/>
      </div>
      <div id="pause" v-show="playing" @click="toggleAudio" class="icon">
         <Pause />
      </div>
      <div id="next" @click="nextAudio" class="icon">
         <Next/>
      </div>
    </div>
    <div class="main_menu">
      <h3>{{ currentAudio.title }}</h3>
      <p class="contributor"><span>{{ currentAudio.author }}</span></p>
      <div class="controls audio-subcontrols">
         <div id="repeat" class="icon">
            <Repeat />
         </div>
         <!-- Only show if not podcast -->
         <!-- <a href="#">Shuffle</a> -->
         <div id="playlist" class="icon">
            <Playlist />
         </div>
         <div id="audio_volume" class="audio_volume" title="50%">
            <div id="audio-volume-btn" class="audio_volume_btn">
               <div id="mute" v-show="!mute" class="icon" @click="muteAudio">
                  <SoundOff />
               </div>
               <div id="unmute" v-show="mute" class="icon" @click="muteAudio">
                  <SoundOn />
               </div>
            </div>
            <div id="audio-volume" class="audio_volume_range" title="50.7%">
               <span class="audio_volume_handle"></span>
            </div>
         </div>
      </div>
      <ProgressBar :key="duration" :duration="duration" :currentAudioTime="playbackTime" />
      <div id="audio-playlist" class="audio_playlist audio_playlist--on">
      <div id="playlist-close-btn" class="playlist_close_btn">
        <span>X</span>
      </div>
      <ul
         v-for="(file, index) in playlist"
         :key="index"
         :id="file.index">
         <li>
         <img 
            :src="`${file.url}`"
            :alt="`link for ${file.title}`">
         <h3>{{ file.title }}</h3>
         </li>
      </ul>
    </div>
    </div>
    <img :src="`${currentAudio.image}`" alt="">
  </div>
</template>

<script>
import Pause from "../assets/icons/audioplayer/pause_icon.svg";
import Play from "../assets/icons/audioplayer/play_icon.svg";
import Playlist from "../assets/icons/audioplayer/playlist_icon.svg";
import Repeat from "../assets/icons/audioplayer/repeat_icon.svg";
import Previous from "../assets/icons/audioplayer/skip_backward_icon.svg";
import Next from "../assets/icons/audioplayer/skip_forward_icon.svg";
import SoundOff from "../assets/icons/audioplayer/volume_low_icon.svg";
import SoundOn from "../assets/icons/audioplayer/volume_medium_icon.svg";

import ProgressBar from "./ProgressBar.vue";
export default {
  name: "AudioPlayer",
  props: ["playlist"],
  data() {
    return {
      currentAudio: null,
      currentAudioPlaying: null,
      currentIndex:0,
      playbackTime: 0,
      duration: 0,
      mute:false,
      playing: false,
      volume: 0.5,
      previousVolume: 0.5,
    }
  },
  components: {
     ProgressBar,
     Pause,
     Play,
     Playlist,
     Repeat,
     Previous,
     Next,
     SoundOff,
     SoundOn
  },
   created() {
      this.currentAudio = this.playlist[this.currentIndex];
      this.currentAudioPlaying = new Audio(this.currentAudio.url);
      this.currentAudioPlaying.volume = this.volume;
      this.currentAudioPlaying.addEventListener('loadeddata', () => {
         this.duration = this.currentAudioPlaying.duration;
         // The duration variable now holds the duration (in seconds) of the audio clip
      });
   },
   methods: {
      toggleAudio() {
        const playBtn = document.getElementById('play');
        const pauseBtn = document.getElementById('pause');
        var audio = this.currentAudioPlaying;

         if (audio.paused) {
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";
            audio.play();
            this.playing = true;
         } else {
            pauseBtn.style.display = "none";
            playBtn.style.display = "block";
            audio.pause();
            this.playing = false;
         }

      },
      prevAudio() {
         if (this.currentIndex === 0) { this.currentIndex = this.playlist.length - 1}
         else { this.currentIndex--; }

         // If Audio is playing stop and change track
         const playBtn = document.getElementById('play');
         const pauseBtn = document.getElementById('pause');
         if (pauseBtn.style.display !== "none") {
            pauseBtn.style.display = "none";
            playBtn.style.display = "block";
            this.currentAudioPlaying.pause();
            this.playing = false;
         }
         this.currentAudio = this.playlist[this.currentIndex];
         this.currentAudioPlaying = new Audio(this.currentAudio.url);
         this.currentAudioPlaying.addEventListener('loadeddata', () => {
            this.duration = this.currentAudioPlaying.duration;
            // The duration variable now holds the duration (in seconds) of the audio clip
         });
      },
      nextAudio() {
         if (this.currentIndex === this.playlist.length - 1) { this.currentIndex = 0}
         else { this.currentIndex++; }
        
         // If Audio is playing stop and change track
         const playBtn = document.getElementById('play');
         const pauseBtn = document.getElementById('pause');
         if (pauseBtn.style.display !== "none") {
            pauseBtn.style.display = "none";
            playBtn.style.display = "block";
            this.currentAudioPlaying.pause();
            this.playing = false;
         }
         this.currentAudio = this.playlist[this.currentIndex];
         this.currentAudioPlaying = new Audio(this.currentAudio.url);
         this.currentAudioPlaying.addEventListener('loadeddata', () => {
            this.duration = this.currentAudioPlaying.duration;
            // The duration variable now holds the duration (in seconds) of the audio clip
         });
      },

      muteAudio() {
         const audioVolume = document.getElementById('audio_volume');

         this.mute = !this.mute;

         if (this.mute) {
            this.previousVolume = this.volume;
            this.volume = 0;
         } else {
            this.volume = this.previousVolume;
         }
         console.log(this.volume * 100);
         audioVolume.title = `${this.volume * 100}`
         this.currentAudioPlaying.volume = this.volume;
      },

      playbackListener() {
         var audio = this.currentAudioPlaying;
         //Sync local 'playbackTime' var to audio.currentTime and update global state
         this.playbackTime = audio.currentTime;

         //Add listeners for audio pause and audio end events
         audio.addEventListener("ended", this.endListener);
         audio.addEventListener("pause", this.pauseListener);
      },

      //Function to run when audio is paused by user
        pauseListener() {
            this.playing = false;
            this.listenerActive = false;
            this.cleanupListeners();
        },
        //Function to run when audio play reaches the end of file
        endListener() {
            this.playing = false;
            this.listenerActive = false;
            this.cleanupListeners();
        },
        //Remove listeners after audio play stops
        cleanupListeners() {
            var audio = this.currentAudioPlaying;
            audio.removeEventListener("timeupdate", this.playbackListener);
            audio.removeEventListener("ended", this.endListener);
            audio.removeEventListener("pause", this.pauseListener);
            console.log("All cleaned up!");
        },
  },
  mounted() {
     //Wait for audio to begin play, then start playback listener function
      this.$watch("playing",function() {
         if(this.playing) {
         var audio=this.currentAudioPlaying;
         // console.log('Playing');
         // this.initSlider();
         //console.log("Audio playback started.");
         //prevent starting multiple listeners at the same time
         if(!this.listenerActive) {
            this.listenerActive=true;
            //for a more consistent timeupdate, include freqtimeupdate.js and replace both instances of 'timeupdate' with 'freqtimeupdate'
            audio.addEventListener("timeupdate",this.playbackListener);
         }
         }
      });
      //Update current audio position when user drags progress slider
      this.$watch("playbackTime",function() {
         // var audio=this.currentAudioPlaying;
         var diff=Math.abs(this.playbackTime - this.currentAudioPlaying.currentTime);
         //Throttle synchronization to prevent infinite loop between playback listener and this watcher
         if(diff > 0.01) {
            this.currentAudioPlaying.currentTime = this.playbackTime;
         }
      });
  },
};
</script>

<style lang="css" scoped>

.audioPlayer {
  --background: #d3dcdd;
  --cool-background: #eaf2ff;
  --cool-white: #f9fcff;
  --cool-sky: #add8e6;
  --cool-blue: #5c9dc0;
  --cool-green: #bdb369;
  --cool-black: #002e63;
  --cool-silver: #eeeeee;
  --cool-gray: darken(#dbdcdb, 25);
  --description: #8c9294;
  --btn-hover: #e5eff9;
  --seek_listener_percentage: 0%;
  --volume_listener_percentage: 50%;

   background: var(--background);
   display: flex;
   justify-content: space-between;
   border-radius: 15px;
   overflow: hidden;
   height: 180px;
   width: 530px;
}
.controls{
   display: flex;
   flex-direction: column;
   justify-content: space-between;
}

.audioPlayer .controls {
   padding: 10px;
   margin-left: 10px;
}

.audioPlayer .controls .icon:hover{
   fill: var(--cool-blue);
}

.main_menu {
   display: flex;
   flex-direction: column;
   flex-grow: 1;
   padding: 20px;
   justify-content: space-between;
}

.main_menu h3{
   padding: 5px 0;
}

.main_menu .controls{
   flex-direction: row;
   margin: 0;
   /* justify-content: space-evenly; */
   align-items: center;
}

.main_menu 
.controls 
.icon {
   width: 15px;
}

.main_menu .time-interval {
   display: flex;
   justify-content: space-between;
}
.audio_volume {
   display: flex;
   flex-direction: row;
   width: 50%;
   height: 25px;
   flex-wrap: wrap;

   align-items: center;
   justify-content: center;
   align-content: center;
}
#mute{
   width: 40px;
}
#unmute {
   width: 25px;
   margin-right: 15px;
}
.audio-volume{
   align-items: center;
   justify-content: center;
   align-content: center;
}

.audio_volume_range{
   width: 60%;
   transform: translateY(-70%);
   background-color: #add8e6;
}

.audio_volume_range,
.audio_volume_handle {
   height: 3px;
   border-radius: 9px;
   transition-timing-function: ease-in-out;
   cursor: pointer;
}
.audio_volume_handle{
   width: var(--volume_listener_percentage);
   display: block;
   background-color: #5c9dc0;
}

.audio_playlist{
   display:none;
}

#file {
   width: 100%;
}

.time-interval .start-time,
.time-interval .end-time {

}

img{
   margin:2px;
   border-top-right-radius: 15px;
   border-bottom-right-radius: 15px;
}

.icon {
   width: 30px;
   /* margin: 20px 10px; */
}
/* #pause,
#unmute {
   display: none;
} */

@media only screen and (max-width: 600px) { 
   .audioPlayer {
      flex-direction: column-reverse;
      justify-content: space-between;
      height: 500px;
      width: 100%;
   }

   .audio-controls{
      flex-direction: row;
   }

   img{
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 0;
   }
}
</style>
