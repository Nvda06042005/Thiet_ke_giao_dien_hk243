document.addEventListener('DOMContentLoaded', function() {
    // Sửa bộ chọn để tìm đúng liên kết "Đăng nhập" với data-action mới
    const loginLink = document.querySelector('a[data-action="show-login-box"]'); // Đã sửa data-action ở đây

    const loginModalOverlay = document.getElementById('loginModalOverlay');
    const closeLoginBoxButton = document.getElementById('closeLoginBox');

    if (loginLink && loginModalOverlay && closeLoginBoxButton) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
            loginModalOverlay.style.display = 'flex'; // Hiển thị modal
        });

        closeLoginBoxButton.addEventListener('click', function() {
            loginModalOverlay.style.display = 'none'; // Ẩn modal
        });

        // Ẩn modal khi nhấp ra ngoài box
        loginModalOverlay.addEventListener('click', function(e) {
            if (e.target === loginModalOverlay) {
                loginModalOverlay.style.display = 'none';
            }
        });
    } else {
        // Ghi log lỗi để dễ dàng gỡ lỗi hơn
        console.error("Lỗi: Không tìm thấy một hoặc nhiều phần tử để xử lý đăng nhập. Vui lòng kiểm tra lại HTML IDs/Selectors.");
        if (!loginLink) console.error("Không tìm thấy loginLink. Đảm bảo có a[data-action=\"show-login-box\"] trong HTML.");
        if (!loginModalOverlay) console.error("Không tìm thấy loginModalOverlay. Đảm bảo có id='loginModalOverlay' trong HTML.");
        if (!closeLoginBoxButton) console.error("Không tìm thấy closeLoginBoxButton. Đảm bảo có id='closeLoginBox' trong HTML.");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.querySelector('[data-action="show-login-box"]');
    const loginModal = document.getElementById("loginModalOverlay");
    const closeLoginBtn = document.getElementById("closeLoginBox");

    const forgotPasswordModal = document.getElementById("forgotPasswordModal");
    const showForgotPasswordLink = document.getElementById("showForgotPassword");
    const backToLoginLink = document.getElementById("backToLogin");

    // Mở modal đăng nhập
    loginLink.addEventListener("click", function (event) {
        event.preventDefault();
        loginModal.style.display = "block";
    });

    // Đóng modal đăng nhập
    closeLoginBtn.addEventListener("click", function () {
        loginModal.style.display = "none";
    });

    // Mở modal quên mật khẩu
    showForgotPasswordLink.addEventListener("click", function (event) {
        event.preventDefault();
        loginModal.style.display = "none";
        forgotPasswordModal.style.display = "block";
    });

    // Quay lại modal đăng nhập
    backToLoginLink.addEventListener("click", function (event) {
        event.preventDefault();
        forgotPasswordModal.style.display = "none";
        loginModal.style.display = "block";
    });

    // Đóng modal khôi phục mật khẩu khi bấm ra ngoài
    window.addEventListener("click", function (event) {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
        }
        if (event.target === forgotPasswordModal) {
            forgotPasswordModal.style.display = "none";
        }
    });
});
document.querySelector(".login-modal-overlay").classList.add("active");
