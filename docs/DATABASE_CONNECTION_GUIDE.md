# Hero Banners Database Connection Guide

## 🎯 Current Status
The hero banner system is now **fully configured** to connect to your Supabase database. Here's how to complete the setup:

## 🚀 Quick Setup (Recommended)

### Option 1: Automatic Setup via Admin Panel
1. **Go to Admin Panel**: Navigate to `/admin/hero-banners`
2. **Click "Inicializovať"**: This will attempt to create the database table automatically
3. **If prompted**: A database setup modal will appear - click "Vytvoriť tabuľku"
4. **Done!**: The system will create the table and insert default hero banners

### Option 2: Manual Database Setup
If automatic setup doesn't work, follow these steps:

1. **Open Supabase Dashboard**: Go to https://supabase.com/dashboard
2. **Select your project**: `lckbwknxfmbjffjsmahs`
3. **Go to SQL Editor**: Click on "SQL Editor" in the sidebar
4. **Run the setup script**: Copy and paste the contents of `HERO_BANNERS_SETUP.sql`
5. **Execute**: Click "Run" to create the table and insert default data

## 📋 What Gets Created

### Database Table: `hero_banners`
```sql
- id (Primary Key)
- src (Image URL/path)
- alt (Alt text for SEO)
- title (Banner title)
- description (Banner description)
- order (Display order)
- active (Show/hide banner)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Default Hero Banners
- Kaldewei Premium bathroom solutions
- Modern sink installations  
- Premium bathtub design

## ✅ Verification Steps

After setup, verify everything works:

1. **Admin Panel**: Go to `/admin/hero-banners`
2. **Check banners**: You should see 3 default banners
3. **Test operations**: Try editing, adding, or deleting banners
4. **Check home page**: Visit `/` to see banners in the carousel
5. **No error messages**: The red error banner should be gone

## 🔧 Features After Database Connection

Once connected, you'll have:
- ✅ **Full CRUD operations** (Create, Read, Update, Delete)
- ✅ **Image upload and management**
- ✅ **Real-time updates** on home page
- ✅ **Banner ordering and visibility control**
- ✅ **Persistent data storage**

## 🛠️ Troubleshooting

### If you see "Could not find the table 'public.hero_banners'"
- The table doesn't exist yet
- Use Option 1 or 2 above to create it

### If automatic setup fails
- Check your Supabase connection
- Use the manual SQL setup (Option 2)
- Verify your Supabase project permissions

### If you can't delete/edit banners
- Make sure the table was created successfully
- Check browser console for error messages
- Verify Supabase RLS policies are set correctly

## 📞 Support
If you encounter issues:
1. Check the browser console for error messages
2. Verify your Supabase project is active
3. Ensure the database table was created properly
4. Try refreshing the admin panel

## 🎉 Success Indicators
You'll know it's working when:
- No red error messages in admin panel
- You can add/edit/delete hero banners
- Changes appear immediately on the home page
- Success messages show "v databáze" instead of "simulácia"
