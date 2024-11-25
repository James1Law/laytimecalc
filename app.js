function calculateLaytime() {
    const norDate = new Date(document.getElementById('norDate').value);
    const completionDate = new Date(document.getElementById('completionDate').value);
    const laytimeAllowed = parseInt(document.getElementById('laytimeHours').value);
    const deductionHours = parseInt(document.getElementById('deductionHours').value) || 0;
    const output = document.getElementById('output');
    
    // Validate inputs
    if (isNaN(norDate.getTime()) || isNaN(completionDate.getTime()) || !laytimeAllowed) {
        output.textContent = 'Please fill in all fields';
        document.getElementById('sendToCostsButton').style.display = 'none'; // Hide button on error
        return;
    }
    
    // Calculate difference in hours
    const diffInMs = completionDate - norDate;
    const actualHours = Math.floor(diffInMs / (1000 * 60 * 60));
    
    // Calculate laytime difference with deductions
    const timeUsed = actualHours - deductionHours;
    const laytimeDifference = timeUsed - laytimeAllowed;
    
    // Format the output string
    let resultMessage = `Total time used: ${actualHours} hours\n`;
    resultMessage += `Deductions: ${deductionHours} hours\n`;
    resultMessage += `Net time used: ${timeUsed} hours\n`;
    resultMessage += `Allowed laytime: ${laytimeAllowed} hours\n`;
    resultMessage += `Difference: ${Math.abs(laytimeDifference)} hours ${laytimeDifference > 0 ? 'of demurrage' : 'of despatch'}`;
    
    output.textContent = resultMessage;
    
    // Show the button - make this more explicit
    const sendToCostsButton = document.getElementById('sendToCostsButton');
    sendToCostsButton.style.display = 'block';  // or 'inline-block'
}

// Make sure this code runs when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add click handler for calculate button
    document.getElementById('calculateButton').addEventListener('click', calculateLaytime);
    
    // Add click handler for send to costs button
    document.getElementById('sendToCostsButton').addEventListener('click', function() {
        console.log('Sending to costs and revenue...');
    });
}); 