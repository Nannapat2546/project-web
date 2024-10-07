document.getElementById('attendance-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;

    // Send data to server
    await fetch('http://localhost:3000/attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, date }),
    });

    // Clear the form
    document.getElementById('attendance-form').reset();

    // Fetch updated attendance records
    loadAttendance();
});

// Function to load attendance records
async function loadAttendance() {
    const response = await fetch('http://localhost:3000/attendance');
    const data = await response.json();
    
    const attendanceBody = document.getElementById('attendance-body');
    attendanceBody.innerHTML = '';

    data.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.name}</td>
            <td>${record.date}</td>
            <td><i class="fas fa-times delete-icon" style="color: red; cursor: pointer;"></i></td>
        `;
        attendanceBody.appendChild(row);
    });
}

// Load attendance records on page load
loadAttendance();
