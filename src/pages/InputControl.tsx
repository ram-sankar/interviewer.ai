
import styles from "../pages/InpurControl.module.css";
function InputControl(props:any) {
  return (
    <div className={styles.container}>
        {props.label && <label>{props.label}</label>}
        <input type="text" {...props} />

    </div>
  );
}
;
export default InputControl