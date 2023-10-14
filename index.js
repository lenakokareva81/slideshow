
const next = document.querySelector(".offer__slider-next"),
    prev = document.querySelector(".offer__slider-prev"),
    sliders = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector('.offer__slider'),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    slidersWrapper = document.querySelector('.offer__slider-wrapper'),
    slidersField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidersWrapper).width;

let slideIndex = 1,
    ofset = 0;
console.log(slidersField)
slidersField.style.width = 100 * sliders.length + "%";
slidersField.style.display = 'flex';
slidersField.style.transition = '0.5s all';
slidersWrapper.style.overflow = 'hidden';
slider.style.position = 'relative'
const indicators = document.createElement('ol'),
    dots = []
indicators.classList.add('carousel-indicators')
indicators.style.cssText = `
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;
`
slider.append(indicators);


for (let i = 0; i < sliders.length; i++) {

    const dot = document.createElement('li')
    dot.setAttribute('data-slide-to', i + 1)
    dot.style.cssText = `
box-sizing: content-box;
flex: 0 1 auto;
width: 30px;
height: 6px;
margin-right: 3px;
margin-left: 3px;
cursor: pointer;
background-color: #fff;
background-clip: padding-box;
border-top: 10px solid transparent;
border-bottom: 10px solid transparent;
opacity: .5;
transition: opacity .6s ease;
`
    if (i == 0) {
        dot.style.opacity = 1
    }
    indicators.append(dot)
    dots.push(dot)
}
if (sliders.length < 10) {
    total.innerHTML = `0${sliders.length}`;
    current.innerHTML = `0${slideIndex}`
}
else {
    total.innerHTML = `${sliders.length}`
    current.innerHTML = slideIndex
}
sliders.forEach(slide => {
    slide.style.width = width;
})
next.addEventListener('click', () => {
    if (ofset == intoNumber(width) * (sliders.length - 1)) {
        ofset = 0
    } else {
        ofset += intoNumber(width)
    }
    slidersField.style.transform = `translateX(-${ofset}px)`
    if (slideIndex == sliders.length) {
        slideIndex = 1
    } else {
        slideIndex++
    }
    currentDraw(slideIndex)
    dotsOpacity(slideIndex - 1)
})
prev.addEventListener('click', () => {
    if (ofset == 0) {
        ofset = intoNumber(width) * (sliders.length - 1)
    } else {
        ofset -= intoNumber(width)
    }
    slidersField.style.transform = `translateX(-${ofset}px)`
    if (slideIndex == 1) {
        slideIndex = sliders.length
    } else {
        slideIndex--
    }
    currentDraw(slideIndex)
    dotsOpacity(slideIndex - 1)
})
dots.forEach(dot =>
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to')
        slideIndex = slideTo
        ofset = +width.replace(/\D/g, '') * (slideTo - 1)
        slidersField.style.transform = `translateX(-${ofset}px)`
        currentDraw(slideIndex)
        dotsOpacity(slideIndex - 1)
    }
    ))
function intoNumber(str) {
    return +str.replace(/\D/g, '')
}
function dotsOpacity(n) {
    dots.forEach(dot => dot.style.opacity = '0.5')
    dots[n].style.opacity = 1
}
function currentDraw(index) {
    if (sliders.length < 10) {
        current.innerHTML = `0${index}`;
    }
    else {
        current.innerHTML = slideIndex
    }
}
//слайдер простой
// showSlider(slideIndex)
// if (sliders.length < 10) {
//     total.innerHTML = `0${sliders.length}`;
// }
// else {
//     total.innerHTML = `${sliders.length}`
// }
// function showSlider(num) {
//     if (num > sliders.length) {
//         slideIndex = 1
//     }
//     if (num < 1) {
//         slideIndex = sliders.length
//     }
//     sliders.forEach(item => item.style.display = 'none')
//     sliders[slideIndex - 1].style.display = 'block'
//     if (sliders.length < 10) {
//         current.innerHTML = `0${slideIndex}`;
//     }
//     else {
//         current.innerHTML = `${slideIndex}`
//     }
// }
// function plusSliders(n) {
//     showSlider(slideIndex += n)
// }
// showSlider(slideIndex)
// forward.addEventListener('click', () => {
//     plusSliders(1)
// })
// prev.addEventListener('click', () => {
//     plusSliders(-1)
// })

