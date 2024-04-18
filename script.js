async function sendInfo(event) {
    event.preventDefault();



    const webhookContents = {
        embeds: [{
            title: 'Feedback Form Submission',
    
           
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
    } else {
        alert('Error occured. Try again later.')
    }
}
