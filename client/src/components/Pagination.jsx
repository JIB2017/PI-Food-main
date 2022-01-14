import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({ totalPages, page, paged }) {
  let array = [];
  for (let i = 0; i < totalPages; i++) {
    array.push(i + 1);
  }
  return (
    <nav>
      {array?.map((nro) => {
        return (
          <li className={styles.pagination} key={nro}>
            {page === nro ? (
              <button className={styles.active} onClick={() => paged(nro)}>
                {nro}
              </button>
            ) : (
              <button onClick={() => paged(nro)}>{nro}</button>
            )}
          </li>
        );
      })}
    </nav>
  );
}
