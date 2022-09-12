const express = require('express')
const app = express()


const courses = [
    { id: 1, name: 'Math' },
    { id: 2, name: 'Physics' },
    { id: 3, name: 'Robotics' },
    { id: 4, name: 'Geometry' },
]

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.get('/api/courses', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) { res.status(404).send("course not found") }
    res.send(course)
})

app.get('/api/courses/:id', (req, res) => {
    // res.send(req.params.id)
    res.send(courses[req.params.id-1])
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))