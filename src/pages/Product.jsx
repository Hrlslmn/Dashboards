// ProductPage.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { supabase } from '../../supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { Trash2 } from 'lucide-react';

export default function ProductPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', stock: '', imageFile: null });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchUserRole();
    fetchProducts();
  }, []);

  const fetchUserRole = async () => {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) return;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!profileError) {
      setIsAdmin(profile?.is_admin || false);
    } else {
      console.error('Error fetching profile:', profileError.message);
    }
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error) setProducts(data);
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imageFile: e.target.files[0] });
  };

  const handleSubmit = async () => {
    try {
      if (!form.name || !form.price || !form.stock || !form.imageFile) return alert('Fill all fields');

      const filename = `product_${uuidv4()}.${form.imageFile.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filename, form.imageFile);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert(`Upload error: ${uploadError.message}`);
        return;
      }

      const { data: publicData } = supabase.storage.from('product-images').getPublicUrl(filename);
      const imageUrl = publicData.publicUrl;

      const { error: insertError } = await supabase.from('products').insert({
        name: form.name,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        image_url: imageUrl,
      });

      if (insertError) {
        console.error('Insert error:', insertError);
        alert(`Insert error: ${insertError.message}`);
      } else {
        setForm({ name: '', price: '', stock: '', imageFile: null });
        setShowForm(false);
        fetchProducts();
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Something went wrong. Check the console.');
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) fetchProducts();
  };

  const handleBuy = async (product) => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: product.name,
        price: product.price,
      }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Checkout failed');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
          <div className="fixed z-50 top-0 left-0 h-full">
            <Sidebar collapsed={false} onClose={() => setMobileOpen(false)} isMobile />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setMobileOpen((prev) => !prev)} />

        <main className="p-6 overflow-y-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Product Catalog</h1>
            {isAdmin && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
              >
                {showForm ? 'Cancel' : 'Add Product'}
              </button>
            )}
          </div>

          {showForm && isAdmin && (
            <div className="bg-white p-6 rounded-xl shadow space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="border p-2 rounded w-full"
                />
              </div>
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded" />
              <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                Submit Product
              </button>
            </div>
          )}

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl p-4 shadow space-y-4 relative">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800 truncate max-w-[180px]">{product.name}</h2>
                    <p className="text-xs text-gray-500">ID: {product.id}</p>
                  </div>
                  <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                    Stock: {product.stock}
                  </span>
                </div>

                <div className="h-40 overflow-hidden rounded-xl">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    onClick={() => setSelectedImage(product.image_url)}
                    className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-105"
                  />
                </div>

                <div className="flex justify-between items-center text-gray-700 font-medium">
                  <span className="text-lg">${product.price}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (!isAdmin) handleBuy(product);
                      }}
                      className={`text-sm ${
                        isAdmin ? 'bg-indigo-600' : 'bg-green-600'
                      } text-white px-3 py-1 rounded hover:brightness-110 transition`}
                    >
                      {isAdmin ? 'View Details' : 'Buy'}
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Product"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-40 rounded-full p-1 hover:bg-opacity-70"
            >
              ✕
            </button>
            <img src={selectedImage} alt="Full Preview" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      )}
    </div>
  );
}





