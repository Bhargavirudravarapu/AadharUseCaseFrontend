import React, { useState, useEffect } from 'react'

const defaultImageSrc = '/img/image_placeholder.png'

const initialFieldValues = {
    id: '',
    firstName: '',
    lastName: '',
    age:'',
    address:'',
    phone:'',
    aadharNumber:'',
    email:'',
    imageName: '',
    imageSrc: defaultImageSrc,
    imageFile: null
}

export default function Employee(props) {

    const { addOrEdit, recordForEdit } = props

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        if (recordForEdit != null)
            setValues(recordForEdit);
    }, [recordForEdit])

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }

    const validate = () => {
        let temp = {}
        temp.firstName = values.firstName == "" ? false : true;
        temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x == true)
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
        setErrors({})
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('id', values.id)
            formData.append('firstName', values.firstName)
            formData.append('lastName', values.lastName)
            formData.append('age', values.age)
            formData.append('address', values.address)
            formData.append('phone', values.phone)
            formData.append('aadharNumber', values.aadharNumber)
            formData.append('email', values.email)
            formData.append('imageName', values.imageName)
            formData.append('imageFile', values.imageFile)
            addOrEdit(formData, resetForm)
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')

    return (
        <>
            <div className="container text-center">
                <p className="lead">A User</p>
            </div>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card">
                    <img src={values.imageSrc} className="card-img-top" />
                    <div className="card-body">
                        <div className="form-group">
                            <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrc')}
                                onChange={showPreview} id="image-uploader" />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('firstName')} placeholder="First Name" name="firstName"
                                value={values.firstName}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="lastName" name="lastName"
                                value={values.lastName}
                                onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <input className="form-control" placeholder="age" name="age"
                                value={values.age}
                                onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <input className="form-control" placeholder="address" name="address"
                                value={values.address}
                                onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <input className="form-control" placeholder="phone" name="phone"
                                value={values.phone}
                                onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <input className="form-control" placeholder="aadharNumber" name="aadharNumber"
                                value={values.aadharNumber}
                                onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <input className="form-control" placeholder="email" name="email"
                                value={values.email}
                                onChange={handleInputChange} />
                        </div>


                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-light">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}