// verifyOtp.js 

document.getElementById('verifyOtpButton').addEventListener('click', async () => {
    const email = document.getElementById('email').value; // Take Email from USer
    const otp = document.getElementById('otp').value; // Take Otp from USer

    try {
        const response = await fetch('/api/v1/auth/verifyOtp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            alert(data.message);
            if (data.token) {
                localStorage.setItem('jwt_token', data.token);
                localStorage.setItem('verifiedUserName', data.user.userName);
                window.location.href = '../index.html'; // After Verified
            } else {
                console.error("OTP verification successful but no token received.");
            }
        } else {
            alert(`Verification failed: ${data.message || 'An unknown error occurred.'}`);
        }
    } catch (error) {
        console.error('Error during OTP verification request:', error);
        alert('Verification failed due to a network error.');
    }
});

// Here we can create resend Otp Message

