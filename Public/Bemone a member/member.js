const conatiner = document.getElementById('container');
const registerbtn = document.getElementById('register');
const loginbtn = document.getElementById('login');
const verifyOtp = document.getElementById('verifyOtp');

registerbtn.addEventListener('click',()=>{
    conatiner.classList.add("active");
});

loginbtn.addEventListener('click',()=>{
    conatiner.classList.remove("active");
});

//Register Account----------------------------------------------------------------
startVerificationButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;

    const formData = {
        userName: userName,
        email: userEmail,
        password: userPassword
    };

    try {
        const response = await fetch('/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
       alert('Server Response:', data);

        if (response.ok && data.success) { 
            alert(data.message);
            window.location.href = '../verifyOtp/verifyOtp.html'; 
        } else {
            alert(`Registration Fail: ${data.message || 'an Knwon Error'}`);
            console.error('Registration Fail:', data.message);
        }

    } catch (error) {
        console.error('Server Error:', error);
        alert(`Server Error: ${error.message}`);
    }
});

const login = document.getElementById('login');

login.addEventListener('click', async (event) => {
    event.preventDefault();

    const userEmail = document.getElementById('email').value;
    const userPassword = document.getElementById('password').value;

    const formData = {
        email: userEmail,
        password: userPassword
    };

    try {
        const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        console.log('Server Response:', data);

        if (response.ok && data.success) {
            alert(data.message);
            window.location.href = '../verifyOtp/verifyOtp.html'; 
        } else {
            alert(`Login Failed: ${data.message || 'Unkown Reason।'}`);
            console.error('Login Failed:', data.message);
        }

    } catch (error) {
        console.error('Server Error:', error);
        alert(`Server Error: ${error.message}`);
    }
});