let holdTime = 0;
let holdInterval;
let requiredHoldTime = 10000 ; // 10 seconds
var firstName;
var subject;
function displayInfo() {
    // Get input values
    firstName = document.getElementById("nameInput").value;
    subject = document.getElementById("subjectInput").value;

    // Display result
    document.getElementById("result").innerHTML = 
        "Welcome, <strong>" + firstName + "</strong>!<br>You are about to take the <strong>" + subject + "</strong> test.";
    
    // Show hold button
    document.getElementById("scanner").style.display = "flex";
    document.getElementById("testForm").style.display = "none";
}

function startHolding() {
    let holdButton = document.getElementById("holdButton");
    holdButton.classList.add("holding");

    holdInterval = setInterval(() => {
        holdTime += 100;
        if (holdTime >= requiredHoldTime) {
            clearInterval(holdInterval);
            document.getElementById("button-instruction").innerHTML = 
                "<p>Knowledge tested successfully</p>" +
                "<button type='button' class='button-30' onclick='displayScore()'>Check Your Score</button>";
            holdButton.style.background = "#0bd400";
            holdButton.style.cursor = "default";
            holdButton.disabled = true;
        }
    }, 100);
}

function stopHolding() {
    clearInterval(holdInterval);
    holdTime = 0;
    let holdButton = document.getElementById("holdButton");
    holdButton.classList.remove("holding");
}

// Attach both mouse and touch events for cross-device support
document.addEventListener("DOMContentLoaded", function() {
    let holdButton = document.getElementById("holdButton");
    
    holdButton.addEventListener("mousedown", startHolding);
    holdButton.addEventListener("mouseup", stopHolding);
    holdButton.addEventListener("mouseleave", stopHolding);
    
    holdButton.addEventListener("touchstart", startHolding);
    holdButton.addEventListener("touchend", stopHolding);
});

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayScore() {
    document.getElementById("result").innerHTML = 
        "Name: <strong>" + firstName + "</strong><br>Subject: <strong>" + subject + "</strong><br><br> Score: <strong>" + getRandomInt(80, 100) + "%</strong>";
    document.getElementById("holdButton").style.display = "none"
    document.getElementById("button-instruction").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function() {
    let holdButton = document.getElementById("holdButton");

    holdButton.addEventListener("mousedown", startHolding);
    holdButton.addEventListener("mouseup", stopHolding);
    holdButton.addEventListener("mouseleave", stopHolding);
    
    holdButton.addEventListener("touchstart", function(event) {
        event.preventDefault(); // Prevents the default long-press behavior
        startHolding();
    });

    holdButton.addEventListener("touchend", stopHolding);
    holdButton.addEventListener("contextmenu", function(event) {
        event.preventDefault(); // Disables the context menu on long press
    });
});