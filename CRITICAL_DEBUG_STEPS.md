# 🚨 CRITICAL DEBUG: Text Changes Not Showing

## Current Issue
Changes made in admin panel (company name, page titles) are saved but don't appear on the website.

## ✅ Diagnostic Steps - Follow EXACTLY

### STEP 1: Verify Database Table Exists
1. Open https://supabase.com/dashboard
2. Select project: **lckbwknxfmbjffjsmahs**
3. Click **Table Editor** → Look for `page_content` table
4. **Screenshot** what you see and check:
   - ✅ Does the table exist? YES / NO
   - ✅ Does it have these rows:
     - `admin-who-we-are` | `headers` | `title`
     - `admin-who-we-are` | `headers` | `subtitle`
     - `global` | `company` | `name`

**If NO:** Run the SQL script first!

### STEP 2: Test Direct Database Connection
1. Go to Supabase → **SQL Editor**
2. Run this query:
```sql
SELECT * FROM page_content 
WHERE (page = 'global' AND section = 'company' AND key = 'name')
   OR (page = 'admin-who-we-are' AND section = 'headers');
```
3. **Copy the results here:** ___________

### STEP 3: Check Browser Console (CRITICAL)
1. Open your website: http://localhost:3000
2. Press **F12** → Click **Console** tab
3. **Hard refresh:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. Look for these exact messages:

**Expected Console Output:**
```
🔍 SUPABASE CONFIG DEBUG:
- Using URL: https://lckbwknxfmbjffjsmahs.supabase.co
✅ Supabase client created successfully
```

**Then when page loads:**
```
🔄 Footer: Loading company name from database...
📊 Footer: API result: {success: true, content: "..."}
✅ Footer: Company name loaded: Smart Sanit s.r.o.
```

**What do YOU see instead?** ___________

### STEP 4: Test Admin Panel Console
1. Go to http://localhost:3000/admin/who-we-are
2. Press **F12** → Console tab
3. Look for:
```
🔄 Admin: Loading page headers from database...
📊 Admin: Title result: {success: ..., content: "..."}
🔄 Admin: Loading company name from database...
📊 Admin: Company name result: {success: ..., content: "..."}
```

**Copy ALL console messages here:** ___________

### STEP 5: Test Save Functionality
1. Stay on Admin → O nás page (with Console open)
2. Click **Edit** on "Názov spoločnosti"
3. Change to: `"MY TEST COMPANY"`
4. Click **Save**
5. Look for:
```
💾 Admin: Saving company name: MY TEST COMPANY
📊 Admin: Save result: {success: true, ...}
✅ Admin: Company name saved successfully!
```

**What happens?** ___________

### STEP 6: Verify Data Actually Saved
1. Go to Supabase → **Table Editor** → `page_content`
2. Find row: `global` | `company` | `name`
3. **What is the content value?** ___________

### STEP 7: Check for JavaScript Errors
1. In Console, click **Errors** filter
2. **Are there any RED error messages?** ___________

---

## 🔍 Common Issues & Solutions

### Issue A: "Database connection not available"
**Console shows:** `Supabase not available`
**Fix:**
1. Check Supabase credentials in `/client/src/lib/supabase.js`
2. Verify Supabase project is not paused (supabase.com/dashboard)

### Issue B: "Content not found" (Code PGRST116)
**Console shows:** `ℹ️ No content found for global.company.name`
**Fix:** The row doesn't exist in database - SQL script wasn't run properly

### Issue C: Changes save but don't load
**Console shows:** Save succeeds but load shows old value
**Fix:** Browser cache - do a HARD REFRESH

### Issue D: RLS Policy Error
**Console shows:** `new row violates row-level security policy`
**Fix:** Run this SQL:
```sql
DROP POLICY IF EXISTS "Allow all operations on page_content" ON page_content;
CREATE POLICY "Allow all operations on page_content" ON page_content
    FOR ALL USING (true) WITH CHECK (true);
```

---

## 🎯 Quick Test Commands

### Test if Supabase is reachable:
Open browser console and run:
```javascript
fetch('https://lckbwknxfmbjffjsmahs.supabase.co/rest/v1/')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

### Test direct API call:
```javascript
import { supabase } from './lib/supabase';
const test = await supabase.from('page_content').select('*').limit(5);
console.log('Test result:', test);
```

---

## 📋 Information Needed

Please provide:
1. **Step 1 result:** Does table exist? YES / NO
2. **Step 2 result:** SQL query output
3. **Step 3 result:** Console output on homepage
4. **Step 4 result:** Console output on admin page
5. **Step 5 result:** What happens when you save
6. **Any RED errors in console?**

With this information, I can identify the exact problem!
