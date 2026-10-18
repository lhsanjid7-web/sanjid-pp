const WHATSAPP_NUMBER = "8801628801587";
// Large starter catalog: these are demo listings with editable sample prices and stock.
// Replace names, photos, prices, stock, and specifications with verified real inventory before launch.
const IMAGE_SETS = {
  "Bags": [1,2,3,4,17,18,19,20].map(n=>`assets/products/p${String(n).padStart(3,"0")}.webp`),
  "Watches": [5,6,7,8,21,22,23,24].map(n=>`assets/products/p${String(n).padStart(3,"0")}.webp`),
  "Sunglasses": [9,25,26,66,67,68,69].map(n=>`assets/products/p${String(n).padStart(3,"0")}.webp`),
  "Wallets": [10,27,28,70,71,72,73].map(n=>`assets/products/p${String(n).padStart(3,"0")}.webp`),
  "Belts": [11,29,30,74,75,76,77].map(n=>`assets/products/p${String(n).padStart(3,"0")}.webp`),
  "Pants": [14,37,38,39,40].map(n=>`assets/products/p${String(n).padStart(3,"0")}.webp`),
  "Underwear": [49,58,59,60,61].map(n=>`assets/products/p${String(n).padStart(3,"0")}.webp`),
  "Clippers": [45,50,51,52,53].map(n=>`assets/products/p${String(n).padStart(3,"0")}.webp`),
  "Sandals": [12,31,32,78,79,80,81].map(n=>`assets/products/p${String(n).padStart(3,"0")}.webp`),
  "Mirrors": [46,47,48,54,55,56,57].map(n=>`assets/products/p${String(n).padStart(3,"0")}.webp`),
  "TVs": [16,43,44,64,65].map(n=>`assets/products/p${String(n).padStart(3,"0")}.webp`),
  "iPhones": [15,41,42,62,63].map(n=>`assets/products/p${String(n).padStart(3,"0")}.webp`),
  "Formal Shirts": [13,33,34,35,36].map(n=>`assets/products/p${String(n).padStart(3,"0")}.webp`)
};
const IMAGE_SET_VERSION = "4";
function pickImage(category, index=0) { const set=IMAGE_SETS[category]||IMAGE_SETS.Bags; return set[index % set.length]; }
function assignCatalogImages(items) { const seen={}; return items.map(item=>{const i=seen[item.category]||0;seen[item.category]=i+1;return {...item,image:pickImage(item.category,i)};}); }
const COLORS = ["Black","Silver","White","Cream","Brown","Navy","Grey","Tan","Olive","Blue","Burgundy","Rose Gold"];
function makeItems(category, names, minPrice, maxPrice, count, options={}) {
  return Array.from({length:count}, (_,i) => {
    const baseName = names[i % names.length];
    const tier = i % 5;
    const price = Math.round((minPrice + (maxPrice-minPrice) * (count <= 1 ? 0 : i/(count-1))) / 10) * 10;
    const color = COLORS[i % COLORS.length];
    const extra = options.storage ? ` · ${options.storage[i % options.storage.length]}` : (options.sizes ? ` · ${options.sizes[i % options.sizes.length]}` : ` · ${color}`);
    return {
      id: `catalog-${category.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${String(i+1).padStart(3,'0')}`,
      name: `${baseName}${extra}`,
      category,
      price: options.priceFor ? options.priceFor(i, price) : price,
      stock: [8,12,5,0,17,9,4,14][(i + tier) % 8],
      colors: options.colorsFor ? options.colorsFor(i) : [color, COLORS[(i+3)%COLORS.length], COLORS[(i+7)%COLORS.length]],
      description: `${baseName} from our ${category.toLowerCase()} demo collection. Sample listing for browsing and testing. Confirm the exact model, materials, size, specifications, price, warranty, and availability with the seller before ordering.`,
      image: pickImage(category, i),
      badge: i % 11 === 0 ? "FEATURED" : i % 7 === 0 ? "NEW ARRIVAL" : "COLLECTION"
    };
  });
}
function buildCatalog() {
  const items = [];
  items.push(...makeItems("Bags", ["Signature Tote","Mini Shoulder Bag","Everyday Crossbody","Structured Top Handle","Quilted Chain Bag","Travel Duffel","Canvas Shopper","Evening Clutch","Hobo Bag","Laptop Tote"], 850, 18500, 40));
  items.push(...makeItems("Watches", ["Classic Analog Watch","Minimal Steel Watch","Chronograph Watch","Mesh Strap Watch","Sport Digital Watch","Luxury Dress Watch","Square Dial Watch","Automatic Style Watch","Leather Strap Watch","Smart Fitness Watch","Ceramic Finish Watch","Skeleton Dial Watch"], 650, 85000, 60));
  items.push(...makeItems("Sunglasses", ["Aviator Sunglasses","Classic Wayfarer","Round Frame Sunglasses","Square Frame Sunglasses","Sport Wrap Sunglasses","Retro Cat-Eye","Minimal Metal Frame","Oversized Fashion Shades"], 350, 12500, 40));
  items.push(...makeItems("Wallets", ["Slim Bifold Wallet","Zip-Around Wallet","Card Holder Wallet","Long Travel Wallet","Minimal Money Clip","Textured Leather-Style Wallet","Compact Coin Wallet","RFID-Style Card Wallet"], 250, 6500, 40));
  items.push(...makeItems("Belts", ["Classic Pin Buckle Belt","Reversible Belt","Minimal Buckle Belt","Formal Dress Belt","Casual Web Belt","Braided Belt","Automatic Buckle Belt","Everyday Leather-Style Belt"], 300, 7500, 40));
  items.push(...makeItems("Pants", ["Slim Fit Chino Pants","Classic Straight Pants","Relaxed Cargo Pants","Everyday Denim Jeans","Tapered Formal Trousers","Wide-Leg Casual Pants","Stretch Cotton Pants","Pleated Smart Pants","Utility Cargo Trousers","Lightweight Summer Pants"], 650, 6500, 40, {sizes:["S","M","L","XL","XXL"]}));
  items.push(...makeItems("Underwear", ["Cotton Boxer Briefs","Classic Briefs","Comfort Trunks","Seamless Boxer Shorts","Everyday Cotton Boxers","Sport Performance Trunks","Multipack Briefs","Soft Stretch Boxers"], 180, 2200, 40, {sizes:["S","M","L","XL","XXL"]}));
  items.push(...makeItems("Clippers", ["Cordless Hair Clipper","Precision Beard Trimmer","Multi-Grooming Kit","Professional Hair Trimmer","Rechargeable Detail Trimmer","Water-Resistant Groomer","Compact Travel Clipper","Barber Style Clipper"], 550, 18000, 40));
  items.push(...makeItems("Sandals", ["Everyday Slide Sandals","Comfort Strap Sandals","Minimal Leather-Style Slides","Sport Sandals","Classic Buckle Sandals","Cushioned Home Slides","Two-Strap Sandals","Casual Outdoor Sandals"], 350, 5500, 40, {sizes:["39","40","41","42","43","44"]}));
  items.push(...makeItems("Mirrors", ["Round Wall Mirror","Full-Length Floor Mirror","LED Vanity Mirror","Arch Top Mirror","Minimal Desk Mirror","Decorative Oval Mirror","Wood-Frame Wall Mirror","Compact Makeup Mirror"], 750, 22000, 40));
  items.push(...makeItems("TVs", ["Samsung Crystal UHD TV","Samsung QLED Smart TV","LG UHD Smart TV","LG OLED Smart TV","Sony Bravia LED TV","Sony Bravia OLED TV","TCL QLED Google TV","Xiaomi Smart TV","Hisense 4K UHD TV","TCL Mini-LED TV"], 14500, 420000, 40, {storage:["32 inch","40 inch","43 inch","50 inch","55 inch","65 inch","75 inch","85 inch"]}));
  const phoneCatalog = [];
  const flagshipModels = ["iPhone 18", "iPhone 18 Pro", "iPhone 18 Pro Max"];
  const storages = ["256 GB", "512 GB", "1 TB"];
  flagshipModels.forEach((model, mi) => storages.forEach((storage, si) => phoneCatalog.push({model, storage, price: [155000, 175000, 205000][mi] + [0, 14000, 32000][si]})));
  const olderModels = [
    "iPhone 17", "iPhone 17 Air", "iPhone 17 Pro", "iPhone 17 Pro Max", "iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max",
    "iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max", "iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max",
    "iPhone 13", "iPhone 13 mini", "iPhone 13 Pro", "iPhone 13 Pro Max", "iPhone 12", "iPhone 12 mini", "iPhone 12 Pro", "iPhone 12 Pro Max",
    "iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max", "iPhone SE (2nd gen)", "iPhone XS", "iPhone XS Max", "iPhone XR", "iPhone X", "iPhone 8", "iPhone 8 Plus",
    "iPhone 7", "iPhone 7 Plus", "iPhone 6s", "iPhone 6s Plus", "iPhone 6", "iPhone 6 Plus", "iPhone 5s", "iPhone 5c", "iPhone 5", "iPhone 4s", "iPhone 4", "iPhone 3GS", "iPhone 3G", "Original iPhone"
  ];
  olderModels.forEach((model, i) => {
    const generation = Number((model.match(/iPhone (\d+)/)||[])[1] || 8);
    let base = generation >= 17 ? 125000 : generation >= 16 ? 95000 : generation >= 15 ? 70000 : generation >= 14 ? 52000 : generation >= 13 ? 38000 : generation >= 12 ? 28000 : 18000;
    if (/Pro Max/.test(model)) base *= 1.28; else if (/Pro/.test(model)) base *= 1.16; else if (/Plus/.test(model)) base *= 1.08;
    const storage = storages[i % storages.length];
    phoneCatalog.push({model, storage, price: Math.round((base + (storage === "512 GB" ? 12000 : storage === "1 TB" ? 28000 : 0))/1000)*1000});
  });
  olderModels.slice(0, 7).forEach((model, i) => {
    const generation = Number((model.match(/iPhone (\d+)/)||[])[1] || 8);
    let base = generation >= 17 ? 125000 : generation >= 16 ? 95000 : 70000;
    if (/Pro Max/.test(model)) base *= 1.28; else if (/Pro/.test(model)) base *= 1.16; else if (/Plus/.test(model)) base *= 1.08;
    phoneCatalog.push({model, storage: "1 TB", price: Math.round((base + 28000)/1000)*1000});
  });
  phoneCatalog.forEach((phone, i) => {
    const color = COLORS[i % COLORS.length];
    items.push({
      id: `catalog-iphone-${String(i+1).padStart(3,'0')}`,
      name: `${phone.model} · ${phone.storage}`,
      category: "iPhones",
      price: phone.price,
      stock: [5,8,3,0,12,6][i % 6],
      colors: [color, COLORS[(i+3)%COLORS.length], COLORS[(i+7)%COLORS.length]],
      description: `Sample listing for ${phone.model} with ${phone.storage} storage. The iPhone 18 series and all listed prices/specifications must be verified with your supplier before publishing. Confirm region, condition, warranty, storage, color, and availability before ordering.`,
      image: pickImage("iPhones", i),
      badge: i < 9 ? "FLAGSHIP · DEMO" : "MODEL · DEMO"
    });
  });
  items.push(...makeItems("Formal Shirts", ["Classic White Formal Shirt","Sky Blue Office Shirt","Slim Fit Black Shirt","Navy Business Shirt","Striped Formal Shirt","Light Pink Dress Shirt","Ivory Formal Shirt","Checked Office Shirt","Charcoal Formal Shirt","Soft Lavender Shirt"], 650, 4200, 30, {sizes:["S","M","L","XL","XXL"]}));
  return items;
}
const DEFAULT_PRODUCTS = buildCatalog();
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => "৳" + Number(n||0).toLocaleString("en-BD");
const safe = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const colorMap = {"Onyx Black":"#171719","Black":"#171719","Stone Grey":"#8e929a","Silver":"#c7c9d0","Ivory":"#e8e1d5","Cream":"#e3d8c6","Charcoal":"#4b4c50","Taupe":"#a49586","Smoke Grey":"#777a80","Brown":"#72503a","Silver Grey":"#a8abb2","White":"#f3f3ef","Grey":"#858993","Tan":"#b88d61"};
let products = loadProducts(), cart = {}, wishlist = new Set(), activeCategory = "All", selectedProduct = null, selectedColor = "", selectedQty = 1, toastTimer;
function loadProducts(){try{const v=JSON.parse(localStorage.getItem("mls-products"));if(Array.isArray(v)&&v.length>=500){if(localStorage.getItem("mls-image-version")!==IMAGE_SET_VERSION){const updated=assignCatalogImages(v);localStorage.setItem("mls-products",JSON.stringify(updated));localStorage.setItem("mls-image-version",IMAGE_SET_VERSION);return updated;}return v;}localStorage.removeItem("mls-products");localStorage.setItem("mls-image-version",IMAGE_SET_VERSION);return structuredClone(DEFAULT_PRODUCTS)}catch{return structuredClone(DEFAULT_PRODUCTS)}}
function persistProducts(){localStorage.setItem("mls-products",JSON.stringify(products))}
function showToast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2500)}
function openLayer(id){$("#"+id).classList.remove("hidden");document.body.classList.add("locked")}
function closeLayer(id){$("#"+id).classList.add("hidden");if(!$$(".drawer-backdrop:not(.hidden),.modal-backdrop:not(.hidden)").length)document.body.classList.remove("locked")}
function enterStore(){ $("#intro").classList.add("hidden");$("#store").classList.remove("hidden");window.scrollTo(0,0);const productId=new URLSearchParams(window.location.search).get("product");if(productId)setTimeout(()=>openProduct(productId),80)}
function categories(){const cats=["All",...new Set(products.map(p=>p.category))];const counts=products.reduce((a,p)=>(a[p.category]=(a[p.category]||0)+1,a),{});$("#category-row").innerHTML=cats.map(c=>`<button class="category-chip ${c===activeCategory?"active":""}" data-category="${safe(c)}">${safe(c)} <span class="category-count">${c==="All"?products.length:counts[c]}</span></button>`).join("")}
function filteredProducts(){let list=products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(!$("#in-stock-only").checked||p.stock>0));const q=$("#search-input").value.trim().toLowerCase();if(q)list=list.filter(p=>[p.name,p.category,p.description,...p.colors].join(" ").toLowerCase().includes(q));const sort=$("#sort-select").value;if(sort==="price-asc")list.sort((a,b)=>a.price-b.price);if(sort==="price-desc")list.sort((a,b)=>b.price-a.price);if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));return list}
function renderProducts(){categories();const list=filteredProducts();$("#result-count").textContent=`${list.length} matching items`;$("#product-grid").innerHTML=list.map(p=>`<article class="product-card"><div class="product-image"><img src="${safe(p.image)}" alt="${safe(p.name)}" loading="lazy" data-photo="${p.id}" onerror="this.onerror=null;this.src='assets/products/p001.webp'"><span class="product-badge">${safe(p.category)}</span><button class="heart-button ${wishlist.has(p.id)?"active":""}" data-wish="${p.id}" aria-label="Save ${safe(p.name)}">${wishlist.has(p.id)?"♥":"♡"}</button><button class="photo-show-button" data-photo="${p.id}">View photo ⤢</button></div><div class="product-info"><div class="product-meta"><span>${safe(p.category)}</span><span class="stock-label ${p.stock>0?"":"out"}">${p.stock>0?"Available":"Ask availability"}</span></div><h3 title="${safe(p.name)}">${safe(p.name)}</h3><div class="product-bottom"><span class="product-price">${money(p.price)}</span><span class="product-meta">${p.colors.length} options</span></div><div class="product-actions"><button class="button button-primary" data-buy="${p.id}">Buy now ↗</button><button class="button button-outline details-button" data-details="${p.id}">Details</button></div></div></article>`).join("");$("#empty-state").classList.toggle("hidden",list.length!==0);$("#product-grid").classList.toggle("hidden",list.length===0);updateCounts()}
function updateCounts(){$("#cart-count").textContent=Object.values(cart).reduce((s,x)=>s+x.qty,0);$("#wish-count").textContent=wishlist.size}
function findProduct(id){return products.find(p=>p.id===id)}
function toggleWish(id){wishlist.has(id)?wishlist.delete(id):wishlist.add(id);renderProducts();renderWishlist();showToast(wishlist.has(id)?"Added to wishlist":"Removed from wishlist")}
function addToCart(id,color,qty){const p=findProduct(id);if(!p||p.stock<1)return showToast("This item is currently out of stock.");const key=id+"::"+color;const existing=cart[key]?.qty||0;if(existing+qty>p.stock)return showToast(`Only ${p.stock} available in this demo.`);cart[key]={id,color,qty:existing+qty};renderCart();updateCounts();showToast("Added to your bag")}
function renderCart(){const entries=Object.entries(cart);$("#cart-items").innerHTML=entries.length?entries.map(([key,item])=>{const p=findProduct(item.id);if(!p)return "";return `<div class="cart-line"><img src="${safe(p.image)}" alt=""><div><h4>${safe(p.name)}</h4><p>${safe(item.color)}</p><strong>${money(p.price*item.qty)}</strong><div class="qty-control"><button data-qty="-1" data-key="${safe(key)}">−</button><span>${item.qty}</span><button data-qty="1" data-key="${safe(key)}">+</button></div><button class="remove-line" data-remove="${safe(key)}">Remove</button></div></div>`}).join(""):`<div class="empty-state"><span>◇</span><h3>Your bag is waiting</h3><p>Add a piece you love to get started.</p></div>`;const total=entries.reduce((sum,[,it])=>sum+(findProduct(it.id)?.price||0)*it.qty,0);$("#cart-total").textContent=money(total);$("#checkout-whatsapp").disabled=!entries.length;updateCounts()}
function renderWishlist(){const list=[...wishlist].map(findProduct).filter(Boolean);$("#wishlist-items").innerHTML=list.length?list.map(p=>`<div class="cart-line"><img src="${safe(p.image)}" alt=""><div><h4>${safe(p.name)}</h4><p>${safe(p.category)} · ${p.colors.length} colors</p><strong>${money(p.price)}</strong><div class="qty-control"><button data-details="${p.id}">View details</button></div></div><button class="remove-line" data-wish="${p.id}">♥ Remove</button></div>`).join(""):`<div class="empty-state"><span>♡</span><h3>No saved pieces yet</h3><p>Tap the heart on any product to save it here.</p></div>`;updateCounts()}
function openProduct(id){const p=findProduct(id);if(!p)return;selectedProduct=p;selectedColor=p.colors[0]||"Default";selectedQty=1;$("#modal-content").innerHTML=`<div class="modal-product-layout"><img src="${safe(p.image)}" alt="${safe(p.name)}" onerror="this.src='https://placehold.co/700x850/17191f/e6e7eb?text=Product+Photo'"><div class="modal-product-copy"><div class="eyebrow">${safe(p.category)} · ${safe(p.badge||"CURATED")}</div><h2 id="modal-name">${safe(p.name)}</h2><div class="modal-price">${money(p.price)}</div><p class="modal-description">${safe(p.description)}</p><span class="option-label">CHOOSE A COLOR</span><div class="color-options">${p.colors.map((c,i)=>`<button class="color-option ${i===0?"selected":""}" data-color="${safe(c)}">${safe(c)}</button>`).join("")}</div><span class="option-label">QUANTITY</span><select id="modal-qty" class="quantity-select">${Array.from({length:Math.max(1,Math.min(p.stock,10))},(_,i)=>`<option value="${i+1}">${i+1}</option>`).join("")}</select><div class="modal-stock">${p.stock>0?`${p.stock} available in demo stock`:"Currently out of stock"}</div><div class="product-actions"><button id="modal-add" class="button button-outline" ${p.stock<=0?"disabled":""}>Add to bag</button><button id="modal-buy" class="button button-primary">${p.stock>0?"BUY NOW ↗":"ASK AVAILABILITY ↗"}</button></div><p class="demo-note">Sample product details: verify all claims, price, and stock before publishing.</p></div></div>`;openLayer("product-modal")}
function whatsappUrl(message){return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
function productPageLink(p){const u=new URL(window.location.href);u.hash="";u.searchParams.set("product",p.id);return u.href}
function productOrderMessage(p,color,qty){const imageUrl=new URL(p.image,window.location.href).href;return `Hello SANJID! I want to order or check availability for this product:\n\nProduct: ${p.name}\nCategory: ${p.category}\nColor / option: ${color}\nQuantity: ${qty}\nUnit price: ${money(p.price)}\nEstimated subtotal: ${money(p.price*qty)}\nDemo stock status: ${p.stock>0?"Marked in stock":"Marked out of stock — please confirm"}\n\nProduct page: ${productPageLink(p)}\nProduct photo: ${imageUrl}\n\nPlease confirm the real price, availability, delivery charge, and delivery details.`}
function buyProduct(id,color,qty){const p=findProduct(id);if(!p)return showToast("Product not found.");window.open(whatsappUrl(productOrderMessage(p,color||p.colors[0]||"Default",qty||1)),"_blank","noopener,noreferrer")}
function cartOrder(){const entries=Object.values(cart);if(!entries.length)return;const lines=entries.map(it=>{const p=findProduct(it.id);return p?`• ${p.name} — ${it.color} × ${it.qty} = ${money(p.price*it.qty)}`:""}).filter(Boolean);const total=entries.reduce((s,it)=>s+(findProduct(it.id)?.price||0)*it.qty,0);window.open(whatsappUrl(`Hello SANJID! I'd like to order these items:\n\n${lines.join("\n")}\n\nEstimated total: ${money(total)}\n\nPlease confirm availability, delivery charge, and payment/delivery details.`),"_blank","noopener,noreferrer")}
function openAdmin(){renderAdminList();openLayer("admin-modal")}
function renderAdminList(){$("#admin-list").innerHTML=products.map(p=>`<div class="admin-row"><div><b>${safe(p.name)}</b><br><span>${safe(p.category)} · ${money(p.price)} · Stock ${p.stock}</span></div><div><button data-edit="${p.id}">Edit</button> <button data-delete="${p.id}">Delete</button></div></div>`).join("")}
function resetAdminForm(){$("#product-form").reset();$("#edit-id").value=""}
function editProduct(id){const p=id?findProduct(id):null;$("#edit-id").value=p?.id||"";$("#edit-name").value=p?.name||"";$("#edit-category").value=p?.category||"Accessories";$("#edit-price").value=p?.price??"";$("#edit-stock").value=p?.stock??"";$("#edit-colors").value=p?.colors.join(", ")||"";$("#edit-image").value=p?.image||"";$("#edit-description").value=p?.description||"";$("#edit-name").focus()}
function saveProduct(e){e.preventDefault();const id=$("#edit-id").value||("p"+Date.now());const item={id,name:$("#edit-name").value.trim(),category:$("#edit-category").value.trim(),price:Number($("#edit-price").value),stock:Number($("#edit-stock").value),colors:$("#edit-colors").value.split(",").map(s=>s.trim()).filter(Boolean),image:$("#edit-image").value.trim(),description:$("#edit-description").value.trim(),badge:"CURATED"};if(!item.colors.length)return showToast("Add at least one color.");const index=products.findIndex(p=>p.id===id);if(index>=0)products[index]=item;else products.unshift(item);persistProducts();renderProducts();renderAdminList();resetAdminForm();showToast("Product saved on this device.")}
const enterButton=$("#enter-store");if(enterButton)enterButton.addEventListener("click",enterStore);
$("#search-input").addEventListener("input",renderProducts);$("#sort-select").addEventListener("change",renderProducts);$("#in-stock-only").addEventListener("change",renderProducts);
$("#category-row").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(b){activeCategory=b.dataset.category;renderProducts()}});
$("#product-grid").addEventListener("click",e=>{const buy=e.target.closest("[data-buy]"),details=e.target.closest("[data-details]"),wish=e.target.closest("[data-wish]");if(buy)buyProduct(buy.dataset.buy);if(details)openProduct(details.dataset.details);if(wish)toggleWish(wish.dataset.wish)});
$("#clear-filters").addEventListener("click",()=>{$("#search-input").value="";$("#in-stock-only").checked=false;activeCategory="All";$("#sort-select").value="featured";renderProducts()});
$$(".cart-open").forEach(b=>b.addEventListener("click",()=>{renderCart();openLayer("cart-drawer")}));
$("#wishlist-shortcut").addEventListener("click",()=>{renderWishlist();openLayer("wishlist-drawer")});
$("#cart-items").addEventListener("click",e=>{const q=e.target.closest("[data-qty]"),rm=e.target.closest("[data-remove]");if(rm){delete cart[rm.dataset.remove];renderCart();return}if(q){const item=cart[q.dataset.key];if(!item)return;const next=item.qty+Number(q.dataset.qty);const p=findProduct(item.id);if(next<1)delete cart[q.dataset.key];else if(next<=p.stock)item.qty=next;else showToast(`Only ${p.stock} available.`);renderCart()}});
$("#wishlist-items").addEventListener("click",e=>{const w=e.target.closest("[data-wish]"),d=e.target.closest("[data-details]");if(w)toggleWish(w.dataset.wish);if(d){closeLayer("wishlist-drawer");openProduct(d.dataset.details)}});
$("#checkout-whatsapp").addEventListener("click",cartOrder);
$$("[data-close]").forEach(b=>b.addEventListener("click",()=>closeLayer(({cart:"cart-drawer",wishlist:"wishlist-drawer",product:"product-modal",admin:"admin-modal"})[b.dataset.close])));
$$(".drawer-backdrop,.modal-backdrop").forEach(layer=>layer.addEventListener("click",e=>{if(e.target===layer)closeLayer(layer.id)}));
$("#modal-content").addEventListener("click",e=>{const c=e.target.closest("[data-color]");if(c){selectedColor=c.dataset.color;$$(".color-option").forEach(x=>x.classList.toggle("selected",x===c))}if(e.target.id==="modal-add"){addToCart(selectedProduct.id,selectedColor,Number($("#modal-qty").value));closeLayer("product-modal")}if(e.target.id==="modal-buy")buyProduct(selectedProduct.id,selectedColor,Number($("#modal-qty").value))});
$("#modal-content").addEventListener("change",e=>{if(e.target.id==="modal-qty")selectedQty=Number(e.target.value)});
$("#admin-open").addEventListener("click",openAdmin);$("#product-form").addEventListener("submit",saveProduct);$("#new-product").addEventListener("click",()=>resetAdminForm());
$("#admin-list").addEventListener("click",e=>{const ed=e.target.closest("[data-edit]"),del=e.target.closest("[data-delete]");if(ed)editProduct(ed.dataset.edit);if(del){if(confirm("Delete this product from this browser's demo store?")){products=products.filter(p=>p.id!==del.dataset.delete);persistProducts();renderProducts();renderAdminList();showToast("Product deleted.")}}});
$("#menu-toggle").addEventListener("click",()=>$(".desktop-nav").classList.toggle("open"));$("#menu-help").addEventListener("click",e=>{e.preventDefault();window.open(whatsappUrl("Hello SANJID, I need help with your products."),"_blank","noopener,noreferrer");$(".desktop-nav").classList.remove("open")});$("#photo-viewer-close").addEventListener("click",()=>{$("#photo-viewer").classList.add("hidden");if(!$$(".drawer-backdrop:not(.hidden),.modal-backdrop:not(.hidden)").length)document.body.classList.remove("locked")});$("#photo-viewer").addEventListener("click",e=>{if(e.target.id==="photo-viewer")$("#photo-viewer-close").click()});$$(".desktop-nav a").forEach(a=>a.addEventListener("click",()=>$(".desktop-nav").classList.remove("open")));
document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();enterStore();$("#search-input").focus()}if(e.key==="Escape")$$(".drawer-backdrop:not(.hidden),.modal-backdrop:not(.hidden)").forEach(el=>closeLayer(el.id))});
$("#year").textContent=new Date().getFullYear();
renderProducts();renderCart();renderWishlist();
// Auto-enter the storefront; no click is required.
enterStore();