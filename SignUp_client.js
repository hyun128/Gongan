function signup() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 서버로 회원가입 정보를 전송합니다.
    fetch('http://localhost:3000/signup', { // 변경된 URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
    .then(response => response.text())
    .then(message => {
        alert(message); // 서버로부터 받은 메시지를 알림으로 표시합니다.
    })
    .catch(error => {
        console.error('Error during signup:', error);
    });
}
