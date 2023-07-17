console.log("Welcome to MusicOcean");

//Initializing the variables
let songindex = 0;
let audioElement = new Audio('mp/c.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Cartoon-On & On", filePath: "mp/c.mp3", coverPath: "mp/c.webp"},
    {songName: "Janji-Heroes Tonight", filePath: "mp/j.mp3", coverPath: "mp/j.webp"},
    {songName: "Deaf Kev-Invincible", filePath: "mp/d.mp3", coverPath: "mp/d.webp"},
    {songName: "Different Heaven & Eh!de-My Heart", filePath: "mp/di.mp3", coverPath: "mp/di.webp"},
    {songName: "Warriyo-Mortals", filePath: "mp/w.mp3", coverPath: "mp/w.webp"}
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

// Play & Pause Events
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        makeAllPlays();
    }
})

//Listening to Events
audioElement.addEventListener('timeupdate', ()=>{
    // Updating SeekBar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

//Playing from Song List Event
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songindex].filePath;
        audioElement.currentTime = 0;
        masterSongName.innerText = songs[songindex].songName;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

//Next Event
document.getElementById('next').addEventListener('click', ()=>{
    if(songindex >= 4){
        songindex = 0;
    }
    else{
        songindex += 1;
    }
    audioElement.src = songs[songindex].filePath;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songindex].songName;
    audioElement.play();
    makeAllPlays();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

//Previous Event
document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex <= 0){
        songindex = 4;
    }
    else{
        songindex -= 1;
    }
    audioElement.src = songs[songindex].filePath;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songindex].songName;
    audioElement.play();
    makeAllPlays();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})