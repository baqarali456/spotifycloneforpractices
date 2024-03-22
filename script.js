let index = Math.floor(Math.random() * 5 + 1);
let audioElement = new Audio(`songs/${index}.mp3`);

const myProgressbar = document.getElementById('myProgressbar');
const volumeid = document.getElementById('volume');
const myvolumeprogress = document.getElementById('myvolumeprogress');
const volume_percent = document.querySelector('.volume-percent');
const songItems = document.querySelectorAll('.songItem')
let showVolpercent = false;
let getLocal = 

volume_percent.innerText = `${showVolpercent ? JSON.parse(localStorage.getItem('volume')) + " %" : ""}`;
myvolumeprogress.value = JSON.parse(localStorage.getItem('volume'));

let songs = [
    { songname: "songs/1.mp3", imagePath: "covers/0.jpg" },
    { songname: "songs/2.mp3", imagePath: "covers/1.jpg" },
    { songname: "songs/3.mp3", imagePath: "covers/2.jpg" },
    { songname: "songs/4.mp3", imagePath: "covers/3.jpg" },
    { songname: "songs/5.mp3", imagePath: "covers/4.jpg" },
]

songItems.forEach((element, i) => {
    element.querySelector('img').src = songs[i].imagePath;
    element.querySelector('.songName').innerText = songs[i].songname;
});

function clickMainPlayButtonEffect_OnSongsListBtn(){
    let songName = document.querySelectorAll('.songName');
songName.forEach(ele=>{
    if(ele.innerText === audioElement.src.slice(22)){
        ele.nextElementSibling.querySelector('i').classList.remove('fa-play-circle');
        ele.nextElementSibling.querySelector('i').classList.add('fa-pause-circle');
    }
    })
}
    
const masterplay = document.getElementById('masterplay');
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        clickMainPlayButtonEffect_OnSongsListBtn() 
        masterplay.classList.add('fa-pause-circle');
        masterplay.classList.remove('fa-play-circle');
        gif.style.opacity = 1;
        setDurationofSong();
    }
    else {
        audioElement.pause();
        updateicons();
        masterplay.classList.add('fa-play-circle');
        masterplay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
    }

})

audioElement.addEventListener("timeupdate", () => {
    let duration = audioElement.duration;
    let currentTime = audioElement.currentTime;
    let progress = parseInt((currentTime / duration) * 100);
    myProgressbar.value = progress;

    setDurationofSong()
});

myProgressbar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressbar.value * audioElement.duration) / 100;
    audioElement.play();
    masterplay.classList.add('fa-pause-circle');
    masterplay.classList.remove('fa-play-circle');
    setDurationofSong()
});

volumeid.addEventListener('click', () => {
    showVolpercent = !showVolpercent;
    volume_percent.innerText = `${showVolpercent ? myvolumeprogress.value + " %" : ""}`;
    myvolumeprogress.classList.toggle('active');
})

myvolumeprogress.addEventListener('change', () => {
    audioElement.volume = myvolumeprogress.value / 100;
    localStorage.setItem("volume",JSON.stringify(myvolumeprogress.value));
    volume_percent.innerText = `${myvolumeprogress.value}%`
    if (audioElement.volume == 0) {
        volumeid.classList.add('fa-volume-xmark');
        volumeid.classList.remove('fa-volume-high')
    }
    else {
        volumeid.classList.remove('fa-volume-xmark');
        volumeid.classList.add('fa-volume-high')
    }

});


document.getElementById('forward').addEventListener('click', () => {
    if (index < songs.length - 1) {
        index++;
    }
    else {
        index = 1;   
    }
    audioElement.pause()
    updateicons();
    audioElement.src=`songs/${index}.mp3`
    clickMainPlayButtonEffect_OnSongsListBtn() 
    audioElement.play();
    masterplay.classList.add('fa-pause-circle');
    masterplay.classList.remove('fa-play-circle');
    setDurationofSong()
});

document.getElementById('previous').addEventListener('click', () => {
    if (index > 1) {
        index--;  
    }
    else {
        index = songs.length - 1;
    }     
        audioElement.pause();
        audioElement.src=`songs/${index}.mp3`
        console.log(index);
        
        updateicons();
        clickMainPlayButtonEffect_OnSongsListBtn() 
        audioElement.play();
        masterplay.classList.add('fa-pause-circle');
        masterplay.classList.remove('fa-play-circle');
        setDurationofSong()
});

document.querySelectorAll('.songItemPlay').forEach((ele => {
    ele.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-play-circle')) {
            updateicons();
            ele.classList.add('fa-pause-circle');
            ele.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
            masterplay.classList.remove('fa-play-circle');
             currentsrc = ele.parentElement.parentElement.querySelector('.songName').innerText;
           
             
    
            if(audioElement.currentTime > 0){
                audioElement.pause()
            }
            audioElement.src=`${currentsrc}`;
            audioElement.play();
           
            setDurationofSong()
            
        }
        else if (e.target.classList.contains('fa-pause-circle')) {
            updateicons();
            ele.classList.remove('fa-pause-circle');
            ele.classList.add('fa-play-circle');
            masterplay.classList.remove('fa-pause-circle');
            masterplay.classList.add('fa-play-circle');
            audioElement.pause()
        }

    })
}));

function updateicons() {
    document.querySelectorAll('.songItemPlay').forEach(function (val) {
        val.classList.remove('fa-pause-circle');
        val.classList.add('fa-play-circle');
    })
}

function setDurationofSong(){
     // set total duration of song
    document.querySelector('.duration').innerText = ((audioElement.duration / 60) - (audioElement.currentTime / 60)).toString().slice(0, 4) < 0.01 ? "0:00" : ((audioElement.duration / 60) - (audioElement.currentTime / 60)).toString().slice(0, 4);
    // set current Time of song
    document.querySelector('.currentduration').innerText = (audioElement.currentTime / 60).toString().slice(0, 4) < 0.01 ? "0:00" : (audioElement.currentTime / 60).toString().slice(0, 4);
}








