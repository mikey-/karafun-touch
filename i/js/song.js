Song = function(songXml) {
    this._title = "";
    this._artist = "";
    this._year = "";
    this._duration = 0;
    this._id = 0;
    this._status = "";
    this._parse(songXml);
    this._initHandler();
}

Song.prototype = {
    render: function() {
        html = this._getHtml();
        return html;
    },
    isPlaying: function() {
        return this._status == "playing";
    },
    getDuration: function() {
        return this._duration;
    },
    getString: function() {
        return this._title+" - "+this._artist;
    },
    _initHandler: function() {
        $(".content__inner").off("dblclick","#song_"+this._id).on("dblclick","#song_"+this._id,function() {
            Queue.add($(this).attr("song_id"), 99999);
        });
        
        $(".content__inner").off("dragstart","#song_"+this._id).on("dragstart","#song_"+this._id,function(event) {
            event.originalEvent.dataTransfer.setData("text", event.target.outerHTML);
        });
        
        $(".song_queue").off("dragstart","#song_"+this._id).on("dragstart","#song_"+this._id,function(event) {
            event.originalEvent.dataTransfer.setData("text", $(this).attr("song_id"));
        });
        
        $(".song_queue").off("drop","#song_"+this._id).on("drop","#song_"+this._id,function(event) {
            event.preventDefault();
            var oldPosition = event.originalEvent.dataTransfer.getData("text");
            var newPosition = $(this).attr("song_id");
            if(oldPosition != newPosition) {
                Queue.changePosition(oldPosition, newPosition);
            }
        });
    },
    _parse: function(song) {
        this._id = song.attr("id");
        this._status = song.attr("status");
        this._title = song.find("title").text();
        this._artist = song.find("artist").text();
        this._year = song.find("year").text();
        this._duration = song.find("duration").text();
    },
    _getHtml: function() {
        return "<div class='song_card' id='song_"+this._id+"' song_id='"+this._id+"' draggable='true'>\n\
<div class='song_card__icon'><img src='i/img/icon_song.png'></div>\n\
<div class='song_card__left'><span class='song_card__title'>"+this._title+"</span><span class='song_card__artist'>"+this._artist+"</span></div>\n\
<div class='clearfix'></div>\n\
</div>";
    }
}