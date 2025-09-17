import style from "./Error.module.css";


export const ErrorLoading = () => {
    return(
        <section className={style.errorContainer}>
            <img src="assets/images/icon-error.svg"  width={50} height={50} />
            <h1>Something went wrong</h1>
            <p>We couldn’t connect to the server (API error). Please try again in a few moments.</p>
            <a href="/">Retry</a>
        </section>
    )
}