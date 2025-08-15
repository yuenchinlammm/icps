import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listClaims, deleteClaim } from '../api/claims';
import { format } from 'date-fns';
import StatusChip from './StatusChip';

export default function ClaimList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try { setRows(await listClaims()); } finally { setLoading(false); }
    })();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm('Delete this claim?')) return;
    await deleteClaim(id);
    setRows(rows.filter(r => r._id !== id));
  };

  if (loading) return <div style={{padding:24}}>Loading…</div>;

  return (
    <div style={{padding:24}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>My Claims</h2>
        <button onClick={() => navigate('/claims/new')}>New Claim</button>
      </div>

      <table width="100%" cellPadding="8" style={{borderCollapse:'collapse', marginTop:12}}>
        <thead>
          <tr style={{textAlign:'left', borderBottom:'1px solid #ddd'}}>
            <th>Policy #</th><th>Incident</th><th>Type</th><th>Status</th><th>Updated</th><th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r._id} style={{borderBottom:'1px solid #eee'}}>
              <td>{r.policyNumber}</td>
              <td>{format(new Date(r.incidentDate), 'yyyy-MM-dd')}</td>
              <td>{r.claimType}</td>
              <td><StatusChip value={r.status}/></td>
              <td>{format(new Date(r.updatedAt), 'yyyy-MM-dd HH:mm')}</td>
              <td style={{whiteSpace:'nowrap'}}>
                <Link to={`/claims/${r._id}`} style={{marginRight:8}}>View</Link>
                {(r.status === 'Draft' || r.status === 'Pending') && (
                  <>
                    <Link to={`/claims/${r._id}/edit`} style={{marginRight:8}}>Edit</Link>
                    <button onClick={() => onDelete(r._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
