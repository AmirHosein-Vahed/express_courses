const Joi = require('joi');
const express = require("express");
const router = express.Router();

const courses = [
    { id: 1, name: "Math" },
    { id: 2, name: "Physics" },
    { id: 3, name: "Robotics" },
    { id: 4, name: "Geometry" },
];


// get all courses
router.get("/", (req, res) => {
    res.send(courses);
});

// get one course detail
router.get("/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("course not found");
    res.send(course);
});

// create new course
router.post("/", (req, res) => {
    // const result = validateCourse(req.body)
    // object destructuring
    const {error } = validateCourse(req.body)
    if (error) return res.status(400).send(result.error.message)

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

// update exists course
router.put('/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("course not found");

    // const result = validateCourse(req.body)
    // object destructuring
    const {error } = validateCourse(req.body)
    if (error) return res.status(400).send(result.error.message)

    course.name = req.body.name

    res.send(course)
})

// delete course
router.delete('/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("course not found");

    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(course)
})


function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    }) 

    return schema.validate(course)
}

module.exports = router