const semesterCount = document.getElementById("semesterCount");
const semesterInputs = document.getElementById("semesterInputs");

semesterCount.addEventListener("change", function () {

    semesterInputs.innerHTML = "";

    let count = parseInt(this.value);

    if (!count) return;

    for (let i = 1; i <= count; i++) {

        semesterInputs.innerHTML += `
        <input
            type="number"
            step="0.01"
            class="sgpa"
            placeholder="Semester ${i} SGPA">
        `;
    }
});

function calculateCGPA() {

    let inputs = document.querySelectorAll(".sgpa");

    if (inputs.length === 0) {
        alert("Please select number of semesters");
        return;
    }

    let total = 0;

    for (let input of inputs) {

        if (input.value === "") {
            alert("Please fill all SGPA fields");
            return;
        }

        total += parseFloat(input.value);
    }

    let cgpa = total / inputs.length;

    document.getElementById("cgpaResult").innerText =
        "CGPA: " + cgpa.toFixed(2);

    document.getElementById("cgpaValue").innerText =
        cgpa.toFixed(2);
}

function calculateRequiredSGPA() {

    let target = parseFloat(
        document.getElementById("targetCGPA").value
    );

    if (isNaN(target)) {
        alert("Please enter target CGPA");
        return;
    }

    let inputs = document.querySelectorAll(".sgpa");

    let total = 0;

    for (let input of inputs) {

        if (input.value === "") {
            alert("Please fill all SGPA fields");
            return;
        }

        total += parseFloat(input.value);
    }

    let currentCGPA = total / inputs.length;

    let completedSem = inputs.length;

    let totalSem = 8;

    let remainingSem = totalSem - completedSem;

    if (remainingSem <= 0) {

        document.getElementById("targetResult").innerText =
            "No remaining semesters.";

        return;
    }

    let requiredSGPA =
        ((target * totalSem) -
        (currentCGPA * completedSem))
        / remainingSem;

    if (requiredSGPA > 10) {

        document.getElementById("targetResult").innerText =
            "Target CGPA is not achievable.";

    } else {

        document.getElementById("targetResult").innerText =
            "Required Average SGPA: " +
            requiredSGPA.toFixed(2);
    }
}