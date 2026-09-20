const EditRoomPage = () => (
  <div className="page-shell">
    <div className="card" style={{ padding: '24px' }}>
      <h2>Edit room</h2>
      <form className="auth-form">
        <label>Room name<input type="text" defaultValue="Skyline Suite" /></label>
        <label>Base price<input type="number" defaultValue="4200" /></label>
        <button type="button" className="btn btn-primary">Update room</button>
      </form>
    </div>
  </div>
);

export default EditRoomPage;
