import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({ totalPages, page }) {
  for (let i = 0; i < totalPages; i++) {
    return (
      <div>
        {page === i ? (
          <li className={styles.pagination} key={i+1}>
            <button className={styles.active} onClick={() => {}}>
              {i + 1}
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => {}}>{i + 1}</button>
          </li>
        )}
      </div>
    );
  }
}
