// src/components/ui/Card.jsx
export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-card-bg p-4 rounded shadow-sm border border-border ${className}`}>
      {children}
    </div>
  );
}