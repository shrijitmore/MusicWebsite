console.log("Welcome")
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let Play = document.getElementById('Play');
let myProgressBar = document.getElementById('myProgressBar');
let mygif = document.getElementById('gif')
let songnames = document.getElementById('songnames');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let itemSong = Array.from(document.getElementsByClassName('itemSong'));
let songs = [
    {songName: "Night-Changes - One Direction", filePath: "songs/1.mp3", coverPath:"cover/m1.jpg"},
    {songName: "Floating - Alina Baraz, feat. Khalid", filePath: "songs/2.mp3", coverPath:"cover/m2.jpg"},
    {songName: "Double Take - Dhruv", filePath: "songs/m3.mp3", coverPath:"cover/m3.jpg"},
    {songName: "Cartoon - On & On (feat. Daniel Levi)", filePath: "songs/4.mp3", coverPath:"cover/m4.jpg"},
    {songName: "Heartbreak Anniversary - Giveon", filePath: "songs/5.mp3", coverPath:"cover/m5.jpg"},
    {songName: "Mood (Slowed / Lofi)", filePath: "songs/m6.mp3", coverPath:"cover/m6.jpg"}
]
songItem.forEach((element, i)=> {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
const play = () => {
    Play.classList.remove('fa-play-circle');
    Play.classList.add('fa-pause-circle');
}
const pause = () => {
    Play.classList.remove('fa-pause-circle');
    Play.classList.add('fa-play-circle');
}
// play/pause click
Play.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        play()
        mygif.style.opacity = 1;
}else{
        audioElement.pause();
        pause()
        mygif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate',()=>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress
    if(myProgressBar.value == "100"){
        if(songIndex >= 5){
            songIndex = 0;
        }
        else{
            songIndex += 1;
        }
        document.getElementById(`${(songIndex)}`).classList.remove('fa-play-circle');
        document.getElementById(`${(songIndex)}`).classList.add('fa-pause-circle');
        document.getElementById(`${Math.abs(songIndex-1)}`).classList.remove('fa-pause-circle');
        document.getElementById(`${Math.abs(songIndex-1)}`).classList.add('fa-play-circle')
    
        audioElement.src = `songs/${songIndex}.mp3`;
        songnames.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        mygif.style.opacity = 1;
        Play.classList.remove('fa-play-circle');
        Play.classList.add('fa-pause-circle');
    }
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName("itemSong")).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName("itemSong")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        if(audioElement.paused || audioElement.currentTime<=0){
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        play();
        songnames.innerText = songs[songIndex].songName;
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        }else{
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        pause()
        songnames.innerText = songs[songIndex].songName;
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.pause();
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 5){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    document.getElementById(`${(songIndex)}`).classList.remove('fa-play-circle');
    document.getElementById(`${(songIndex)}`).classList.add('fa-pause-circle');
    document.getElementById(`${Math.abs(songIndex-1)}`).classList.remove('fa-pause-circle');
    document.getElementById(`${Math.abs(songIndex-1)}`).classList.add('fa-play-circle')

    audioElement.src = `songs/${songIndex}.mp3`;
    songnames.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    mygif.style.opacity = 1;
    Play.classList.remove('fa-play-circle');
    Play.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex < 0 ){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle')
    document.getElementById(`${songIndex+1}`).classList.remove('fa-pause-circle');
    document.getElementById(`${songIndex+1}`).classList.add('fa-play-circle')
    audioElement.src = `songs/${songIndex}.mp3`;
    songnames.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    mygif.style.opacity = 1;
    Play.classList.remove('fa-play-circle');
    Play.classList.add('fa-pause-circle');
})