const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

async function updateJob(title, jobType) {
  try {
    // 1. Fetch current job
    const fetchRes = await fetch(`${SUPABASE_URL}/rest/v1/job_postings?title=eq.${encodeURIComponent(title)}`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    
    if (!fetchRes.ok) {
      console.error(`❌ Failed to fetch "${title}":`, await fetchRes.text());
      return;
    }
    
    const data = await fetchRes.json();
    if (data.length === 0) {
      console.error(`❌ Job "${title}" not found in database.`);
      return;
    }
    
    const job = data[0];
    
    // Parse content JSON and update meta[0]
    let contentObj = typeof job.content === 'string' ? JSON.parse(job.content) : job.content;
    if (contentObj && contentObj.meta) {
      contentObj.meta[0] = jobType;
    }
    
    // 2. Perform patch update
    const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/job_postings?id=eq.${job.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        job_type: jobType,
        content: JSON.stringify(contentObj)
      })
    });
    
    if (!patchRes.ok) {
      console.error(`❌ Failed to update "${title}":`, await patchRes.text());
    } else {
      console.log(`✅ Successfully updated "${title}" to "${jobType}" in Supabase DB.`);
    }
  } catch (err) {
    console.error(`❌ Error updating "${title}":`, err.message);
  }
}

async function run() {
  console.log("Updating job postings metadata in Supabase...");
  await updateJob("품질 관리 (QA)", "정규직/계약직/프리랜서");
  await updateJob("UI / UX / CX", "정규직/계약직/프리랜서");
  console.log("Update process finished.");
}

run();
