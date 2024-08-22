import * as yup from "yup"

export const adminValidation = yup.object().shape({
    name: yup.string().required("название обязательно"),
    description: yup.string().required("описание обязательно"),
    street: yup.string().required("улица обязательна"),
    coordinates: yup.string()
        .matches(
            /^-?\d+(\.\d+)?,\s?-?\d+(\.\d+)?$/,
            'Введите координаты в формате широта,долгота'
        )
        .required('Координаты обязательны'),
    type: yup.string().required("тип учреждения обязателен"),
    accessibility: yup.array().of(
        yup.object().shape({
            available: yup.number().required(),
            description: yup.array()
                .of(yup.string().required('описание обязательно'))
                .required('описания обязательны'),
            name: yup.string().required()
        })
    ),
    photos: yup.mixed().required('файл обязателен (в единственном виде)')
})