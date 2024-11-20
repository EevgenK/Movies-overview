import { Grid } from "react-loader-spinner";
import s from "./Loader.module.css";

const Loader = () => (
  <Grid
    wrapperClass={s.wrap}
    visible={true}
    height="200"
    width="200"
    color="var(--background-accent)"
    ariaLabel="grid-loading"
    radius="12.5"
  />
);

export default Loader;
