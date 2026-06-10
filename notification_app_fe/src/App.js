import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [limit, setLimit] = useState(10);

  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ5b2dlbmRyYS5wYWxoYXdhdF9jczIzQGdsYS5hYy5pbiIsImV4cCI6MTc4MTA3NzE3MSwiaWF0IjoxNzgxMDc2MjcxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOWQ5NGU0YWYtYjE4NC00MWM3LWE1NmYtZmM4MmQzYTg4MDI5IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoieW9nZW5kcmEgcGFsaGF3YXQiLCJzdWIiOiJiYjljMGI2NC00OGNmLTRkOTctYjU4MS02OWNjMWM2NGY0NGMifSwiZW1haWwiOiJ5b2dlbmRyYS5wYWxoYXdhdF9jczIzQGdsYS5hYy5pbiIsIm5hbWUiOiJ5b2dlbmRyYSBwYWxoYXdhdCIsInJvbGxObyI6IjIzMTUwMDI1NjQiLCJhY2Nlc3NDb2RlIjoiUlBzZ1l0IiwiY2xpZW50SUQiOiJiYjljMGI2NC00OGNmLTRkOTctYjU4MS02OWNjMWM2NGY0NGMiLCJjbGllbnRTZWNyZXQiOiJmd2JQRlpFcFVhSlNZcW1kIn0.KQiOeV9_3Gs6DvFVweprsLHExeHZnJAJNWiSYNE8umo";

  const getPriority = (type) => {
    if (type === "Placement") return 3;
    if (type === "Result") return 2;
    return 1;
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {

      const response = await axios.get(
        "http://4.224.186.213/evaluation-service/notifications",
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`
          }
        }
      );

      setNotifications(response.data.notifications);

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const markAsViewed = (id) => {

    let viewed =
      JSON.parse(
        localStorage.getItem("viewed")
      ) || [];

    if (!viewed.includes(id)) {

      viewed.push(id);

      localStorage.setItem(
        "viewed",
        JSON.stringify(viewed)
      );
    }

    setNotifications([...notifications]);
  };

  const isViewed = (id) => {

    let viewed =
      JSON.parse(
        localStorage.getItem("viewed")
      ) || [];

    return viewed.includes(id);
  };

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter(
          (n) => n.Type === filter
        );

  const topNotifications =
    [...filteredNotifications]
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
      .slice(0, limit);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "auto"
      }}
    >

      <h1>
        Campus Notifications Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px"
        }}
      >

        <div>

          <label>
            Filter Type:
          </label>

          <br />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option value="All">
              All
            </option>

            <option value="Placement">
              Placement
            </option>

            <option value="Result">
              Result
            </option>

            <option value="Event">
              Event
            </option>

          </select>

        </div>

        <div>

          <label>
            Top N:
          </label>

          <br />

          <select
            value={limit}
            onChange={(e) =>
              setLimit(
                Number(e.target.value)
              )
            }
          >
            <option value="5">
              5
            </option>

            <option value="10">
              10
            </option>

            <option value="15">
              15
            </option>

            <option value="20">
              20
            </option>

          </select>

        </div>

      </div>

      {topNotifications.map((item) => (

        <div
          key={item.ID}
          onClick={() =>
            markAsViewed(item.ID)
          }
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "15px",
            cursor: "pointer",
            backgroundColor:
              isViewed(item.ID)
                ? "#f5f5f5"
                : "#d4ffd4"
          }}
        >

          <h3>
            {item.Type}

            {" "}

            {isViewed(item.ID)
              ? "(VIEWED)"
              : "(NEW)"}
          </h3>

          <p>
            {item.Message}
          </p>

          <small>
            {item.Timestamp}
          </small>

        </div>

      ))}

    </div>
  );
}

export default App;