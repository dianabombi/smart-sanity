import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const DatabaseSetup = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const createHeroBannersTable = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Create the hero_banners table with all necessary structure
      const { error: createError } = await supabase.rpc('exec_sql', {
        sql: `
          -- Create the hero_banners table
          CREATE TABLE IF NOT EXISTS hero_banners (
            id SERIAL PRIMARY KEY,
            src TEXT NOT NULL,
            alt TEXT NOT NULL,
            title TEXT,
            description TEXT,
            "order" INTEGER DEFAULT 1,
            active BOOLEAN DEFAULT true,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );

          -- Create indexes
          CREATE INDEX IF NOT EXISTS idx_hero_banners_order ON hero_banners("order");
          CREATE INDEX IF NOT EXISTS idx_hero_banners_active ON hero_banners(active);

          -- Enable RLS
          ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;

          -- Create policies
          CREATE POLICY IF NOT EXISTS "Allow public read access" ON hero_banners
          FOR SELECT USING (true);
        `
      });

      if (createError) {
        throw new Error(`Database setup failed: ${createError.message}`);
      }

      // Insert default data
      const defaultBanners = [
        {
          src: '/photos/kaldewei.avif',
          alt: 'Kaldewei premium bathroom solutions',
          title: 'Kaldewei Premium',
          description: 'Prémiové kúpeľňové riešenia',
          order: 1,
          active: true
        },
        {
          src: '/photos/umyvadlo.jpeg',
          alt: 'Modern sink installations',
          title: 'Moderné umývadlá',
          description: 'Inštalácie moderných umývadiel',
          order: 2,
          active: true
        },
        {
          src: '/photos/vanaPs.png',
          alt: 'Premium bathtub design',
          title: 'Prémiové vane',
          description: 'Dizajnové kúpeľňové vane',
          order: 3,
          active: true
        }
      ];

      const { error: insertError } = await supabase
        .from('hero_banners')
        .insert(defaultBanners);

      if (insertError) {
        console.warn('Insert error (might be expected if data exists):', insertError);
      }

      setSuccess('Hero banners tabuľka úspešne vytvorená a inicializovaná!');
      setTimeout(() => {
        onSuccess && onSuccess();
        onClose && onClose();
      }, 2000);

    } catch (error) {
      console.error('Database setup error:', error);
      setError(`Chyba pri vytváraní tabuľky: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Nastavenie databázy</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-300">
            Tabuľka 'hero_banners' neexistuje v databáze. Chcete ju vytvoriť?
          </p>

          {error && (
            <div className="bg-red-500 text-white p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500 text-white p-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={createHeroBannersTable}
              disabled={loading}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Vytvára sa...' : 'Vytvoriť tabuľku'}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Zrušiť
            </button>
          </div>

          <div className="text-sm text-gray-400">
            <p className="font-semibold mb-2">Alternatívne riešenie:</p>
            <p>Ak automatické vytvorenie nefunguje, spustite tento SQL v Supabase SQL Editor:</p>
            <div className="bg-gray-900 p-2 rounded mt-2 text-xs font-mono">
              <code>
                {`CREATE TABLE hero_banners (
  id SERIAL PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  title TEXT,
  description TEXT,
  "order" INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSetup;
