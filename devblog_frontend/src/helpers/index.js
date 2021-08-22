const cheerio = require('cheerio');

String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function getVideoId_YT(text) {
    let startingIdx = text.indexOf("youtube.com/embed") + "youtube.com/embed".length + 1
    let endingIdx = text.indexOf("?showinfo")
    
    return text.substring(startingIdx, endingIdx);
}

function wrapVideo(text) {
    let newText = text
    if(newText.includes("<iframe")) {
        let startingIdx = newText.indexOf("<iframe");
        let endingIdx = newText.indexOf("</iframe>") + "</iframe>".length
        let iframe = newText.substring(startingIdx, endingIdx);

        const wrapped = '<div class="video-view">\n\t' + iframe + '\n</div>\n';
        newText = newText.replace(iframe, wrapped);
    }
    return newText;
}

function unwrapVideo(text) {
    let newText = text
    console.log(newText)
    if(newText.includes("<div class=\"video-view\"")) {
        let startingIdx = newText.indexOf("<iframe");
        let endingIdx = newText.indexOf("</iframe>") + "</iframe>".length
        let iframe = newText.substring(startingIdx, endingIdx);

        startingIdx = newText.indexOf("<div class=\"video-view\"");
        endingIdx = newText.indexOf("</iframe></div>") + "</iframe></div>".length
        let div = newText.substring(startingIdx, endingIdx);

        newText = newText.replace(div, iframe);
    }
    console.log(newText)
    return newText;
}

function getImages(thumbnails) {
    let images = []
    for (var key in thumbnails) {
        if (Object.prototype.hasOwnProperty.call(thumbnails, key)) {
          images.push(thumbnails[key].url)
        //   console.log(key + " -> " + thumbnails[key]);
        }
    }
    return images
}
async function downloadImage(imageSrc, imageName) {
    console.log(imageSrc)
    const image = await fetch(imageSrc,{mode:'no-cors'})
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = imageName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}


// console.log(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)
// console.log(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.VUE_APP_GOOGLE_API_KEY}&part=snippet&id=${videoId}`)
//https://www.youtube.com/watch?v=KpEXNP48rgA
function getYouTubeThumbnail(videoId) {
    return new Promise((resolve) => {
        fetch(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.VUE_APP_GOOGLE_API_KEY}&part=snippet&id=${videoId}`, {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => response.json())
        .then(data => {
            const item0 = data.items[0];
            const snippet = item0.snippet;
            let images = getImages(snippet.thumbnails);
            resolve(images[images.length -1])
        });
    });
}
const getIframes = (html) => {
    return new Promise((resolve) => {
        const dom = cheerio.load(html);
        const iframes = dom('iframe.ql-video');
        iframes.wrap('<div class=\'video-view\'></div>')
        //console.log(dom.html())
        resolve(dom.html());
    });
};

/*
<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/248215185?h=ad93b7d533&color=456a7e&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
<p><a href="https://vimeo.com/248215185">Grace Community Church Christmas Concert 2017</a> from <a href="https://vimeo.com/gracecomchurch">Grace Community Church</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

*/

export {
    downloadImage,
    wrapVideo,
    getImages,
    getVideoId_YT,
    unwrapVideo,
    getIframes,
    getYouTubeThumbnail,
  }