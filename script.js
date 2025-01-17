window.addEventListener("load", () => {
  const scroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
});

const circleMouse = document.querySelector(".follower-circle");
var timer;
function squishyMouse() {
  xscale = 1;
  yscale = 1;

  xprev = 0;
  yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timer);
    console.log("working");
    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    followerCircle(xscale, yscale);
    timer = setTimeout(() => {
      circleMouse.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

function followerCircle(xscale, yscale) {
  console.log("squishy working");
  window.addEventListener("mousemove", function (dets) {
    // console.log(dets.clientX, dets.clientY);
    circleMouse.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    circleMouse.style.display = `block`;
  });
}

document.querySelectorAll(".elem").forEach(function (elem) {
  var rot = 0;
  var diffrot = 0;

  elem.addEventListener("mousemove", function (dets) {
    console.log(dets);
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rot;
    rot = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Expo,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot),
    });
  });
  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
    });
  });
});

function heroPageAnimation() {
  var tl = gsap.timeline();

  tl.from(".nav", {
    y: "-20",
    opacity: 0,
    ease: Expo.inOut,
  });
  tl.to(".anim-elem", {
    y: "0",
    opacity: "1",
    duration: 2,
    stagger: 0.3,
    ease: Expo.inOut,
  });
  tl.from(".hero-btm", {
    y: "10",
    opacity: "0",
    duration: 1,
    delay: "-1",
    ease: Expo.inOut,
  });
}
heroPageAnimation();

function expPageAnimation() {
  console.log("out");
  gsap.to(".exp", {
    y: "200",
    opacity: "0",
    scrollTrigger: {
      trigger: ".exp",
      start: "top 80%",
      end: "top 20%",
      markers: true,
    },
  });
}
// expPageAnimation();

followerCircle();
squishyMouse();
