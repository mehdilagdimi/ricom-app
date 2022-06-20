import classes from "./loader.module.css"

const Loader = () => {
  return (
    <div class={classes.lds}><div></div><div></div><div></div><div></div></div>
  )
}

export default Loader