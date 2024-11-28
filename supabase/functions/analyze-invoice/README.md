# Invoice Analysis Function

This Edge Function handles the analysis of uploaded invoice files. Currently, it implements a mock analysis, but it can be extended to use actual OCR services in the future.

## Features
- Processes uploaded invoice files
- Extracts basic information (mock data for now)
- Stores results in the InvoiceDetails table

## Environment Variables Required
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY