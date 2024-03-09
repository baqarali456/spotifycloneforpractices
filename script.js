let audioElement = new Audio('songs/1.mp3');
const myProgressbar = document.getElementById('myProgressbar');
const volumeid = document.getElementById('volume');
const myvolumeprogress = document.getElementById('myvolumeprogress');
const volume_percent = document.querySelector('.volume-percent');
let showVolpercent = false;


const masterplay = document.getElementById('masterplay');
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.add('fa-pause-circle');
        masterplay.classList.remove('fa-play-circle');
        gif.style.opacity = 1;
        document.querySelector('.duration').innerText = ((audioElement.duration / 60).toString().slice(0,4)) ;
        document.querySelector('.currentduration').innerText = (audioElement.currentTime / 60).toString().slice(0,4)<0.01?"0:00":(audioElement.currentTime / 60).toString().slice(0,4)
    }
    else {
        audioElement.pause();
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
  
    document.querySelector('.duration').innerText = ((audioElement.duration / 60) - (audioElement.currentTime / 60)).toString().slice(0,4)<0.01?"0:00":((audioElement.duration / 60) - (audioElement.currentTime / 60)).toString().slice(0,4) ;
    document.querySelector('.currentduration').innerText = (audioElement.currentTime / 60).toString().slice(0,4)<0.01?"0:00":(audioElement.currentTime / 60).toString().slice(0,4)
    // The duration variable now holds the duration (in seconds) of the audio clip
});

myProgressbar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressbar.value * audioElement.duration) / 100;
    audioElement.play();
    masterplay.classList.add('fa-pause-circle');
    masterplay.classList.remove('fa-play-circle');
    
    document.querySelector('.duration').innerText = ((audioElement.duration / 60) - (audioElement.currentTime / 60)).toString().slice(0,4)<0.01?"0:00":((audioElement.duration / 60) - (audioElement.currentTime / 60)).toString().slice(0,4);

    document.querySelector('.currentduration').innerText = (audioElement.currentTime / 60).toString().slice(0,4)<0.01?"0:00":(audioElement.currentTime / 60).toString().slice(0,4)
});

volumeid.addEventListener('click', () => {
    showVolpercent = !showVolpercent;
    volume_percent.innerText = `${showVolpercent ? myvolumeprogress.value + " %" : ""}`;
    myvolumeprogress.classList.toggle('active');
})

myvolumeprogress.addEventListener('change', () => {
    console.log(myProgressbar.value);
    audioElement.volume = myvolumeprogress.value / 100;
    volume_percent.innerText = `${myvolumeprogress.value}%`
    if (audioElement.volume == 0) {
        volumeid.classList.add('fa-volume-xmark');
        volumeid.classList.remove('fa-volume-high')
    }
    else {
        volumeid.classList.remove('fa-volume-xmark');
        volumeid.classList.add('fa-volume-high')
    }
    
})








