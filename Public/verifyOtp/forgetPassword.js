
document.getElementById('verifyOtpButton').addEventListener('click', async (event) => {
    event.preventDefault();

    const userEmail = document.getElementById('userEmail').value;
    const formData = {
        email: userEmail,
    };



    try {
        const response = await fetch('/api/v1/auth/forget-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        alert('Server Response:', data);

        if (response.ok && data.success) { 
            console.log(data.message);
            window.location.href = './changePassword.html'; 
        } else {
            alert(`Password Change Fail: ${data.message || 'Unkonw Error।'}`);
            console.error('Password Change Fail:', data.message);
        }

    } catch (error) {
        console.error('Server Error:', error);
        alert(`Server Error: ${error.message}`);
    }
});
