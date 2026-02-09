const photos = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    'images/photo4.jpg',
    'images/photo5.jpg',
    'images/photo6.jpg',
    'images/photo7.jpg',
    'images/photo8.jpg',
    'images/photo9.jpg'
];

const photoStream = document.getElementById('photoStream');
const music = document.getElementById('bgMusic');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const contentBox = document.querySelector('.content-box');
const successMessage = document.getElementById('successMessage');

// Функция создания падающих фото
function createFallingPhoto() {
    if (photoStream.children.length > 12) return;

    const img = document.createElement('img');
    img.src = photos[Math.floor(Math.random() * photos.length)];
    img.classList.add('falling-photo');

    img.style.left = Math.random() * 85 + 'vw';
    const duration = Math.random() * 5 + 7;
    img.style.animationDuration = duration + 's';
    img.style.width = Math.random() * 60 + 140 + 'px';

    photoStream.appendChild(img);

    setTimeout(() => {
        img.remove();
    }, duration * 1000);
}

setInterval(createFallingPhoto, 2500);

// ЛОГИКА УБЕГАЮЩЕЙ КНОПКИ
function moveButton(e) {
    if (e) e.preventDefault(); // Останавливаем клик/фокус на iPhone
    
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 50);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 50);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.max(10, x) + 'px';
    noBtn.style.top = Math.max(10, y) + 'px';
    noBtn.style.zIndex = '999';
}

// Слушатели для ПК и Телефонов
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton);
noBtn.addEventListener('click', (e) => e.preventDefault()); // На всякий случай

// ЛОГИКА НАЖАТИЯ "YES"
yesBtn.addEventListener('click', () => {
    contentBox.classList.add('hidden');
    successMessage.classList.remove('hidden');
    
    if (music) {
        music.volume = 0.5;
        music.play().catch(err => console.log("Music play blocked", err));
    }

    setInterval(createFallingPhoto, 500);
});

// Запуск музыки при любом клике (для обхода блокировки Safari)
document.addEventListener('click', () => {
    if (music && music.paused && !successMessage.classList.contains('hidden')) {
        music.play();
    }
}, { once: true });
