function loadDoctors() {

    fetch("/doctors")

        .then(function(response) {
            return response.json();
        })

        .then(function(doctors) {

            let doctorOutput = "";

            let selectOutput =
                '<option value="">Select Doctor</option>';

            for (let i = 0; i < doctors.length; i++) {

                doctorOutput += `
                    <div class="doctor">

                        <h3>
                            ${doctors[i].name}
                        </h3>

                        <p>
                            Specialization:
                            ${doctors[i].specialization}
                        </p>

                        <p>
                            Available:
                            ${doctors[i].available_time}
                        </p>

                    </div>
                `;

                selectOutput += `
                    <option value="${doctors[i].id}">

                        ${doctors[i].name}
                        -
                        ${doctors[i].specialization}

                    </option>
                `;
            }

            document.getElementById(
                "doctorList"
            ).innerHTML = doctorOutput;

            document.getElementById(
                "doctorSelect"
            ).innerHTML = selectOutput;
        });
}

function loadAppointments() {

    fetch("/appointments")

        .then(function(response) {
            return response.json();
        })

        .then(function(appointments) {

            let output = "";

            for (
                let i = 0;
                i < appointments.length;
                i++
            ) {

                output += `
                    <div class="appointment">

                        <h3>
                            Patient:
                            ${appointments[i].patient_name}
                        </h3>

                        <p>
                            Phone:
                            ${appointments[i].patient_phone}
                        </p>

                        <p>
                            Doctor:
                            ${appointments[i].doctor_name}
                        </p>

                        <p>
                            Specialization:
                            ${appointments[i].specialization}
                        </p>

                        <p>
                            Date:
                            ${appointments[i].appointment_date}
                        </p>

                    </div>
                `;
            }

            document.getElementById(
                "appointmentList"
            ).innerHTML = output;
        });
}

document
    .getElementById("appointmentForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const data = {

                patient_name:
                    document.getElementById(
                        "patientName"
                    ).value,

                patient_phone:
                    document.getElementById(
                        "patientPhone"
                    ).value,

                doctor_id:
                    document.getElementById(
                        "doctorSelect"
                    ).value,

                appointment_date:
                    document.getElementById(
                        "appointmentDate"
                    ).value
            };

            fetch(
                "/appointment",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body:
                    JSON.stringify(data)
                }
            )

            .then(function(response) {
                return response.json();
            })

            .then(function(result) {

                document.getElementById(
                    "message"
                ).innerHTML =
                result.message;

                document
                    .getElementById(
                        "appointmentForm"
                    )
                    .reset();

                loadAppointments();
            });
        }
    );

loadDoctors();

loadAppointments();
