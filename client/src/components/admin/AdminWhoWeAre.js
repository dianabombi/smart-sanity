import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';
import EmergencyBrands from '../../services/emergencyBrands';

const AdminWhoWeAre = ({ onLogout }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    size: 'large'
  });
  const [ebkLogo, setEbkLogo] = useState('/ebk-logo.svg');
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [partnershipText, setPartnershipText] = useState('Partnersky spolupracujeme s interiérovým štúdiom');
  const [editingPartnershipText, setEditingPartnershipText] = useState(false);
  const [tempPartnershipText, setTempPartnershipText] = useState('');

  useEffect(() => {
    loadSections();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadSections = async () => {
    try {
      setLoading(true);
      
      // Load EB+K logo from database
      try {
        const brandsResult = await ApiService.getBrands();
        if (brandsResult.success && brandsResult.brands) {
          const ebkBrand = brandsResult.brands.find(brand => 
            brand.name.includes('Elite Bath + Kitchen') || brand.name.includes('EB+K')
          );
          if (ebkBrand && ebkBrand.logo) {
            setEbkLogo(ebkBrand.logo);
          }
        }
      } catch (error) {
        console.log('Failed to load EB+K logo from database');
      }
      
      // Load sections from database ONLY
      try {
        const result = await ApiService.getWhoWeAreSections();
        if (result.success && result.sections && result.sections.length > 0) {
          console.log('✅ ADMIN: Loaded sections from database:', result.sections);
          setSections(result.sections);
        } else {
          // Database is empty - show empty state in admin
          console.log('📭 ADMIN: No sections found in database');
          setSections([]);
        }
      } catch (error) {
        console.error('Failed to load sections from database:', error);
        // Create minimal fallback section
        setSections([{
          id: 1,
          title: "O spoločnosti",
          content: "Obsah nie je k dispozícii. Prosím, nastavte obsah.",
          size: "large",
          order: 1
        }]);
      }

      // Load partnership text from database
      try {
        const partnershipResult = await ApiService.getPageContent('who-we-are', 'partnership', 'text');
        if (partnershipResult.success && partnershipResult.content) {
          setPartnershipText(partnershipResult.content);
        }
      } catch (error) {
        console.log('Failed to load partnership text from database');
      }

    } catch (error) {
      console.error('Critical error loading admin data:', error);
      setError('Chyba pri načítavaní údajov z databázy');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Text formatting functions
  const insertFormatting = (startTag, endTag = '') => {
    const textarea = document.querySelector('textarea[name="content"]');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    
    const beforeText = formData.content.substring(0, start);
    const afterText = formData.content.substring(end);
    
    const newText = beforeText + startTag + selectedText + endTag + afterText;
    
    setFormData(prev => ({
      ...prev,
      content: newText
    }));

    // Restore cursor position
    setTimeout(() => {
      const newCursorPos = start + startTag.length + selectedText.length + endTag.length;
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const formatBold = () => insertFormatting('**', '**');
  const formatItalic = () => insertFormatting('*', '*');
  const formatUnderline = () => insertFormatting('<u>', '</u>');
  const formatStrikethrough = () => insertFormatting('<s>', '</s>');
  const formatCenter = () => insertFormatting('<center>', '</center>');
  const formatLeft = () => insertFormatting('<left>', '</left>');
  const formatRight = () => insertFormatting('<right>', '</right>');
  const formatH1 = () => insertFormatting('<h1>', '</h1>');
  const formatH2 = () => insertFormatting('<h2>', '</h2>');
  const formatH3 = () => insertFormatting('<h3>', '</h3>');
  const insertParagraph = () => insertFormatting('\n\n');
  const insertBulletPoint = () => insertFormatting('\n• ');
  const insertNumberedPoint = () => {
    const lines = formData.content.split('\n');
    const currentNumber = lines.filter(line => /^\d+\./.test(line.trim())).length + 1;
    insertFormatting(`\n${currentNumber}. `);
  };

  // Format content for display (convert markdown-style to HTML)
  const formatContentForDisplay = (content) => {
    if (!content) return '';
    
    return content
      // Convert **bold** to <strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert *italic* to <em>
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Handle HTML formatting tags
      .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
      .replace(/<s>(.*?)<\/s>/g, '<s>$1</s>')
      .replace(/<center>(.*?)<\/center>/g, '<div class="text-center">$1</div>')
      .replace(/<left>(.*?)<\/left>/g, '<div class="text-left">$1</div>')
      .replace(/<right>(.*?)<\/right>/g, '<div class="text-right">$1</div>')
      .replace(/<h1>(.*?)<\/h1>/g, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/<h2>(.*?)<\/h2>/g, '<h2 class="text-2xl font-semibold mb-3">$1</h2>')
      .replace(/<h3>(.*?)<\/h3>/g, '<h3 class="text-xl font-medium mb-2">$1</h3>')
      // Convert bullet points
      .replace(/^• (.+)$/gm, '<li>$1</li>')
      // Convert numbered lists
      .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
      // Convert line breaks to <br>
      .replace(/\n\n/g, '</p><p>')
      // Wrap in paragraphs
      .replace(/^(.+)$/gm, (match, p1) => {
        if (p1.startsWith('<li>') || p1.startsWith('<div class="text-') || p1.startsWith('<h')) return p1;
        return p1;
      })
      // Wrap bullet points in <ul>
      .replace(/(<li>.*<\/li>)/gs, (match) => {
        if (match.includes('</p>')) return match;
        return `<ul class="list-disc list-inside space-y-1 my-2">${match}</ul>`;
      })
      // Wrap content in paragraphs
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.includes('<ul>') || paragraph.includes('<li>') || paragraph.includes('<div class="text-') || paragraph.includes('<h')) {
          return paragraph;
        }
        return `<p class="mb-4">${paragraph}</p>`;
      })
      .join('');
  };

  const handleEbkLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Podporované sú iba obrázky (JPG, PNG, SVG, WebP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Súbor je príliš veľký. Maximálna veľkosť je 5MB.');
      return;
    }

    try {
      setUploadingLogo(true);
      
      console.log('🚨 ADMIN: Uploading EB+K logo to Supabase database...');
      
      // Convert file to data URL
      const reader = new FileReader();
      reader.onload = async (e) => {
        const logoDataUrl = e.target.result;
        
        try {
          // Update EB+K brand in Supabase database
          const result = await ApiService.updateBrandLogo('Elite Bath + Kitchen (EB+K)', logoDataUrl);
          
          if (result.success) {
            console.log('✅ ADMIN: EB+K logo uploaded to database successfully!');
            setEbkLogo(logoDataUrl);
            setSuccess('EB+K logo bol úspešne aktualizovaný v databáze!');
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);
          } else {
            console.error('❌ ADMIN: Database upload failed:', result.message);
            setError('Chyba pri ukladaní do databázy: ' + result.message);
          }
        } catch (error) {
          console.error('🚨 ADMIN: Critical database error:', error);
          setError('Kritická chyba databázy: ' + error.message);
        } finally {
          setUploadingLogo(false);
        }
      };
      
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error('🚨 ADMIN: Error uploading EB+K logo:', error);
      setError('Chyba pri nahrávaní EB+K loga');
      setUploadingLogo(false);
    }
    
    // Clear file input
    event.target.value = '';
  };

  // Partnership Text Management Functions
  const handlePartnershipTextEdit = () => {
    setTempPartnershipText(partnershipText);
    setEditingPartnershipText(true);
  };

  const handlePartnershipTextSave = async () => {
    try {
      // Save to page content system
      const result = await ApiService.updatePageContent('who-we-are', 'partnership', 'text', tempPartnershipText);
      
      if (result.success) {
        setPartnershipText(tempPartnershipText);
        setEditingPartnershipText(false);
        setTempPartnershipText('');
        setSuccess('Text partnerstva bol úspešne aktualizovaný!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Chyba pri aktualizácii textu: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating partnership text:', error);
      setError('Chyba pri aktualizácii textu partnerstva');
    }
  };

  const handlePartnershipTextCancel = () => {
    setEditingPartnershipText(false);
    setTempPartnershipText('');
  };


  const handleDelete = async (id) => {
    if (window.confirm('Naozaj chcete vymazať túto sekciu?')) {
      try {
        const result = await ApiService.deleteWhoWeAreSection(id);
        if (result.success) {
          await loadSections();
          setSuccess('Sekcia bola vymazaná');
          setTimeout(() => setSuccess(''), 3000);
        } else {
          // Try local delete
          const localSections = JSON.parse(localStorage.getItem('adminWhoWeAreSections') || '[]');
          const filteredSections = localSections.filter(sec => sec.id !== id);
          localStorage.setItem('adminWhoWeAreSections', JSON.stringify(filteredSections));
          setSections(filteredSections);
          setSuccess('Sekcia vymazaná lokálne');
          setTimeout(() => setSuccess(''), 3000);
        }
      } catch (error) {
        console.error('Error deleting section:', error);
        setError('Chyba pri mazaní sekcie');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      size: 'large'
    });
  };


  const handleEdit = (section) => {
    setEditingSection(section);
    setFormData({
      title: section.title,
      content: section.content,
      size: section.size
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      // Save directly to database
      const result = await ApiService.updateWhoWeAreSection(editingSection.id, formData);
      
      if (result.success) {
        // Update local state with database result
        const updatedSections = sections.map(section => 
          section.id === editingSection.id 
            ? { ...section, ...formData }
            : section
        );
        setSections(updatedSections);
        
        setEditingSection(null);
        setSuccess('Sekcia bola úspešne uložená do databázy!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Chyba pri ukladaní do databázy: ' + (result.message || 'Neznáma chyba'));
      }
    } catch (error) {
      console.error('Database save error:', error);
      setError('Chyba pri pripojení k databáze');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingSection(null);
    resetForm();
  };

  const handleCreateNew = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const defaultSection = {
        title: "O spoločnosti",
        content: "Zadajte obsah sekcie...",
        size: "large",
        order: 1
      };

      const result = await ApiService.createWhoWeAreSection(defaultSection);
      
      if (result.success) {
        // Reload sections from database
        await loadSections();
        setSuccess('Nová sekcia bola vytvorená!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Chyba pri vytváraní sekcie: ' + (result.message || 'Neznáma chyba'));
      }
    } catch (error) {
      console.error('Error creating section:', error);
      setError('Chyba pri vytváraní sekcie');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout onLogout={onLogout}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Načítavam sekcie...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Správa sekcií - O nás</h1>
            <p className="text-gray-400">Spravujte sekcie na stránke "O nás"</p>
          </div>
        </div>

        {/* EB+K Logo Management */}
        <div className="bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">EB+K Logo Management</h2>
          <div className="flex items-center space-x-6">
            {/* Current Logo Preview */}
            <div className="flex-shrink-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <img 
                  src={ebkLogo} 
                  alt="Elite Bath + Kitchen (EB+K)"
                  className="h-16 w-auto object-contain filter brightness-0 invert"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-white font-semibold text-center hidden">
                  EB+K
                </div>
              </div>
            </div>

            {/* Upload Controls */}
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <label 
                  htmlFor="ebk-logo-upload"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                    uploadingLogo 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {uploadingLogo ? 'Nahrávam...' : 'Nahrať EB+K Logo'}
                </label>
                <input
                  type="file"
                  id="ebk-logo-upload"
                  accept="image/*"
                  onChange={handleEbkLogoUpload}
                  disabled={uploadingLogo}
                  className="hidden"
                />
                <span className="text-gray-400 text-sm">
                  JPG, PNG, SVG, WebP (max 5MB)
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Logo sa zobrazí na stránke "O nás" v sekcii partnerstva a na stránke značiek.
              </p>
            </div>
          </div>
        </div>

        {/* Partnership Text Management */}
        <div className="bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Text partnerstva</h2>
              <p className="text-gray-400 text-sm">Text zobrazený v sekcii partnerstva na stránke "O nás"</p>
            </div>
            {!editingPartnershipText && (
              <button
                onClick={handlePartnershipTextEdit}
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Upraviť
              </button>
            )}
          </div>
          
          {editingPartnershipText ? (
            <div className="space-y-3">
              <textarea
                value={tempPartnershipText}
                onChange={(e) => setTempPartnershipText(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Zadajte text partnerstva..."
                maxLength={200}
              />
              <div className="flex gap-2">
                <button
                  onClick={handlePartnershipTextSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Uložiť
                </button>
                <button
                  onClick={handlePartnershipTextCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Zrušiť
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-gray-700 border border-gray-600 rounded-lg">
              <p className="text-white leading-relaxed">{partnershipText || 'Žiadny text nie je nastavený'}</p>
            </div>
          )}
        </div>

        {/* O spoločnosti Section - Direct Edit */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">O spoločnosti</h3>
            {sections.length === 0 ? (
              <button
                onClick={handleCreateNew}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                ➕ Vytvoriť obsah
              </button>
            ) : editingSection?.id === sections[0]?.id ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Uložiť
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Zrušiť
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleEdit(sections[0])}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                ✏️ Upraviť
              </button>
            )}
          </div>
          
          {sections.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">Žiadny obsah nie je nastavený</p>
              <p className="text-gray-500 text-sm">Kliknite na "Vytvoriť obsah" pre pridanie nového obsahu</p>
            </div>
          ) : editingSection?.id === sections[0]?.id ? (
            <div className="space-y-4">
              {/* Rich Text Formatting Toolbar */}
              <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                <div className="flex flex-wrap items-center gap-1">
                  {/* Headings Dropdown */}
                  <div className="relative">
                    <select 
                      className="bg-gray-600 text-white text-sm px-2 py-1 rounded border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === 'h1') formatH1();
                        else if (value === 'h2') formatH2();
                        else if (value === 'h3') formatH3();
                        e.target.value = '';
                      }}
                      defaultValue=""
                    >
                      <option value="">Normálny</option>
                      <option value="h1">Nadpis 1</option>
                      <option value="h2">Nadpis 2</option>
                      <option value="h3">Nadpis 3</option>
                    </select>
                  </div>
                  
                  <div className="w-px bg-gray-500 mx-1 h-6"></div>
                  
                  {/* Text Formatting */}
                  <button
                    type="button"
                    onClick={formatBold}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-sm transition-colors font-bold"
                    title="Tučné písmo"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={formatItalic}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-sm transition-colors italic"
                    title="Kurzíva"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={formatUnderline}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-sm transition-colors underline"
                    title="Podčiarknuté"
                  >
                    U
                  </button>
                  <button
                    type="button"
                    onClick={formatStrikethrough}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-sm transition-colors line-through"
                    title="Prečiarknuté"
                  >
                    S
                  </button>
                  
                  <div className="w-px bg-gray-500 mx-1 h-6"></div>
                  
                  {/* Alignment */}
                  <button
                    type="button"
                    onClick={formatLeft}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-sm transition-colors"
                    title="Zarovnať vľavo"
                  >
                    ≡
                  </button>
                  <button
                    type="button"
                    onClick={formatCenter}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-sm transition-colors"
                    title="Centrovať"
                  >
                    ≣
                  </button>
                  <button
                    type="button"
                    onClick={formatRight}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-sm transition-colors"
                    title="Zarovnať vpravo"
                  >
                    ≡
                  </button>
                  
                  <div className="w-px bg-gray-500 mx-1 h-6"></div>
                  
                  {/* Lists */}
                  <button
                    type="button"
                    onClick={insertBulletPoint}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-sm transition-colors"
                    title="Odrážka"
                  >
                    •
                  </button>
                  <button
                    type="button"
                    onClick={insertNumberedPoint}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-sm transition-colors"
                    title="Číslovaný zoznam"
                  >
                    1.
                  </button>
                  
                  <div className="w-px bg-gray-500 mx-1 h-6"></div>
                  
                  {/* Paragraph */}
                  <button
                    type="button"
                    onClick={insertParagraph}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-sm transition-colors"
                    title="Nový odstavec"
                  >
                    ¶
                  </button>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Vyberte text a použite formátovanie, alebo kliknite pre vloženie
                </div>
              </div>
              
              {/* Textarea */}
              <textarea
                value={formData.content}
                onChange={handleInputChange}
                name="content"
                rows={8}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical font-mono"
                placeholder="Zadajte obsah sekcie..."
              />
            </div>
          ) : (
            <div className="prose max-w-none">
              <div 
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: formatContentForDisplay(sections[0]?.content || 'Žiadny obsah nie je nastavený')
                }}
              />
            </div>
          )}
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mb-6">
            <p className="text-green-400">{success}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminWhoWeAre;
