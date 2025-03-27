const ItemsStyle = `
        @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css');
note-item {
  display: block;
  width: 100%;
}

note-item .note-card {
  background: white;
  border: 1px solid #e8e6e6;
  padding: 1rem;
  border-radius: 8px;
  position: relative;
  transition: box-shadow 0.3s, transform 0.3s;
}

note-item .note-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

note-item h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

note-item p {
  font-size: 1rem;
  margin: 0.5rem 0;
  white-space: pre-wrap;
}

note-item .created-at {
  font-size: 0.85rem;
  color: #777;
  display: block;
  margin-top: 0.5rem;
}

note-item .note-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

note-item .note-actions button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.3s;
}

note-item .note-actions .archive-btn {
  color: var(--success);
}

note-item .note-actions .delete-btn {
  color: var(--danger);
}
`;

export default ItemsStyle;
