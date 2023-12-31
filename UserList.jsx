import React, { useState, useEffect } from 'react'
import User from './User'
import axios from "axios";
import './UserList.css';

export default function UserList() {
    const [userList, setUserList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)

    useEffect(() => {
        refreshUserList();
    }, [])

    const userAPI = (url = 'https://localhost:44312/api/UserData') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }
   

    function refreshUserList() {
       userAPI().fetchAll()
            .then(res => {
                setUserList(res.data)
            })
            .catch(err => console.log(err))
    }

    const addOrEdit = (formData, onSuccess) => {
        if (formData.get('id') == "0")
            userAPI().create(formData)
                .then(res => {
                    onSuccess();
                    refreshUserList();
                })
                .catch(err => console.log(err))
        else
            userAPI().update(formData.get('id'), formData)
                .then(res => {
                    onSuccess();
                    refreshUserList();
                })
                .catch(err => console.log(err))

    }

    const showRecordDetails = data => {
        setRecordForEdit(data)
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
            userAPI().delete(id)
                .then(res => refreshUserList())
                .catch(err => console.log(err))
    }

    const imageCard = data => (
        <div className="card" onClick={() => { showRecordDetails(data) }}>
            <img src={data.imageSrc} className="card-img-top rounded-circle" />
            <div className="card-body">
                <h5>{data.firstName}</h5>
                <span>{data.lastName}</span> <br />
                <button className="btn btn-light delete-button" onClick={e => onDelete(e, parseInt(data.id))}>
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    )


    return (
        <div className="row">
            <div className="col-md-12">
                <div className="jumbotron jumbotron-fluid py-4">
                    <div className="container text-center">
                        <h1 className="display-4">User Register</h1>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <User
                    addOrEdit={addOrEdit}
                    recordForEdit={recordForEdit}
                />
            </div>
            <div className="col-md-8">
                <table>
                    <tbody>
                        {
                            //tr > 3 td
                            [...Array(Math.ceil(userList.length / 3))].map((e, i) =>
                                <tr key={i}>
                                    <td>{imageCard(userList[3 * i])}</td>
                                    <td>{userList[3 * i + 1] ? imageCard(userList[3 * i + 1]) : null}</td>
                                    <td>{userList[3 * i + 2] ? imageCard(userList[3 * i + 2]) : null}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}