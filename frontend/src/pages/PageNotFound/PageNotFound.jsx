import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div style={{textAlign: "center", textAlignVertical: "center"}}>
        <h1> Error 404: Page Not Found</h1>
        <p>
            <Link to="/home">Go back Home</Link>
        </p>
    </div>
  )
}

export default PageNotFound