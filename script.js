/* =========================
   ELEMENTS
========================= */

const compass = document.getElementById("compass");
const birthdayContent = document.getElementById("birthday-content");
const plane = document.getElementById("plane");
const planeContainer = document.getElementById("plane-container");
const openLetterBtn = document.getElementById("openLetter");
const letterSection = document.getElementById("letterSection");
const music = document.getElementById("birthdayMusic");
const petalContainer = document.getElementById("petalContainer");

/* =========================
   STEP 1: SHOW INTRO TEXT AFTER COMPASS
========================= */

setTimeout(() => {
    birthdayContent.style.opacity = "1";
    birthdayContent.style.transition = "2s ease";
}, 4500);

/* =========================
   STEP 2: PLANE HEART PATH (SIMPLE)
========================= */

function flyPlaneHeart() {

    plane.style.opacity = "1";

    let t = 0;

    const interval = setInterval(() => {

        // heart-like parametric curve (simple version)
        let x = 16 * Math.sin(t) ** 3;
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t)
                  - 2 * Math.cos(3*t) - Math.cos(4*t));

        // scale and center
        let posX = window.innerWidth/2 + x * 15;
        let posY = window.innerHeight/2 + y * 15;

        plane.style.left = posX + "px";
        plane.style.top = posY + "px";

        t += 0.02;

        if(t > 6.3){
            clearInterval(interval);

            // after flight show button fully
            openLetterBtn.style.opacity = "1";
        }

    }, 20);
}

/* start plane after compass animation */
setTimeout(flyPlaneHeart, 2000);

/* =========================
   STEP 3: CLICK BUTTON -> OPEN LETTER
========================= */

openLetterBtn.addEventListener("click", () => {

    document.getElementById("intro").style.display = "none";
    letterSection.style.display = "flex";

    // start music
    music.play().catch(()=>{});

    // start petals
    startPetals();
    typeWriter();
});

/* =========================
   STEP 4: PETALS FALLING
========================= */

function createPetal() {

    const petal = document.createElement("div");

    petal.classList.add("petal");

    petal.innerHTML = "🌸";

    petal.style.left = Math.random() * window.innerWidth + "px";

    petal.style.animationDuration = (4 + Math.random() * 4) + "s";

    petal.style.fontSize = (15 + Math.random() * 20) + "px";

    petalContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 8000);
}

function startPetals() {

    setInterval(createPetal, 600);
}

/* =========================
   SMALL UX FIX: SHOW BUTTON SMOOTHLY
========================= */

setTimeout(() => {
    openLetterBtn.style.transition = "1.5s";
    openLetterBtn.style.opacity = "1";
}, 7000);

let typingStarted = false;
const text = `
You are the best sister in the world & I'm proud to have you.

Happy Birthday 🌸
`;

const typeTarget = document.getElementById("typeText");

let i = 0;

function typeWriter(){

    if(typingStarted) return;

    typingStarted = true;

    let i = 0;

    typeTarget.innerHTML = "";

    function write(){

        if(i < text.length){

            typeTarget.innerHTML += text.charAt(i);

            i++;

            setTimeout(write,30);

        }else{

            typeTarget.style.opacity="1";
        }
    }

    write();
}