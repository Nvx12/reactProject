import React, { useEffect, useState } from "react";
import {
  addUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../actions/userApi";
import { Table } from "react-bootstrap";
import { Button } from "bootstrap";
import "./user.css";

const User = () => {
  const [userList, setUserList] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  useEffect(async () => {
    const list = await getAllUsers();
    setUserList(list);
  }, []);

  const handleSubmit = async (id) => {
    if (!update) {
      const newuser = await addUser(name, email, phoneNumber);
      setUserList([newuser, ...userList]);
    } else {
      const updatedUser = await updateUser(id, name, email, phoneNumber);

      const newList = userList.filter((item) => item._id !== id);
      setUserList([updatedUser, ...newList]);
      setUpdate(false);
      setName("");
      setEmail("");
      setphoneNumber("");
    }
  };

  const handleRemove = async (id) => {
    await deleteUser(id);
    const newList = userList.filter((item) => item._id !== id);
    setUserList(newList);
  };

  const handleUpdate = async (element) => {
    setUpdate(true);
    setName(element.name);
    setEmail(element.email);
    setphoneNumber(element.phoneNumber);
    setId(element._id);
  };
  return (
    <div className="user-body">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="phone number"
          value={phoneNumber}
          onChange={(e) => {
            setphoneNumber(e.target.value);
          }}
        />
        <button
          onClick={async () => {
            await handleSubmit(id);
          }}
        >
          {update ? "Update user" : "Add new user"}
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>phone number</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.map((element) => (
              <tr>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td>{element.phoneNumber}</td>
                <button onClick={async () => await handleRemove(element._id)}>
                  Remove
                </button>
                
                <button
                  onClick={() => {
                    handleUpdate(element);
                  }}
                >
                  update
                </button>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
export default User;
