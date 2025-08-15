import { useState } from 'react';
import { uploadDocument } from '../api/documents';

const ALLOWED = new Set(['application/pdf','image/jpeg','image/png']);
const MAX = 10 * 1024 * 1024;

export default function DocumentUploader({ claimId, onUploaded }) {
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED.has(file.type)) return alert('Only PDF/JPG/PNG allowed');
    if (file.size > MAX) return alert('Max 10MB');

    setBusy(true); setProgress(0);
    try {
      await uploadDocument(claimId, file, (evt) => {
        if (evt.total) setProgress(Math.round((evt.loaded / evt.total) * 100));
      });
      onUploaded?.();
    } catch (e) {
      alert('Upload failed');
    } finally {
      setBusy(false); setProgress(0);
      e.target.value = null;
    }
  };

  return (
    <div style={{margin:'8px 0'}}>
      <input type="file" onChange={onFile} disabled={busy}/>
      {busy && <span style={{marginLeft:8}}>Uploading… {progress}%</span>}
    </div>
  );
}
