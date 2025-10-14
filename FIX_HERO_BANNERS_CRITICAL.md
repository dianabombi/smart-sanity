# 🚨 KRITICKÁ OPRAVA: Hero Bannery sa nepridávajú

## PROBLÉM:
- Admin hovorí "Hero banner vytvorený!" ✅
- Ale nové bannery sa nezobrazujú na stránke ❌
- Tabuľka `hero_banners` neexistuje v Supabase databáze

## 🚀 OKAMŽITÁ OPRAVA (2 minúty):

### Krok 1: Choď do Supabase Dashboard
1. Otvor https://supabase.com/dashboard
2. Vyber Smart Sanit projekt
3. Klikni **"SQL Editor"**

### Krok 2: Spusti SQL skript
1. Klikni **"New Query"**
2. Skopíruj CELÝ obsah z: `database/create_hero_banners_table.sql`
3. Vlož a klikni **"Run"**

### Krok 3: Overenie
1. Choď do **"Table Editor"**
2. Mal by si vidieť tabuľku **"hero_banners"**
3. Tabuľka obsahuje **3 predvolené bannery**

## ✅ PO SPUSTENÍ SQL:

### Čo sa opraví:
- ✅ **Nové hero bannery sa uložia** do databázy
- ✅ **Zobrazujú sa na hlavnej stránke** okamžite
- ✅ **Admin panel funguje** správne
- ✅ **Carousel navigácia** funguje s novými bannermi

### Predvolené bannery:
1. **Kaldewei** - `/photos/kaldewei.avif`
2. **Agape** - `/photos/agape.avif`  
3. **Fantini** - `/photos/fantini.avif`

## 🎯 TESTOVANIE:

### Po vytvorení tabuľky:
1. **Choď do admin panelu** → Hero Bannery
2. **Pridaj nový banner** s obrázkom
3. **Choď na hlavnú stránku** - nový banner sa zobrazí
4. **Klikni na navigačné čiary** - funguje prepínanie

---

**SPUSTI SQL SKRIPT TERAZ A HERO BANNERY BUDÚ FUNGOVAŤ!** 🚀
