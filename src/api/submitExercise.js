import SUPABASE_KEY from '../apikey'
const submitExercise = (token, user_id, document_id, answer, is_correct) => (
    fetch('https://vikrybiztqeanihgvgkm.supabase.co/rest/v1/practices',
    {   
        method: 'POST',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({ user_id, document_id, answer, is_correct })
    })
    .then(res => res.json())
);

export default submitExercise;

/*

data = {
    "user_id": "fe9ff26f-e7bf-4c01-956a-ad18c75b0c96",
    "document_id": "355685c9-36d7-403e-b324-3d4beb588558",
    "answer": 0,
    "is_correct": false,
}

*/