document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const questionElement = document.querySelector('.question');
    const mainContent = document.querySelector('.main-content');
    const responseMessage = document.getElementById('responseMessage');
    const heartsContainer = document.querySelector('.hearts-container');

    // Функция для создания плавающих сердечек (если хочешь больше, чем через CSS)
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's'; // 5-10 seconds
        heart.style.opacity = Math.random() * 0.5 + 0.3; // 30-80% opacity
        heart.style.width = Math.random() * 20 + 10 + 'px'; // 10-30px
        heart.style.height = heart.style.width;
        heartsContainer.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Генерируем сердечки
    // setInterval(createHeart, 300); // Раскомментируй, если хочешь постоянно генерировать много сердечек через JS

    // Логика кнопки "НЕТ" - убегает
    noBtn.addEventListener('mouseover', () => {
        const cardRect = mainContent.getBoundingClientRect(); // Получаем размеры основной карточки
        const noBtnRect = noBtn.getBoundingClientRect();

        let newX = Math.random() * (cardRect.width - noBtnRect.width);
        let newY = Math.random() * (cardRect.height - noBtnRect.height);

        // Убедимся, что кнопка не выходит за пределы видимой области карточки
        newX = Math.max(0, Math.min(newX, cardRect.width - noBtnRect.width));
        newY = Math.max(0, Math.min(newY, cardRect.height - noBtnRect.height));

        noBtn.style.position = 'absolute';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    });

    // Логика кнопки "ДА"
    yesBtn.addEventListener('click', () => {
        questionElement.style.display = 'none'; // Скрываем вопрос
        mainContent.style.display = 'none';     // Скрываем фото и кнопки
        
        responseMessage.classList.remove('hidden'); // Показываем сообщение
        responseMessage.style.display = 'block'; // Убедимся, что оно видно

        // Запускаем анимацию конфетти из сердечек (по желанию)
        for (let i = 0; i < 50; i++) {
            createConfettiHeart();
        }
    });

    // Функция для создания сердечек-конфетти при нажатии "Да"
    function createConfettiHeart() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-heart');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = Math.random() * 100 + 'vh';
        confetti.style.animationDuration = Math.random() * 2 + 3 + 's'; // 3-5 seconds
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`; // Случайный пастельный цвет
        confetti.style.transform = `scale(${Math.random() * 0.8 + 0.2}) rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(confetti);

        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }

    // Добавляем стили для конфетти динамически
    const style = document.createElement('style');
    style.innerHTML = `
        .floating-heart {
            position: absolute;
            background-color: rgba(255, 192, 203, 0.4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            animation: floatUp ease-in-out infinite;
        }
        @keyframes floatUp {
            0% { transform: translateY(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-1000px); opacity: 0; }
        }

        .confetti-heart {
            position: fixed; /* Чтобы не зависело от прокрутки */
            background-color: pink; /* Базовый цвет */
            width: 15px;
            height: 15px;
            border-radius: 50%;
            animation: confettiFall 5s forwards;
            pointer-events: none;
            z-index: 9999; /* Поверх всего */
        }
        @keyframes confettiFall {
            0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

});