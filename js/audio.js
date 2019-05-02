var sounds = new Array();
var normalsound = new sound("1.mp3", 0.05, true);
var losesound = new sound("lose.mp3", 0.1, true);

function sound(src,volume,loop) {
    this.src = src;
    this.isPlaying = false;
    this.audio = new Audio(this.src);
    this.audio.volume = volume;
    this.audio.loop = loop;
    sounds.push(this);
}

sound.prototype.play = function(){
    if(this.isPlaying == false) {
        this.isPlaying = true;
        this.audio.play();
    }
}

sound.prototype.stop = function() {
    if(this.isPlaying == true) {
        this.isPlaying = false;
        this.audio.pause();
    }    
}
