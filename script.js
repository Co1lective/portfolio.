async function sendInfo(event) {
    event.preventDefault();

    const webhookContents = {
        embeds: [{
           title: 'Feedback Form Submission',
            fields: [
                { name: 'Username', value: 'Username' },
                { name: 'Web && Design Rating', value: 'Username' },
                { name: 'Overall Event Rating', value: 'Username' },
                { name: 'Announcement Formatting Rating', value: 'Username' },
                { name: 'Length Between Milestones Rating', value: 'Username' },
                { name: 'Helpfulness Rating', value: 'Username' },
                { name: 'Future Event Suggestions', value: 'Username' },
                { name: 'Feedback', value: 'Username' }
            ],
            color: '12618607'
        }],
    };

    const webhookUrl = "https://i.ahmood.xyz/send/webhook";

    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "4XyCPCuf6Dq65gcPBZPBjq59Uwzs1d971uXRjPYii3KIV2AZoaZ4zkjED8XGbbv9"
        },
        body: JSON.stringify(webhookContents),
    });

    if (response.ok) {
        alert('Feedback sent.')
        document.getElementById("form").reset();
    } else {
        alert('Error occured. Try again later.')
    }
}
