document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registerBtn").addEventListener("click", function() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        var userData = {
            username: username,
            password: password
        };

        // Using AJAX to send data to PHP file
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "register-user.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                document.getElementById("message").innerHTML = response.message;
                if (response.success) {
                    // Refresh the dashboard after successful registration
                    window.location.href = "dashboard.html";
                }
            }
        };
        var requestData = "username=" + username + "&password=" + password;
        xhr.send(requestData);
    });
});
