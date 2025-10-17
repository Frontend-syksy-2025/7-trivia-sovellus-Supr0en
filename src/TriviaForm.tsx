import {useState} from "react";

type datatype = {
    "response_code": number,
    "results": [
        {
            "type": string,
            "difficulty": string,
            "category": string,
            "question": string,
            "correct_answer": string,
            "incorrect_answers": string[]
        }
    ]
};
function TriviaForm() {
    const [data, setData] = useState<datatype | null>(null);
    const getQuestion = () => {
        fetch('https://opentdb.com/api.php?amount=1')
            .then(response =>  {
                if (response.status === 429) {
                    alert('Please try again in a moment.');
                    return; // stop further processing
                }
                if (!response.ok)
                    throw Error(response.statusText);
                return response.json();
            })
            .then(responseData => setData(responseData))
            .catch(err => console.error(err))
    }
    return (
        <>
            <div style={{display:"flex", justifyContent:'center', alignItems: 'center', flexDirection: 'column' }}>
                { data == null ? "Click the button to get a trivia question!" : data.results[0].question}
                <button onClick={getQuestion}>Get question</button>
            </div>
        </>
    )
}
export default TriviaForm;