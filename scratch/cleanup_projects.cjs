
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hypyydfzyahscznwltnf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';
const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanup() {
    console.log('Fetching projects with year-like client names...');
    
    // 고객사 이름이 '년' 또는 '년도'로 끝나는 데이터들 가져오기
    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .or('client.like.%년,client.like.%년도');

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    console.log(`Found ${projects.length} potential error records.`);

    for (const project of projects) {
        let realClient = project.client;
        let realTitle = project.title;

        // 제목에서 실제 고객사 찾기 (보통 연도 뒤에 바로 나옴)
        // 예: client="2019년도", title="대한소방공제회 ..."
        // -> realClient="대한소방공제회", realTitle="..."
        
        const words = project.title.trim().split(/\s+/);
        if (words.length > 0) {
            realClient = words[0]; // 첫 번째 단어를 고객사로 가정
            realTitle = words.slice(1).join(' '); // 나머지를 제목으로
            
            console.log(`Fixing: [${project.client}] ${project.title} -> [${realClient}] ${realTitle}`);
            
            const { error: updateError } = await supabase
                .from('projects')
                .update({ client: realClient, title: realTitle })
                .eq('id', project.id);
                
            if (updateError) console.error(`Failed to update ${project.id}:`, updateError);
        }
    }

    console.log('Cleanup completed!');
}

cleanup();
