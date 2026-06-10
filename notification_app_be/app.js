const express = require("express");

const app = express();

app.use(express.json());

let notifications = [];

// CREATE
app.post("/notifications", (req, res) => {

    notifications.push(req.body);

    res.status(201).json({
        message: "Notification Created",
        data: req.body
    });

});

// GET ALL
app.get("/notifications", (req, res) => {

    res.json(notifications);

});

// MARK AS READ
app.put("/notifications/:id/read", (req, res) => {

    const id = parseInt(req.params.id);

    const notification = notifications.find(
        n => n.id === id
    );

    if (!notification) {

        return res.status(404).json({
            message: "Notification Not Found"
        });

    }

    notification.read = true;

    res.json({
        message: "Notification Marked As Read",
        data: notification
    });

});

// DELETE
app.delete("/notifications/:id", (req, res) => {

    const id = parseInt(req.params.id);

    notifications = notifications.filter(
        n => n.id !== id
    );

    res.json({
        message: "Notification Deleted"
    });

});

app.listen(5000, () => {

    console.log("Notification Server Running");

});