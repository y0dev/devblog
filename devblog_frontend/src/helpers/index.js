const cheerio = require('cheerio');
const request = require('request');

String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
function getLinksInText(html) {
    return new Promise((resolve) => {
        const dom = cheerio.load(html);
        const paragraphs = dom('p');
        for (const para of paragraphs) {
            console.log(para.children.data)
        }
        //console.log(dom.html())
        resolve(dom.html());
    });
}
// function urlify(text) {
//     var urlRegex = /(https?:\/\/[^\s]+)/g;
//     return text.replace(urlRegex, function(url) {
//       return '<a href="' + url + '">' + url + '</a>';
//     })
//     // or alternatively
//     // return text.replace(urlRegex, '<a href="$1">$1</a>')
// }

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
function getYouTubeInfo(videoId) {
    return new Promise((resolve) => {
        const url = `https://www.googleapis.com/youtube/v3/videos?key=${process.env.VUE_APP_GOOGLE_API_KEY}&part=contentDetails&part=snippet&id=${videoId}`;
        fetch(url, {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => response.json())
        .then(data => {
            const item0 = data.items[0];
            const snippet = item0.snippet;
            let images = getImages(snippet.thumbnails);
            let videoInfo = {
                title: snippet.title,
                description: snippet.description,
                image: images[images.length - 1],
                small_img: images[1],
                duration: item0.contentDetails.duration,
            }
            resolve(videoInfo)
        });
        
    });
}

const formatHtmlForBlogPost = (html) => {
    const dom = cheerio.load(html);

    const p = dom('p');
    p[0].attribs.style = 'width: 250px; overflow: hidden; text-overflow: ellipsis;';
    return dom.html();
};
const isEmptyObject = (obj) => {
    // console.log(obj,
    //     Object.keys(obj).length);
    return obj // 👈 null and undefined check
    && Object.keys(obj).length === 0;
}
const formatHtml = (html) => {
    return new Promise((resolve) => {
        const dom = cheerio.load(html);
        const iframes = dom('iframe.ql-video');
        iframes.remove();

        const ol = dom('ol');
        ol.addClass('list');

        dom('li').append('<ol class="sub-list" type="i"></ol>');
        const items = dom('li');
        for (const li of items) {
            if(li.next) {
                if((isEmptyObject(li.next.attribs) && isEmptyObject(li.attribs)) || (!isEmptyObject(li.attribs))) {
                    li.children.pop();
                } else {
                    while (!isEmptyObject(li.next.attribs)) {
                        li.children[1].children.push(li.next);
                        dom(li.next).remove();
                    }
                }
            }
        }



        // console.log(dom.html())
        // iframes.wrap('<div class=\'video-view\'></div>')
        resolve(dom.html());
    });
};

const getiframes = async (html) => {
    const dom = cheerio.load(html);
    let videos = []
    const iframes = dom('iframe.ql-video');
    for (var iframe of iframes) {
        console.log(iframe);
        let video = {
            src: iframe.attribs.src,
        }
        console.log(video);
        if (!iframe.attribs.src.includes('vimeo.com')) {
            const info = await getYouTubeInfo(getVideoId_YT(iframe.attribs.src));
            video.host = 'Youtube';
            video.info = info ? info : {};
        } else {
            console.log('Need to implement for Vimeo')
        }
        videos.push(video)
    }
    // console.log(videos)
    return videos
};

/*
<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/248215185?h=ad93b7d533&color=456a7e&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
<p><a href="https://vimeo.com/248215185">Grace Community Church Christmas Concert 2017</a> from <a href="https://vimeo.com/gracecomchurch">Grace Community Church</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

*/

const getLinkInfo = (link) => {
    let linkInfo = {};
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    return new Promise((resolve) => {
      request(cors_api_url+ link, async (_err, _response, html) => {
        let domain = (new URL(link));
        const dom = cheerio.load(html);
        linkInfo = {
            title: dom('title').text(),
            hostname: domain.hostname,
            keywords: dom("meta[name='Keywords']").attr('content') || dom("meta[name='keywords']").attr('content'),
            metaDescription: dom("meta[property='og:description']").attr('content') || dom("meta[name='Description']").attr('content'),
            image: dom("meta[property='og:image']").attr('content'),
            site_name: dom("meta[property='og:site_name']").attr('content'),
        };
        resolve(linkInfo);
    });
  });
}

export {
    getVideoId_YT,
    getiframes,
    getYouTubeThumbnail,
    getLinkInfo,
    getLinksInText,
    formatHtml,
    formatHtmlForBlogPost,
  }