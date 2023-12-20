// Function to add a student to the list
function addStudent() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const totalMarks = parseFloat(document.getElementById("totalMarks").value);
    const obtainedMarks = parseFloat(document.getElementById("obtainedMarks").value);

    if (firstName && lastName && !isNaN(totalMarks) && !isNaN(obtainedMarks)) {
        const studentList = document.getElementById("studentList");
        const listItem = document.createElement("li");

        const percentage = (obtainedMarks / totalMarks) * 100;

        if (percentage < 50) {
            listItem.textContent = `${firstName} ${lastName}, Total Marks: ${totalMarks}, Obtained Marks: ${obtainedMarks}, Result: Fail`;
            alert("Student has failed.");
        } else {
            listItem.textContent = `${firstName} ${lastName}, Total Marks: ${totalMarks}, Obtained Marks: ${obtainedMarks}, Result: Pass`;
        }

        studentList.appendChild(listItem);

        // Clear input fields
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("totalMarks").value = "";
        document.getElementById("obtainedMarks").value = "";
    }
}

// Function to remove the last student from the list
function removeLastStudent() {
    const studentList = document.getElementById("studentList");
    const lastItem = studentList.lastElementChild;
    if (lastItem) {
        studentList.removeChild(lastItem);
    }
}

// Event listeners
document.getElementById("addButton").addEventListener("click", addStudent);
document.getElementById("removeButton").addEventListener("click", removeLastStudent);
