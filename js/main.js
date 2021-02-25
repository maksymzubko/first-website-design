const items = document.querySelectorAll(".about-content, .catalog");
const buttons = document.querySelectorAll("a");
const menuBtn = document.querySelector('.menu-btn');
const menuContent = document.querySelector('.menu-mobo');
const sliderButtons = document.querySelectorAll('.arrow');

let menuOpen = false;
let marginLeft = "0";

function sliderButton() {
  sliderButtons.forEach((elem) => {
    if(document.documentElement.clientWidth<1200)
    document.getElementsByClassName('arrow-left')[0].style.display = "none";
    elem.addEventListener('click', () => {     
      let itemsCount = document.getElementsByClassName('catalog-product');
      let item = itemsCount[0];

      if (elem.classList.contains('arrow-left')) {
        let style = item.currentStyle || window.getComputedStyle(item);
        if (style.marginLeft == "0px")
          return;
        else {
            document.getElementsByClassName('arrow-right')[0].style.display = "block";
            marginLeft +=221;
            item.style.marginLeft = marginLeft + "px";
            if(marginLeft=="0")
            document.getElementsByClassName('arrow-left')[0].style.display = "none";
        }
      }
      else {
        let style = item.currentStyle || window.getComputedStyle(item);
        if(marginLeft!=0)
        {
          if (-(221 * itemsCount.length-1) > marginLeft - 221)
          return;
        else {
            document.getElementsByClassName('arrow-left')[0].style.display = "block";
            marginLeft -= 221;
            item.style.marginLeft = marginLeft + "px";
            if (-(221 * (itemsCount.length-1))== marginLeft)
            {
              document.getElementsByClassName('arrow-right')[0].style.display = "none";
            }
            
        }
        }
        else
        {
          document.getElementsByClassName('arrow-left')[0].style.display = "block";
          marginLeft -= 221;
          item.style.marginLeft = marginLeft + "px";
        }     
      }
    })
  })
}

menuBtn.addEventListener('click', () => {
  if (!menuOpen) {
    menuBtn.classList.add('open');
    menuContent.style.display = "block";
    document.getElementsByClassName('header')[0].classList.add('open');
    menuOpen = true;
  }
  else {
    menuBtn.classList.remove('open');
    document.getElementsByClassName('header')[0].classList.remove('open');
    menuContent.style.display = "none";
    menuOpen = false;
  }
})

function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) - 350 &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (elementInViewport(items[i])) {
      if (!items[i].classList.contains("show")) {
        items[i].classList.add("show");
      }
    }
  }
}

window.addEventListener("load", sliderButton);
window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);