const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

async function updateLocations() {
  try {
    // 1. Fetch all jobs
    const fetchRes = await fetch(`${SUPABASE_URL}/rest/v1/job_postings`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    
    if (!fetchRes.ok) {
      console.error("❌ Failed to fetch job postings:", await fetchRes.text());
      return;
    }
    
    const jobs = await fetchRes.json();
    console.log(`Fetched ${jobs.length} jobs. Aligning locations...`);
    
    for (const job of jobs) {
      let contentObj = typeof job.content === 'string' ? JSON.parse(job.content) : job.content;
      if (!contentObj) continue;
      
      // Rule: 정규직만 -> 여의도, 그 외 -> 본사/여의도
      const locationText = job.job_type === '정규직' ? '여의도' : '본사/여의도';
      
      if (!contentObj.meta) {
        contentObj.meta = [job.job_type, locationText, "상시채용"];
      } else {
        contentObj.meta[0] = job.job_type;
        contentObj.meta[1] = locationText;
        contentObj.meta[2] = job.end_date ? job.end_date : '상시채용';
      }
      
      const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/job_postings?id=eq.${job.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          content: JSON.stringify(contentObj)
        })
      });
      
      if (!patchRes.ok) {
        console.error(`❌ Failed to update location for "${job.title}":`, await patchRes.text());
      } else {
        console.log(`✅ Successfully updated location of "${job.title}" to "${locationText}".`);
      }
    }
  } catch (err) {
    console.error("❌ Error running update script:", err.message);
  }
}

updateLocations();
