import { previewDocument, deleteDocument, replaceDocument } from '../api/documents';

export default function DocumentList({ docs, onChanged }) {
  const onPreview = (id) => previewDocument(id);

  const onDelete = async (id) => {
    if (!window.confirm('Delete this file?')) return;
    await deleteDocument(id);
    onChanged?.();
  };

  const onReplace = async (docId) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      await replaceDocument(docId, file);
      onChanged?.();
    };
    input.click();
  };

  if (!docs?.length) return <div>No documents yet.</div>;

  return (
    <table width="100%" cellPadding="8" style={{borderCollapse:'collapse', marginTop:8}}>
      <thead><tr><th>Name</th><th>Type</th><th>Size</th><th></th></tr></thead>
      <tbody>
        {docs.map(d => (
          <tr key={d._id} style={{borderBottom:'1px solid #eee'}}>
            <td>{d.fileName}</td>
            <td>{d.mimeType}</td>
            <td>{(d.size/1024).toFixed(1)} KB</td>
            <td style={{whiteSpace:'nowrap'}}>
              <button onClick={() => onPreview(d._id)} style={{marginRight:8}}>Preview</button>
              <button onClick={() => onReplace(d._id)} style={{marginRight:8}}>Replace</button>
              <button onClick={() => onDelete(d._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
