// loading.js
document.addEventListener("DOMContentLoaded", () => {
    // Simulate some "loading" steps
    const step1 = document.getElementById("step-1");
    const step2 = document.getElementById("step-2");
    const step3 = document.getElementById("step-3");
  
    setTimeout(() => {
      step1.textContent = "Analyzing destination... done!";
      setTimeout(() => {
        step2.textContent = "Checking weather... done!";
        setTimeout(() => {
          step3.textContent = "Finalizing itinerary... done!";
          // After final step, go to outcome page
          window.location.href = "outcome.html";
        }, 1500);
      }, 1500);
    }, 1500);
  });
  