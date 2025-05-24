
// verifyOtp.js 
const element = document.getElementById('Button');
element.addEventListener('click', async () => {
    const email = document.getElementById('userEmail').value; // Take Email from USer
        const password = document.getElementById('userPassword').value; // Take Email from USer
    const otp = document.getElementById('otp').value; // Take Otp from USer

    try {
        const response = await fetch('/api/v1/auth/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email,password, otp })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            alert(data.message);
                window.location.href = '../index.html'; // After Verified
        } else {
            alert(`Verification failed: ${data.message || 'An unknown error occurred.'}`);
        }
    } catch (error) {
        console.error('Error during OTP verification request:', error);
        alert('Verification failed due to a network error.');
    }
});

// Here we can create resend Otp Message