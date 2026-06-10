const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ5b2dlbmRyYS5wYWxoYXdhdF9jczIzQGdsYS5hYy5pbiIsImV4cCI6MTc4MTA3NzE3MSwiaWF0IjoxNzgxMDc2MjcxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOWQ5NGU0YWYtYjE4NC00MWM3LWE1NmYtZmM4MmQzYTg4MDI5IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoieW9nZW5kcmEgcGFsaGF3YXQiLCJzdWIiOiJiYjljMGI2NC00OGNmLTRkOTctYjU4MS02OWNjMWM2NGY0NGMifSwiZW1haWwiOiJ5b2dlbmRyYS5wYWxoYXdhdF9jczIzQGdsYS5hYy5pbiIsIm5hbWUiOiJ5b2dlbmRyYSBwYWxoYXdhdCIsInJvbGxObyI6IjIzMTUwMDI1NjQiLCJhY2Nlc3NDb2RlIjoiUlBzZ1l0IiwiY2xpZW50SUQiOiJiYjljMGI2NC00OGNmLTRkOTctYjU4MS02OWNjMWM2NGY0NGMiLCJjbGllbnRTZWNyZXQiOiJmd2JQRlpFcFVhSlNZcW1kIn0.KQiOeV9_3Gs6DvFVweprsLHExeHZnJAJNWiSYNE8umo";

function getPriority(type) {

    if (type === "Placement") return 3;
    if (type === "Result") return 2;

    return 1;
}

async function fetchNotifications() {

    try {

        const response = await axios.get(
            "http://4.224.186.213/evaluation-service/notifications",
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
        );

        const notifications =
            response.data.notifications;

        const top10 = notifications
            .sort((a, b) => {

                const priorityDiff =
                    getPriority(b.Type) -
                    getPriority(a.Type);

                if (priorityDiff !== 0)
                    return priorityDiff;

                return (
                    new Date(b.Timestamp) -
                    new Date(a.Timestamp)
                );
            })
            .slice(0, 10);

        console.log(
            JSON.stringify(top10, null, 2)
        );

    } catch (error) {

        console.log(
            error.response?.data ||
            error.message
        );
    }
}

fetchNotifications();