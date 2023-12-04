function signup() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const birthdate = document.getElementById('birthdate').value; // 생년월일 추가

    // 서버로 회원가입 정보를 전송합니다.
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, birthdate }), // 생년월일 추가
    })
    .then(response => response.text())
    .then(message => {
        alert(message); // 서버로부터 받은 메시지를 알림으로 표시합니다.
    })
    .catch(error => {
        console.error('Error during signup:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    flatpickr('#birthdate', {
        dateFormat: 'Y-m-d',
        maxDate: 'today',
        locale: 'ko',
    });
    document.getElementById('birthdate').addEventListener('change', function () {
        alert('Birthdate changed: ' + this.value);
    });
});
