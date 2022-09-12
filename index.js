const Joi = require('joi')
const express = require("express");
const app = express();

// add json middleware to app
app.use(express.json());

const courses = [
    { id: 1, name: "Math" },
    { id: 2, name: "Physics" },
    { id: 3, name: "Robotics" },
    { id: 4, name: "Geometry" },
];

app.get("/", (req, res) => {
    res.send("Hello world!");
});

// get all courses
app.get("/api/courses", (req, res) => {
    res.send(courses);
});

// get one course detail
app.get("/api/courses/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("course not found");
    }
    res.send(course);
});

// create new course
app.post("/api/courses", (req, res) => {
    // const result = validateCourse(req.body)
    // object destructuring
    const {error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(result.error.message)
        return
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

// update exists course
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("course not found");
    }

    // const result = validateCourse(req.body)
    // object destructuring
    const {error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(result.error.message)
    }

    course.name = req.body.name

    res.send(course)
})


function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    }) 

    return schema.validate(course)
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
