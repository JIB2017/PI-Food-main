import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div>
      <h1>Bienvenidos a Henry Food</h1>
      <div className={styles.btn}>
        <Link to="/home">Ingresar</Link>
      </div>
    </div>
  );
}
