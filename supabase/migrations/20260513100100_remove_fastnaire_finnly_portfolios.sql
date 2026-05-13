-- Remove Fastnaire / Finnly seed rows from public portfolios (showcase moved elsewhere).
-- Safe to run multiple times.

DELETE FROM public.portfolios
WHERE client IN ('Fastnaire', 'Finnly')
   OR title ILIKE '%Fastnaire%'
   OR title ILIKE '%Finnly%';
