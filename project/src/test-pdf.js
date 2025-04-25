// This is a simple script to test the PDF generation functionality
// You can run it with Node.js: node test-pdf.js

const jsPDF = require('jspdf');
const html2canvas = require('html2canvas');
const fs = require('fs');
const path = require('path');

// Create a simple HTML element
const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Test PDF</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #4f46e5;
      margin-top: 0;
    }
    .content {
      margin-bottom: 20px;
    }
    .footer {
      border-top: 1px solid #e5e7eb;
      padding-top: 20px;
      font-size: 14px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Test PDF Generation</h1>
    <div class="content">
      <p>This is a test PDF generated from a simple HTML template.</p>
      <p>If this works, we can apply the same approach to the resume builder.</p>
    </div>
    <div class="footer">
      <p>Generated on ${new Date().toLocaleString()}</p>
    </div>
  </div>
</body>
</html>
`;

// Write the HTML to a temporary file
const tempHtmlPath = path.join(__dirname, 'temp.html');
fs.writeFileSync(tempHtmlPath, html);

console.log('HTML file created:', tempHtmlPath);

// Create a PDF from the HTML
const pdf = new jsPDF('p', 'mm', 'a4');
const pdfWidth = pdf.internal.pageSize.getWidth();
const pdfHeight = pdf.internal.pageSize.getHeight();

// Add some text to the PDF
pdf.setFontSize(16);
pdf.text('Test PDF Generation', pdfWidth / 2, 20, { align: 'center' });

pdf.setFontSize(12);
pdf.text('This is a test PDF generated programmatically.', 20, 40);
pdf.text('If this works, we can apply the same approach to the resume builder.', 20, 50);

pdf.setFontSize(10);
pdf.text(`Generated on ${new Date().toLocaleString()}`, 20, pdfHeight - 20);

// Save the PDF
const pdfPath = path.join(__dirname, 'test.pdf');
pdf.save(pdfPath);

console.log('PDF file created:', pdfPath);

// Clean up the temporary HTML file
fs.unlinkSync(tempHtmlPath);
console.log('Temporary HTML file deleted'); 