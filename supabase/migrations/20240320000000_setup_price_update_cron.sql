-- Enable the required extensions
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Schedule the cron job to run daily at midnight
select
cron.schedule(
  'update-prices-daily',
  '0 0 * * *',
  $$
  select
    net.http_post(
        url:='https://qhidxbdxcymhuyquyqgk.supabase.co/functions/v1/update-prices',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoaWR4YmR4Y3ltaHV5cXV5cWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3OTUxOTUsImV4cCI6MjA0ODM3MTE5NX0.Z_NGQ7nZONZSEdflyn7xbequfpjlK3hxnkznfqt6Qgg"}'::jsonb
    ) as request_id;
  $$
);