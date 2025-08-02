const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    if (!res.ok) return Promise.reject(`Error: ${res.status}`);
    return res.json();
  });
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => {
    if (!res.ok) return Promise.reject(`Error: ${res.status}`);
    return res.json();
  });
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    return res.ok ? Promise.resolve() : Promise.reject(`Error: ${res.status}`);
  });
}

export { getItems, addItem, deleteItem };
