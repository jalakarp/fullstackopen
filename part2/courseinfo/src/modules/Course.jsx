const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => parts.map(part => <Part part={part} key={part.id}/>) 

const Course = ({course}) => {
  const totalExercises = course.parts.reduce((sum, part) =>  sum + part.exercises, 0)
  return (
    <>
      <h2>{course.name}</h2>
      <Content parts={course.parts}/>
      <h3>total of {totalExercises} exercises</h3>
    </>
  )
}

export default Course