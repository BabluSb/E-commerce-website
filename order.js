async function classifyFeedback(feedback) {
    try {
        const response = await fetch('/classify-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ feedback })
        });

        const result = await response.json();

        // Log the response to check if it contains what you're expecting
        console.log(result);

        if (result && result.classification) {
            return result.classification; // Return classification if it exists
        } else {
            throw new Error('Invalid API response');
        }
    } catch (error) {
        console.error('Error in classifyFeedback:', error.message);
        return 'Unable to classify feedback'; // Fallback message
    }
}

// Handle Feedback Submission
document.getElementById('submit-feedback').addEventListener('click', async () => {
    const feedback = document.getElementById('feedback').value;
    if (feedback) {
        const classification = await classifyFeedback(feedback);
        alert(`Feedback classified as: ${classification}`);
    } else {
        alert('Please enter your feedback.');
    }
});
