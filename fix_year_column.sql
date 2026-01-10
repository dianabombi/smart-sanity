-- Fix year column to allow longer values
-- Run this in Supabase SQL Editor

ALTER TABLE "references" 
ALTER COLUMN year TYPE VARCHAR(50);
