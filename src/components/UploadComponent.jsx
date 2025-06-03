import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function UploadComponent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !slug) return;

    const fileExt = file.name.split('.').pop();
    const filePath = `${slug}.${fileExt}`;

    // Upload to Supabase Storage
    const { data: storageData, error: uploadError } = await supabase.storage
      .from('components')
      .upload(filePath, file);

    if (uploadError) return setStatus(`Upload error: ${uploadError.message}`);

    const download_url = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/components/${filePath}`;

    const { error: dbError } = await supabase.from('components').insert([
      { title, description, slug, download_url }
    ]);

    if (dbError) return setStatus(`DB error: ${dbError.message}`);
    setStatus('Upload successful!');
    setTitle(''); setDescription(''); setSlug(''); setFile(null);
  };

  return (
    <form onSubmit={handleUpload} className="max-w-xl mx-auto p-6 bg-[#1f1f1f] rounded-lg text-white">
      <h2 className="text-lg font-bold mb-4">Upload New Component</h2>
      <input
        className="block w-full mb-3 p-2 bg-gray-800 rounded"
        type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required
      />
      <input
        className="block w-full mb-3 p-2 bg-gray-800 rounded"
        type="text" placeholder="Slug (e.g. design-001)" value={slug} onChange={(e) => setSlug(e.target.value)} required
      />
      <textarea
        className="block w-full mb-3 p-2 bg-gray-800 rounded"
        placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="block w-full mb-4 text-white"
        type="file" accept=".js,.jsx" onChange={(e) => setFile(e.target.files[0])} required
      />
      <button type="submit" className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300">
        Upload
      </button>
      {status && <p className="mt-3 text-sm text-green-400">{status}</p>}
    </form>
  );
}