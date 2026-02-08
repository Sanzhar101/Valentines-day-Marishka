// Список твоих фото. Добавь сюда имена файлов из папки images
const photos = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    'images/photo4.jpg',
    'images/photo5.jpg'
];

function createFallingPhoto() {
    const container = document.getElementById('photoStream');
    if (!container) return;

    const img = document.createElement('img');
    // Выбираем случайное фото из списка
    img.src = photos[Math.floor(Math.random() * photos.length)];
    img.classList.add('falling-photo');

    // Случайная позиция по горизонтали
    img.style.left = Math.random() * 100 + 'vw';
    
    // Случайная скорость падения
    const duration = Math.random() * 10 + 10; // от 10 до 20 секунд
    img.style.animationDuration = duration + 's';
    
    // Случайный размер для эффекта глубины
    const size = Math.random() * 100 + 100; // от 100 до 200px
    img.style.width = size + 'px';
    img.style.height = 'auto';

    container.appendChild(img);

    // Удаляем фото после завершения анимации, чтобы не перегружать память
    setTimeout(() => {
        img.remove();
    }, duration * 1000);
}

// Создаем новые фото каждые 1.5 секунды
setInterval(createFallingPhoto, 1500);

// Логика кнопок
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const contentBox = document.querySelector('.content-box');
const successMessage = document.getElementById('successMessage');

noBtn.addEventListener('mouseover', () => {
    // Кнопка бегает только внутри экрана
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
});

yesBtn.addEventListener('click', () => {
    contentBox.classList.add('hidden');
    successMessage.classList.remove('hidden');
    
    // Увеличиваем интенсивность появления фото в конце
    setInterval(createFallingPhoto, 200);
});