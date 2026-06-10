const express = require("express");
const Log = require("./logger");

const app = express();

app.use(express.json());

let vehicles = [];

// CREATE
app.post("/vehicles", async (req, res) => {

    vehicles.push(req.body);

    await Log(
        "backend",
        "info",
        "controller",
        "Vehicle created successfully"
    );

    res.status(201).json({
        message: "Vehicle Added",
        data: req.body
    });
});

// READ
app.get("/vehicles", async (req, res) => {

    await Log(
        "backend",
        "info",
        "controller",
        "Fetched all vehicles"
    );

    res.json(vehicles);
});

// UPDATE
app.put("/vehicles/:id", async (req, res) => {

    const id = parseInt(req.params.id);

    const vehicle = vehicles.find(v => v.id === id);

    if (!vehicle) {

        await Log(
            "backend",
            "error",
            "controller",
            "Vehicle not found for update"
        );

        return res.status(404).json({
            message: "Vehicle Not Found"
        });
    }

    Object.assign(vehicle, req.body);

    await Log(
        "backend",
        "info",
        "controller",
        "Vehicle updated successfully"
    );

    res.json({
        message: "Vehicle Updated",
        data: vehicle
    });
});

// DELETE
app.delete("/vehicles/:id", async (req, res) => {

    const id = parseInt(req.params.id);

    const index = vehicles.findIndex(v => v.id === id);

    if (index === -1) {

        await Log(
            "backend",
            "error",
            "controller",
            "Vehicle not found for delete"
        );

        return res.status(404).json({
            message: "Vehicle Not Found"
        });
    }

    vehicles.splice(index, 1);

    await Log(
        "backend",
        "info",
        "controller",
        "Vehicle deleted successfully"
    );

    res.json({
        message: "Vehicle Deleted"
    });
});

app.get("/vehicles/due", async (req, res) => {

    const today = new Date();

    const dueVehicles = vehicles.filter(vehicle => {

        return new Date(vehicle.nextServiceDate) <= today;

    });

    await Log(
        "backend",
        "info",
        "controller",
        "Fetched due vehicles"
    );

    res.json(dueVehicles);

});

app.listen(4000, () => {

    console.log("Server Running");

});