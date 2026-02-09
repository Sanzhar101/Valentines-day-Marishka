// --- CONFIG ---
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

// 1. Смена заголовка вкладки
let originalTitle = document.title;
window.addEventListener('blur', () => { document.title = "I miss you... ❤️"; });
window.addEventListener('focus', () => { document.title = originalTitle; });

// 2. Счетчик времени
function updateTimer() {
    const diff = new Date() - new Date(START_DATE);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    timerDisplay.innerHTML = `${days}D ${hours}H ${minutes}M ${seconds}S`;
}

// 3. Падающие фото
function createFallingPhoto() {
    if (photoStream.children.length > 12) return;
    const img = document.createElement('img');
    img.src = photos[Math.floor(Math.random() * photos.length)];
    img.classList.add('falling-photo');
    img.style.left = Math.random() * 80 + 10 + 'vw';
    const duration = Math.random() * 5 + 8;
    img.style.animationDuration = duration + 's';
    photoStream.appendChild(img);
    setTimeout(() => { img.remove(); }, duration * 1000);
}
setInterval(createFallingPhoto, 2500);

// 4. Убегающая кнопка (iPhone + PC)
function moveButton(e) {
    if (e) e.preventDefault();
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 40);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 40);
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.max(20, x) + 'px';
    noBtn.style.top = Math.max(20, y) + 'px';
}
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton);

// 5. Нажатие YES
yesBtn.addEventListener('click', () => {
    contentBox.classList.add('hidden');
    successMessage.classList.remove('hidden');
    if (music) { music.volume = 0.4; music.play().catch(() => {}); }
    setInterval(createFallingPhoto, 500);
    setInterval(updateTimer, 1000);
    updateTimer();
});

// 6. Микро-движение карточки за мышкой (только PC)
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const moveX = (e.clientX - window.innerWidth / 2) / 40;
        const moveY = (e.clientY - window.innerHeight / 2) / 40;
        document.querySelector('.main-card').style.transform = `rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    }
});


