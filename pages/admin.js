import {Button, Form} from "react-bootstrap";
import {create, getAll} from "../http/pointAPI";
import {useEffect, useState} from "react";
import {usePointsStore} from "../store/Store";
import Input from "../components/Input/Input";
import AdminModal from "../components/Modals/AdminModal";
import AdminPointsList from "../components/AdminPointsList";
import {CSSTransition, TransitionGroup} from "react-transition-group"
import { adminValidation } from "../validations/AdminValidation";

const Admin = () => {
    const {points, changePoints, changeFilterByType, changeFilterByNosological, filteredPoints, changeFilterByText} = usePointsStore()
    // const [formDataStatic, setFormDataStatic] = useState(formData)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        street: "",
        coordinates: [],
        type: "",
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

    const submit = async (e) => {
        e.preventDefault()
        let isValidate = true
        await adminValidation
        .validate(formData)
        .catch((err) => {
            alert(err.errors[0]);
            isValidate = false
        })
        if (!isValidate) {
            return;
        }
        try {
                const data = new FormData();
                data.append('name', formData.name);
                data.append('description', formData.description);
                data.append('type', formData.type);
                data.append('street', formData.street);
                
                let newCoordinates = formData.coordinates
                newCoordinates = newCoordinates.split(",").map(item => Number(item))
                newCoordinates = JSON.stringify(newCoordinates)

                let newAccessibility = formData.accessibility
                newAccessibility = JSON.stringify(formData.accessibility)
                
                data.append('coordinates', newCoordinates);
                data.append('accessibility', newAccessibility);
                data.append('photos', formData.photos);
                data.append('pass', localStorage.getItem("pass"));

                
                console.log(formData)
                const response = await create(data);

                getPoints()
            } catch (e) {
                alert (e)
                console.log(e)
            }
    }
    
    const setName = (string) => {
        setFormData({...formData, name: string.trim()})
    }
    const setDescription = (string) => {
        setFormData({...formData, description: string.trim()})
    }
    const setStreet = (string) => {
        setFormData({...formData, street: string.trim()})
    }
    const setCoordinates = (string) => {
        setFormData({...formData, coordinates: string.trim()})
    }
    const setType = (value) => {
        if (value == "default") return;
        setFormData({...formData, type: value})
    }
    const updateAvailable = (availableIndex, index) => {
        const oldDescription = formData.accessibility[availableIndex]
        oldDescription.available = Number(index)

        setFormData(formData)
    }
    const updateDescription = (typeIndex, index, newDescription) => {
        const oldDescription = formData.accessibility[typeIndex].description
        oldDescription[index] = newDescription.trim()

        setFormData(formData)
    };
    const setPhoto = (photo) => {
        setFormData({...formData, photos: photo})
    }



    return (
        <>
        <AdminModal/>
        <div style={{padding: 20}}>
            <Form>
                <Form.Group 
                    className="mb-3" 
                    controlId="formBasicEmail"
                >
                    <div style={{margin: "20px 0"}}>
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Название"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div style={{margin: "20px 0"}}>
                        <Form.Label>Улица</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Улица"
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>

                    <div style={{margin: "20px 0"}}>
                        <Form.Label>описание</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="описание"
                            onChange={(e) => setDescription(e.target.value)}
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
                            координаты из гугла. (типа 56.47648466138119, 84.97856675579699)
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
                            onChange={(e) => setType(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            писать только если нужно добавить что-то новое, иначе выбор из селекта ниже
                        </Form.Text>
                        <Form.Select
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value={"default"}>
                                тип учреждения
                            </option>
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
        <TransitionGroup>
            <div
                style={{
                    display:"flex",
                    width:"100vw",
                    overflow:"auto"
                }}
            >
                {
                    points.map((point, index) => (
                        <div style={{width: 300, margin: "0 20px"}}>
                            <CSSTransition
                                timeout={500}
                                classNames={"point"}
                                key={index}
                            >
                                    <AdminPointsList 
                                        info={point}
                                        fReload={getPoints}
                                    />
                            </CSSTransition>
                        </div>
                    ))
                }
            </div>
        </TransitionGroup>
        </>

    );
};

export default Admin;