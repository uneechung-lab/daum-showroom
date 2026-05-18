import requests

SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8'

headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': f'Bearer {SUPABASE_KEY}'
}

# Try common table names for careers
tables = ['careers', 'jobs', 'recruitment', 'job_postings', 'announcements']

for table in tables:
    url = f"{SUPABASE_URL}/rest/v1/{table}?select=*"
    try:
        response = requests.get(url, headers=headers)
        print(f"Table '{table}': Status {response.status_code}")
        if response.status_code == 200:
            print(f"Sample data: {response.json()[:2] if response.json() else 'Empty table'}")
    except Exception as e:
        print(f"Failed to query {table}: {e}")
