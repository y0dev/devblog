const cheerio = require('cheerio');
// const request = require('request');

String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function getVideoId_YT(text) {
    let startingIdx = text.indexOf("youtube.com/embed") + "youtube.com/embed".length + 1
    let endingIdx = text.indexOf("?showinfo")
    
    return text.substring(startingIdx, endingIdx);
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

const getLinkInfo = (link) => {
  let linkInfo = {};
    return new Promise((resolve) => {
        let domain = (new URL(link));
        console.log(domain)
        let newLink = 'http://www.whateverorigin.org/get?url=' + encodeURIComponent(domain.origin) + domain.pathname
        fetch(newLink, {
            method: 'GET',
            mode: "no-cors",
        })
        .then(response => response.text())
        .then(function (html) {

            // Convert the HTML string into a document object
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            console.log(doc)
        
        })
        .catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });
        resolve(linkInfo);
    //   request(link, async (_err, _response, html) => {
    //     console.log(html)
    //     let domain = (new URL(link));
    //     const dom = cheerio.load(html);
    //     linkInfo = {
    //         title: dom('title').text(),
    //         hostname: domain.hostname,
    //         keywords: dom("meta[name='Keywords']").attr('content') || dom("meta[name='keywords']").attr('content'),
    //         metaDescription: dom("meta[property='og:description']").attr('content') || dom("meta[name='Description']").attr('content'),
    //         image: dom("meta[property='og:image']").attr('content'),
    //         site_name: dom("meta[property='og:site_name']").attr('content'),
    //     };
    //     resolve(linkInfo);
    // });
  });
}

export {
    getVideoId_YT,
    getIframes,
    getYouTubeThumbnail,
    getLinkInfo,
  }