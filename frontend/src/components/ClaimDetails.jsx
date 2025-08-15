import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getClaim, deleteClaim } from '../api/claims';
import { listDocuments } from '../api/documents';
import StatusChip from './StatusChip';
import DocumentUploader from './DocumentUploader';
import DocumentList from './DocumentList';
import { format } from 'date-fns';

export default function ClaimDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claim, setClaim] = useState(null);
  const [docs, setDocs] = useState([]);

  const refresh = async () => {
    const [c, d] = await Promise.all([getClaim(id), listDocuments(id)]);
    setClaim(c); setDocs(d);
  };

  useEffect(() => { refresh(); }, [id]);

  if (!claim) return <div style={{padding:24}}>Loading…</div>;

  const canEdit = claim.status === 'Draft' || claim.status === 'Pending';

  const onDeleteClaim = async () => {
    if (!window.confirm('Delete this claim?')) return;
    await deleteClaim(id);
    navigate('/claims');
  };

  return (
    <div style={{padding:24}}>
      <h2>Claim Details</h2>
      <div style={{marginBottom:12}}>
        <div><b>Policy #:</b> {claim.policyNumber}</div>
        <div><b>Incident Date:</b> {format(new Date(claim.incidentDate), 'yyyy-MM-dd')}</div>
        <div><b>Type:</b> {claim.claimType}</div>
        <div><b>Status:</b> <StatusChip value={claim.status} /></div>
        <div><b>Description:</b><br/>{claim.description}</div>
      </div>

      <div style={{marginBottom:12}}>
        {canEdit && <Link to={`/claims/${id}/edit`} style={{marginRight:8}}>Edit</Link>}
        {canEdit && <button onClick={onDeleteClaim}>Delete</button>}
      </div>

      <h3>Documents</h3>
      <DocumentUploader claimId={id} onUploaded={refresh} />
      <DocumentList docs={docs} onChanged={refresh} />
    </div>
  );
}
