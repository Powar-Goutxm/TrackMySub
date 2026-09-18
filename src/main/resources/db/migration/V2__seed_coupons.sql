INSERT INTO coupons (service_name, code, description, discount_percentage, valid_from, valid_until, is_active)
VALUES
    ('Netflix', 'NETFLIX10', '10% off on Annual Plan', 10.00, CURRENT_DATE, '2027-12-31', true),
    ('Spotify', 'SPOTIFYFREE', '1 Month Free Premium', 100.00, CURRENT_DATE, '2027-06-30', true),
    ('Spotify', 'SPOTMUSIC20', '20% off on Student Plan', 20.00, CURRENT_DATE, '2027-12-31', true),
    ('Amazon Prime', 'PRIME2027', 'Special discount for new users', 15.00, CURRENT_DATE, '2027-12-31', true),
    ('Hotstar', 'HOTSTAR50', '50% off on Super Plan', 50.00, CURRENT_DATE, '2027-12-31', true),
    ('YouTube Premium', 'YTPREM25', '25% off for 3 months', 25.00, CURRENT_DATE, '2027-12-31', true),
    ('Swiggy One', 'SWIGGYONE30', '30% off on 3 Months Plan', 30.00, CURRENT_DATE, '2027-12-31', true),
    ('Swiggy One', 'SWIGGY100', 'Flat discount on Annual Plan', 20.00, CURRENT_DATE, '2027-12-31', true),
    ('Zomato Gold', 'ZGOLD50', '50% off on Zomato Gold 3 Months', 50.00, CURRENT_DATE, '2027-12-31', true),
    ('iCloud', 'APPLECLOUD10', '10% off on 200GB storage', 10.00, CURRENT_DATE, '2027-12-31', true),
    ('Google One', 'GOOG100', '1 Month Free on 100GB Plan', 100.00, CURRENT_DATE, '2027-12-31', true),
    ('LinkedIn Premium', 'LINKEDIN20', '20% off on Career Plan', 20.00, CURRENT_DATE, '2027-12-31', true);
