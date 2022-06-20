import classes from "./loader.module.css"

const Loader = () => {
  return (
    <div className={classes.lds}><div></div><div></div><div></div><div></div></div>
  )
}

export default Loader