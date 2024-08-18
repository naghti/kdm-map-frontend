import { Button, Form, Modal } from "react-bootstrap"
import styles from "./AdminModal.module.css"
import { useEffect, useState } from "react"
import { checkPass } from "../../http/adminAPI"

const AdminModal = () => {
    const [pass, setPass] = useState("")
    const [passVerified, setPassVerified] = useState(false)

    async function submit (password) {
        const data = new FormData();
        data.append('pass', password);


        const check = await checkPass(data)

        if (check.pass) {
            localStorage.setItem("pass", password)
            setPassVerified(check.pass)
        } else {
            alert("Неправильный пароль")
        }
    }

    useEffect(async () => {
        const storagePass = localStorage.getItem("pass")        

        console.log(storagePass)
        submit(storagePass)
    }, [])

    return (
        <div 
            className={styles.modalBox}
            style={{display: passVerified ? "none" : "flex"}}
        >
            <div
                className="modal show"
            >
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Код</Modal.Title>
                </Modal.Header>

                <div
                    style={{padding: 20}}
                >
                    <Form.Control
                        type="text"
                        placeholder="Код"
                        value={pass}
                        onChange={(e) => {setPass(e.target.value)}}
                    />
                </div>

                <Modal.Footer>
                    <Button 
                        variant="primary"
                        onClick={() => submit(pass)}
                    >
                        Отправить
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
        </div>
    )
}

export default AdminModal