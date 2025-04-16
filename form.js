// form.js
document.addEventListener("DOMContentLoaded", () => {
    const travelForm = document.getElementById("travel-form");
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");

    // set the minimum value of the date input to today
    const today = new Date().toISOString().split('T')[0];
    startDateInput.min = today;
    endDateInput.min = today;

    // listen to the start date change, update the minimum value of the end date
    startDateInput.addEventListener('change', () => {
        endDateInput.min = startDateInput.value;
        // if the end date is less than the start date, reset the end date
        if (endDateInput.value && endDateInput.value < startDateInput.value) {
            endDateInput.value = startDateInput.value;
        }
    });

    endDateInput.addEventListener('change', () => {
        if (endDateInput.value < startDateInput.value) {
            endDateInput.value = startDateInput.value;
        }
    });

    travelForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const destination = document.getElementById("destination").value.trim();
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;
        const interests = Array.from(
            document.querySelectorAll('input[name="interests"]:checked')
        ).map((el) => el.value);

        // validation
        if (!startDate || !endDate) {
            alert("Please select both start and end dates");
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            alert("End date cannot be earlier than start date");
            return;
        }

        // Store data in localStorage
        const travelData = { destination, startDate, endDate, interests };
        localStorage.setItem("travelData", JSON.stringify(travelData));

        // Navigate to loading page
        window.location.href = "loading.html";
    });
});
  