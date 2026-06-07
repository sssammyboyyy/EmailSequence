import React from 'react';

export default function EmailPreview({ htmlContent, isDarkMode }) {
  // Using srcDoc is natively handled by React and prevents memory leaks/unresponsiveness
  // from repeatedly calling document.write() on the iframe window.
  const documentContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=600, initial-scale=1">
      <meta name="color-scheme" content="light dark">
      <style>
        /* Base styles */
        body {
          margin: 0;
          padding: 20px;
          background-color: ${isDarkMode ? '#000000' : '#f1f5f9'};
          color: ${isDarkMode ? '#ffffff' : '#000000'};
          transition: background-color 0.3s, color 0.3s;
          font-family: 'Inter', Helvetica, Arial, sans-serif;
        }

        /* Email Client Dark Mode Simulation */
        ${isDarkMode ? `
          /* Invert the main white wrappers */
          table[style*="background-color:#ffffff"], 
          table[style*="background-color: #ffffff"],
          td[style*="background-color:#ffffff"],
          td[style*="background-color: #ffffff"] {
             background-color: #1e293b !important;
          }
          
          /* Invert the light grey sections (Footers and Quotes) */
          table[style*="background-color: #f8fafc"],
          td[style*="background-color: #f8fafc"] {
             background-color: #334155 !important;
          }

          /* Force text colors to be light/white */
          p, h1, h2, h3, span, td {
             color: #f8fafc !important;
          }
          
          /* Overwrite dark grey text that wasn't catching */
          p[style*="color: #334155"],
          p[style*="color: #64748b"] {
             color: #cbd5e1 !important;
          }

          /* Keep our specific brand colors intact */
          *[bgcolor="#0f172a"], *[style*="background-color: #0f172a"] {
             background-color: #0f172a !important;
          }
          *[bgcolor="#F7B500"], *[style*="background-color: #F7B500"] {
             background-color: #F7B500 !important;
          }
          
          /* Links inside dark mode should stay legible */
          a[style*="color: #0f172a"] {
             color: #0f172a !important;
          }
          a[style*="color: #3b82f6"] {
             color: #60a5fa !important;
          }
        ` : ''}
      </style>
    </head>
    <body>
      <div style="max-width: 600px; margin: 0 auto; box-shadow: ${isDarkMode ? 'none' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'};">
        ${htmlContent}
      </div>
    </body>
    </html>
  `;

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-inner bg-slate-200/50">
      <iframe
        className="w-full h-full border-0"
        title="Email Preview"
        srcDoc={documentContent}
      />
    </div>
  );
}
