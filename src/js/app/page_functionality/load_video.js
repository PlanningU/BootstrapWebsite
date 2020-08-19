define(function(require){
    var parse_json = require("app/page_functionality/parse_json");
    var Plyr = require("Plyr");
    var displayArticles = require("app/page_functionality/create_cards");

    return{
        loadContent: function(){
            let url_string = window.location.href;
            let url = new URL(url_string);
            let video_id = parseInt(url.searchParams.get("videoid"));

            parse_json.parse_csv("/src/assets/articles/video_metadata.csv")
                .then(data => {
                    $('meta[name="description"]').attr("content", data[video_id][1]);
                    document.title = data[video_id][0];


                    let video = document.getElementById('video');
                    video.setAttribute("data-poster", data[video_id][3]);


                    let source = document.createElement('source');

                    source.setAttribute('src', data[video_id][2]);
                    source.setAttribute('type', "video/mp4");

                    video.appendChild(source);
                    const player = new Plyr(video);

                    //Setting descriptions
                    var text_elements = document.querySelector('#video-container .video-text');

                    let sub_element;
                    sub_element = document.createElement("h3");
                    sub_element.className = "video-title";
                    sub_element.innerHTML = data[video_id][0];
                    text_elements.appendChild(sub_element);

                    //VIDEO TAGS DIV
                    sub_element = document.createElement("div");
                    sub_element.className = "tags";
                    let sub_sub_element = text_elements.appendChild(sub_element);

                    //VIDEO INDIVIDUAL TAG
                    let tags = data[video_id][4].replace(/"/g, "").split(',');
                    for (let i = 0; i < tags.length; i++) {
                        let tag = document.createElement("span");
                        tag.className = "tag";
                        tag.innerHTML = tags[i];
                        sub_sub_element.appendChild(tag);

                    }

                    //VIDEO DESCRIPTION
                    sub_element = document.createElement("p");
                    sub_element.className = "video-description";
                    sub_element.innerHTML = data[video_id][1];
                    text_elements.appendChild(sub_element);

                });



        }
    }



})