import React, { useState } from 'react';
import { Heart, Sparkles, Plus, Trash2, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { Tone, RelationshipType, WishFormData, SpecialLink } from '../types';
import { convertFileToBase64 } from '../utils/fileHelpers';

interface WishFormProps {
  onSubmit: (data: WishFormData) => void;
  isLoading: boolean;
}

const GIFTS = [
  { label: 'Love', emoji: '❤️' },
  { label: 'Chocolates', emoji: '🍫' },
  { label: 'Flowers', emoji: '🌹' },
  { label: 'Ring', emoji: '💍' },
  { label: 'Trip', emoji: '✈️' },
  { label: 'Music', emoji: '🎵' },
  { label: 'Dinner', emoji: '🍽️' },
  { label: 'Teddy', emoji: '🧸' },
];

const WishForm: React.FC<WishFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<WishFormData>({
    senderName: '',
    receiverName: '',
    relationship: RelationshipType.DATING,
    tone: Tone.ROMANTIC,
    details: '',
    promises: [],
    images: [],
    selectedGift: '❤️',
    links: []
  });

  const [newPromise, setNewPromise] = useState('');
  const [newLink, setNewLink] = useState({ label: '', url: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages: string[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        try {
          const base64 = await convertFileToBase64(e.target.files[i]);
          newImages.push(base64);
        } catch (err) {
          console.error("Failed to convert image", err);
        }
      }
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const addPromise = () => {
    if (newPromise.trim()) {
      setFormData(prev => ({ ...prev, promises: [...prev.promises, newPromise.trim()] }));
      setNewPromise('');
    }
  };

  const removePromise = (index: number) => {
    setFormData(prev => ({ ...prev, promises: prev.promises.filter((_, i) => i !== index) }));
  };

  const addLink = () => {
    if (newLink.label && newLink.url) {
      setFormData(prev => ({
        ...prev,
        links: [...prev.links, { ...newLink, id: Date.now().toString() }]
      }));
      setNewLink({ label: '', url: '' });
    }
  };

  const removeLink = (id: string) => {
    setFormData(prev => ({ ...prev, links: prev.links.filter(l => l.id !== id) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-6 md:p-8 glass-card rounded-3xl shadow-xl border-t-4 border-rose-400 relative z-10">
      <div className="text-center mb-8">
        <div className="inline-block p-3 rounded-full bg-rose-100 text-rose-500 mb-2">
          <Heart className="w-8 h-8 fill-current" />
        </div>
        <h2 className="text-3xl font-serif text-gray-800">Build Your Valentine's Gift</h2>
        <p className="text-sm text-gray-500">Fill in the details to create a downloadable website for your love.</p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Basic Info */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-rose-800 border-b border-rose-100 pb-2">1. The Basics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-rose-800 uppercase tracking-wider mb-1">From</label>
              <input
                type="text"
                name="senderName"
                value={formData.senderName}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition bg-white/80"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-rose-800 uppercase tracking-wider mb-1">To</label>
              <input
                type="text"
                name="receiverName"
                value={formData.receiverName}
                onChange={handleChange}
                placeholder="Their Name"
                required
                className="w-full px-4 py-2 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition bg-white/80"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-rose-800 uppercase tracking-wider mb-1">Relationship</label>
              <select
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition bg-white/80"
              >
                {Object.values(RelationshipType).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-rose-800 uppercase tracking-wider mb-1">Message Tone</label>
              <select
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition bg-white/80"
              >
                {Object.values(Tone).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-rose-800 uppercase tracking-wider mb-1">AI Instructions (Optional)</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Tell Cupid specific things to mention (e.g. how we met, favorite memories)..."
              rows={2}
              className="w-full px-4 py-2 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition bg-white/80 resize-none"
            />
          </div>
        </section>

        {/* Section 2: Promises */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-rose-800 border-b border-rose-100 pb-2">2. Your Promises</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newPromise}
              onChange={(e) => setNewPromise(e.target.value)}
              placeholder="I promise to always..."
              className="flex-1 px-4 py-2 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition bg-white/80"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPromise())}
            />
            <button
              type="button"
              onClick={addPromise}
              className="bg-rose-500 text-white p-2 rounded-xl hover:bg-rose-600 transition"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {formData.promises.map((promise, index) => (
              <div key={index} className="flex items-center justify-between bg-white/50 px-4 py-2 rounded-lg border border-rose-100">
                <span className="text-sm text-gray-700">❤️ {promise}</span>
                <button type="button" onClick={() => removePromise(index)} className="text-rose-400 hover:text-rose-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {formData.promises.length === 0 && <p className="text-xs text-gray-400 italic">No promises added yet.</p>}
          </div>
        </section>

        {/* Section 3: Memories */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-rose-800 border-b border-rose-100 pb-2">3. Memories (Photos)</h3>
          <div className="border-2 border-dashed border-rose-200 rounded-xl p-4 text-center hover:bg-rose-50 transition bg-white/50">
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center gap-2">
              <ImageIcon className="w-8 h-8 text-rose-400" />
              <span className="text-sm text-rose-600 font-medium">Click to upload photos</span>
            </label>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {formData.images.map((img, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-rose-200">
                <img src={img} alt="preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-rose-500 transition"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Virtual Gift */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-rose-800 border-b border-rose-100 pb-2">4. Pick a Virtual Gift</h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {GIFTS.map((gift) => (
              <button
                key={gift.label}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, selectedGift: gift.emoji }))}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${
                  formData.selectedGift === gift.emoji
                    ? 'bg-rose-500 text-white shadow-lg scale-105'
                    : 'bg-white/50 hover:bg-rose-100'
                }`}
                title={gift.label}
              >
                <span className="text-2xl">{gift.emoji}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Section 5: Special Links */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-rose-800 border-b border-rose-100 pb-2">5. Special Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Label (e.g. Our Song)"
              value={newLink.label}
              onChange={(e) => setNewLink(prev => ({ ...prev, label: e.target.value }))}
              className="px-4 py-2 rounded-xl border border-rose-200 focus:border-rose-500 outline-none bg-white/80"
            />
            <input
              type="url"
              placeholder="https://..."
              value={newLink.url}
              onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
              className="px-4 py-2 rounded-xl border border-rose-200 focus:border-rose-500 outline-none bg-white/80"
            />
            <button
              type="button"
              onClick={addLink}
              className="bg-rose-500 text-white rounded-xl hover:bg-rose-600 flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.links.map((link) => (
              <div key={link.id} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-100">
                <LinkIcon className="w-3 h-3" />
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline max-w-[100px] truncate">
                  {link.label}
                </a>
                <button type="button" onClick={() => removeLink(link.id)} className="text-blue-400 hover:text-red-500 ml-1">
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg flex items-center justify-center gap-2 transform transition-all duration-200 mt-6 ${
            isLoading ? 'bg-rose-300 cursor-not-allowed' : 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Wrapping your Gift...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Create Web Gift</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default WishForm;