import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFoundWrapper}>
      <h1>404 Not Found</h1>
      <p>This page does not exist. Please check the URL and try again.</p>
    </div>
  );
}
