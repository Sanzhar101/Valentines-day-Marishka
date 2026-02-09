// Проверь, чтобы названия в папке images совпадали с этими
const photos = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    'images/photo4.jpg',
    'images/photo5.jpg',
    'images/photo6.jpg',
    'images/photo7.jpg',
    'images/photo8.jpg',
    'images/photo9.jpg',
];

const photoStream = document.getElementById('photoStream');
const music = document.getElementById('bgMusic');

function createFallingPhoto() {
    // Максимум 12 фото одновременно, чтобы было качественно и не в кучу
    if (photoStream.children.length > 12) return;

    const img = document.createElement('img');
    img.src = photos[Math.floor(Math.random() * photos.length)];
    img.classList.add('falling-photo');

    // Горизонтальная позиция
    img.style.left = Math.random() * 85 + 'vw';
    
    // Скорость падения (7-12 секунд — плавно и красиво)
    const duration = Math.random() * 5 + 7;
    img.style.animationDuration = duration + 's';
    
    // Случайный размер
    img.style.width = Math.random() * 60 + 140 + 'px';

    photoStream.appendChild(img);

    // Очистка памяти
    setTimeout(() => {
        img.remove();
    }, duration * 1000);
}

// Запуск медленного потока фото сразу
setInterval(createFallingPhoto, 2500);

const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const contentBox = document.querySelector('.content-box');
const successMessage = document.getElementById('successMessage');

// Убегающая кнопка
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
});

// Нажатие "YES"
yesBtn.addEventListener('click', () => {
    contentBox.classList.add('hidden');
    successMessage.classList.remove('hidden');
    
    // Включаем музыку
    if (music) {
        music.volume = 0.5; // Громкость 50%
        music.play().catch(err => console.log("Music play blocked", err));
    }

    // Ускоряем поток фото в 5 раз для эффекта праздника!
    setInterval(createFallingPhoto, 500);
});

// Резервный запуск музыки при первом клике (если YES не нажата сразу)
document.addEventListener('click', () => {
    if (music.paused && !successMessage.classList.contains('hidden')) {
        music.play();
    }
}, { once: true });

