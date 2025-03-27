const  ListStyled = `

.note-list, 
.archive-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  width: 100%;
}

.empty-state {
  text-align: center;
  color: #888;
  padding: 2rem;
  grid-column: 1 / -1;
}
`;

export default ListStyled