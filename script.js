// --- НАСТРОЙКИ ---
const START_DATE = "2025-04-05"; 
const photos = [
    'images/photo1.jpg', 'images/photo2.jpg', 'images/photo3.jpg',
    'images/photo4.jpg', 'images/photo5.jpg', 'images/photo6.jpg',
    'images/photo7.jpg', 'images/photo8.jpg', 'images/photo9.jpg'
];

const photoStream = document.getElementById('photoStream');
const music = document.getElementById('bgMusic');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const contentBox = document.querySelector('.content-box');
const successMessage = document.getElementById('successMessage');
const timerDisplay = document.getElementById('timer');

// --- ИДЕЯ №5: Смена заголовка вкладки ---
let originalTitle = document.title;
window.addEventListener('blur', () => {
    document.title = "Hey, come back! ❤️";
});
window.addEventListener('focus', () => {
    document.title = originalTitle;
});

// --- ИДЕЯ №3: Логика счетчика времени ---
function updateTimer() {
    const startDate = new Date(START_DATE);
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timerDisplay.innerHTML = `${days} days, ${hours}h, ${minutes}m, ${seconds}s`;
}

// --- Падающие фото ---
function createFallingPhoto() {
    if (photoStream.children.length > 12) return;
    const img = document.createElement('img');
    img.src = photos[Math.floor(Math.random() * photos.length)];
    img.classList.add('falling-photo');
    img.style.left = Math.random() * 85 + 'vw';
    const duration = Math.random() * 5 + 7;
    img.style.animationDuration = duration + 's';
    photoStream.appendChild(img);
    setTimeout(() => { img.remove(); }, duration * 1000);
}

setInterval(createFallingPhoto, 2500);

// --- Кнопка NO ---
function moveButton(e) {
    if (e) e.preventDefault();
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 50);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 50);
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.max(10, x) + 'px';
    noBtn.style.top = Math.max(10, y) + 'px';
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton);

// --- Кнопка YES ---
yesBtn.addEventListener('click', () => {
    contentBox.classList.add('hidden');
    successMessage.classList.remove('hidden');
    
    if (music) {
        music.volume = 0.5;
        music.play();
    }

    setInterval(createFallingPhoto, 500);
    setInterval(updateTimer, 1000); // Запускаем счетчик
    updateTimer();
});

