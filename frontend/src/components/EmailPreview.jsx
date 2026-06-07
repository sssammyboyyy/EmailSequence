import { useEffect, useRef } from 'react';

export default function EmailPreview({ htmlContent, isDarkMode }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!iframeRef.current) return;
    
    // We construct a full HTML document for the iframe
    const documentContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- The magic meta tag that enables native dark mode in Apple Mail -->
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <style>
          /* Base styles */
          body {
            margin: 0;
            padding: 20px;
            background-color: ${isDarkMode ? '#000000' : '#f1f5f9'};
            color: ${isDarkMode ? '#ffffff' : '#000000'};
            transition: background-color 0.3s, color 0.3s;
          }

          /* Email Client Dark Mode Simulation */
          ${isDarkMode ? `
            /* Apple Mail / iOS Mail automatically invert colors if color-scheme is set.
               We simulate that inversion here for the preview. */
            table[style*="background-color:#ffffff"], 
            table[style*="background-color: #ffffff"],
            td[style*="background-color:#ffffff"],
            td[style*="background-color: #ffffff"] {
               background-color: #1e293b !important;
            }
            
            p, h1, h2, h3, span, td {
               color: #f8fafc !important;
            }
            
            /* Keep our specific brand colors intact */
            *[bgcolor="#0f172a"], *[style*="background-color: #0f172a"] {
               background-color: #0f172a !important;
            }
            *[bgcolor="#F7B500"], *[style*="background-color: #F7B500"] {
               background-color: #F7B500 !important;
            }
            a[style*="color: #0f172a"] {
               color: #0f172a !important;
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

    const iframeDoc = iframeRef.current.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(documentContent);
    iframeDoc.close();
  }, [htmlContent, isDarkMode]);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-inner bg-slate-200/50">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Email Preview"
      />
    </div>
  );
}
