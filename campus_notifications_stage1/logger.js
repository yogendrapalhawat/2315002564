const axios = require("axios");

async function Log(stack, level, packageName, message) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message
      },
      {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ5b2dlbmRyYS5wYWxoYXdhdF9jczIzQGdsYS5hYy5pbiIsImV4cCI6MTc4MTA3NTIyMiwiaWF0IjoxNzgxMDc0MzIyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMGYxNDg5ZTktNWY2Zi00N2M5LTg2YWMtY2QyMGI5NmJiNTM0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoieW9nZW5kcmEgcGFsaGF3YXQiLCJzdWIiOiJiYjljMGI2NC00OGNmLTRkOTctYjU4MS02OWNjMWM2NGY0NGMifSwiZW1haWwiOiJ5b2dlbmRyYS5wYWxoYXdhdF9jczIzQGdsYS5hYy5pbiIsIm5hbWUiOiJ5b2dlbmRyYSBwYWxoYXdhdCIsInJvbGxObyI6IjIzMTUwMDI1NjQiLCJhY2Nlc3NDb2RlIjoiUlBzZ1l0IiwiY2xpZW50SUQiOiJiYjljMGI2NC00OGNmLTRkOTctYjU4MS02OWNjMWM2NGY0NGMiLCJjbGllbnRTZWNyZXQiOiJmd2JQRlpFcFVhSlNZcW1kIn0.xYm04y554eTa04V0sCIKpP0BhEIHxgq2LJ47M8NAsKU"
        }
      }
    );

    console.log(response.data);

  } catch (error) {
    console.log("Logging Error");
    console.log(error.response?.data || error.message);
  }
}

module.exports = Log;