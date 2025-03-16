document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    var formData = new FormData(this);
    var params = new URLSearchParams();
    formData.forEach((value, key) => { params.append(key, value); });

    fetch("https://script.google.com/macros/s/AKfycbxNzNAHlUbl2BK-sAkeXiHe_0-j96mFjUBt8caDIocjdDVZYytL5iGQpjeqnrVUSk3TIQ/exec", { 
        method: "POST",
        body: params
    })
    .then(response => response.text())
    .then(data => alert("Message sent successfully!"))
    .catch(error => console.error("Error:", error));
});
