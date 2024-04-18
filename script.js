async function sendInfo(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const currentEventRating = document.getElementById("currentEventRating").value;
    const overallEventRating = document.getElementById("overallEventRating").value;
    const annRating = document.getElementById("annRating").value;
    const timingRating = document.getElementById("timingRating").value;
    const helpRating = document.getElementById("helpRating").value;
    const futEvents = document.getElementById("futEvents").value;
    const feedback = document.getElementById("feedback").value;

    const webhookContents = {
        embeds: [{
            title: 'Feedback Form Submission',
            fields: [
                { name: 'Username', value: username },
                { name: 'Web && Design Rating', value: currentEventRating },
                { name: 'Overall Event Rating', value: overallEventRating },
                { name: 'Announcement Formatting Rating', value: annRating },
                { name: 'Length Between Milestones Rating', value: timingRating },
                { name: 'Helpfulness Rating', value: helpRating },
                { name: 'Future Event Suggestions', value: futEvents },
                { name: 'Feedback', value: feedback }
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
