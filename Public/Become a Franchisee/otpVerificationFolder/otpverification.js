// verifyOtp.js 

document.getElementById('verificationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value; // Take Email from USer
    const otp = document.getElementById('otp').value; // Take Otp from USer

    try {
        const response = await fetch('/api/v1/become/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });

        const data = await response.json();

        if (response.ok && data.success) {
                alert(data.message);
                window.location.reload();
                window.location.href = '../../index.html'; // After Verified
        } else {
            alert(`Verification failed: ${data.message || 'An unknown error occurred.'}`);
        }
    } catch (error) {
        console.error('Error during OTP verification request:', error);
        alert('Verification failed due to a network error.');
    }
});

// Here we can create resend Otp Message

