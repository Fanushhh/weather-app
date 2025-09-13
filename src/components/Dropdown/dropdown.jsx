import { useIsOpen } from "../../hooks/useIsOpen";
import styles from "./dropdown.module.css";

export const Dropdown = ({children, isUnits, isSearch}) => {
    const { isOpen, setIsOpen, containerRef, closeBtnRef } = useIsOpen(false);
    
    return(
         <div className={styles.dropdown}>
                {isUnits && <button
                  ref={closeBtnRef}
                  onClick={() => setIsOpen(!isOpen)}
                  className={styles.dropbtn}
                  type="button"
                >
                  {isUnits && <img
                    className={isOpen ? styles.rotateUp : styles.rotateDown}
                    src="assets/images/icon-units.svg"
                  />}
                  Units{" "}
                  <img
                    src="assets/images/icon-dropdown.svg"
                    className={isOpen ? styles.rotateUp : styles.rotateDown}
                  />
                </button>}
                <div
                  ref={containerRef}
                  className={`${styles.dropdownContent} ${isOpen || isSearch ? styles.show : ""}`}
                >
                  {children}
                </div>
              </div>
    )
}