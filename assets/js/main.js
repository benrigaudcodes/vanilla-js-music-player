// Player
const audio = document.querySelector('.song audio')
const allTracks = document.querySelectorAll('.track')
const tracklistLength = allTracks.length
const buttonPlay = document.querySelectorAll('.play-pause')
const buttonNext = document.querySelectorAll('.next')
const buttonPrev = document.querySelectorAll('.prev')
const buttonPlayIcon = document.querySelectorAll('.play-pause i')

const playButtonHandler = (e) => {
    e.preventDefault()
    
    if ( audio.paused ) {
        audio.play()
        buttonPlayIcon.forEach(btn => btn.classList.remove('fa-play'))
        buttonPlayIcon.forEach(btn => btn.classList.add('fa-pause'))
    } else {
        audio.pause()
        buttonPlayIcon.forEach(btn => btn.classList.add('fa-play'))
        buttonPlayIcon.forEach(btn => btn.classList.remove('fa-pause'))
    }
}

const tracklistHandler = (e) => {
    e.preventDefault()
    const nextSongId = parseInt(e.currentTarget.getAttribute('songId'))
    playThis(nextSongId)
    allTracks.forEach(e => e.classList.remove('active'))
    e.currentTarget.classList.add('active')
}

const nextHandler = (e) => {
    const currentSongId = parseInt(document.querySelector('.song').getAttribute('song-id'))
    const nextSongId = currentSongId + 1
    if (nextSongId > tracklistLength){
        playThis(1)
    } else{
        playThis(nextSongId)
    }
}

const prevHandler = (e) => {
    const currentSongId = parseInt(document.querySelector('.song').getAttribute('song-id'))
    const prevSongId = currentSongId - 1
    if (prevSongId === 0){
        playThis(tracklistLength)
    } else{
        playThis(prevSongId)
    }
}

const playThis = (id) => {
    // get song elements
    const song = document.querySelector('.song')
    let songName = document.querySelector('.name')
    let artistName = document.querySelector('.artist')
    let songCover = document.querySelector('.cover')
    let songCoverShadow = document.querySelector('.cover-shadow')
    let songSource = document.querySelector('audio source')
    const theCover = document.querySelector('.song-cover')

    // get track values
    const nextTrack = document.querySelector(`[songId="${id}"]`)
    const nextTrackId = nextTrack.getAttribute('songId')
    const nextTrackName = nextTrack.getAttribute('songName')
    const nextTrackArtist = nextTrack.getAttribute('songArtist')
    const nextTrackPath = nextTrack.getAttribute('songPath')
    const nextTrackCover = nextTrack.getAttribute('songCover')
    
    // update song elements
    song.setAttribute('song-id', nextTrackId)
    songName.innerHTML = nextTrackName
    artistName.innerHTML = nextTrackArtist
    songCover.src = nextTrackCover
    songCoverShadow.src = nextTrackCover
    songSource.src = nextTrackPath

    audio.load()
    audio.play()
    buttonPlayIcon.forEach(btn => btn.classList.remove('fa-play'))
    buttonPlayIcon.forEach(btn => btn.classList.add('fa-pause'))
    allTracks.forEach(e => e.classList.remove('active'))
    allTracks.forEach(e => {
        if(e.getAttribute('songId') === nextTrackId) {
            e.classList.add('active')
        }
    })
}

buttonPlay.forEach(btn => btn.addEventListener('click', playButtonHandler))
buttonNext.forEach(btn => btn.addEventListener('click', nextHandler))
buttonPrev.forEach(btn => btn.addEventListener('click', prevHandler))
allTracks.forEach(track => track.addEventListener('click', tracklistHandler))

// progress bar
const theAudio = document.querySelector('audio')
const start = document.querySelectorAll('.start')
const end = document.querySelectorAll('.end')
const progressBar = document.querySelectorAll('.progress-bar')
const now = document.querySelectorAll('.now')

function conversion (value) {
    let minute = Math.floor(value / 60)
    minute = minute.toString().length === 1 ? ('0' + minute) : minute
    let second = Math.round(value % 60)
    second = second.toString().length === 1 ? ('0' + second) : second
    return `${minute}:${second}`
}

theAudio.onloadedmetadata = function () {
    end.forEach(e => e.innerHTML = conversion(audio.duration))
    start.forEach(e => e.innerHTML = conversion(audio.currentTime))
}

progressBar.forEach(e => e.addEventListener('click', function (event) {
    let coordStart = this.getBoundingClientRect().left
    let coordEnd = event.pageX
    let p = (coordEnd - coordStart) / this.offsetWidth
    now.forEach(e => e.style.width = p.toFixed(3) * 100 + '%')

    audio.currentTime = p * audio.duration
    audio.play()
}))

setInterval(() => {
    start.forEach(e => e.innerHTML = conversion(audio.currentTime))
    now.forEach(e => e.style.width = audio.currentTime / audio.duration.toFixed(3) * 100 + '%')
}, 1000)