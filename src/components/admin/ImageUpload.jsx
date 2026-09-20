import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { UploadCloud, X, Loader2 } from 'lucide-react';

export default function ImageUpload({ value, onChange, label = "Image Upload", folder = "general" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    try {
      setError(null);
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-black uppercase tracking-wider mb-1">{label}</label>
      
      {error && <div className="text-white font-bold uppercase text-sm border-black bg-accent-2 p-2 shadow-neo-sm">{error}</div>}

      {value ? (
        <div className="relative border-black shadow-neo-sm inline-block bg-white p-2">
          <img src={value} alt="Preview" className="max-h-48 object-contain" />
          <button 
            type="button" 
            onClick={() => onChange('')}
            className="absolute -top-3 -right-3 bg-accent-2 text-black border-black p-1 shadow-neo-sm hover:-translate-y-1 transition-transform z-10"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          />
          <div className={`w-full flex flex-col items-center justify-center p-8 border-black border-dashed bg-gray-50 transition-colors gap-2 font-bold uppercase group ${uploading ? 'bg-gray-200' : 'hover:bg-accent-1'}`}>
            {uploading ? (
              <>
                <Loader2 size={32} className="animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <UploadCloud size={32} className="group-hover:scale-110 transition-transform" />
                <span>Click or drag image to upload</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
