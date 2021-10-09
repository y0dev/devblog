<template>
   <div class="audio_times">
      <div id="audio-seek" class="audio_seek">
         <span class="audio_seek_handle"></span>
      </div>
      <span id="audio-current-time" class="audio_current_time">{{ currentTime }}</span>
      <span id="audio-duration" class="audio_duration">{{ totalTime }}</span>
   </div>
</template>

<script>
export default {
   name: "ProgressBar",
   props: {
      currentAudioTime: {
         type: Number,
         required: true,
      },
      duration: {
         type: Number,
         required: true,
      },
   },
   data() {
      return {
         hover: false,
         currentTime: null,
         totalTime: null,
    } ;
   }, 
   created() {
      this.currentTime = this.str_pad_left(0,'0',2) + ' : ' + this.str_pad_left(parseInt(0, 10),'0',2);
   },
   mounted() {
      this.$watch("currentAudioTime",function() {
         if(this.currentAudioTime) {
            const audioPlayerElement = document.querySelector('.audioPlayer');
            audioPlayerElement.style.setProperty('--seek_listener_percentage', ((this.currentAudioTime / this.duration) * 100) + "%");
            
            var time = this.currentAudioTime;
            var minutes = Math.floor(time / 60);
            if (minutes > 59) {
               var hours = Math.floor(time / 3600);
               time = time - hours * 3600;
               minutes = Math.floor(time / 60);
               time = time - minutes * 60;

               this.currentTime = this.str_pad_left(hours,'0',2) + ':' + this.str_pad_left(minutes,'0',2) + ':' + this.str_pad_left(parseInt(time, 10),'0',2);
            } else {
               time = time - minutes * 60;

               this.currentTime = this.str_pad_left(minutes,'0',2) + ' : ' + this.str_pad_left(parseInt(time, 10),'0',2);
            }
            
         }
      });
      var time = this.duration;
      var minutes = Math.floor(time / 60);
      if (minutes > 59) {
         var hours = Math.floor(time / 3600);
         time = time - hours * 3600;
         minutes = Math.floor(time / 60);
         time = time - minutes * 60;

         this.totalTime = this.str_pad_left(hours,'0',2) + ':' + this.str_pad_left(minutes,'0',2) + ':' + this.str_pad_left(parseInt(time, 10),'0',2);
      } else {
         time = time - minutes * 60;

         this.totalTime = this.str_pad_left(minutes,'0',2) + ' : ' + this.str_pad_left(parseInt(time, 10),'0',2);
      }

   },
   methods: {
      str_pad_left(string,pad,length) {
         return (new Array(length+1).join(pad)+string).slice(-length);
      }
   },
}
</script>

<style scoped>
.audio_times {
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: space-between;
   align-content: space-between;
   height: 25px;
   color: #9a9d9a;
}

.audio_times, 
.audio_duration, 
.audio_current_time {
    padding: 0;
    margin: 0;
    font-size: 0.8rem;
}

.audio_seek, 
.audio_seek_handle {
   height: 3px;
   border-radius: 9px;
   transition-timing-function: ease-in-out;
   cursor: pointer;
   will-change: height;
}

.audio_seek {
   width: 100%;
   background-color: #add8e6;
}

.audio_seek_handle {
    width: var(--seek_listener_percentage);
    display: block;
    background-color: #5c9dc0;
}

.audio_current_time {
    text-align: left;
    padding-left: 2px;
}

.audio_duration {
   text-align: right;
   padding-right: 5px;
}

.audio_duration, 
.audio_current_time {
   width: 45%;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
}
</style>