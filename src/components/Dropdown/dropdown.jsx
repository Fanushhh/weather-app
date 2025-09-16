import { useIsOpen } from "../../hooks/useIsOpen";
import styles from "./dropdown.module.css";

export const Dropdown = ({
  children,
  isUnits,
  isSearch,
  buttonText,
  lightColor,
}) => {
  const { isOpen, setIsOpen, containerRef, closeBtnRef } = useIsOpen(false);

  return (
    <div className={styles.dropdown}>
      <button
        ref={closeBtnRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.dropbtn} ${lightColor ? styles.lightColor : ""}`}
        type="button"
      >
        {isUnits && (
          <img
            className={isOpen ? styles.rotateUp : styles.rotateDown}
            src="assets/images/icon-units.svg"
          />
        )}
        {buttonText}
        <img
          src="assets/images/icon-dropdown.svg"
          className={isOpen ? styles.rotateUp : styles.rotateDown}
        />
      </button>
      <div
        ref={containerRef}
        className={`${styles.dropdownContent} ${
          isOpen || isSearch ? styles.show : ""
        } ${lightColor ? styles.lightColor : ""}`}
      >
        {children}
      </div>
    </div>
  );
};
