$(document).ready(function() {
    $.get("../users.json", function(users) {
        var userDataElement = $("#userData");
        users.forEach(function(user) {
            var row = $("<tr>");
            row.html("<td>" + user.username + "</td><td>" + user.password + "</td>");
            userDataElement.append(row);
        });
    });


    $("#registerBtn").click(function() {
        var username = $("#username").val();
        var password = $("#password").val();

        // Check if username or password is empty
        if (username.trim() === "" || password.trim() === "") {
            $("#message").html("Username or password cannot be empty.");
            return;
        }

        var userData = {
            username: username,
            password: password
        };

        // Using AJAX to send data to Node.js server
        $.ajax({
            type: "POST",
            url: "/register-user",
            data: userData,
            success: function(response) {
                $("#message").html(response.message);
                if (response.success) {
                    window.location.href = "index.html";
                }
            },
            error: function() {
                $("#message").html("Failed to register user.");
            }
        });
    });
});
