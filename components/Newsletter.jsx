import { useState } from "react"
import axios from "axios"
import styles from "./newsletter.module.css"

export default () => {
  const [email, setEmail] = useState("")
  const [state, setState] = useState("IDLE")
  const [errorMessage, setErrorMessage] = useState(null)

  const subscribe = async () => {
    setState("LOADING")
    setErrorMessage(null)
    try {
      const response = await axios.post("/api/newsletter", { email })
      setState("SUCCESS")
    } catch (e) {
      setErrorMessage(e.response.data.error)
      setState("ERROR")
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Subscribe to my newsletter!</h2>
      <p className={styles.details}>
        It includes interesting tech content as well as some information on how
        to live life to the fullest!
      </p>
      <div>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="button"
          disabled={state === "LOADING"}
          onClick={subscribe}
        >
          {state === "LOADING" ? "Loading" : "Subscribe"}
        </button>
      </div>
      {state === "ERROR" && <p className={styles.errorMsg}>{errorMessage}</p>}
      {state === "SUCCESS" && <p className={styles.successMsg}>Success!</p>}
    </div>
  )
}
