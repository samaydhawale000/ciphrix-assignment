import BackButton from "../commonComponents/BackButton";

export default function PageNotFound() {
  return (
    <div className='pageNotFoundWrapper'>
      <div>
      <h1> Oops !</h1>
      <h5>Sorry, The page you are looking for doesn't exist, <br /> no longer exists or has been moved.</h5>
      <BackButton/>
      </div>
    </div>
  )
}
