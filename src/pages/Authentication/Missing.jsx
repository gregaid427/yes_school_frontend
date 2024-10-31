import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <div className="bg-meta-4 bg-cover h-screen dark:text-bodydark w-full text-center  flex flex-col  pt-40">
   
      <label
            className=" block text-xl  font-large  font-extrabold text-white dark:text-white"
            htmlFor="fullName"
          >
            Page Not Found 
          </label>
   
       
            <p></p>
            <div className="flexGrow mt-5">
                <Link to="/">Sign In</Link>
            </div>
  
      
        </div>
    )
}

export default Missing
