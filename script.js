// Get references to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var downloadBtn = document.getElementById('download-btn');
//Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); //prevent page reload
    //collect input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // Generate the resume content dynamically
    var resumeHtml = "\n    <h2> <b> Resume </b> </h2>\n    <h3>Personal Information</h3>\n    <p><b>Name:</b> ".concat(name, "</p>\n    <p><b>Email:</b> ").concat(email, "</p>\n    <p><b>Phone:</b> ").concat(phone, "</p>\n\n    <h3>Education</h3>\n    <p>").concat(education, "</p>\n\n    <h3>Experience</h3>\n    <p>").concat(experience, "</p>\n\n    <h3>Skills</h3>\n    <p>").concat(skills, "</p>\n  ");
    //Display the generated resume
    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHtml;
        // Show download button after resume is generated
        if (downloadBtn) {
            downloadBtn.style.display = 'block';
            downloadBtn.style.opacity = '1';
            downloadBtn.style.transform = 'translateY(0)';
        }
    }
    else {
        console.error('The resume display element is missing.');
    }
});
// Handle download functionality
if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
        // Create a new Blob with the resume content
        var resumeContent = resumeDisplayElement.innerHTML;
        var blob = new Blob(["\n            <html>\n                <head>\n                    <title>Resume</title>\n                    <style>\n                        body {\n                            font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;\n                            padding: 40px;\n                            max-width: 800px;\n                            margin: auto;\n                            line-height: 1.6;\n                        }\n                        h2 { color: #2c3e50; }\n                        h3 { color: #3498db; margin-top: 20px; }\n                        p { margin: 10px 0; }\n                    </style>\n                </head>\n                <body>\n                    ".concat(resumeContent, "\n                </body>\n            </html>\n        ")], { type: 'text/html' });
        // Create a download link
        var downloadUrl = window.URL.createObjectURL(blob);
        var downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = "resume-".concat(new Date().toLocaleDateString(), ".html");
        // Trigger download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(downloadUrl);
    });
}
