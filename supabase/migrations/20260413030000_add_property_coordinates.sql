ALTER TABLE properties ADD COLUMN IF NOT EXISTS lat NUMERIC;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS lng NUMERIC;

-- Coordinates backfill
UPDATE properties SET lat = 34.0736, lng = -118.4004 WHERE location = 'Beverly Hills, California';
UPDATE properties SET lat = 49.2827, lng = -123.1207 WHERE location = 'Downtown, Vancouver';
UPDATE properties SET lat = 47.6062, lng = -122.3321 WHERE location = '123 Pine St, Seattle';
UPDATE properties SET lat = 45.5152, lng = -122.6784 WHERE location = '456 Elm Ave, Portland';
UPDATE properties SET lat = 44.0582, lng = -121.3153 WHERE location = '789 Mountain Rd, Bend';
UPDATE properties SET lat = 25.7617, lng = -80.1918 WHERE location = '321 Ocean Dr, Miami';
UPDATE properties SET lat = 41.8781, lng = -87.6298 WHERE location = '555 Main St, Chicago';
UPDATE properties SET lat = 30.2672, lng = -97.7431 WHERE location = '999 Oak Ln, Austin';
UPDATE properties SET lat = 34.0050, lng = -118.8101 WHERE location = '101 Ocean Blvd, Malibu';
UPDATE properties SET lat = 40.7128, lng = -74.0060 WHERE location = '888 Skyline Way, New York';
UPDATE properties SET lat = 39.1911, lng = -106.8175 WHERE location = '404 Woodland Rd, Aspen';
UPDATE properties SET lat = 37.7749, lng = -122.4194 WHERE location = '12 Art District, San Francisco';
UPDATE properties SET lat = 26.3587, lng = -80.0831 WHERE location = '202 Palm Tree Ln, Boca Raton';
UPDATE properties SET lat = 25.7681, lng = -80.1887 WHERE location = '500 Brickell Ave, Miami';
UPDATE properties SET lat = 32.7767, lng = -96.7970 WHERE location = '777 Suburbia Dr, Dallas';
UPDATE properties SET lat = 42.3601, lng = -71.0589 WHERE location = '333 Metro St, Boston';
UPDATE properties SET lat = 39.0968, lng = -120.0324 WHERE location = '888 Shoreline Dr, Tahoe';
UPDATE properties SET lat = 39.9526, lng = -75.1652 WHERE location = '100 Heritage Walk, Philadelphia';
