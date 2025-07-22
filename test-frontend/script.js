const API_URL = 'http://localhost:5000/api';

// Upload form handler
document.getElementById('uploadForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
    form.reset();
    loadDocuments();
  } catch (err) {
    alert('Upload failed');
    console.error(err);
  }
});

// Load and display documents
async function loadDocuments() {
  const list = document.getElementById('documentList');
  list.innerHTML = '';

  try {
    const res = await fetch(`${API_URL}/documents`);
    const docs = await res.json();

    docs.forEach(doc => {
      const item = document.createElement('li');
      item.innerHTML = `
        <strong>${doc.title}</strong> by ${doc.author} 
        [<a href="http://localhost:5000/uploads/${doc.filename}" target="_blank">Download</a>]
      `;
      list.appendChild(item);
    });
  } catch (err) {
    list.innerHTML = 'Failed to load documents.';
  }
}

loadDocuments(); // Load on page load
