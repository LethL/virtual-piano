const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');
const bts = document.querySelector('.btn-container');
const notesLetters = document.querySelectorAll('.btn');
const fullScreen = document.querySelector('.fullscreen');

pianoКeys.forEach(key => {
    key.addEventListener('mousedown', playAudio);
});

function playAudio(e) {
    let key = e.target;
    let note = document.getElementById(key.dataset.note);
    key.classList.add('active');
    note.currentTime = 0;
    note.play();
    note.addEventListener('ended', () => {
        key.classList.remove('active');
    });
};

function keyPlay(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.piano-key[data-key="${e.keyCode}"]`);
    if (!key) return;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('activ');
};

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('activ');
};

pianoКeys.forEach(key => {
    key.addEventListener('transitionend', removeTransition);
    window.addEventListener('keydown', keyPlay);
});



bts.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')) {
        notesLetters.forEach((el) => {
        if(el.classList.contains('btn-active')) {
          el.classList.remove('btn-active');
        }
      });
      event.target.classList.add('btn-active');
    }
    if (event.target.classList.contains('btn-letters')) {
        pianoКeys.forEach(key => {
            key.classList.add('letter')
        });
    }
    if (event.target.classList.contains('btn-notes')) {
        pianoКeys.forEach(key => {
            key.classList.remove('letter')
        });
    }
});


fullScreen.addEventListener('click', toggleScreen);

function toggleScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.fullscreenEnabled) {
            document.exitFullscreen();
        }
    }
};

const startPlay = (e) => {
    let a = e.target;
    a.classList.add('activ');
    let note = document.getElementById(a.dataset.note);
    note.currentTime = 0;
    note.play();
};

const stopPlay = (e) => {
    e.target.classList.remove('activ')
};

const enter = (event) => {
    event.target.classList.add('activ');
    pianoКeys.forEach((e) => {
        e.addEventListener('mouseover', startPlay);
        e.addEventListener('mouseout', stopPlay);
    })
}

const leave = () => {
    pianoКeys.forEach((e) => {
        e.classList.remove('activ');
        e.removeEventListener('mouseover', startPlay);
        e.removeEventListener('mouseout', stopPlay);
    })
}

piano.addEventListener('mousedown', enter, false);
piano.addEventListener('mouseup', leave);