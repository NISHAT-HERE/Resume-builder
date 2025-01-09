// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const downloadBtn = document.getElementById('download-btn') as HTMLButtonElement;

//Handle form submission
form.addEventListener('submit', (event: Event) => {
  event.preventDefault(); //prevent page reload

  //collect input values
  const name = (document.getElementById('name') as HTMLInputElement).value
  const email = (document.getElementById('email') as HTMLInputElement).value
  const phone = (document.getElementById('phone') as HTMLInputElement).value
  const education = (document.getElementById('education') as HTMLInputElement).value
  const experience = (document.getElementById('experience') as HTMLInputElement).value
  const skills = (document.getElementById('skills') as HTMLInputElement).value

  // Generate the resume content dynamically
  const resumeHtml = `
    <h2> <b> Resume </b> </h2>
    <h3>Personal Information</h3>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>

    <h3>Education</h3>
    <p>${education}</p>

    <h3>Experience</h3>
    <p>${experience}</p>

    <h3>Skills</h3>
    <p>${skills}</p>
  `;

  //Display the generated resume
  if(resumeDisplayElement){
    resumeDisplayElement.innerHTML = resumeHtml;
    // Show download button after resume is generated
    if(downloadBtn) {
        downloadBtn.style.display = 'block';
        downloadBtn.style.opacity = '1';
        downloadBtn.style.transform = 'translateY(0)';
    }
  }else {
    console.error('The resume display element is missing.');
  }
});

// Handle download functionality
if(downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // Create a new Blob with the resume content
        const resumeContent = resumeDisplayElement.innerHTML;
        const blob = new Blob([`
            <html>
                <head>
                    <title>Resume</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
                            padding: 40px;
                            max-width: 800px;
                            margin: auto;
                            line-height: 1.6;
                        }
                        h2 { color: #2c3e50; }
                        h3 { color: #3498db; margin-top: 20px; }
                        p { margin: 10px 0; }
                    </style>
                </head>
                <body>
                    ${resumeContent}
                </body>
            </html>
        `], { type: 'text/html' });

        // Create a download link
        const downloadUrl = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = `resume-${new Date().toLocaleDateString()}.html`;

        // Trigger download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(downloadUrl);
    });
}