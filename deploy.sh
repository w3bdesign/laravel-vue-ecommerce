#!/bin/sh
set -ex # Exit immediately if a command exits with a non-zero status and print commands.

echo "Running composer"
# Attempt to clear composer cache first, then install
composer clear-cache --working-dir=/var/www/html || echo "Failed to clear composer cache, continuing..."
composer install --no-dev --no-interaction --no-progress --optimize-autoloader --working-dir=/var/www/html

echo "Checking for vendor/autoload.php..."
if [ -f "/var/www/html/vendor/autoload.php" ]; then
    echo "vendor/autoload.php found."
else
    echo "ERROR: vendor/autoload.php NOT found after composer install!"
    echo "Listing contents of /var/www/html/vendor/ if it exists:"
    ls -la /var/www/html/vendor/ || echo "/var/www/html/vendor/ directory does not exist."
    exit 1 # Exit if autoload is missing
fi

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

echo "Deployment script finished successfully."
