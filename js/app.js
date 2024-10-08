// проверка 
// let unlock = true;

// элементы слайдера
let arrowUp = $('.arrows-menu__arrow-up');
let arrowDown = $('.arrows-menu__arrow-down');
let dots = document.querySelectorAll(".dots-menu__item");

let screens = document.querySelectorAll(".screen");
let sidebarLinks = document.querySelectorAll(".sidebar-menu__item");
let headerLinks = document.querySelectorAll(".menu-links__item");

let currentCount = 0;
let maxCount = dots.length - 1;


// прослушка меню хедера
for (let index = 0; index < headerLinks.length; index++) {
    headerLinks[index].addEventListener("click", () => {
        currentCount = +headerLinks[index].id;
        changeScreen(currentCount);
    });
};

// прослушка меню сайдбара
for (let index = 0; index < sidebarLinks.length; index++) {
    sidebarLinks[index].addEventListener("click", () => {
        currentCount = +sidebarLinks[index].id;
        changeScreen(currentCount);
        closeMenu();
    });
};

// прослушка точек
for (let index = 0; index < dots.length; index++) {
    dots[index].addEventListener("click", () => {
        currentCount = (index >= 0 || index <= maxCount || index != currentCount) ? index : currentCount;
        changeScreen(currentCount);
    });
}

// прослушка клика по кнопкам
arrowUp.click(() => {
    currentCount <= 0 ? 0 : currentCount--;
    changeScreen(currentCount);
});
arrowDown.click(() => {
    currentCount >= maxCount ? maxCount : currentCount++;
    changeScreen(currentCount);
});

// Прослушка колесика мыши
// window.addEventListener('wheel', wheel_scroll);
// function wheel_scroll(e) {
//     let delta = e.deltaY || e.detail || e.wheelDelta;
//     if (e.deltaY < 0) {
//         currentCount = (currentCount <= maxCount && currentCount > 0) ? --currentCount : currentCount;
//         changeScreen(currentCount);
//     } else if (e.deltaY > 0) {
//         currentCount = (currentCount < maxCount && currentCount >= 0) ? ++currentCount : currentCount;
//         changeScreen(currentCount);
//     }
// }

// Прослушка клавиатуры
window.addEventListener('keydown', keyboard_scroll);
function keyboard_scroll(e) {
    if (e.key === 'ArrowUp') {
        currentCount = (currentCount <= maxCount && currentCount > 0) ? --currentCount : currentCount;
        changeScreen(currentCount);
    } else if (e.key === 'ArrowDown') {
        currentCount = (currentCount < maxCount && currentCount >= 0) ? ++currentCount : currentCount;
        changeScreen(currentCount);
    }
}






// поменять активное окно
function changeScreen(id) {
    // работа со стрелками
    if (id >= maxCount) {
        arrowUp.removeClass('-lock');
        arrowDown.addClass('-lock');
    }
    else if (id <= 0) {
        arrowDown.removeClass('-lock');
        arrowUp.addClass('-lock');
    } else {
        arrowDown.removeClass('-lock');
        arrowUp.removeClass('-lock');
    }

    // убрать все -active
    for (let index = 0; index <= maxCount; index++) {
        dots[index].classList.remove('-active');
        screens[index].classList.remove('-active');
        sidebarLinks[index].classList.remove('-active');
        // if (headerLinks[index]) headerLinks[index].classList.remove('-active');
    }
    // добавить -active нужным элементам
    dots[id].classList.add('-active');
    screens[id].classList.add('-active');
    sidebarLinks[id].classList.add('-active');

    // if (id === 0) headerLinks[0].classList.add('-active');
    // else if (id === 2) headerLinks[1].classList.add('-active');
    // else if (id === 5) headerLinks[2].classList.add('-active');

    // Перезапустить слайдеры
    $('.slick-products').slick('setPosition');
    $('.slick-reviews').slick('setPosition');
    $('.slick-reviews2').slick('setPositon');
    // sliderAccessories.slick('setPosition');
}





// Popup
let popup_link = document.querySelectorAll('.-popup-link');
let popups = document.querySelectorAll('.popup');


for (let index = 0; index < popup_link.length; index++) {
    const el = popup_link[index];
    el.addEventListener('click', function (e) {
        let item = el.getAttribute('href').replace('#', '');
        popup_open(item);
        e.preventDefault();
    })
}


function popup_open(item) {
    let activePopup = document.querySelectorAll('.popup.-active');
    if (activePopup.length > 0) {
        popup_close('', false);
    }
    let curent_popup = document.querySelector('.popup__' + item);
    if (curent_popup) {
        curent_popup.classList.add('-active');
    }
}
function popup_close(item) {
    if (!item) {
        for (let index = 0; index < popups.length; index++) {
            const popup = popups[index];
            popup.classList.remove('-active');
        }
    } else {
        item.classList.remove('-active');
    }
}
let popup_close_icon = document.querySelectorAll('.popup__close');
if (popup_close_icon) {
    for (let index = 0; index < popup_close_icon.length; index++) {
        const el = popup_close_icon[index];
        el.addEventListener('click', function () {
            popup_close(el.closest('.popup'));
        })
    }
}
document.addEventListener('keydown', function (e) {
    if (e.which == 27) {
        popup_close();
    }
});




// Sidebar
let menuOpen = document.querySelector(".icon-menu-open");
let menuClose = document.querySelector(".icon-menu-close");

let sidebar = document.querySelector(".sidebar");
let sidebarShadow = document.querySelector(".sidebar__shadow");

menuClose.addEventListener("click", closeMenu);
menuOpen.addEventListener("click", openMenu);
sidebarShadow.addEventListener("click", closeMenu);
function closeMenu() {
    sidebarShadow.classList.remove("-active");
    sidebar.classList.remove("-active");

}
function openMenu() {
    sidebarShadow.classList.add("-active");
    sidebar.classList.add("-active");
}



// Resize
window.addEventListener(`resize`, aspectRatio, false);
function aspectRatio() {
    if (Math.abs($(window).width() / $(window).height()) < 1.6) {
        // alert('up')
        //поменять фон
        // поставить фиксированные значения для блока с блюром на первом экране
    } else {
        // поставить фон с фоном
        // поставить адаптированный текст
    }
}



// let sliderAccessories = $('.slick-accessories');
// Sliders
$('.slick-products').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1199,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            infinite: true,
            breakpoint: 549,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
});
$('.slick-reviews').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slick-reviews2',
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2
            }
        },
        {
            infinite: true,
            breakpoint: 549,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
});
$('.slick-reviews2').slick({
    dots: false,
    arrows: false,
    fade: true,
    asNavFor: '.slick-reviews'
})
// sliderAccessories.slick({
//     infinite: false,
// });

//Tabs
// let tabs = document.querySelectorAll(".-tabs");
// for (let index = 0; index < tabs.length; index++) {
//     let tab = tabs[index];
//     let tabs_items = tab.querySelectorAll(".-tabs-item");
//     let tabs_blocks = tab.querySelectorAll(".-tabs-block");
//     for (let index = 0; index < tabs_items.length; index++) {
//         let tabs_item = tabs_items[index];
//         tabs_item.addEventListener("click", function (e) {
//             for (let index = 0; index < tabs_items.length; index++) {
//                 let tabs_item = tabs_items[index];
//                 tabs_item.classList.remove('-active');
//                 tabs_blocks[index].classList.remove('-active');
//             }
//             tabs_item.classList.add('-active');
//             tabs_blocks[index].classList.add('-active');
//             $('.slick-products').slick('setPosition');
//             $('.slick-reviews').slick('setPositon');
//             $('.slick-reviews2').slick('setPositon');

//             // sliderAccessories.slick('setPosition');
//             e.preventDefault();
//         });
//     }
// }
