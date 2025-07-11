gsap.registerPlugin(ScrollTrigger);
const customCursor = document.querySelector(".custom-cursor");
document.body.addEventListener("mousemove", (e) => {
  gsap.to(".custom-cursor", {
    left: e.clientX,
    top: e.clientY,
    duration: 1,
    ease: "back.out",
  });
});
function convertToSpan(param) {
  let headings = Array.from(document.querySelectorAll(param));
  headings.forEach((item) => {
    let temp = item.textContent.split("");
    let clutter = "";
    temp.forEach((e) => {
      clutter += `<span class="inline">${e}</span>`;
    });
    item.innerHTML = clutter;
  });
}
function all(para) {
  return document.querySelectorAll(para);
}
function animateFromBelow(param) {
  let headings = all(param);
  headings.forEach((h1) => {
    gsap.from(h1.querySelectorAll("span"), {
      y: 30,
      opacity: 0,
      duration: 0.5,
      delay: 0.5,
      stagger: 0.2,
    });
  });
}

convertToSpan(".text h1");
animateFromBelow(".text h1");
function animateSectionTwoHeading() {
  convertToSpan("#section-two #heading h2");
  let headingsTwo = all("#section-two #heading h2");
  headingsTwo.forEach((heading) => {
    gsap.from(heading.querySelectorAll("span"), {
      y: 100,
      stagger: 0.1,
      duration: 0.5,
      opacity: 0,
      scrollTrigger: {
        trigger: "#section-two div",
        start: "top 70%",
        scroller: "body",
        //   markers: true,
      },
    });
  });
}
animateSectionTwoHeading();

const cards = all(".card");
cards.forEach((elem) => {
  elem.addEventListener("mouseenter", () => {
    customCursor.style.borderRadius = "30px";
    customCursor.style.width = "200px";
    customCursor.style.height = "30px";

    const data = elem.getAttribute("data-data");
    let clutter = "";
    for (let i = 0; i < 9; i++) {
      clutter += `<h3>${data}</h3>`;
    }
    const finalFrame = `<div class="con">${clutter}</div>`;
    customCursor.innerHTML = `<div class="box">${finalFrame} ${finalFrame}</div>`;
  });
});

cards.forEach((elem) => {
  elem.addEventListener("mouseleave", () => {
    customCursor.style.borderRadius = "50%";
    customCursor.style.width = "10px";
    customCursor.style.height = "10px";
    customCursor.innerHTML = "";
  });
});

function animateCards() {
  const leftElems = all("#section-two .cards .parentCard.left");
  const rightElems = all("#section-two .cards .parentCard.right");
  leftElems.forEach((elem) => {
    gsap.from(elem, {
      transform: "translateX(-200px)",
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        scroller: "body",
        trigger: elem,
        start: "top 70%",
        end: "top 50%",
      },
    });
  });
  rightElems.forEach((elem) => {
    gsap.from(elem, {
      transform: "translateX(200px)",
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        scroller: "body",
        trigger: elem,
        start: "top 70%",
        end: "top 50%",
      },
    });
  });
}

function hoverOverElem() {
  const fixedImage = document.querySelector(".fixedImage");
  const overlays = document.querySelectorAll(".brandings .elems .overlay");
  let moveHandler = null;
  overlays.forEach((overlay) => {
    overlay.addEventListener("mouseenter", () => {
      moveHandler = (e) => {
        gsap.to(fixedImage, {
          top: e.clientY,
          left: e.clientX,
          duration: 2,
          ease: "back.out(5)",
        });
      }; //gsap
      window.addEventListener("mousemove", moveHandler)
      const url = `url(${overlay.getAttribute("data-img")})`;
      fixedImage.style.opacity = 1;
      fixedImage.style.backgroundImage = url;
      fixedImage.style.display = "block";
    });
    overlay.addEventListener("mouseleave", () => {
      fixedImage.style.display = "none";
      fixedImage.style.opacity = 0;

      if(moveHandler){
        window.removeEventListener("mousemove", moveHandler)
        moveHandler = null;
      }
    });
  });
}

hoverOverElem();
gsap.from(".animate-left-to-right", {
  width:"0%",
  duration: 1,
  ease: "linear",
  scrollTrigger: {
    trigger: ".brandings",
    scroller: "body",
    start:"top 50%",
  }
})
gsap.from(".elems h2", {
  opacity: 0,
  x: -100,
  duration: .7,
  scrollTrigger: {
    trigger: ".brandings",
    scroller: "body",
    start: "top 50%"
  }
})