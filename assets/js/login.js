const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

console.log("h2")
//로그인
async function Login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${backend_base_url}/users/dj-rest-auth/login/`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    }
    )
    const response_json = await response.json()

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    if (response.status === 200) {

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(function (c) {
                return '%' + (
                    '00' + c.charCodeAt(0).toString(16)
                ).slice(-2);
            }).join('')
        );

        localStorage.setItem("payload", jsonPayload);
        alert("로그인 성공");

        location.replace('feed.html')

    } else if (response.status === 400 && response_json["non_field_errors"]) {
        alert(response_json["non_field_errors"])

    } else {
        alert("아이디와 비밀번호를 확인해주세요.");
    }
}