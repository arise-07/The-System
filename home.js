// Global Player Data
let player = { lvl: 1, xp: 0, str: 10 };

// Tab Switching Logic
function openTab(tabName) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Workout Data
const workoutData = {
    'Chest': { title: 'CHEST & TRICEPS', time: 3600, ex: ['Push-ups: 50', 'Dips: 50', 'Diamond Pushups: 30'] },
    'Back': { title: 'BACK & BICEPS', time: 3600, ex: ['Pull-ups: 20', 'Rows: 50', 'Curls: 50'] },
    'Legs': { title: 'LEG DAY', time: 4500, ex: ['Squats: 100', 'Lunges: 60', 'Calf Raises: 100'] },
    'Shoulders': { title: 'SHOULDER PRESS', time: 3000, ex: ['Pike Pushups: 30', 'Lateral Raises: 50'] },
    'Core': { title: 'CORE & CARDIO', time: 3600, ex: ['Plank: 5 mins', 'Leg Raises: 50', 'Run: 5km'] },
    'FullBody': { title: 'FULL BODY', time: 5400, ex: ['Burpees: 50', 'Mountain Climbers: 100'] }
};

let countdownInterval;

function startWorkout(type) {
    const workout = workoutData[type];
    document.getElementById('quest-selector').classList.add('hidden');
    document.getElementById('active-quest').classList.remove('hidden');
    document.getElementById('current-workout-title').innerText = workout.title;

    const list = document.getElementById('exercise-list');
    list.innerHTML = workout.ex.map(e => `
                <div class="list-item">
                    <span>${e}</span>
                    <button class="btn-action" onclick="completeStep(this)">COMPLETE</button>
                </div>
            `).join('');

    runTimer(workout.time);
}

function completeStep(btn) {
    btn.parentElement.style.opacity = '0.3';
    btn.innerText = 'CLEARED';
    btn.disabled = true;

    // Give Reward
    player.xp += 15;
    if (player.xp >= 100) {
        player.lvl++;
        player.xp = 0;
        player.str += 2;
        alert("LEVEL UP! Your strength has increased.");
    }
    updateHUD();
}

function updateHUD() {
    document.getElementById('lvl-display').innerText = player.lvl;
    document.getElementById('str-display').innerText = player.str;
    document.getElementById('xp-bar').style.width = player.xp + '%';
}

function runTimer(seconds) {
    let time = seconds;
    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const h = Math.floor(time / 3600);
        const m = Math.floor((time % 3600) / 60);
        const s = time % 60;
        document.getElementById('timer-display').innerText =
            `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

        if (time <= 0) {
            clearInterval(countdownInterval);
            alert("PENALTY QUEST INITIATED: TIME EXPIRED.");
            location.reload();
        }
        time--;
    }, 1000);
}

function cancelQuest() {
    if (confirm("Abandoning a quest may result in a penalty. Proceed?")) {
        clearInterval(countdownInterval);
        document.getElementById('quest-selector').classList.remove('hidden');
        document.getElementById('active-quest').classList.add('hidden');
    }
}