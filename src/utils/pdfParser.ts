import * as pdfjsLib from 'pdfjs-dist';

// Set worker source for PDF.js in browser
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || '4.10.38'}/build/pdf.worker.min.mjs`;
}

export async function extractTextFromPdfFile(file: File): Promise<string> {
  // 1. Try client-side pdfjs extraction
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageStrings = textContent.items
        .map((item: any) => item.str || '')
        .filter((s: string) => s.trim().length > 0);
      fullText += pageStrings.join(' ') + '\n\n';
    }

    const cleanedText = fullText.trim();
    if (cleanedText.length > 20) {
      return cleanedText;
    }
  } catch (err) {
    console.warn('Client-side PDF parsing failed or empty, trying server endpoint...', err);
  }

  // 2. Fallback to server /api/parse-pdf endpoint
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const base64 = e.target?.result as string;
        const response = await fetch('/api/parse-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pdfBase64: base64 })
        });
        const data = await response.json();
        if (data.success && data.text && data.text.length > 5) {
          resolve(data.text);
        } else {
          reject(new Error(data.error || 'Could not extract readable text from PDF.'));
        }
      } catch (err: any) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read PDF file.'));
    reader.readAsDataURL(file);
  });
}
