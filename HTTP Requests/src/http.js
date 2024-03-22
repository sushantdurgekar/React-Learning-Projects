export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const dataRes = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  return dataRes.places;
}
export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const dataRes = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }
  return dataRes.places;
}
export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places: places }),
    headers: { "Content-Type": "application/json" },
  });
  const dataRes = await response.json();
  if (!response.ok) {
    throw new Error("Failed to Update places");
  }
  return dataRes.message;
}
