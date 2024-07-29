import {Button, Form} from "react-bootstrap";
import {create, getAll} from "../http/pointAPI";
import {useEffect, useState} from "react";
import {usePointsStore} from "../store/Store";
import Input from "../components/Input/Input";

const Admin = () => {
    const {points, changePoints, changeFilterByType, changeFilterByNosological, filteredPoints, changeFilterByText} = usePointsStore()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        coordinates: [],
        type: "Магазины",
        accessibility: [
            {
                available: 2,
                description: [],
                name: "invalid"
            },
            {
                available: 2,
                description: [],
                name: "bleed"
            },
            {
                available: 2,
                description: [],
                name: "ear"
            },
        ],
        photos: null
    })
    
    
    const getPoints = async () => {
        const response = await getAll();
        changePoints(response["points"] || []);
    }
    
    useEffect(async () => {
        await getPoints()
    }, []);
    
    let PointsTypes = new Set()
    points.map(point => PointsTypes.add(point.type))
    PointsTypes = Array.from(PointsTypes)


    const [formDataStatic, setFormDataStatic] = useState(formData)

    const updateDescription = (typeIndex, index, newDescription) => {
        const oldDescription = formData.accessibility[typeIndex].description
        oldDescription[index] = newDescription

        setFormData(formData)
    };

    const updateAvailable = (availableIndex, index) => {
        const oldDescription = formData.accessibility[availableIndex]
        oldDescription.available = Number(index)

        setFormData(formData)
    }

    const submit = async (e) => {
             e.preventDefault()
    
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('type', formData.type);
            
            formData.coordinates = formData.coordinates.split(",").map(item => Number(item))
            formData.coordinates = JSON.stringify(formData.coordinates)
            formData.accessibility = JSON.stringify(formData.accessibility)
            
            data.append('coordinates', formData.coordinates);
            data.append('accessibility', formData.accessibility);
            
            data.append('photos', formData.photos);
            
            const response = await create(data);
            console.log(response)

            // setFormData(formDataStatic)


    }

    const setCoordinates = (string) => {
        setFormData({...formData, coordinates: string})
    }

    const setPhoto = (photo) => {
        setFormData({...formData, photos: photo})
    }


    return (
        <div style={{padding: 20}}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <div style={{margin: "20px 0"}}>
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Название"
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div style={{margin: "20px 0"}}>
                        <Form.Label>описание</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="описание"
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>

                    <div style={{margin: "20px 0"}}>
                        <Form.Label>координаты</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="координаты"
                            onChange={(e) => setCoordinates(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            координаты из гугла.
                        </Form.Text>
                    </div>

                    <div style={{margin: "20px 0"}}>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>фото</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setPhoto(e.target.files[0]) }
                            />
                        </Form.Group>
                    </div>

                    <div style={{margin: "20px 0"}}>
                        <Form.Label>тип учреждения</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="тип учреждения"
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                        />
                        <Form.Text className="text-muted">
                            писать только если нужно добавить что-то новое, иначе выбор из селекта ниже
                        </Form.Text>
                        <Form.Select
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                            {
                                PointsTypes.map((point, index) => (
                                    <option
                                        value={point}
                                        key={index}
                                    >
                                        {point}
                                    </option>
                                ))
                            }
                        </Form.Select>
                    </div>

                    <div style={{margin: "20px 0"}}>
                        <Form.Label>Доступно для маломобильных граждан</Form.Label>
                        <Form.Select
                            onChange={(e) => updateAvailable(0, e.target.value)}
                        >
                            <option value={2}>
                                Полностью доступно
                            </option>
                            <option value={1}>
                                Частично доступно
                            </option>
                            <option value={0}>
                                Не доступно
                            </option>
                        </Form.Select>

                        <Input
                            placeholder={"пункт о доступности"}
                            changeF={updateDescription}
                            typeIndex={0}
                            i={0}
                        />
                        <Form.Text className="text-muted">
                            они добавляются авто если что-то написать, отдельный инпут - отдельный пункт
                        </Form.Text>
                    </div>

                    <div style={{margin: "20px 0"}}>
                        <Form.Label>Доступно для инвалидов по зрению</Form.Label>
                        <Form.Select
                            onChange={(e) => updateAvailable(1, e.target.value)}
                        >
                            <option value={2}>
                                Полностью доступно
                            </option>
                            <option value={1}>
                                Частично доступно
                            </option>
                            <option value={0}>
                                Не доступно
                            </option>
                        </Form.Select>
                        <Input
                            placeholder={"пункт о доступности"}
                            changeF={updateDescription}
                            typeIndex={1}
                            i={0}
                        />
                        <Form.Text className="text-muted">
                            они добавляются авто если что-то написать, отдельный инпут - отдельный пункт
                        </Form.Text>
                    </div>

                    <div style={{margin: "20px 0"}}>
                        <Form.Label>Доступно для инвалидов по слуху</Form.Label>
                        <Form.Select
                            onChange={(e) => updateAvailable(2, e.target.value)}
                        >
                            <option value={2}>
                                Полностью доступно
                            </option>
                            <option value={1}>
                                Частично доступно
                            </option>
                            <option value={0}>
                                Не доступно
                            </option>
                        </Form.Select>
                        <Input
                            placeholder={"пункт о доступности"}
                            changeF={updateDescription}
                            typeIndex={2}
                            i={0}
                        />
                        <Form.Text className="text-muted">
                            они добавляются авто если что-то написать, отдельный инпут - отдельный пункт
                        </Form.Text>
                    </div>

                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => submit(e)}
                >
                    Submit
                </Button>
            </Form>
        </div>

    );
};

export default Admin;