
const today = new Date();

let today_month = today.getMonth() + 1;
let today_date = today.getDate();
// console.log(today.getDate());
// console.log(today.getMonth());

let today_month_double = (today_month < 10) ? ("0" + today_month) : today_month;
today_date_double = (today_date < 10) ? ("0" + today_date) : today_date;


const password = today_month_double + today_date_double;

// console.log(password);

let display_string = document.querySelector(".display p");
let input_buffer = "";

const gaming = document.getElementById("gaming");

function play_game_music(){
    
    gaming.muted = false; 
    gaming.loop = true;
    gaming.volume = 0.4;
    gaming.play();
}



document.body.addEventListener("click", play_game_music)



function append_to_display(value) {


    if (value === "Enter") {
        // console.log("not a number");
        compare_result();
    }
    else {
        input_buffer += value;
        display_string.textContent = input_buffer;
    }

}

const correct_sound = document.getElementById("correct_sound");
const wrong_sound = document.getElementById("wrong_sound");

function fade_in(audio , duration=3000){
    audio.volume = 0 ;
    audio.play();
    let step = 0.05;
    let interval = setInterval(()=>{
        if (audio.volume < 1){
            audio.volume = Math.min(1 , audio.volume+step);
        }
        else{
            clearInterval(interval)
        }
    },duration *step);
}

function play_music(audio){
    audio.currentTime = 0 ;
    audio.play();
}


function compare_result() {

    if (input_buffer === password) {
        // display_string.innerHTML = "父親節快樂!<br>Happy Father's Day!";
        display_box();
        fade_in(correct_sound,500);

    }
    else if (input_buffer.length < password.length) {

        display_string.textContent = "請輸入四位有效數字!";
        play_music(wrong_sound);
    }
    else {
        display_string.textContent = "密碼錯誤，請再試一次！";
        play_music(wrong_sound);

    }
    input_buffer = "";
}

const screen_lock = document.querySelector(".screen_lock");
const box_container = document.querySelector(".box_container");


function display_box() {
    screen_lock.classList.add("hide");
    box_container.classList.remove("hide");
    box_container.classList.add("show");
}

const display_container = document.querySelector(".display_container");
const main_music = document.getElementById("main_music");

function btn_continue() {

    // go to next step
    fade_in(correct_sound,500);
    box_container.classList.add("hide");
    box_container.classList.remove("show");
    // display_container.classList.remove("hide");
    display_container.classList.add("show");
    gaming.loop=false;
    gaming.pause();
    document.removeEventListener("click",play_game_music);
    main_music.play();
    display_message().then(()=>{return final();});
}

const label_text = document.getElementById("label_text");
const sentences = [
    "唔好意思 , 你只可以揀YES",
    "唔好浪費時間",
    "揀 NO?你真係認真咩?🤨",
    "NO 唔係選項,YES 先係人生方向 💡",
    "你以為有 NO,其實冇NO 😂",
    "YES 係唯一正確答案 ✅",
    "揀 NO = 冇驚喜 🎁",
    "再見!"
];


let sentences_idx = 0;

function chose_no() {
    play_music(wrong_sound);
    label_text.innerHTML = sentences[(sentences_idx++) % (sentences.length)];
}

const display_img = document.querySelector(".display_image img")
const display_msg = document.querySelector(".display_msg")
let num = 0;
let interval_id = null;

interval_id = setInterval(() => {
    display_img.src = `assets/family_${num}.png`;
    num = (num + 1) % 8;
}, 2000);

const messages = [
    "今日好特別...",
    "係父親節",
    "父親節快樂！🎉",
    "多謝你一直以嚟嘅付出 ❤️",
    "多謝你一直默默支持我 🙌",
    "爸爸，辛苦你🙏",
    "感謝你教會我堅強同勇敢 💪",
    "健康快樂 🎂",
    "做多啲運動!🏃🏻‍♂️",
    "感謝你嘅耐心同關懷 🫶",
    "感謝你嘅包容 💝",
    "希望你天天都開心 🌈",
    "謝謝你為我哋所做嘅一切 🙏",
    "祝你健康長壽 💚",
    "飲少啲酒",
    "爸爸我愛你 💖",
    "感謝你嘅教導同榜樣 📚",
    "日日開心!🎅🏻",
    "希望能夠陪伴你更多時光 🌅",
    "你係最棒嘅爸爸 🏆",
    "謝謝你相信我 🌟",
    "希望你永遠健健康康 💪",
    "感謝你嘅陪伴 🤝",
    "父親節快樂 🎁",
];

function getRandomPosition() {
    const imgRect = display_img.getBoundingClientRect();
    const msgWidth = 200;
    const msgHeight = 100;

    let left, top, valid = false;

    while (!valid) {
        left = Math.random() * (window.innerWidth - msgWidth);
        top = Math.random() * (window.innerHeight - msgHeight);

        // Check if position overlaps with image
        const msgLeft = left;
        const msgRight = left + msgWidth;
        const msgTop = top;
        const msgBottom = top + msgHeight;

        const imgLeft = imgRect.left;
        const imgRight = imgRect.right;
        const imgTop = imgRect.top;
        const imgBottom = imgRect.bottom;

        // No overlap means valid position
        valid = !(msgRight > imgLeft && msgLeft < imgRight &&
                  msgBottom > imgTop && msgTop < imgBottom);
    }

    return { left, top };
}

function display_message() {

    return new Promise((resolve ,reject)=>{

        messages.forEach((message, index) => {
            setTimeout(() => {
                const msg = document.createElement("div");
                msg.className = "display_msg show";
                msg.innerHTML = `
                    <div class="heading">
                        <h2>${message}</h2>
                    </div>
                    <div class="content">
                        <p>爸爸辛苦了!</p>
                    </div>
                `;
    
                const pos = getRandomPosition();
                msg.style.left = pos.left + "px";
                msg.style.top = pos.top + "px";
                msg.style.rotate = `z ${Math.random()*20 - 5}deg`
    
                display_container.appendChild(msg);
    
                setTimeout(() => msg.remove(), 4000);

                if(index === messages.length -1){
                    setTimeout(resolve, 2000);
                }

            }, index * 2000); 
        });
    })

}

function final(){

    clearInterval(interval_id);
    const final_text = document.createElement("p");
    final_text.classList.add("final_text");
    final_text.innerHTML = "🎉🎉 父親節快樂! 🎉🎉"; 
    document.querySelector(".display_container").prepend(final_text);

}

