import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination( totalPages, page ) {
  for (let i = 0; i < totalPages; i++) {
    return (
      <nav>
        {page === i ? (
          <li className="" key={i+1}>
            <button>
              {i + 1}
            </button>
          </li>
        ) : (
          <li>
            <button >{i + 1}</button>
          </li>
        )}
      </nav>
    );
  }
}
