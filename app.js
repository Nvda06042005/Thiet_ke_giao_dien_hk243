import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.x/firebase-auth.js";
import {
  doc, setDoc, getDoc,
  collection, onSnapshot,
  addDoc, updateDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/11.x/firebase-firestore.js";

// Elements from your HTML:
const emailInp = document.getElementById('email');
const passInp = document.getElementById('password');
const btnSignup = document.getElementById('signup');
const btnSignin = document.getElementById('signin');
const btnSignout = document.getElementById('signout');
const adminPanel = document.getElementById('admin-panel');
const mainStore = document.getElementById('store');
const cartDiv = document.getElementById('cart');
const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');

// 1. Đăng ký
btnSignup.onclick = async () => {
  try {
    const uc = await createUserWithEmailAndPassword(auth, emailInp.value, passInp.value);
    await setDoc(doc(db, 'users', uc.user.uid), { role: 'user' });
    alert('Đăng ký thành công!');
  } catch(e) { alert(e.message); }
};

// 2. Đăng nhập
btnSignin.onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, emailInp.value, passInp.value);
  } catch(e) { alert(e.message); }
};

// 3. Đăng xuất
btnSignout.onclick = () => signOut(auth);

// 4. Theo dõi trạng thái auth và phân quyền
onAuthStateChanged(auth, async user => {
  if (!user) {
    adminPanel.style.display = 'none';
    mainStore.style.display = 'block';
    cartDiv.style.display = 'none';
    return;
  }
  const docu = await getDoc(doc(db, 'users', user.uid));
  const role = docu.data()?.role;
  if (role === 'admin') {
    adminPanel.style.display = 'block';
    mainStore.style.display = 'none';
    loadProducts(admin=true);
  } else {
    adminPanel.style.display = 'none';
    mainStore.style.display = 'block';
    loadProducts(admin=false);
    observeCart();
  }
});

// 5. Load sản phẩm
function loadProducts(admin=false) {
  onSnapshot(collection(db, 'products'), snap => {
    productList.innerHTML = '';
    snap.docs.forEach(d => {
      const p = d.data();
      const item = document.createElement('div');
      item.innerHTML = `<h4>${p.name}</h4><p>$${p.price}</p>`;
      if (admin) {
        item.innerHTML += `
          <button data-id="${d.id}" class="btn-edit">Edit</button>
          <button data-id="${d.id}" class="btn-del">Delete</button>`;
      } else {
        item.innerHTML += `<button data-id="${d.id}" class="btn-add">Add to Cart</button>`;
      }
      productList.appendChild(item);
    });

    if (admin) handleAdminActions();
    else handleAddToCart();
  });
}

// 6. Admin: thêm/sửa/xóa sản phẩm
function handleAdminActions() {
  productList.querySelectorAll('.btn-edit').forEach(b => {
    b.onclick = async () => {
      const id = b.dataset.id;
      const newName = prompt('Tên mới:');
      const newPrice = parseFloat(prompt('Giá mới:'));
      await updateDoc(doc(db, 'products', id), { name: newName, price: newPrice });
    };
  });
  productList.querySelectorAll('.btn-del').forEach(b => {
    b.onclick = () => deleteDoc(doc(db, 'products', b.dataset.id));
  });
}

// 7. User: thêm vào giỏ hàng
async function handleAddToCart() {
  productList.querySelectorAll('.btn-add').forEach(b => {
    b.onclick = async () => {
      const id = b.dataset.id;
      const p = (await getDoc(doc(db, 'products', id))).data();
      const cartItem = doc(db, 'carts', auth.currentUser.uid, 'items', id);
      const s = await getDoc(cartItem);
      const qty = s.exists() ? s.data().quantity + 1 : 1;
      await setDoc(cartItem, { ...p, quantity: qty });
    };
  });
}

// 8. Real‑time giỏ hàng
function observeCart() {
  const uid = auth.currentUser.uid;
  onSnapshot(collection(db, 'carts', uid, 'items'), snap => {
    cartList.innerHTML = '';
    snap.docs.forEach(d => {
      const p = d.data();
      cartList.innerHTML += `<div>${p.name} x ${p.quantity}</div>`;
    });
    cartDiv.style.display = 'block';
  });
}
