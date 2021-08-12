
String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};


function wrapVideo(text) {

    let startingIdx = text.indexOf("youtube.com/embed") + "youtube.com/embed".length + 1
    let endingIdx = text.indexOf("?showinfo")
    
    const videoId = text.substring(startingIdx, endingIdx);
    console.log(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)
    //console.log(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.VUE_APP_GOOGLE_API_KEY}&part=snippet&id=${videoId}`)
    //https://www.youtube.com/watch?v=KpEXNP48rgA


    startingIdx = text.indexOf("<iframe");
    endingIdx = text.indexOf("</iframe>") + "</iframe>".length + 1
    let iframe = text.substring(startingIdx, endingIdx);

    // Remove src
    // if(iframe.includes('src=')) {
    //     const srcStIdx = iframe.indexOf('src=');
    //     const endStIdx = iframe.indexOf("src=") + "</iframe>".length + 1
    //     iframe
    // } 

    const wrapped = '<div style="padding:56.25% 0 0 0;position:relative;">\n\t' + iframe + '\n</div>\n';
    let payload = {
        url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        youtubeId: videoId,
        wrapped
    }

    fetch(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.VUE_APP_GOOGLE_API_KEY}&part=snippet&id=${videoId}`, {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json() )
    .then(data => { 
        const item0 = data.items[0];
        const snippet = item0.snippet;
        
        
        payload = {
            url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            youtubeId: videoId,
            snippet
        }
        return { payload };
        //this.$store.dispatch('getImageName',payload);
        //this.$store.commit("blogYoutubeURL",snippet.thumbnails.maxres.url);
        //console.log(data);
    }).catch((err) => {
        console.log(err)
        payload = {
            url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            youtubeId: videoId
        }
    
        return { payload };
        //this.$store.dispatch('getImageName',payload);
    });
    return { payload };
}

function getImages(thumbnails) {
    let images = []
    for (var key in thumbnails) {
        console.log(key)
        if (Object.prototype.hasOwnProperty.call(thumbnails, key)) {
          images.push(thumbnails[key].url)
          console.log(key + " -> " + thumbnails[key]);
        }
    }
    return images
}
/*
<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/248215185?h=ad93b7d533&color=456a7e&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
<p><a href="https://vimeo.com/248215185">Grace Community Church Christmas Concert 2017</a> from <a href="https://vimeo.com/gracecomchurch">Grace Community Church</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

*/

export {
    wrapVideo,
    getImages,
  }