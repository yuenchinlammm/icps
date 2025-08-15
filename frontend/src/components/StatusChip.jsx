export default function StatusChip({ value }) {
  const color = {
    Draft: '#777',
    Pending: '#8a2be2',
    'Under Review': '#1e90ff',
    Approved: '#2e8b57',
    Rejected: '#dc143c'
  }[value] || '#555';
  return (
    <span style={{
      background: color, color: '#fff', padding: '2px 8px',
      borderRadius: 12, fontSize: 12
    }}>{value}</span>
  );
}
