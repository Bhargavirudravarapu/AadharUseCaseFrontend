// import React, { useState } from 'react';
// import './CreationPage.css';
// import InnerNavbar from './HomeNavbar';

// const CreationPage = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [age, setAge] = useState('');
//   const [address, setAddress] = useState('');
//   const [phone, setPhone] = useState('');
//   const [aadharNumber, setAadharNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Here, you can perform actions like sending the data to a server or updating a state.
//     // For simplicity, let's just log the data to the console.
//     console.log({
//       firstName,
//       lastName,
//       age,
//       address,
//       phone,
//       aadharNumber,
//       email,
//       file,
//     });

//     // You may want to reset the form fields after submission
//     setFirstName('');
//     setLastName('');
//     setAge('');
//     setAddress('');
//     setPhone('');
//     setAadharNumber('');
//     setEmail('');
//     setFile('');
//   };

//   return (
//     <div><InnerNavbar/>

//     <div className="container">
//       <div className="form-wrapper">
//         <h1>Registration</h1>
//         <form onSubmit={handleSubmit}>
//           <label>
//             First Name:
//             <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
//           </label>
//           <br />
//           <label>
//             Last Name:
//             <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
//           </label>
//           <br />
//           <label>
//             Age:
//             <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
//           </label>
//           <br />
//           <label>
//             Address:
//             <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
//           </label>
//           <br />
//           <label>
//             Phone:
//             <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//           </label>
//           <br />
//           <label>
//             Aadhar Number:
//             <input type="text" value={aadharNumber} onChange={(e) => setAadharNumber(e.target.value)} required />
//           </label>
//           <br />
//           <label>
//             Email ID:
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </label>
//           <br />
//           <label>
//             Upload File:
//             <input type="file" onChange={handleFileChange} required />
//           </label>
//           <br />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default CreationPage;



import React, { useState, useEffect } from 'react';

const defaultImageSrc = '/img/image_placeholder.png';

const initialFieldValues = {
  id: 0,
  firstName: '',
  lastName: '',
  age: 0,
  address: '',
  phone: '',
  aadharNumber: '',
  email: '',
  imageName: '',
  imageSrc: defaultImageSrc,
  imageFile: null,
};

export default function Employee(props) {
  const { addOrEdit, recordForEdit } = props;

  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (recordForEdit != null) setValues(recordForEdit);
  }, [recordForEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    let temp = {};
    temp.firstName = values.firstName === '' ? false : true;
    temp.lastName = values.lastName === '' ? false : true;
    temp.age = values.age >= 0 ? true : false;
    temp.address = values.address === '' ? false : true;
    temp.phone = values.phone === '' ? false : true;
    temp.aadharNumber = values.aadharNumber === '' ? false : true;
    temp.email = values.email === '' ? false : true;
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById('image-uploader').value = null;
    setErrors({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append('id', values.id);
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('age', values.age);
      formData.append('address', values.address);
      formData.append('phone', values.phone);
      formData.append('aadharNumber', values.aadharNumber);
      formData.append('email', values.email);
      formData.append('imageName', values.imageName);
      formData.append('imageFile', values.imageFile);
      addOrEdit(formData, resetForm);
    }
  };

  const applyErrorClass = (field) => (field in errors && errors[field] === false ? ' invalid-field' : '');

  return (
    <>
      <div className="container text-center">
        <p className="lead">An Employee</p>
      </div>
      <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        <div className="card">
          <img src={values.imageSrc} className="card-img-top" alt="Employee" />
          <div className="card-body">
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                className={'form-control-file' + applyErrorClass('imageSrc')}
                onChange={showPreview}
                id="image-uploader"
              />
            </div>
            <div className="form-group">
              <input
                className={'form-control' + applyErrorClass('firstName')}
                placeholder="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className={'form-control' + applyErrorClass('lastName')}
                placeholder="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className={'form-control' + applyErrorClass('age')}
                placeholder="Age"
                name="age"
                value={values.age}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className={'form-control' + applyErrorClass('address')}
                placeholder="Address"
                name="address"
                value={values.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                className={'form-control' + applyErrorClass('phone')}
                placeholder="Phone"
                name="phone"
                value={values.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className={'form-control' + applyErrorClass('aadharNumber')}
                placeholder="Aadhar Number"
                name="aadharNumber"
                value={values.aadharNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className={'form-control' + applyErrorClass('email')}
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-light">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

