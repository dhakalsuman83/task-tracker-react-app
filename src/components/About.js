import { Link } from "react-router-dom"
import Button from "./Button"
const About = () => {
  return (
      <div>
          <h4>Created by: Suman Dhakal</h4>
          <h5>Learned from Traverse Media</h5>
          <Link to="/"><Button text="Return to main Page" color='grey'/></Link>
    </div>
  )
}

export default About