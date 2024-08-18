import { Button, Card } from "react-bootstrap";
import { nextConfig } from "../next.config";
import { deletePoint } from "../http/adminAPI";
import { useState } from "react";

const AdminPointsList = ({info, fReload}) => {
    const backImg = nextConfig.API_URL + info.photos[0]
    const [isDeleted, setIsDeleted] = useState(false)

    const deleteClick = async (id) => {
        const data = new FormData();
        data.append('id', id);
        data.append('pass', localStorage.getItem("pass"));


        const response = await deletePoint(data);
        fReload()
   }

    return (
        <Card style={{width: 300}}>
            <Card.Img variant="top" src={backImg} />
            <Card.Body>
            <Card.Title>{info.name}</Card.Title>
            <Card.Text>
                {info.street}
            </Card.Text>
            <Button 
                variant="primary"
                onClick={() => deleteClick(info._id)}
            >
                Удалить
            </Button>
            </Card.Body>
        </Card>
    );
}

export default AdminPointsList