const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf-8');

// 1. Add states
content = content.replace(
  'const [qrDoc, setQrDoc] = useState<Document | null>(null);',
  `const [qrDoc, setQrDoc] = useState<Document | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [updateProgress, setUpdateProgress] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const updateTargetRef = React.useRef<string | null>(null);`
);

// 2. Add functions
const updateLogic = `
  const handleUpdateClick = (id: string) => {
    updateTargetRef.current = id;
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleUpdateFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const targetId = updateTargetRef.current;
    if (!file || !targetId) return;
    
    if (file.type !== 'application/pdf') {
      toast.error('Please select a PDF file.');
      return;
    }

    setUpdating(targetId);
    setUpdateProgress('Extracting PDF pages...');

    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = \`//cdnjs.cloudflare.com/ajax/libs/pdf.js/\${pdfjsLib.version}/pdf.worker.min.js\`;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const extractedPages: string[] = [];

      for (let i = 1; i <= numPages; i++) {
        setUpdateProgress(\`Extracting page \${i} of \${numPages}...\`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        if (context) {
          await page.render({ canvasContext: context, viewport: viewport }).promise;
          extractedPages.push(canvas.toDataURL('image/jpeg', 0.8));
        }
      }

      const token = localStorage.getItem('auth_token');
      const finalPageUrls: string[] = new Array(extractedPages.length);
      let completed = 0;

      const uploadPromises = extractedPages.map(async (pageStr, index) => {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${token}\` },
          body: JSON.stringify({ image: pageStr, folder: \`documents/update-\${targetId}\` })
        });
        if (!res.ok) throw new Error('Failed to upload a page');
        const data = await res.json();
        finalPageUrls[index] = data.url;
        completed++;
        setUpdateProgress(\`Uploading page \${completed}/\${extractedPages.length}...\`);
      });

      await Promise.all(uploadPromises);
      setUpdateProgress('Saving changes...');

      const patchRes = await fetch(\`/api/documents/\${targetId}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${token}\` },
        body: JSON.stringify({ pages: finalPageUrls, page_count: numPages })
      });
      if (!patchRes.ok) throw new Error('Failed to update document');

      toast.success('Document updated successfully!');
      fetchDocuments();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update document.');
    } finally {
      setUpdating(null);
      setUpdateProgress('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      updateTargetRef.current = null;
    }
  };
`;

content = content.replace(
  '  const handleDelete = async (id: string) => {',
  updateLogic + '\n  const handleDelete = async (id: string) => {'
);

// 3. Add overlay and input
content = content.replace(
  '<div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">',
  `<input type="file" accept="application/pdf" className="hidden" ref={fileInputRef} onChange={handleUpdateFile} />
        {updating && (
          <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-bold text-slate-900">{updateProgress}</p>
          </div>
        )}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">`
);

// 4. Add update button
content = content.replace(
  `                        <div className="flex items-center justify-end gap-2 opacity-100 transition-opacity">\n                          <button \n                            onClick={() => setQrDoc(doc)}`,
  `                        <div className="flex items-center justify-end gap-2 opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleUpdateClick(doc.id)}
                            disabled={updating === doc.id || deleting === doc.id}
                            className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50" 
                            title="Update PDF"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => setQrDoc(doc)}`
);

fs.writeFileSync('src/app/admin/page.tsx', content);
