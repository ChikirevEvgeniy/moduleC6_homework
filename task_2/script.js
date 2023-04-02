const btn = document.querySelector('.btn');

//Функция, получающая и выводящая информацию о размерах экрана
const windowArea = () => {
    const windowWidth = window.screen.width;
    const windowHeight = window.screen.height;
    alert(`ширина: ${windowWidth}, высота: ${windowHeight}`)
    //console.log('ширина:', windowWidth, 'высота', windowHeight)
}

btn.addEventListener('click', () => {
    windowArea();
});
