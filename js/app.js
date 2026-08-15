const products = [
    { name: "Cloudline Modular Sofa", cat: "Furniture", price: 899, old: 1099, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80", rating: "★★★★★", reviews: 324 },
    { name: "Luna Bouclé Accent Chair", cat: "Furniture", price: 279, old: 349, img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80", rating: "★★★★★", reviews: 181 },
    { name: "Arlo Ceramic Table Lamp", cat: "Lighting", price: 69, old: 89, img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80", rating: "★★★★☆", reviews: 96 },
    { name: "Sienna Textured Area Rug", cat: "Rugs", price: 189, old: 249, img: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=800&q=80", rating: "★★★★★", reviews: 241 },
    { name: "Linen Cloud Duvet Set", cat: "Bedding", price: 119, old: 159, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80", rating: "★★★★★", reviews: 418 },
    { name: "Oakline Dining Table", cat: "Furniture", price: 449, old: 599, img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80", rating: "★★★★☆", reviews: 133 },
    { name: "Woven Basket Collection", cat: "Decor", price: 54, old: 72, img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80", rating: "★★★★★", reviews: 77 },
    { name: "Cedar Outdoor Lounge Set", cat: "Outdoor", price: 599, old: 799, img: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=800&q=80", rating: "★★★★★", reviews: 205 }
];
let activeCat = "All", cart = 0;

function render(list = products) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = list.map((p, i) => `
 <div class="col-6 col-lg-3 product-item">
  <article class="product-card rounded-1 overflow-hidden">
   <button class="heart" onclick="favorite(this)" aria-label="Favorite"><i class="bi bi-heart"></i></button>
   <img class="product-img" src="${p.img}" alt="${p.name}">
   <div class="p-3">
    <span class="badge-sale">${p.old ? "SALE" : "NEW"}</span>
    <h3 class="h6 fw-bold mt-2 mb-1">${p.name}</h3>
    <div class="stars">${p.rating} <span class="text-secondary">(${p.reviews})</span></div>
    <div class="mt-2"><span class="price">$${p.price}</span> <span class="old">$${p.old}</span></div>
    <button class="btn btn-dark w-100 mt-3" onclick="addCart('${p.name}')">Add to cart</button>
   </div>
  </article>
 </div>`).join("");
}
function filterProducts(cat) {
    activeCat = cat;
    const q = document.getElementById("searchInput").value.toLowerCase();
    let list = products.filter(p => (cat === "All" || p.cat === cat || cat === "Sale" && p.old) && p.name.toLowerCase().includes(q));
    render(list);
    document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
}
function sortProducts() {
    let list = products.filter(p => (activeCat === "All" || p.cat === activeCat || activeCat === "Sale" && p.old));
    const q = document.getElementById("searchInput").value.toLowerCase(); if (q) list = list.filter(p => p.name.toLowerCase().includes(q));
    const v = document.getElementById("sortSelect").value;
    if (v === "low") list.sort((a, b) => a.price - b.price); if (v === "high") list.sort((a, b) => b.price - a.price); render(list);
}
document.getElementById("searchInput").addEventListener("input", () => filterProducts(activeCat));
function addCart(name) { cart++; document.getElementById("cartCount").textContent = cart; showToast(name + " added to cart"); }
function showCart() { showToast(cart ? `You have ${cart} item${cart > 1 ? "s" : ""} in your cart.` : "Your cart is empty."); }
function showToast(text) { document.getElementById("toastText").textContent = text; document.getElementById("toast").style.display = "block"; clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => document.getElementById("toast").style.display = "none", 2200) }
function favorite(btn) { btn.innerHTML = btn.innerHTML.includes("heart-fill") ? '<i class="bi bi-heart"></i>' : '<i class="bi bi-heart-fill"></i>' }
render();