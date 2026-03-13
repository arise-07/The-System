const video = document.getElementById('monarch-video');
const overlay = document.getElementById('video-overlay');
const typeElement = document.getElementById('type');
const mainButtons = document.getElementById('main-buttons');
const optionsBox = document.getElementById('options');

const initialMsg = "YOU HAVE BEEN ACQUIRED TO BE A PLAYER. DO YOU ACCEPT?";
const successMsg = "SYSTEM ACTIVATED";

// 1. Play Video
window.onload = () => {
    video.play().catch(() => hideOverlay());
};

// 2. When Video Ends
video.onended = () => {
    hideOverlay();
};

function hideOverlay() {
    overlay.style.opacity = "0";
    setTimeout(() => {
        overlay.style.display = "none";
        typeWriter(initialMsg, mainButtons);
    }, 1000);
}

// 3. Typewriter Function
function typeWriter(text, nextElement) {
    typeElement.innerHTML = "";
    let i = 0;
    function typing() {
        if (i < text.length) {
            typeElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 50);
        } else {
            // This adds the class that forces the buttons to show
            nextElement.classList.add('show-flex');
        }
    }
    typing();
}

// 4. Button Actions
function acceptSystem() {
    mainButtons.classList.remove('show-flex');
    mainButtons.style.display = "none";
    typeWriter(successMsg, optionsBox);
}

function rejectSystem() {
    typeElement.innerHTML = "SYSTEM ERROR: TERMINATING SESSION...";
    typeElement.style.color = "#ff3e3e";
    mainButtons.classList.remove('show-flex');
    setTimeout(() => location.reload(), 2000);
}