// --- CẤU HÌNH ---
const targetCode = "DONG"; // <--- THAY MẬT MÃ CỦA BẠN TẠI ĐÂY (Viết hoa)
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// --- NỘI DUNG LỜI CHÚC (Sửa nội dung trong dấu ` `) ---
const secretMessage = `Chúc mừng sinh nhật mày, Võ Nguyễn Như Quỳnh
Tuổi mới hạnh phúc, năng lượng, rực rỡ, bứt phá, bùng nổ, thăng hoa, thịnh vượng, bản lĩnh, vững vàng, rạng ngời, khí chất, lôi cuốn, sắc sảo, kiêu hãnh, trẻ trung, phong cách, tỏa sáng, viên mãn,..
Chúc nóc nhà của Đông sinh nhật vui vẻ, tuổi 17 gặp nhiều may mắn, thành công và đạt được những mục tiêu như mong muốn. Trăm năm hạnh phúc cùng Đông - thk em què chân, kiêm hlv bóng đá của tuiz.
From : Cao Trí
`;

// --- BIẾN HỆ THỐNG ---
let i = 0;
let speed = 40; // Tốc độ chạy chữ (càng nhỏ càng nhanh)

// --- HÀM LOGIC ---

// 1. Xoay vòng chữ cái
function rotate(dial) {
    let currentIndex = alphabet.indexOf(dial.innerText);
    let nextIndex = (currentIndex + 1) % alphabet.length;
    dial.innerText = alphabet[nextIndex];
    playTickSound();
}

// 2. Kiểm tra mật mã
function checkCode() {
    const dials = document.querySelectorAll('.dial');
    let currentInput = "";
    dials.forEach(dial => currentInput += dial.innerText);

    if (currentInput === targetCode.toUpperCase()) {
        unlockSuccess();
    } else {
        showError();
    }
}

// 3. Xử lý khi mở khóa thành công
function unlockSuccess() {
    const vault = document.getElementById('vault-container');
    const scene = document.getElementById('secret-scene');

    // Làm mờ màn hình khóa
    vault.style.opacity = "0";
    vault.style.pointerEvents = "none";

    setTimeout(() => {
        // Ẩn màn hình khóa, hiện màn hình chúc mừng
        vault.style.display = "none";
        scene.classList.remove('hidden');
        scene.classList.add('fade-in-scene');
        
        // Bắt đầu hiệu ứng đánh máy sau 0.5s
        setTimeout(startTypewriter, 500);
    }, 800);
}

// 4. Hiệu ứng đánh máy (Typewriter)
function startTypewriter() {
    if (i < secretMessage.length) {
        document.getElementById("typewriter-text").innerHTML += secretMessage.charAt(i);
        i++;
        setTimeout(startTypewriter, speed);
    } else {
        // Khi chạy xong thì ẩn con trỏ nhấp nháy đi (tuỳ chọn)
        // document.querySelector('.cursor').style.display = 'none';
    }
}

// 5. Hiệu ứng khi sai mật mã
function showError() {
    const cryptex = document.getElementById('cryptex');
    cryptex.classList.add('shake');
    
    // Rung điện thoại (nếu có)
    if (navigator.vibrate) navigator.vibrate(200);

    setTimeout(() => {
        cryptex.classList.remove('shake');
    }, 400);
}

// 6. Âm thanh tick nhẹ khi xoay
function playTickSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine'; // Âm thanh điện tử
        oscillator.frequency.setValueAtTime(300, audioCtx.currentTime); // Tần số cao hơn chút cho hợp theme
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
        // Bỏ qua lỗi nếu trình duyệt chặn Autoplay
    }
}